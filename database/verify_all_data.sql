-- Verification Script - Check All Course Data
-- Run this after master_update_all.sql to verify everything is correct

\echo '=========================================='
\echo 'LearnSphere - Data Verification'
\echo '=========================================='
\echo ''

\echo '1. Course Modules Summary'
\echo '-------------------------------------------'
SELECT 
  c.title as "Course",
  COUNT(DISTINCT cm.id) as "Modules",
  COUNT(DISTINCT mt.id) as "Topics",
  COUNT(DISTINCT mq.id) as "Quizzes"
FROM courses c
LEFT JOIN course_modules cm ON c.id = cm.course_id
LEFT JOIN module_topics mt ON cm.id = mt.module_id
LEFT JOIN module_quizzes mq ON cm.id = mq.module_id
WHERE c.title IN (
  'SQL Database Mastery',
  'Basics of Odoo CRM',
  'Advanced React Patterns',
  'Full Stack Web Development',
  'Python for Data Science'
)
GROUP BY c.title
ORDER BY c.title;

\echo ''
\echo '2. Quiz Questions Summary'
\echo '-------------------------------------------'
SELECT 
  c.title as "Course",
  COUNT(DISTINCT qq.id) as "Questions",
  COUNT(DISTINCT qo.id) as "Options",
  COUNT(DISTINCT CASE WHEN qo.is_correct THEN qo.id END) as "Correct Answers"
FROM courses c
JOIN course_modules cm ON c.id = cm.course_id
JOIN module_quizzes mq ON cm.id = mq.module_id
LEFT JOIN quiz_questions qq ON mq.id = qq.quiz_id
LEFT JOIN quiz_options qo ON qq.id = qo.question_id
WHERE c.title IN (
  'SQL Database Mastery',
  'Basics of Odoo CRM',
  'Advanced React Patterns',
  'Full Stack Web Development',
  'Python for Data Science'
)
GROUP BY c.title
ORDER BY c.title;

\echo ''
\echo '3. Quiz Distribution by Module'
\echo '-------------------------------------------'
SELECT 
  c.title as "Course",
  cm.order_index as "Module",
  mq.title as "Quiz",
  COUNT(qq.id) as "Questions"
FROM courses c
JOIN course_modules cm ON c.id = cm.course_id
JOIN module_quizzes mq ON cm.id = mq.module_id
LEFT JOIN quiz_questions qq ON mq.id = qq.quiz_id
WHERE c.title IN (
  'SQL Database Mastery',
  'Basics of Odoo CRM',
  'Advanced React Patterns',
  'Full Stack Web Development',
  'Python for Data Science'
)
GROUP BY c.title, cm.order_index, mq.title
ORDER BY c.title, cm.order_index;

\echo ''
\echo '4. Content Type Distribution'
\echo '-------------------------------------------'
SELECT 
  c.title as "Course",
  mt.content_type as "Type",
  COUNT(*) as "Count"
FROM courses c
JOIN course_modules cm ON c.id = cm.course_id
JOIN module_topics mt ON cm.id = mt.module_id
WHERE c.title IN (
  'SQL Database Mastery',
  'Basics of Odoo CRM',
  'Advanced React Patterns',
  'Full Stack Web Development',
  'Python for Data Science'
)
GROUP BY c.title, mt.content_type
ORDER BY c.title, mt.content_type;

\echo ''
\echo '5. Questions Without Correct Answers (Should be 0)'
\echo '-------------------------------------------'
SELECT 
  c.title as "Course",
  qq.question_text as "Question"
FROM courses c
JOIN course_modules cm ON c.id = cm.course_id
JOIN module_quizzes mq ON cm.id = mq.module_id
JOIN quiz_questions qq ON mq.id = qq.quiz_id
WHERE c.title IN (
  'SQL Database Mastery',
  'Basics of Odoo CRM',
  'Advanced React Patterns',
  'Full Stack Web Development',
  'Python for Data Science'
)
AND NOT EXISTS (
  SELECT 1 FROM quiz_options qo 
  WHERE qo.question_id = qq.id AND qo.is_correct = true
);

\echo ''
\echo '=========================================='
\echo 'Expected Results:'
\echo '=========================================='
\echo 'Each course should have:'
\echo '  • 8 Modules'
\echo '  • 48 Topics (16 videos, 16 images, 16 documents)'
\echo '  • 4 Quizzes (modules 2, 4, 6, 8)'
\echo '  • 12 Questions (3 per quiz)'
\echo '  • 48 Options (4 per question)'
\echo '  • 12 Correct Answers (1 per question)'
\echo '  • 0 Questions without correct answers'
\echo ''
