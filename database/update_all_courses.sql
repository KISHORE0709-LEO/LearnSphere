-- Combined Update Script for All Courses
-- Updates: Advanced React Patterns, Basics of Odoo CRM, SQL Database Mastery
-- Run this script to update all three courses at once

\echo 'Starting combined course update...'
\echo ''

-- Include React course update
\echo 'Updating Advanced React Patterns course...'
\i update_react_course_links.sql
\echo ''

-- Include Odoo course update
\echo 'Updating Basics of Odoo CRM course...'
\i update_odoo_course_links.sql
\echo ''

-- Include SQL course update
\echo 'Updating SQL Database Mastery course...'
\i update_sql_course_links.sql
\echo ''

\echo 'All courses updated successfully!'
\echo 'Total: 3 courses, 24 modules, 144 topics, 9 quizzes'
