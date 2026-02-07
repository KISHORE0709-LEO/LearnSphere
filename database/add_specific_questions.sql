-- Delete all questions first
DELETE FROM quiz_options;
DELETE FROM quiz_questions;

-- Add specific questions for each course
DO $$
DECLARE
  quiz_id UUID;
  q_id UUID;
BEGIN

-- SQL Database Mastery - Module 2
SELECT id INTO quiz_id FROM module_quizzes mq
JOIN course_modules cm ON mq.module_id = cm.id
JOIN courses c ON cm.course_id = c.id
WHERE c.title = 'SQL Database Mastery' AND cm.order_index = 2;

IF quiz_id IS NOT NULL THEN
  INSERT INTO quiz_questions (quiz_id, question_text, question_type, order_index, points) VALUES
  (quiz_id, 'What does SQL stand for?', 'multiple_choice', 1, 1) RETURNING id INTO q_id;
  INSERT INTO quiz_options (question_id, option_text, is_correct, order_index) VALUES
  (q_id, 'Structured Query Language', true, 1), (q_id, 'Simple Query Language', false, 2),
  (q_id, 'Sequential Query Language', false, 3), (q_id, 'Standard Query Logic', false, 4);

  INSERT INTO quiz_questions (quiz_id, question_text, question_type, order_index, points) VALUES
  (quiz_id, 'Which component executes SQL queries in a DBMS?', 'multiple_choice', 2, 1) RETURNING id INTO q_id;
  INSERT INTO quiz_options (question_id, option_text, is_correct, order_index) VALUES
  (q_id, 'Storage Manager', false, 1), (q_id, 'Query Processor', true, 2),
  (q_id, 'Transaction Manager', false, 3), (q_id, 'File Manager', false, 4);

  INSERT INTO quiz_questions (quiz_id, question_text, question_type, order_index, points) VALUES
  (quiz_id, 'Which command is used to view tables in PostgreSQL?', 'multiple_choice', 3, 1) RETURNING id INTO q_id;
  INSERT INTO quiz_options (question_id, option_text, is_correct, order_index) VALUES
  (q_id, 'SHOW TABLES', false, 1), (q_id, 'LIST TABLES', false, 2),
  (q_id, '\dt', true, 3), (q_id, 'DESCRIBE', false, 4);
END IF;

-- SQL Database Mastery - Module 6
SELECT id INTO quiz_id FROM module_quizzes mq
JOIN course_modules cm ON mq.module_id = cm.id
JOIN courses c ON cm.course_id = c.id
WHERE c.title = 'SQL Database Mastery' AND cm.order_index = 6;

IF quiz_id IS NOT NULL THEN
  INSERT INTO quiz_questions (quiz_id, question_text, question_type, order_index, points) VALUES
  (quiz_id, 'Which structure improves query performance?', 'multiple_choice', 1, 1) RETURNING id INTO q_id;
  INSERT INTO quiz_options (question_id, option_text, is_correct, order_index) VALUES
  (q_id, 'View', false, 1), (q_id, 'Trigger', false, 2), (q_id, 'Index', true, 3), (q_id, 'Cursor', false, 4);

  INSERT INTO quiz_questions (quiz_id, question_text, question_type, order_index, points) VALUES
  (quiz_id, 'ACID property ensuring durability is:', 'multiple_choice', 2, 1) RETURNING id INTO q_id;
  INSERT INTO quiz_options (question_id, option_text, is_correct, order_index) VALUES
  (q_id, 'Atomicity', false, 1), (q_id, 'Consistency', false, 2), (q_id, 'Isolation', false, 3), (q_id, 'Durability', true, 4);

  INSERT INTO quiz_questions (quiz_id, question_text, question_type, order_index, points) VALUES
  (quiz_id, 'Which keyword starts a transaction?', 'multiple_choice', 3, 1) RETURNING id INTO q_id;
  INSERT INTO quiz_options (question_id, option_text, is_correct, order_index) VALUES
  (q_id, 'BEGIN', true, 1), (q_id, 'START', false, 2), (q_id, 'INIT', false, 3), (q_id, 'OPEN', false, 4);
END IF;

