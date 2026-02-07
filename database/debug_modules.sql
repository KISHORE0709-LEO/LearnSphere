-- Debug: Show all modules and their quizzes
SELECT 
  c.title as course,
  cm.id as module_id,
  cm.order_index,
  cm.title as module_title,
  mq.id as quiz_id,
  mq.title as quiz_title,
  (SELECT COUNT(*) FROM quiz_questions WHERE quiz_id = mq.id) as question_count
FROM courses c
JOIN course_modules cm ON c.id = cm.course_id
LEFT JOIN module_quizzes mq ON cm.id = mq.module_id
WHERE c.title IN ('SQL Database Mastery', 'Basics of Odoo CRM', 'Advanced React Patterns')
ORDER BY c.title, cm.order_index;
