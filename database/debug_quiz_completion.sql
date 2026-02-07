-- Check if quiz_completions table exists and has data
SELECT EXISTS (
   SELECT FROM information_schema.tables 
   WHERE table_name = 'quiz_completions'
);

-- If it exists, show the data
SELECT * FROM quiz_completions LIMIT 10;

-- Check the modules endpoint query
SELECT 
  cm.id as module_id,
  mq.id as quiz_id,
  qc.id as completion_id,
  qc.user_id,
  qc.completed_at
FROM course_modules cm
LEFT JOIN module_quizzes mq ON cm.id = mq.module_id
LEFT JOIN quiz_completions qc ON mq.id = qc.quiz_id
WHERE cm.course_id = (SELECT id FROM courses LIMIT 1)
ORDER BY cm.order_index;
