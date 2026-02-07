-- Quick Test - Run this to update courses and add quiz questions
-- This will fix YouTube embeds and add all 60 quiz questions

\echo 'Updating courses with fixed YouTube embeds...'
\i update_react_course_links.sql
\i update_odoo_course_links.sql
\i update_sql_course_links.sql

\echo ''
\echo 'Adding quiz questions (60 total)...'
\i add_quiz_questions_part1.sql
\i add_quiz_questions_part2.sql

\echo ''
\echo 'Done! Check if videos work and quizzes show 3 questions each.'
