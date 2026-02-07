-- Add Quiz Questions and Options - Part 2
-- Full Stack Web Development and Python for Data Science

DO $$
DECLARE
  quiz_id UUID;
  q_id UUID;
BEGIN

-- ============================================
-- FULL STACK WEB DEVELOPMENT - 12 Questions (3 per quiz)
-- ============================================

-- Quiz 1 (Module 2)
SELECT id INTO quiz_id FROM module_quizzes mq
JOIN course_modules cm ON mq.module_id = cm.id
JOIN courses c ON cm.course_id = c.id
WHERE c.title = 'Full Stack Web Development' AND cm.order_index = 2;

IF quiz_id IS NOT NULL THEN
  INSERT INTO quiz_questions (quiz_id, question_text, question_type, order_index, points) VALUES
  (quiz_id, 'Full stack includes:', 'multiple_choice', 1, 1) RETURNING id INTO q_id;
  INSERT INTO quiz_options (question_id, option_text, is_correct, order_index) VALUES
  (q_id, 'Frontend only', false, 1),
  (q_id, 'Backend only', false, 2),
  (q_id, 'Frontend + Backend + DB', true, 3),
  (q_id, 'UI only', false, 4);

  INSERT INTO quiz_questions (quiz_id, question_text, question_type, order_index, points) VALUES
  (quiz_id, 'Node.js is used for:', 'multiple_choice', 2, 1) RETURNING id INTO q_id;
  INSERT INTO quiz_options (question_id, option_text, is_correct, order_index) VALUES
  (q_id, 'Styling', false, 1),
  (q_id, 'Backend JavaScript', true, 2),
  (q_id, 'Database', false, 3),
  (q_id, 'Testing only', false, 4);

  INSERT INTO quiz_questions (quiz_id, question_text, question_type, order_index, points) VALUES
  (quiz_id, 'Git is used for:', 'multiple_choice', 3, 1) RETURNING id INTO q_id;
  INSERT INTO quiz_options (question_id, option_text, is_correct, order_index) VALUES
  (q_id, 'Deployment', false, 1),
  (q_id, 'Version control', true, 2),
  (q_id, 'Hosting', false, 3),
  (q_id, 'Styling', false, 4);
END IF;

-- Quiz 2 (Module 4)
SELECT id INTO quiz_id FROM module_quizzes mq
JOIN course_modules cm ON mq.module_id = cm.id
JOIN courses c ON cm.course_id = c.id
WHERE c.title = 'Full Stack Web Development' AND cm.order_index = 4;

IF quiz_id IS NOT NULL THEN
  INSERT INTO quiz_questions (quiz_id, question_text, question_type, order_index, points) VALUES
  (quiz_id, 'REST API uses which protocol?', 'multiple_choice', 1, 1) RETURNING id INTO q_id;
  INSERT INTO quiz_options (question_id, option_text, is_correct, order_index) VALUES
  (q_id, 'FTP', false, 1),
  (q_id, 'SMTP', false, 2),
  (q_id, 'HTTP', true, 3),
  (q_id, 'TCP', false, 4);

  INSERT INTO quiz_questions (quiz_id, question_text, question_type, order_index, points) VALUES
  (quiz_id, 'Express.js is a:', 'multiple_choice', 2, 1) RETURNING id INTO q_id;
  INSERT INTO quiz_options (question_id, option_text, is_correct, order_index) VALUES
  (q_id, 'Database', false, 1),
  (q_id, 'Frontend library', false, 2),
  (q_id, 'Backend framework', true, 3),
  (q_id, 'CSS tool', false, 4);

  INSERT INTO quiz_questions (quiz_id, question_text, question_type, order_index, points) VALUES
  (quiz_id, 'DOM is managed by:', 'multiple_choice', 3, 1) RETURNING id INTO q_id;
  INSERT INTO quiz_options (question_id, option_text, is_correct, order_index) VALUES
  (q_id, 'Server', false, 1),
  (q_id, 'Browser', true, 2),
  (q_id, 'Database', false, 3),
  (q_id, 'OS', false, 4);
