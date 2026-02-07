-- Check user points
SELECT id, name, email, total_points, badge_level FROM users;

-- Check quiz completions
SELECT qc.*, u.name as user_name, mq.title as quiz_title 
FROM quiz_completions qc
JOIN users u ON qc.user_id = u.id
JOIN module_quizzes mq ON qc.quiz_id = mq.id
ORDER BY qc.completed_at DESC;
