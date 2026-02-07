-- Cleanup old quiz questions and add new ones
-- Run this if you're still seeing old quiz questions

\echo 'Cleaning up old quiz data...'

-- Delete all existing quiz questions and options
DELETE FROM quiz_options WHERE question_id IN (
  SELECT qq.id FROM quiz_questions qq
  JOIN module_quizzes mq ON qq.quiz_id = mq.id
  JOIN course_modules cm ON mq.module_id = cm.id
  JOIN courses c ON cm.course_id = c.id
  WHERE c.title IN (
    'SQL Database Mastery',
    'Basics of Odoo CRM',
    'Advanced React Patterns',
    'Full Stack Web Development',
    'Python for Data Science'
  )
);

DELETE FROM quiz_questions WHERE quiz_id IN (
  SELECT mq.id FROM module_quizzes mq
  JOIN course_modules cm ON mq.module_id = cm.id
  JOIN courses c ON cm.course_id = c.id
  WHERE c.title IN (
    'SQL Database Mastery',
    'Basics of Odoo CRM',
    'Advanced React Patterns',
    'Full Stack Web Development',
    'Python for Data Science'
  )
);

\echo 'Old quiz data cleaned!'
\echo ''
\echo 'Now run: psql -U postgres -d learnsphere -f quick_fix.sql'