END IF;

-- Quiz 3 (Module 6)
SELECT id INTO quiz_id FROM module_quizzes mq
JOIN course_modules cm ON mq.module_id = cm.id
JOIN courses c ON cm.course_id = c.id
WHERE c.title = 'Full Stack Web Development' AND cm.order_index = 6;

IF quiz_id IS NOT NULL THEN
  INSERT INTO quiz_questions (quiz_id, question_text, question_type, order_index, points) VALUES
  (quiz_id, 'MongoDB is:', 'multiple_choice', 1, 1) RETURNING id INTO q_id;
  INSERT INTO quiz_options (question_id, option_text, is_correct, order_index) VALUES
  (q_id, 'Relational DB', false, 1),
  (q_id, 'NoSQL DB', true, 2),
  (q_id, 'File system', false, 3),
  (q_id, 'Cache only', false, 4);

  INSERT INTO quiz_questions (quiz_id, question_text, question_type, order_index, points) VALUES
  (quiz_id, 'JWT is used for:', 'multiple_choice', 2, 1) RETURNING id INTO q_id;
  INSERT INTO quiz_options (question_id, option_text, is_correct, order_index) VALUES
  (q_id, 'Styling', false, 1),
  (q_id, 'Authentication', true, 2),
  (q_id, 'Logging', false, 3),
  (q_id, 'Routing', false, 4);

  INSERT INTO quiz_questions (quiz_id, question_text, question_type, order_index, points) VALUES
  (quiz_id, 'OWASP Top 10 relates to:', 'multiple_choice', 3, 1) RETURNING id INTO q_id;
  INSERT INTO quiz_options (question_id, option_text, is_correct, order_index) VALUES
  (q_id, 'Performance', false, 1),
  (q_id, 'Security risks', true, 2),
  (q_id, 'UI patterns', false, 3),
  (q_id, 'APIs', false, 4);
END IF;

-- Quiz 4 (Module 8)
SELECT id INTO quiz_id FROM module_quizzes mq
JOIN course_modules cm ON mq.module_id = cm.id
JOIN courses c ON cm.course_id = c.id
WHERE c.title = 'Full Stack Web Development' AND cm.order_index = 8;

IF quiz_id IS NOT NULL THEN
  INSERT INTO quiz_questions (quiz_id, question_text, question_type, order_index, points) VALUES
  (quiz_id, 'MERN stack includes MongoDB, Express, React and:', 'multiple_choice', 1, 1) RETURNING id INTO q_id;
  INSERT INTO quiz_options (question_id, option_text, is_correct, order_index) VALUES
  (q_id, 'Node.js', true, 1),
  (q_id, 'Next.js', false, 2),
  (q_id, 'Angular', false, 3),
  (q_id, 'Django', false, 4);

  INSERT INTO quiz_questions (quiz_id, question_text, question_type, order_index, points) VALUES
  (quiz_id, 'CI/CD improves:', 'multiple_choice', 2, 1) RETURNING id INTO q_id;
  INSERT INTO quiz_options (question_id, option_text, is_correct, order_index) VALUES
  (q_id, 'Manual testing', false, 1),
  (q_id, 'Automated deployment', true, 2),
  (q_id, 'UI design', false, 3),
  (q_id, 'DB queries', false, 4);

  INSERT INTO quiz_questions (quiz_id, question_text, question_type, order_index, points) VALUES
  (quiz_id, 'Full stack projects test:', 'multiple_choice', 3, 1) RETURNING id INTO q_id;
  INSERT INTO quiz_options (question_id, option_text, is_correct, order_index) VALUES
  (q_id, 'Theory only', false, 1),
  (q_id, 'End-to-end skills', true, 2),
  (q_id, 'CSS only', false, 3),
  (q_id, 'SQL only', false, 4);
