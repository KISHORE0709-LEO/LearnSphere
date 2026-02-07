-- Check if quizzes exist in database
SELECT 
  c.title as course,
  cm.order_index as module_num,
  cm.title as module_title,
  mq.id as quiz_id,
  mq.title as quiz_title,
  COUNT(qq.id) as question_count
FROM courses c
JOIN course_modules cm ON c.id = cm.course_id
LEFT JOIN module_quizzes mq ON cm.id = mq.module_id
LEFT JOIN quiz_questions qq ON mq.id = qq.quiz_id
WHERE c.title IN ('SQL Database Mastery', 'Basics of Odoo CRM', 'Advanced React Patterns')
GROUP BY c.title, cm.order_index, cm.title, mq.id, mq.title
ORDER BY c.title, cm.order_index;
