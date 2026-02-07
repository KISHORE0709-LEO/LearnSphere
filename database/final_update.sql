-- Final Update: Fix YouTube URLs and Add Quiz Questions
-- Run this script to complete the setup

\echo 'Step 1: Updating YouTube URLs to embed format...'
\i update_react_course_links.sql
\i update_odoo_course_links.sql
\i update_sql_course_links.sql

\echo ''
\echo 'Step 2: Adding quiz questions (60 total)...'
\i add_quiz_questions_part1.sql
\i add_quiz_questions_part2.sql

\echo ''
\echo 'Done! Restart your backend server and refresh frontend.'