END IF;

-- ============================================
-- PYTHON FOR DATA SCIENCE - 12 Questions (3 per quiz)
-- ============================================

-- Quiz 1 (Module 2)
SELECT id INTO quiz_id FROM module_quizzes mq
JOIN course_modules cm ON mq.module_id = cm.id
JOIN courses c ON cm.course_id = c.id
WHERE c.title = 'Python for Data Science' AND cm.order_index = 2;

IF quiz_id IS NOT NULL THEN
  INSERT INTO quiz_questions (quiz_id, question_text, question_type, order_index, points) VALUES
  (quiz_id, 'Python is popular in data science because it is:', 'multiple_choice', 1, 1) RETURNING id INTO q_id;
  INSERT INTO quiz_options (question_id, option_text, is_correct, order_index) VALUES
  (q_id, 'Low-level', false, 1),
  (q_id, 'Complex', false, 2),
  (q_id, 'Easy & versatile', true, 3),
  (q_id, 'Hardware-based', false, 4);

  INSERT INTO quiz_questions (quiz_id, question_text, question_type, order_index, points) VALUES
  (quiz_id, 'Jupyter Notebook is mainly used for:', 'multiple_choice', 2, 1) RETURNING id INTO q_id;
  INSERT INTO quiz_options (question_id, option_text, is_correct, order_index) VALUES
  (q_id, 'Gaming', false, 1),
  (q_id, 'Interactive coding', true, 2),
  (q_id, 'Deployment', false, 3),
  (q_id, 'Networking', false, 4);

  INSERT INTO quiz_questions (quiz_id, question_text, question_type, order_index, points) VALUES
  (quiz_id, 'Anaconda helps in:', 'multiple_choice', 3, 1) RETURNING id INTO q_id;
  INSERT INTO quiz_options (question_id, option_text, is_correct, order_index) VALUES
  (q_id, 'UI design', false, 1),
  (q_id, 'Package management', true, 2),
  (q_id, 'OS management', false, 3),
  (q_id, 'Security', false, 4);
END IF;

-- Quiz 2 (Module 4)
SELECT id INTO quiz_id FROM module_quizzes mq
JOIN course_modules cm ON mq.module_id = cm.id
JOIN courses c ON cm.course_id = c.id
WHERE c.title = 'Python for Data Science' AND cm.order_index = 4;

IF quiz_id IS NOT NULL THEN
  INSERT INTO quiz_questions (quiz_id, question_text, question_type, order_index, points) VALUES
  (quiz_id, 'Which library is used for arrays?', 'multiple_choice', 1, 1) RETURNING id INTO q_id;
  INSERT INTO quiz_options (question_id, option_text, is_correct, order_index) VALUES
  (q_id, 'Pandas', false, 1),
  (q_id, 'NumPy', true, 2),
  (q_id, 'Matplotlib', false, 3),
  (q_id, 'Seaborn', false, 4);

  INSERT INTO quiz_questions (quiz_id, question_text, question_type, order_index, points) VALUES
  (quiz_id, 'Pandas DataFrame is:', 'multiple_choice', 2, 1) RETURNING id INTO q_id;
  INSERT INTO quiz_options (question_id, option_text, is_correct, order_index) VALUES
  (q_id, '1D', false, 1),
  (q_id, '2D tabular structure', true, 2),
  (q_id, 'Graph', false, 3),
  (q_id, 'Tree', false, 4);

  INSERT INTO quiz_questions (quiz_id, question_text, question_type, order_index, points) VALUES
  (quiz_id, 'Data preprocessing is done to:', 'multiple_choice', 3, 1) RETURNING id INTO q_id;
  INSERT INTO quiz_options (question_id, option_text, is_correct, order_index) VALUES
  (q_id, 'Delete data', false, 1),
  (q_id, 'Clean data', true, 2),
  (q_id, 'Encrypt data', false, 3),
  (q_id, 'Compress data', false, 4);
