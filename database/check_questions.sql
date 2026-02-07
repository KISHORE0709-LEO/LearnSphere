-- Check if questions exist for quizzes
SELECT 
  mq.id as quiz_id,
  mq.title as quiz_title,
  COUNT(qq.id) as question_count
FROM module_quizzes mq
LEFT JOIN quiz_questions qq ON qq.quiz_id = mq.id
GROUP BY mq.id, mq.title
ORDER BY mq.title;
