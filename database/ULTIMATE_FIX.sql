-- ULTIMATE FIX: Complete Quiz Setup
-- Run this ONE script to fix everything

\echo '=========================================='
\echo 'ULTIMATE QUIZ FIX'
\echo '=========================================='
\echo ''

-- Step 1: Update course modules with correct links
\echo 'Step 1: Updating course modules...'
\i update_react_course_links.sql
\i update_odoo_course_links.sql
\i update_sql_course_links.sql

\echo ''
\echo 'Step 2: Creating quizzes...'
\i create_all_quizzes.sql

\echo ''
\echo 'Step 3: Verifying...'
\i debug_modules.sql

\echo ''
\echo '=========================================='
\echo 'DONE! Now restart backend: node server.js'
\echo '=========================================='