END IF;

-- Quiz 3 (Module 6)
SELECT id INTO quiz_id FROM module_quizzes mq
JOIN course_modules cm ON mq.module_id = cm.id
JOIN courses c ON cm.course_id = c.id
WHERE c.title = 'Python for Data Science' AND cm.order_index = 6;

IF quiz_id IS NOT NULL THEN
  INSERT INTO quiz_questions (quiz_id, question_text, question_type, order_index, points) VALUES
  (quiz_id, 'Vectorization improves:', 'multiple_choice', 1, 1) RETURNING id INTO q_id;
  INSERT INTO quiz_options (question_id, option_text, is_correct, order_index) VALUES
  (q_id, 'Memory', false, 1),
  (q_id, 'Speed', true, 2),
  (q_id, 'UI', false, 3),
  (q_id, 'Storage', false, 4);

  INSERT INTO quiz_questions (quiz_id, question_text, question_type, order_index, points) VALUES
  (quiz_id, 'Scikit-learn is used for:', 'multiple_choice', 2, 1) RETURNING id INTO q_id;
  INSERT INTO quiz_options (question_id, option_text, is_correct, order_index) VALUES
  (q_id, 'Web apps', false, 1),
  (q_id, 'Machine learning', true, 2),
  (q_id, 'Databases', false, 3),
  (q_id, 'OS tasks', false, 4);

  INSERT INTO quiz_questions (quiz_id, question_text, question_type, order_index, points) VALUES
  (quiz_id, 'Model training requires:', 'multiple_choice', 3, 1) RETURNING id INTO q_id;
  INSERT INTO quiz_options (question_id, option_text, is_correct, order_index) VALUES
  (q_id, 'Raw data only', false, 1),
  (q_id, 'Clean data', true, 2),
  (q_id, 'CSS', false, 3),
  (q_id, 'HTML', false, 4);
END IF;

-- Quiz 4 (Module 8)
SELECT id INTO quiz_id FROM module_quizzes mq
JOIN course_modules cm ON mq.module_id = cm.id
JOIN courses c ON cm.course_id = c.id
WHERE c.title = 'Python for Data Science' AND cm.order_index = 8;

IF quiz_id IS NOT NULL THEN
  INSERT INTO quiz_questions (quiz_id, question_text, question_type, order_index, points) VALUES
  (quiz_id, 'Kaggle is mainly used for:', 'multiple_choice', 1, 1) RETURNING id INTO q_id;
  INSERT INTO quiz_options (question_id, option_text, is_correct, order_index) VALUES
  (q_id, 'Hosting websites', false, 1),
  (q_id, 'Data science practice', true, 2),
  (q_id, 'Cloud computing', false, 3),
  (q_id, 'Networking', false, 4);

  INSERT INTO quiz_questions (quiz_id, question_text, question_type, order_index, points) VALUES
  (quiz_id, 'End-to-end data science includes:', 'multiple_choice', 2, 1) RETURNING id INTO q_id;
  INSERT INTO quiz_options (question_id, option_text, is_correct, order_index) VALUES
  (q_id, 'Only coding', false, 1),
  (q_id, 'Data → model → result', true, 2),
  (q_id, 'Only visualization', false, 3),
  (q_id, 'Only ML', false, 4);

  INSERT INTO quiz_questions (quiz_id, question_text, question_type, order_index, points) VALUES
  (quiz_id, 'Final data science projects focus on:', 'multiple_choice', 3, 1) RETURNING id INTO q_id;
  INSERT INTO quiz_options (question_id, option_text, is_correct, order_index) VALUES
  (q_id, 'Syntax', false, 1),
  (q_id, 'Real-world problems', true, 2),
  (q_id, 'Theory only', false, 3),
  (q_id, 'Exams only', false, 4);
END IF;

RAISE NOTICE 'Successfully added quiz questions for Full Stack and Python courses';

END $$;