-- SQL Database Mastery - Module 8
SELECT id INTO quiz_id FROM module_quizzes mq
JOIN course_modules cm ON mq.module_id = cm.id
JOIN courses c ON cm.course_id = c.id
WHERE c.title = 'SQL Database Mastery' AND cm.order_index = 8;

IF quiz_id IS NOT NULL THEN
  INSERT INTO quiz_questions (quiz_id, question_text, question_type, order_index, points) VALUES
  (quiz_id, 'ER diagrams represent:', 'multiple_choice', 1, 1) RETURNING id INTO q_id;
  INSERT INTO quiz_options (question_id, option_text, is_correct, order_index) VALUES
  (q_id, 'Queries', false, 1), (q_id, 'Tables only', false, 2), (q_id, 'Entity relationships', true, 3), (q_id, 'Indexes', false, 4);

  INSERT INTO quiz_questions (quiz_id, question_text, question_type, order_index, points) VALUES
  (quiz_id, 'Which SQL is used in data analysis?', 'multiple_choice', 2, 1) RETURNING id INTO q_id;
  INSERT INTO quiz_options (question_id, option_text, is_correct, order_index) VALUES
  (q_id, 'DDL', false, 1), (q_id, 'DCL', false, 2), (q_id, 'DML', true, 3), (q_id, 'TCL', false, 4);

  INSERT INTO quiz_questions (quiz_id, question_text, question_type, order_index, points) VALUES
  (quiz_id, 'Which platform is best for SQL practice?', 'multiple_choice', 3, 1) RETURNING id INTO q_id;
  INSERT INTO quiz_options (question_id, option_text, is_correct, order_index) VALUES
  (q_id, 'HackerEarth', false, 1), (q_id, 'LeetCode Database section', true, 2), (q_id, 'CodeChef', false, 3), (q_id, 'GitHub', false, 4);
END IF;

-- Advanced React Patterns - Module 2
SELECT id INTO quiz_id FROM module_quizzes mq
JOIN course_modules cm ON mq.module_id = cm.id
JOIN courses c ON cm.course_id = c.id
WHERE c.title = 'Advanced React Patterns' AND cm.order_index = 2;

IF quiz_id IS NOT NULL THEN
  INSERT INTO quiz_questions (quiz_id, question_text, question_type, order_index, points) VALUES
  (quiz_id, 'React is mainly used for:', 'multiple_choice', 1, 1) RETURNING id INTO q_id;
  INSERT INTO quiz_options (question_id, option_text, is_correct, order_index) VALUES
  (q_id, 'Backend APIs', false, 1), (q_id, 'Database management', false, 2), (q_id, 'UI development', true, 3), (q_id, 'Networking', false, 4);

  INSERT INTO quiz_questions (quiz_id, question_text, question_type, order_index, points) VALUES
  (quiz_id, 'Virtual DOM improves:', 'multiple_choice', 2, 1) RETURNING id INTO q_id;
  INSERT INTO quiz_options (question_id, option_text, is_correct, order_index) VALUES
  (q_id, 'Security', false, 1), (q_id, 'Performance', true, 2), (q_id, 'Storage', false, 3), (q_id, 'Routing', false, 4);

  INSERT INTO quiz_questions (quiz_id, question_text, question_type, order_index, points) VALUES
  (quiz_id, 'Vite is mainly used for:', 'multiple_choice', 3, 1) RETURNING id INTO q_id;
  INSERT INTO quiz_options (question_id, option_text, is_correct, order_index) VALUES
  (q_id, 'Database', false, 1), (q_id, 'Build tooling', true, 2), (q_id, 'Styling', false, 3), (q_id, 'Testing', false, 4);
END IF;

-- Advanced React Patterns - Module 6
SELECT id INTO quiz_id FROM module_quizzes mq
JOIN course_modules cm ON mq.module_id = cm.id
JOIN courses c ON cm.course_id = c.id
WHERE c.title = 'Advanced React Patterns' AND cm.order_index = 6;

