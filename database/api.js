import db from './db.js';
import bcrypt from 'bcrypt';

// ============================================
// USER OPERATIONS
// ============================================

const createUser = async (email, password, name, role = 'learner') => {
  const passwordHash = await bcrypt.hash(password, 10);
  const result = await db.query(
    'INSERT INTO users (email, password_hash, name, role) VALUES ($1, $2, $3, $4) RETURNING id, email, name, role',
    [email, passwordHash, name, role]
  );
  return result.rows[0];
};

const getUserByEmail = async (email) => {
  const result = await db.query('SELECT * FROM users WHERE email = $1', [email]);
  return result.rows[0];
};

const verifyPassword = async (password, passwordHash) => {
  return await bcrypt.compare(password, passwordHash);
};

const updateUserPoints = async (userId, points) => {
  const result = await db.query(
    'UPDATE users SET total_points = total_points + $1 WHERE id = $2 RETURNING *',
    [points, userId]
  );
  return result.rows[0];
};

// ============================================
// COURSE OPERATIONS
// ============================================

const getAllCourses = async (isPublished = true) => {
  const result = await db.query(
    `SELECT c.*, u.name as instructor_name, 
     ARRAY_AGG(DISTINCT t.name) as tags
     FROM courses c
     LEFT JOIN users u ON c.instructor_id = u.id
     LEFT JOIN course_tags ct ON c.id = ct.course_id
     LEFT JOIN tags t ON ct.tag_id = t.id
     WHERE c.is_published = $1
     GROUP BY c.id, u.name
     ORDER BY c.created_at DESC`,
    [isPublished]
  );
  return result.rows;
};

const getCourseById = async (courseId) => {
  const result = await db.query(
    `SELECT c.*, u.name as instructor_name,
     ARRAY_AGG(DISTINCT t.name) as tags
     FROM courses c
     LEFT JOIN users u ON c.instructor_id = u.id
     LEFT JOIN course_tags ct ON c.id = ct.course_id
     LEFT JOIN tags t ON ct.tag_id = t.id
     WHERE c.id = $1
     GROUP BY c.id, u.name`,
    [courseId]
  );
  return result.rows[0];
};

const getCourseLessons = async (courseId) => {
  const result = await db.query(
    'SELECT * FROM lessons WHERE course_id = $1 ORDER BY order_index',
    [courseId]
  );
  return result.rows;
};

// ============================================
// ENROLLMENT OPERATIONS
// ============================================

const enrollUser = async (userId, courseId) => {
  const result = await db.query(
    `INSERT INTO enrollments (user_id, course_id) 
     VALUES ($1, $2) 
     ON CONFLICT (user_id, course_id) DO NOTHING
     RETURNING *`,
    [userId, courseId]
  );
  
  await db.query(
    'UPDATE courses SET total_enrollments = total_enrollments + 1 WHERE id = $1',
    [courseId]
  );
  
  return result.rows[0];
};

const getUserEnrollments = async (userId) => {
  const result = await db.query(
    `SELECT e.*, c.title, c.cover_image_url, c.category, c.average_rating
     FROM enrollments e
     JOIN courses c ON e.course_id = c.id
     WHERE e.user_id = $1
     ORDER BY e.last_accessed DESC`,
    [userId]
  );
  return result.rows;
};

const getEnrollmentProgress = async (enrollmentId) => {
  const result = await db.query(
    `SELECT lp.*, l.title, l.lesson_type
     FROM lesson_progress lp
     JOIN lessons l ON lp.lesson_id = l.id
     WHERE lp.enrollment_id = $1
     ORDER BY l.order_index`,
    [enrollmentId]
  );
  return result.rows;
};

