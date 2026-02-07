-- Master Update Script - Complete Course Setup
-- Run this script to update all courses with modules, topics, and quiz questions

\echo '=========================================='
\echo 'LearnSphere - Complete Course Update'
\echo '=========================================='
\echo ''

-- Step 1: Update course modules and topics
\echo 'Step 1/3: Updating course modules and topics...'
\echo ''

\echo '  → Updating Advanced React Patterns...'
\i update_react_course_links.sql
\echo ''

\echo '  → Updating Basics of Odoo CRM...'
\i update_odoo_course_links.sql
\echo ''

\echo '  → Updating SQL Database Mastery...'
\i update_sql_course_links.sql
\echo ''

-- Step 2: Add quiz questions (Part 1)
\echo 'Step 2/3: Adding quiz questions (Part 1: SQL, Odoo, React)...'
\i add_quiz_questions_part1.sql
\echo ''

-- Step 3: Add quiz questions (Part 2)
\echo 'Step 3/3: Adding quiz questions (Part 2: Full Stack, Python)...'
\i add_quiz_questions_part2.sql
\echo ''

\echo '=========================================='
\echo 'Update Complete!'
\echo '=========================================='
\echo ''
\echo 'Summary:'
\echo '  • Courses updated: 5'
\echo '  • Modules created: 40 (8 per course)'
\echo '  • Topics created: 240 (48 per course)'
\echo '  • Quizzes: 20 (4 per course)'
\echo '  • Questions: 60 (3 per quiz)'
\echo '  • Options: 240 (4 per question)'
\echo ''
\echo 'Next steps:'
\echo '  1. Verify data with verification queries'
\echo '  2. Test frontend display'
\echo '  3. Test quiz functionality'
\echo ''
