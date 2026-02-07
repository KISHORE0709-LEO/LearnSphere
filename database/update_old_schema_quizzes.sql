-- Add Quiz Questions to OLD Schema (quizzes table)
-- This updates the existing quizzes that are linked to lessons

DO $$
DECLARE
  quiz_id UUID;
  q_id UUID;
BEGIN

-- First, delete all old questions from existing quizzes
DELETE FROM quiz_options WHERE question_id IN (SELECT id FROM quiz_questions);
DELETE FROM quiz_questions;

-- ============================================
-- SQL DATABASE MASTERY
-- ============================================

-- Find the quiz for SQL course
SELECT q.id INTO quiz_id FROM quizzes q
JOIN lessons l ON q.lesson_id = l.id
JOIN courses c ON l.course_id = c.id
WHERE c.title = 'SQL Database Mastery' LIMIT 1;

IF quiz_id IS NOT NULL THEN
  -- Q1
  INSERT INTO quiz_questions (quiz_id, question_text, question_type, order_index, points) VALUES
  (quiz_id, 'What does SQL stand for?', 'multiple_choice', 1, 1) RETURNING id INTO q_id;
  INSERT INTO quiz_options (question_id, option_text, is_correct, order_index) VALUES
  (q_id, 'Structured Query Language', true, 1),
  (q_id, 'Simple Query Language', false, 2),
  (q_id, 'Sequential Query Language', false, 3),
  (q_id, 'Standard Query Logic', false, 4);

  -- Q2
  INSERT INTO quiz_questions (quiz_id, question_text, question_type, order_index, points) VALUES
  (quiz_id, 'Which component executes SQL queries in a DBMS?', 'multiple_choice', 2, 1) RETURNING id INTO q_id;
  INSERT INTO quiz_options (question_id, option_text, is_correct, order_index) VALUES
  (q_id, 'Storage Manager', false, 1),
  (q_id, 'Query Processor', true, 2),
  (q_id, 'Transaction Manager', false, 3),
  (q_id, 'File Manager', false, 4);

  -- Q3
  INSERT INTO quiz_questions (quiz_id, question_text, question_type, order_index, points) VALUES
  (quiz_id, 'Which command is used to view tables in PostgreSQL?', 'multiple_choice', 3, 1) RETURNING id INTO q_id;
  INSERT INTO quiz_options (question_id, option_text, is_correct, order_index) VALUES
  (q_id, 'SHOW TABLES', false, 1),
  (q_id, 'LIST TABLES', false, 2),
  (q_id, '\dt', true, 3),
  (q_id, 'DESCRIBE', false, 4);
END IF;

-- ============================================
-- BASICS OF ODOO CRM
-- ============================================

SELECT q.id INTO quiz_id FROM quizzes q
JOIN lessons l ON q.lesson_id = l.id
JOIN courses c ON l.course_id = c.id
WHERE c.title = 'Basics of Odoo CRM' LIMIT 1;

IF quiz_id IS NOT NULL THEN
  -- Q13
  INSERT INTO quiz_questions (quiz_id, question_text, question_type, order_index, points) VALUES
  (quiz_id, 'Odoo is mainly written in:', 'multiple_choice', 1, 1) RETURNING id INTO q_id;
  INSERT INTO quiz_options (question_id, option_text, is_correct, order_index) VALUES
  (q_id, 'Java', false, 1),
  (q_id, 'C++', false, 2),
  (q_id, 'Python', true, 3),
  (q_id, 'PHP', false, 4);

  -- Q14
  INSERT INTO quiz_questions (quiz_id, question_text, question_type, order_index, points) VALUES
  (quiz_id, 'CRM stands for:', 'multiple_choice', 2, 1) RETURNING id INTO q_id;
  INSERT INTO quiz_options (question_id, option_text, is_correct, order_index) VALUES
  (q_id, 'Customer Resource Management', false, 1),
  (q_id, 'Customer Relationship Management', true, 2),
  (q_id, 'Client Revenue Model', false, 3),
  (q_id, 'Customer Record Manager', false, 4);

  -- Q15
  INSERT INTO quiz_questions (quiz_id, question_text, question_type, order_index, points) VALUES
  (quiz_id, 'Odoo Community Edition is:', 'multiple_choice', 3, 1) RETURNING id INTO q_id;
  INSERT INTO quiz_options (question_id, option_text, is_correct, order_index) VALUES
  (q_id, 'Paid', false, 1),
  (q_id, 'Free & open-source', true, 2),
  (q_id, 'Trial only', false, 3),
  (q_id, 'Cloud-only', false, 4);
END IF;

-- ============================================
-- ADVANCED REACT PATTERNS
-- ============================================

SELECT q.id INTO quiz_id FROM quizzes q
JOIN lessons l ON q.lesson_id = l.id
JOIN courses c ON l.course_id = c.id
WHERE c.title = 'Advanced React Patterns' LIMIT 1;

IF quiz_id IS NOT NULL THEN
  -- Q25
  INSERT INTO quiz_questions (quiz_id, question_text, question_type, order_index, points) VALUES
  (quiz_id, 'React is mainly used for:', 'multiple_choice', 1, 1) RETURNING id INTO q_id;
  INSERT INTO quiz_options (question_id, option_text, is_correct, order_index) VALUES
  (q_id, 'Backend APIs', false, 1),
  (q_id, 'Database management', false, 2),
  (q_id, 'UI development', true, 3),
  (q_id, 'Networking', false, 4);

  -- Q26
  INSERT INTO quiz_questions (quiz_id, question_text, question_type, order_index, points) VALUES
  (quiz_id, 'Virtual DOM improves:', 'multiple_choice', 2, 1) RETURNING id INTO q_id;
  INSERT INTO quiz_options (question_id, option_text, is_correct, order_index) VALUES
  (q_id, 'Security', false, 1),
  (q_id, 'Performance', true, 2),
  (q_id, 'Storage', false, 3),
  (q_id, 'Routing', false, 4);

  -- Q27
  INSERT INTO quiz_questions (quiz_id, question_text, question_type, order_index, points) VALUES
  (quiz_id, 'Vite is mainly used for:', 'multiple_choice', 3, 1) RETURNING id INTO q_id;
  INSERT INTO quiz_options (question_id, option_text, is_correct, order_index) VALUES
  (q_id, 'Database', false, 1),
  (q_id, 'Build tooling', true, 2),
  (q_id, 'Styling', false, 3),
  (q_id, 'Testing', false, 4);
END IF;

RAISE NOTICE 'Successfully updated quiz questions in OLD schema (quizzes table)';
RAISE NOTICE 'Note: Frontend is using MOCK DATA. Questions wont appear until you connect frontend to backend API.';

END $$;