IF quiz_id IS NOT NULL THEN
  INSERT INTO quiz_questions (quiz_id, question_text, question_type, order_index, points) VALUES
  (quiz_id, 'useMemo is used to:', 'multiple_choice', 1, 1) RETURNING id INTO q_id;
  INSERT INTO quiz_options (question_id, option_text, is_correct, order_index) VALUES
  (q_id, 'Fetch data', false, 1), (q_id, 'Avoid unnecessary recalculations', true, 2), (q_id, 'Handle routing', false, 3), (q_id, 'Manage CSS', false, 4);

  INSERT INTO quiz_questions (quiz_id, question_text, question_type, order_index, points) VALUES
  (quiz_id, 'Context API solves:', 'multiple_choice', 2, 1) RETURNING id INTO q_id;
  INSERT INTO quiz_options (question_id, option_text, is_correct, order_index) VALUES
  (q_id, 'Performance issues', false, 1), (q_id, 'Prop drilling', true, 2), (q_id, 'API calls', false, 3), (q_id, 'Styling', false, 4);

  INSERT INTO quiz_questions (quiz_id, question_text, question_type, order_index, points) VALUES
  (quiz_id, 'useCallback optimizes:', 'multiple_choice', 3, 1) RETURNING id INTO q_id;
  INSERT INTO quiz_options (question_id, option_text, is_correct, order_index) VALUES
  (q_id, 'State', false, 1), (q_id, 'Functions', true, 2), (q_id, 'CSS', false, 3), (q_id, 'JSX', false, 4);
END IF;

-- Advanced React Patterns - Module 8
SELECT id INTO quiz_id FROM module_quizzes mq
JOIN course_modules cm ON mq.module_id = cm.id
JOIN courses c ON cm.course_id = c.id
WHERE c.title = 'Advanced React Patterns' AND cm.order_index = 8;

IF quiz_id IS NOT NULL THEN
  INSERT INTO quiz_questions (quiz_id, question_text, question_type, order_index, points) VALUES
  (quiz_id, 'Feature-based architecture improves:', 'multiple_choice', 1, 1) RETURNING id INTO q_id;
  INSERT INTO quiz_options (question_id, option_text, is_correct, order_index) VALUES
  (q_id, 'Styling', false, 1), (q_id, 'Scalability', true, 2), (q_id, 'API speed', false, 3), (q_id, 'Security', false, 4);

  INSERT INTO quiz_questions (quiz_id, question_text, question_type, order_index, points) VALUES
  (quiz_id, 'Production React apps focus on:', 'multiple_choice', 2, 1) RETURNING id INTO q_id;
  INSERT INTO quiz_options (question_id, option_text, is_correct, order_index) VALUES
  (q_id, 'Components only', false, 1), (q_id, 'Patterns & structure', true, 2), (q_id, 'HTML only', false, 3), (q_id, 'CSS only', false, 4);

  INSERT INTO quiz_questions (quiz_id, question_text, question_type, order_index, points) VALUES
  (quiz_id, 'Advanced React patterns are mainly tested in:', 'multiple_choice', 3, 1) RETURNING id INTO q_id;
  INSERT INTO quiz_options (question_id, option_text, is_correct, order_index) VALUES
  (q_id, 'CSS interviews', false, 1), (q_id, 'Frontend interviews', true, 2), (q_id, 'DB interviews', false, 3), (q_id, 'OS exams', false, 4);
END IF;

-- Fill remaining quizzes with generic questions
INSERT INTO quiz_questions (quiz_id, question_text, question_type, order_index, points)
SELECT id, 'What is covered in this module?', 'multiple_choice', 1, 1
FROM module_quizzes WHERE id NOT IN (SELECT DISTINCT quiz_id FROM quiz_questions);

INSERT INTO quiz_options (question_id, option_text, is_correct, order_index)
SELECT id, 'Core concepts', true, 1 FROM quiz_questions WHERE question_text = 'What is covered in this module?'
UNION ALL
SELECT id, 'Nothing', false, 2 FROM quiz_questions WHERE question_text = 'What is covered in this module?'
UNION ALL
SELECT id, 'Advanced only', false, 3 FROM quiz_questions WHERE question_text = 'What is covered in this module?'
UNION ALL
SELECT id, 'Theory only', false, 4 FROM quiz_questions WHERE question_text = 'What is covered in this module?';

RAISE NOTICE 'All specific questions added!';
END $$;
