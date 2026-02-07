import express from 'express';
import cors from 'cors';
import bcrypt from 'bcrypt';
import db from './database/db.js';

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// Register
app.post('/api/auth/register', async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    
    const existing = await db.query('SELECT * FROM users WHERE email = $1', [email]);
    if (existing.rows.length > 0) {
      return res.status(400).json({ error: 'Email already exists' });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const result = await db.query(
      'INSERT INTO users (email, password_hash, name, role) VALUES ($1, $2, $3, $4) RETURNING id, email, name, role, total_points, badge_level, created_at',
      [email, passwordHash, name, role]
    );

    res.json({ user: result.rows[0] });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Login
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    const result = await db.query('SELECT * FROM users WHERE email = $1', [email]);
    if (result.rows.length === 0) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const user = result.rows[0];
    const valid = await bcrypt.compare(password, user.password_hash);
    
    if (!valid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    await db.query('UPDATE users SET last_login = CURRENT_TIMESTAMP WHERE id = $1', [user.id]);

    const { password_hash, ...userWithoutPassword } = user;
    res.json({ user: userWithoutPassword });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all courses
app.get('/api/courses', async (req, res) => {
  try {
    const result = await db.query(`
      SELECT c.*, u.name as instructor_name,
      ARRAY_AGG(DISTINCT t.name) FILTER (WHERE t.name IS NOT NULL) as tags
      FROM courses c
      LEFT JOIN users u ON c.instructor_id = u.id
      LEFT JOIN course_tags ct ON c.id = ct.course_id
      LEFT JOIN tags t ON ct.tag_id = t.id
      WHERE c.is_published = true
      GROUP BY c.id, u.name
      ORDER BY c.created_at DESC
    `);
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get course by ID
app.get('/api/courses/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const course = await db.query(`
      SELECT c.*, u.name as instructor_name,
      ARRAY_AGG(DISTINCT t.name) FILTER (WHERE t.name IS NOT NULL) as tags
      FROM courses c
      LEFT JOIN users u ON c.instructor_id = u.id
      LEFT JOIN course_tags ct ON c.id = ct.course_id
      LEFT JOIN tags t ON ct.tag_id = t.id
      WHERE c.id = $1
      GROUP BY c.id, u.name
    `, [id]);

    const lessons = await db.query(
      'SELECT * FROM lessons WHERE course_id = $1 ORDER BY order_index',
      [id]
    );

    res.json({ ...course.rows[0], lessons: lessons.rows });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get course modules with topics
app.get('/api/courses/:id/modules', async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.query.userId;
    
    const modulesResult = await db.query(`
      SELECT * FROM course_modules 
      WHERE course_id = $1 
      ORDER BY order_index
    `, [id]);

    const modulesWithTopics = await Promise.all(
      modulesResult.rows.map(async (module) => {
        const topicsResult = await db.query(`
          SELECT 
            mt.id, 
            mt.title, 
            mt.content_type as type, 
            mt.duration,
            CASE WHEN utp.id IS NOT NULL THEN true ELSE false END as is_completed
          FROM module_topics mt
          LEFT JOIN user_topic_progress utp ON mt.id = utp.topic_id AND utp.user_id = $2
          WHERE mt.module_id = $1
          ORDER BY mt.order_index
        `, [module.id, userId || null]);

        const quizResult = await db.query(`
          SELECT id, title FROM module_quizzes WHERE module_id = $1
        `, [module.id]);

        let quiz_completed = false;
        if (quizResult.rows[0] && userId) {
          const completionResult = await db.query(`
            SELECT id FROM quiz_completions 
            WHERE user_id = $1 AND quiz_id = $2
          `, [userId, quizResult.rows[0].id]);
          quiz_completed = completionResult.rows.length > 0;
        }

        return {
          id: module.id,
          title: module.title,
          order_index: module.order_index,
          topics: topicsResult.rows,
          quiz_id: quizResult.rows[0]?.id,
          quiz_title: quizResult.rows[0]?.title,
          quiz_completed
        };
      })
    );

    res.json(modulesWithTopics);
  } catch (error) {
    console.error('Error fetching modules:', error);
    res.status(500).json({ error: error.message });
  }
});

// Get specific topic details
app.get('/api/courses/:courseId/modules/:moduleId/topics/:topicId', async (req, res) => {
  try {
    const { courseId, moduleId, topicId } = req.params;
    
    const topicResult = await db.query(`
      SELECT id, title, content_type as type, duration, content_url, description, is_completed
      FROM module_topics
      WHERE id = $1 AND module_id = $2
    `, [topicId, moduleId]);

    const moduleResult = await db.query(`
      SELECT id, title FROM course_modules WHERE id = $1
    `, [moduleId]);

    if (topicResult.rows.length === 0) {
      return res.status(404).json({ error: 'Topic not found' });
    }

    res.json({
      topic: topicResult.rows[0],
      module: moduleResult.rows[0]
    });
  } catch (error) {
    console.error('Error fetching topic:', error);
    res.status(500).json({ error: error.message });
  }
});

// Mark topic as complete
app.post('/api/progress/complete', async (req, res) => {
  try {
    const { userId, courseId, moduleId, topicId } = req.body;
    
    await db.query(`
      INSERT INTO user_topic_progress (user_id, topic_id, course_id)
      VALUES ($1, $2, $3)
      ON CONFLICT (user_id, topic_id) DO NOTHING
    `, [userId, topicId, courseId]);

    res.json({ success: true });
  } catch (error) {
    console.error('Error marking complete:', error);
    res.status(500).json({ error: error.message });
  }
});

// Get course reviews
app.get('/api/courses/:id/reviews', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await db.query(`
      SELECT r.*, u.name as user_name, u.avatar_url
      FROM reviews r
      JOIN users u ON r.user_id = u.id
      WHERE r.course_id = $1 AND r.is_approved = true
      ORDER BY r.created_at DESC
    `, [id]);
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add review
app.post('/api/courses/:id/reviews', async (req, res) => {
  try {
    const { id } = req.params;
    const { userId, rating, comment } = req.body;
    
    const result = await db.query(`
      INSERT INTO reviews (course_id, user_id, rating, comment)
      VALUES ($1, $2, $3, $4)
      ON CONFLICT (course_id, user_id) 
      DO UPDATE SET rating = $3, comment = $4, updated_at = CURRENT_TIMESTAMP
      RETURNING *
    `, [id, userId, rating, comment]);

    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get user enrollments with progress
app.get('/api/users/:userId/enrollments', async (req, res) => {
  try {
    const { userId } = req.params;
    
    // Get all courses the user has accessed
    const coursesResult = await db.query(`
      SELECT DISTINCT c.id as course_id, c.title, c.description, c.cover_image_url, 
             c.category, c.average_rating, c.difficulty_level, c.estimated_duration
      FROM courses c
      WHERE c.is_published = true
      AND EXISTS (
        SELECT 1 FROM user_topic_progress utp
        JOIN module_topics mt ON utp.topic_id = mt.id
        JOIN course_modules cm ON mt.module_id = cm.id
        WHERE cm.course_id = c.id AND utp.user_id = $1
      )
      OR EXISTS (
        SELECT 1 FROM quiz_completions qc
        WHERE qc.course_id = c.id AND qc.user_id = $1
      )
    `, [userId]);

    const enrollments = await Promise.all(
      coursesResult.rows.map(async (course) => {
        // Count total topics
        const totalTopicsResult = await db.query(`
          SELECT COUNT(mt.id) as total
          FROM module_topics mt
          JOIN course_modules cm ON mt.module_id = cm.id
          WHERE cm.course_id = $1
        `, [course.course_id]);

        // Count completed topics
        const completedTopicsResult = await db.query(`
          SELECT COUNT(utp.id) as completed
          FROM user_topic_progress utp
          JOIN module_topics mt ON utp.topic_id = mt.id
          JOIN course_modules cm ON mt.module_id = cm.id
          WHERE cm.course_id = $1 AND utp.user_id = $2
        `, [course.course_id, userId]);

        // Count total quizzes
        const totalQuizzesResult = await db.query(`
          SELECT COUNT(mq.id) as total
          FROM module_quizzes mq
          JOIN course_modules cm ON mq.module_id = cm.id
          WHERE cm.course_id = $1
        `, [course.course_id]);

        // Count completed quizzes
        const completedQuizzesResult = await db.query(`
          SELECT COUNT(qc.id) as completed
          FROM quiz_completions qc
          WHERE qc.course_id = $1 AND qc.user_id = $2
        `, [course.course_id, userId]);

        const totalItems = parseInt(totalTopicsResult.rows[0].total) + parseInt(totalQuizzesResult.rows[0].total);
        const completedItems = parseInt(completedTopicsResult.rows[0].completed) + parseInt(completedQuizzesResult.rows[0].completed);
        const progress_percentage = totalItems > 0 ? Math.round((completedItems / totalItems) * 100) : 0;
        const is_completed = totalItems > 0 && completedItems === totalItems;

        return {
          ...course,
          progress_percentage,
          is_completed
        };
      })
    );

    res.json(enrollments);
  } catch (error) {
    console.error('Error fetching enrollments:', error);
    res.status(500).json({ error: error.message });
  }
});

// Check enrollment status
app.get('/api/enrollments/check/:userId/:courseId', async (req, res) => {
  try {
    const { userId, courseId } = req.params;
    const result = await db.query(
      'SELECT * FROM enrollments WHERE user_id = $1 AND course_id = $2',
      [userId, courseId]
    );
    res.json({ enrolled: result.rows.length > 0, enrollment: result.rows[0] });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Enroll in course
app.post('/api/enrollments', async (req, res) => {
  try {
    const { userId, courseId } = req.body;
    
    const result = await db.query(`
      INSERT INTO enrollments (user_id, course_id, last_accessed) 
      VALUES ($1, $2, CURRENT_TIMESTAMP) 
      ON CONFLICT (user_id, course_id) DO UPDATE SET last_accessed = CURRENT_TIMESTAMP
      RETURNING *
    `, [userId, courseId]);

    if (result.rows.length > 0) {
      await db.query(
        'UPDATE courses SET total_enrollments = total_enrollments + 1 WHERE id = $1',
        [courseId]
      );
    }

    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Unenroll from course
app.delete('/api/enrollments/:userId/:courseId', async (req, res) => {
  try {
    const { userId, courseId } = req.params;
    
    await db.query('DELETE FROM enrollments WHERE user_id = $1 AND course_id = $2', [userId, courseId]);
    await db.query('UPDATE courses SET total_enrollments = GREATEST(total_enrollments - 1, 0) WHERE id = $1', [courseId]);
    
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get lesson progress for enrollment
app.get('/api/enrollments/:enrollmentId/progress', async (req, res) => {
  try {
    const { enrollmentId } = req.params;
    const result = await db.query(`
      SELECT lp.*, l.title, l.lesson_type, l.order_index
      FROM lesson_progress lp
      JOIN lessons l ON lp.lesson_id = l.id
      WHERE lp.enrollment_id = $1
      ORDER BY l.order_index
    `, [enrollmentId]);
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update lesson progress and recalculate course progress
app.post('/api/lesson-progress', async (req, res) => {
  try {
    const { enrollmentId, lessonId, status } = req.body;
    
    // Update lesson progress
    const result = await db.query(`
      INSERT INTO lesson_progress (enrollment_id, lesson_id, status, started_at, completed_at)
      VALUES ($1, $2, $3, 
        CASE WHEN $3 IN ('in-progress', 'completed') THEN CURRENT_TIMESTAMP ELSE NULL END,
        CASE WHEN $3 = 'completed' THEN CURRENT_TIMESTAMP ELSE NULL END)
      ON CONFLICT (enrollment_id, lesson_id) 
      DO UPDATE SET 
        status = $3,
        started_at = CASE WHEN lesson_progress.started_at IS NULL AND $3 IN ('in-progress', 'completed') 
                     THEN CURRENT_TIMESTAMP ELSE lesson_progress.started_at END,
        completed_at = CASE WHEN $3 = 'completed' THEN CURRENT_TIMESTAMP ELSE lesson_progress.completed_at END
      RETURNING *
    `, [enrollmentId, lessonId, status]);

    // Recalculate course progress
    const progressCalc = await db.query(`
      WITH course_stats AS (
        SELECT 
          e.course_id,
          COUNT(l.id) as total_lessons,
          COUNT(CASE WHEN lp.status = 'completed' THEN 1 END) as completed_lessons
        FROM enrollments e
        JOIN lessons l ON l.course_id = e.course_id
        LEFT JOIN lesson_progress lp ON lp.lesson_id = l.id AND lp.enrollment_id = e.id
        WHERE e.id = $1
        GROUP BY e.course_id
      )
      UPDATE enrollments e
      SET 
        progress_percentage = CASE 
          WHEN cs.total_lessons > 0 
          THEN ROUND((cs.completed_lessons::decimal / cs.total_lessons::decimal) * 100, 2)
          ELSE 0 
        END,
        is_completed = (cs.completed_lessons = cs.total_lessons AND cs.total_lessons > 0),
        completion_date = CASE 
          WHEN cs.completed_lessons = cs.total_lessons AND cs.total_lessons > 0 
          THEN CURRENT_TIMESTAMP 
          ELSE NULL 
        END,
        last_accessed = CURRENT_TIMESTAMP
      FROM course_stats cs
      WHERE e.id = $1
      RETURNING e.*
    `, [enrollmentId]);

    res.json({ 
      lessonProgress: result.rows[0], 
      enrollment: progressCalc.rows[0] 
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get user learning activity (for heatmap)
app.get('/api/users/:userId/activity', async (req, res) => {
  try {
    const { userId } = req.params;
    const result = await db.query(`
      SELECT DATE(last_accessed) as date, COUNT(*) * 15 as count
      FROM enrollments
      WHERE user_id = $1 AND last_accessed IS NOT NULL
      GROUP BY DATE(last_accessed)
      ORDER BY date DESC
      LIMIT 365
    `, [userId]);
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get user learning stats
app.get('/api/users/:userId/stats', async (req, res) => {
  try {
    const { userId } = req.params;
    
    const totalMinutes = await db.query(`
      SELECT COALESCE(SUM(EXTRACT(EPOCH FROM (last_accessed - enrollment_date))/60), 0)::int as total
      FROM enrollments WHERE user_id = $1
    `, [userId]);
    
    const coursesCompleted = await db.query(
      'SELECT COUNT(*) as count FROM enrollments WHERE user_id = $1 AND is_completed = true',
      [userId]
    );
    
    const streaks = await db.query(`
      WITH daily_activity AS (
        SELECT DISTINCT DATE(last_accessed) as activity_date
        FROM enrollments
        WHERE user_id = $1 AND last_accessed IS NOT NULL
        ORDER BY activity_date DESC
      ),
      streak_groups AS (
        SELECT activity_date,
          activity_date - (ROW_NUMBER() OVER (ORDER BY activity_date))::int AS streak_group
        FROM daily_activity
      )
      SELECT 
        MAX(CASE WHEN streak_group = (SELECT streak_group FROM streak_groups ORDER BY activity_date DESC LIMIT 1)
          THEN COUNT(*) ELSE 0 END) as current_streak,
        MAX(COUNT(*)) as longest_streak
      FROM streak_groups
      GROUP BY streak_group
    `, [userId]);

    res.json({
      totalMinutes: parseInt(totalMinutes.rows[0]?.total || 0),
      coursesCompleted: parseInt(coursesCompleted.rows[0]?.count || 0),
      currentStreak: parseInt(streaks.rows[0]?.current_streak || 0),
      longestStreak: parseInt(streaks.rows[0]?.longest_streak || 0)
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get user learning stats
app.get('/api/users/:userId/stats', async (req, res) => {
  try {
    const { userId } = req.params;
    
    const timeResult = await db.query(
      'SELECT COALESCE(SUM(time_spent), 0) as total_time FROM lesson_progress WHERE enrollment_id IN (SELECT id FROM enrollments WHERE user_id = $1)',
      [userId]
    );
    
    const completedResult = await db.query(
      'SELECT COUNT(*) as completed FROM enrollments WHERE user_id = $1 AND is_completed = true',
      [userId]
    );
    
    res.json({
      totalTime: parseInt(timeResult.rows[0].total_time),
      coursesCompleted: parseInt(completedResult.rows[0].completed),
      currentStreak: 0,
      longestStreak: 0
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get user activity heatmap
app.get('/api/users/:userId/activity', async (req, res) => {
  try {
    const { userId } = req.params;
    
    const result = await db.query(`
      SELECT DATE(completed_at) as date, COUNT(*) as count
      FROM lesson_progress
      WHERE enrollment_id IN (SELECT id FROM enrollments WHERE user_id = $1)
      AND completed_at IS NOT NULL
      AND completed_at >= CURRENT_DATE - INTERVAL '365 days'
      GROUP BY DATE(completed_at)
      ORDER BY date
    `, [userId]);
    
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DEBUG: Get all modules with quiz info
app.get('/api/debug/modules', async (req, res) => {
  try {
    const result = await db.query(`
      SELECT 
        c.title as course,
        cm.id as module_id,
        cm.order_index,
        cm.title as module_title,
        mq.id as quiz_id,
        mq.title as quiz_title
      FROM courses c
      JOIN course_modules cm ON c.id = cm.course_id
      LEFT JOIN module_quizzes mq ON cm.id = mq.module_id
      ORDER BY c.title, cm.order_index
    `);
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get quiz by quiz ID (direct)
app.get('/api/quiz/:quizId', async (req, res) => {
  try {
    const { quizId } = req.params;
    
    const quizResult = await db.query(
      'SELECT * FROM module_quizzes WHERE id = $1',
      [quizId]
    );

    if (quizResult.rows.length === 0) {
      return res.status(404).json({ error: 'Quiz not found' });
    }

    const quiz = quizResult.rows[0];

    const questionsResult = await db.query(
      'SELECT * FROM quiz_questions WHERE quiz_id = $1 ORDER BY order_index',
      [quiz.id]
    );

    const questions = [];
    for (const q of questionsResult.rows) {
      const optionsResult = await db.query(
        'SELECT id, option_text, is_correct, order_index FROM quiz_options WHERE question_id = $1 ORDER BY order_index',
        [q.id]
      );

      questions.push({
        id: q.id,
        text: q.question_text,
        type: q.question_type,
        points: q.points,
        options: optionsResult.rows.map(opt => ({
          id: opt.id,
          text: opt.option_text,
          is_correct: opt.is_correct
        }))
      });
    }

    res.json({
      id: quiz.id,
      title: quiz.title,
      description: quiz.description,
      passing_score: quiz.passing_score || 70,
      time_limit: quiz.time_limit,
      rewards: {
        firstTry: quiz.points_first_attempt || 20,
        secondTry: quiz.points_second_attempt || 15,
        thirdTry: quiz.points_third_attempt || 10,
        moreTries: quiz.points_more_attempts || 5
      },
      questions
    });
  } catch (error) {
    console.error('Error fetching quiz:', error);
    res.status(500).json({ error: error.message });
  }
});

// Mark quiz as completed
app.post('/api/quiz/:quizId/complete', async (req, res) => {
  try {
    const { quizId } = req.params;
    const { courseId, passed, points, attemptNumber } = req.body;
    const userId = req.body.userId;
    
    if (passed && userId) {
      // Check if already completed
      const existing = await db.query(`
        SELECT id FROM quiz_completions WHERE user_id = $1 AND quiz_id = $2
      `, [userId, quizId]);

      if (existing.rows.length === 0) {
        // First time completion - award points
        await db.query(`
          INSERT INTO quiz_completions (user_id, quiz_id, course_id, points_earned, attempt_number)
          VALUES ($1, $2, $3, $4, $5)
        `, [userId, quizId, courseId, points, attemptNumber]);

        // Update user total points
        await db.query(`
          UPDATE users SET total_points = total_points + $1 WHERE id = $2
        `, [points, userId]);

        // Update badge level
        await db.query(`
          UPDATE users SET badge_level = get_badge_level(total_points) WHERE id = $1
        `, [userId]);

        // Get updated user data
        const userResult = await db.query(`
          SELECT total_points, badge_level FROM users WHERE id = $1
        `, [userId]);

        res.json({ success: true, user: userResult.rows[0] });
      } else {
        // Already completed
        res.json({ success: true, alreadyCompleted: true });
      }
    } else {
      res.json({ success: false });
    }
  } catch (error) {
    console.error('Quiz completion error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Get quiz by module ID
app.get('/api/modules/:moduleId/quiz', async (req, res) => {
  try {
    const { moduleId } = req.params;
    
    // Get quiz
    const quizResult = await db.query(
      'SELECT * FROM module_quizzes WHERE module_id = $1',
      [moduleId]
    );

    if (quizResult.rows.length === 0) {
      return res.status(404).json({ error: 'Quiz not found for this module' });
    }

    const quiz = quizResult.rows[0];

    // Get questions
    const questionsResult = await db.query(
      'SELECT * FROM quiz_questions WHERE quiz_id = $1 ORDER BY order_index',
      [quiz.id]
    );

    // Get options for all questions
    const questions = [];
    for (const q of questionsResult.rows) {
      const optionsResult = await db.query(
        'SELECT id, option_text, is_correct, order_index FROM quiz_options WHERE question_id = $1 ORDER BY order_index',
        [q.id]
      );

      questions.push({
        id: q.id,
        text: q.question_text,
        type: q.question_type,
        points: q.points,
        options: optionsResult.rows.map(opt => ({
          id: opt.id,
          text: opt.option_text,
          is_correct: opt.is_correct
        }))
      });
    }

    res.json({
      id: quiz.id,
      title: quiz.title,
      description: quiz.description,
      passing_score: quiz.passing_score || 70,
      time_limit: quiz.time_limit,
      rewards: {
        firstTry: quiz.points_first_attempt || 20,
        secondTry: quiz.points_second_attempt || 15,
        thirdTry: quiz.points_third_attempt || 10,
        moreTries: quiz.points_more_attempts || 5
      },
      questions
    });
  } catch (error) {
    console.error('Error fetching quiz:', error);
    res.status(500).json({ error: error.message });
  }
});

// Get user badge progress
app.get('/api/users/:userId/badge-progress', async (req, res) => {
  try {
    const { userId } = req.params;
    const result = await db.query(`
      SELECT 
        u.total_points,
        u.badge_level,
        (get_next_badge_info(u.total_points)).*
      FROM users u
      WHERE u.id = $1
    `, [userId]);
    
    if (result.rows.length > 0) {
      res.json(result.rows[0]);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});