const updateLessonProgress = async (enrollmentId, lessonId, status) => {
  const result = await db.query(
    `INSERT INTO lesson_progress (enrollment_id, lesson_id, status, started_at, completed_at)
     VALUES ($1, $2, $3, CURRENT_TIMESTAMP, 
       CASE WHEN $3 = 'completed' THEN CURRENT_TIMESTAMP ELSE NULL END)
     ON CONFLICT (enrollment_id, lesson_id) 
     DO UPDATE SET status = $3, 
       completed_at = CASE WHEN $3 = 'completed' THEN CURRENT_TIMESTAMP ELSE lesson_progress.completed_at END
     RETURNING *`,
    [enrollmentId, lessonId, status]
  );
  return result.rows[0];
};

// ============================================
// REVIEW OPERATIONS
// ============================================

const createReview = async (courseId, userId, rating, comment) => {
  const result = await db.query(
    `INSERT INTO reviews (course_id, user_id, rating, comment)
     VALUES ($1, $2, $3, $4)
     ON CONFLICT (course_id, user_id) 
     DO UPDATE SET rating = $3, comment = $4, updated_at = CURRENT_TIMESTAMP
     RETURNING *`,
    [courseId, userId, rating, comment]
  );
  return result.rows[0];
};

const getCourseReviews = async (courseId) => {
  const result = await db.query(
    `SELECT r.*, u.name as user_name, u.avatar_url
     FROM reviews r
     JOIN users u ON r.user_id = u.id
     WHERE r.course_id = $1 AND r.is_approved = true
     ORDER BY r.created_at DESC`,
    [courseId]
  );
  return result.rows;
};

// ============================================
// QUIZ OPERATIONS
// ============================================

const getQuizByLessonId = async (lessonId) => {
  const result = await db.query('SELECT * FROM quizzes WHERE lesson_id = $1', [lessonId]);
  return result.rows[0];
};

const getQuizQuestions = async (quizId) => {
  const result = await db.query(
    `SELECT qq.*, 
     json_agg(json_build_object('id', qo.id, 'text', qo.option_text, 'is_correct', qo.is_correct, 'order', qo.order_index) 
       ORDER BY qo.order_index) as options
     FROM quiz_questions qq
     LEFT JOIN quiz_options qo ON qq.id = qo.question_id
     WHERE qq.quiz_id = $1
     GROUP BY qq.id
     ORDER BY qq.order_index`,
    [quizId]
  );
  return result.rows;
};

const getModuleQuiz = async (moduleId) => {
  const result = await db.query(
    `SELECT mq.*, 
     json_agg(json_build_object(
       'id', qq.id, 
       'text', qq.question_text,
       'type', qq.question_type,
       'points', qq.points,
       'order', qq.order_index,
       'options', (
         SELECT json_agg(json_build_object(
           'id', qo.id,
           'text', qo.option_text,
           'is_correct', qo.is_correct,
           'order', qo.order_index
         ) ORDER BY qo.order_index)
         FROM quiz_options qo
         WHERE qo.question_id = qq.id
       )
     ) ORDER BY qq.order_index) as questions
     FROM module_quizzes mq
     LEFT JOIN quiz_questions qq ON mq.id = qq.quiz_id
     WHERE mq.module_id = $1
     GROUP BY mq.id`,
    [moduleId]
  );
  return result.rows[0];
};

const submitQuizAttempt = async (enrollmentId, quizId, attemptNumber, score, pointsEarned, isPassed) => {
  const result = await db.query(
    `INSERT INTO quiz_attempts (enrollment_id, quiz_id, attempt_number, score, points_earned, is_passed, completed_at)
     VALUES ($1, $2, $3, $4, $5, $6, CURRENT_TIMESTAMP)
     RETURNING *`,
    [enrollmentId, quizId, attemptNumber, score, pointsEarned, isPassed]
  );
  return result.rows[0];
};

export default {
  createUser,
  getUserByEmail,
  verifyPassword,
  updateUserPoints,
  getAllCourses,
  getCourseById,
  getCourseLessons,
  enrollUser,
  getUserEnrollments,
  getEnrollmentProgress,
  updateLessonProgress,
  createReview,
  getCourseReviews,
  getQuizByLessonId,
  getQuizQuestions,
  getModuleQuiz,
  submitQuizAttempt,
};
