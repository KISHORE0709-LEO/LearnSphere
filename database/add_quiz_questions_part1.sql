-- Add Quiz Questions and Options for All Courses
-- This script adds questions and options to existing module_quizzes

DO $$
DECLARE
  quiz_id UUID;
  q_id UUID;
BEGIN

-- ============================================
-- SQL DATABASE MASTERY - 12 Questions (3 per quiz)
-- ============================================

-- Quiz 1 (Module 2)
SELECT mq.id INTO quiz_id FROM module_quizzes mq
JOIN course_modules cm ON mq.module_id = cm.id
JOIN courses c ON cm.course_id = c.id
WHERE c.title = 'SQL Database Mastery' AND cm.order_index = 2;

INSERT INTO quiz_questions (quiz_id, question_text, question_type, order_index, points) VALUES
(quiz_id, 'What does SQL stand for?', 'multiple_choice', 1, 1) RETURNING id INTO q_id;
INSERT INTO quiz_options (question_id, option_text, is_correct, order_index) VALUES
(q_id, 'Structured Query Language', true, 1),
(q_id, 'Simple Query Language', false, 2),
(q_id, 'Sequential Query Language', false, 3),
(q_id, 'Standard Query Logic', false, 4);

INSERT INTO quiz_questions (quiz_id, question_text, question_type, order_index, points) VALUES
(quiz_id, 'Which component executes SQL queries in a DBMS?', 'multiple_choice', 2, 1) RETURNING id INTO q_id;
INSERT INTO quiz_options (question_id, option_text, is_correct, order_index) VALUES
(q_id, 'Storage Manager', false, 1),
(q_id, 'Query Processor', true, 2),
(q_id, 'Transaction Manager', false, 3),
(q_id, 'File Manager', false, 4);

INSERT INTO quiz_questions (quiz_id, question_text, question_type, order_index, points) VALUES
(quiz_id, 'Which command is used to view tables in PostgreSQL?', 'multiple_choice', 3, 1) RETURNING id INTO q_id;
INSERT INTO quiz_options (question_id, option_text, is_correct, order_index) VALUES
(q_id, 'SHOW TABLES', false, 1),
(q_id, 'LIST TABLES', false, 2),
(q_id, '\dt', true, 3),
(q_id, 'DESCRIBE', false, 4);

-- Quiz 2 (Module 4)
SELECT id INTO quiz_id FROM module_quizzes mq
JOIN course_modules cm ON mq.module_id = cm.id
JOIN courses c ON cm.course_id = c.id
WHERE c.title = 'SQL Database Mastery' AND cm.order_index = 4;

INSERT INTO quiz_questions (quiz_id, question_text, question_type, order_index, points) VALUES
(quiz_id, 'Which clause filters rows in SQL?', 'multiple_choice', 1, 1) RETURNING id INTO q_id;
INSERT INTO quiz_options (question_id, option_text, is_correct, order_index) VALUES
(q_id, 'SELECT', false, 1),
(q_id, 'WHERE', true, 2),
(q_id, 'GROUP BY', false, 3),
(q_id, 'ORDER BY', false, 4);

INSERT INTO quiz_questions (quiz_id, question_text, question_type, order_index, points) VALUES
(quiz_id, 'Which JOIN returns only matching rows?', 'multiple_choice', 2, 1) RETURNING id INTO q_id;
INSERT INTO quiz_options (question_id, option_text, is_correct, order_index) VALUES
(q_id, 'LEFT JOIN', false, 1),
(q_id, 'RIGHT JOIN', false, 2),
(q_id, 'FULL JOIN', false, 3),
(q_id, 'INNER JOIN', true, 4);

INSERT INTO quiz_questions (quiz_id, question_text, question_type, order_index, points) VALUES
(quiz_id, 'Which function counts rows?', 'multiple_choice', 3, 1) RETURNING id INTO q_id;
INSERT INTO quiz_options (question_id, option_text, is_correct, order_index) VALUES
(q_id, 'SUM()', false, 1),
(q_id, 'COUNT()', true, 2),
(q_id, 'AVG()', false, 3),
(q_id, 'MAX()', false, 4);

-- Quiz 3 (Module 6)
SELECT id INTO quiz_id FROM module_quizzes mq
JOIN course_modules cm ON mq.module_id = cm.id
JOIN courses c ON cm.course_id = c.id
WHERE c.title = 'SQL Database Mastery' AND cm.order_index = 6;

INSERT INTO quiz_questions (quiz_id, question_text, question_type, order_index, points) VALUES
(quiz_id, 'Which structure improves query performance?', 'multiple_choice', 1, 1) RETURNING id INTO q_id;
INSERT INTO quiz_options (question_id, option_text, is_correct, order_index) VALUES
(q_id, 'View', false, 1),
(q_id, 'Trigger', false, 2),
(q_id, 'Index', true, 3),
(q_id, 'Cursor', false, 4);

INSERT INTO quiz_questions (quiz_id, question_text, question_type, order_index, points) VALUES
(quiz_id, 'ACID property ensuring durability is:', 'multiple_choice', 2, 1) RETURNING id INTO q_id;
INSERT INTO quiz_options (question_id, option_text, is_correct, order_index) VALUES
(q_id, 'Atomicity', false, 1),
(q_id, 'Consistency', false, 2),
(q_id, 'Isolation', false, 3),
(q_id, 'Durability', true, 4);

INSERT INTO quiz_questions (quiz_id, question_text, question_type, order_index, points) VALUES
(quiz_id, 'Which keyword starts a transaction?', 'multiple_choice', 3, 1) RETURNING id INTO q_id;
INSERT INTO quiz_options (question_id, option_text, is_correct, order_index) VALUES
(q_id, 'BEGIN', true, 1),
(q_id, 'START', false, 2),
(q_id, 'INIT', false, 3),
(q_id, 'OPEN', false, 4);

-- Quiz 4 (Module 8)
SELECT id INTO quiz_id FROM module_quizzes mq
JOIN course_modules cm ON mq.module_id = cm.id
JOIN courses c ON cm.course_id = c.id
WHERE c.title = 'SQL Database Mastery' AND cm.order_index = 8;

INSERT INTO quiz_questions (quiz_id, question_text, question_type, order_index, points) VALUES
(quiz_id, 'ER diagrams represent:', 'multiple_choice', 1, 1) RETURNING id INTO q_id;
INSERT INTO quiz_options (question_id, option_text, is_correct, order_index) VALUES
(q_id, 'Queries', false, 1),
(q_id, 'Tables only', false, 2),
(q_id, 'Entity relationships', true, 3),
(q_id, 'Indexes', false, 4);

INSERT INTO quiz_questions (quiz_id, question_text, question_type, order_index, points) VALUES
(quiz_id, 'Which SQL is used in data analysis?', 'multiple_choice', 2, 1) RETURNING id INTO q_id;
INSERT INTO quiz_options (question_id, option_text, is_correct, order_index) VALUES
(q_id, 'DDL', false, 1),
(q_id, 'DCL', false, 2),
(q_id, 'DML', true, 3),
(q_id, 'TCL', false, 4);

INSERT INTO quiz_questions (quiz_id, question_text, question_type, order_index, points) VALUES
(quiz_id, 'Which platform is best for SQL practice?', 'multiple_choice', 3, 1) RETURNING id INTO q_id;
INSERT INTO quiz_options (question_id, option_text, is_correct, order_index) VALUES
(q_id, 'HackerEarth', false, 1),
(q_id, 'LeetCode Database section', true, 2),
(q_id, 'CodeChef', false, 3),
(q_id, 'GitHub', false, 4);

-- ============================================
-- BASICS OF ODOO CRM - 12 Questions (3 per quiz)
-- ============================================

-- Quiz 1 (Module 2)
SELECT id INTO quiz_id FROM module_quizzes mq
JOIN course_modules cm ON mq.module_id = cm.id
JOIN courses c ON cm.course_id = c.id
WHERE c.title = 'Basics of Odoo CRM' AND cm.order_index = 2;

INSERT INTO quiz_questions (quiz_id, question_text, question_type, order_index, points) VALUES
(quiz_id, 'Odoo is mainly written in:', 'multiple_choice', 1, 1) RETURNING id INTO q_id;
INSERT INTO quiz_options (question_id, option_text, is_correct, order_index) VALUES
(q_id, 'Java', false, 1),
(q_id, 'C++', false, 2),
(q_id, 'Python', true, 3),
(q_id, 'PHP', false, 4);

INSERT INTO quiz_questions (quiz_id, question_text, question_type, order_index, points) VALUES
(quiz_id, 'CRM stands for:', 'multiple_choice', 2, 1) RETURNING id INTO q_id;
INSERT INTO quiz_options (question_id, option_text, is_correct, order_index) VALUES
(q_id, 'Customer Resource Management', false, 1),
(q_id, 'Customer Relationship Management', true, 2),
(q_id, 'Client Revenue Model', false, 3),
(q_id, 'Customer Record Manager', false, 4);

INSERT INTO quiz_questions (quiz_id, question_text, question_type, order_index, points) VALUES
(quiz_id, 'Odoo Community Edition is:', 'multiple_choice', 3, 1) RETURNING id INTO q_id;
INSERT INTO quiz_options (question_id, option_text, is_correct, order_index) VALUES
(q_id, 'Paid', false, 1),
(q_id, 'Free & open-source', true, 2),
(q_id, 'Trial only', false, 3),
(q_id, 'Cloud-only', false, 4);

-- Quiz 2 (Module 4)
SELECT id INTO quiz_id FROM module_quizzes mq
JOIN course_modules cm ON mq.module_id = cm.id
JOIN courses c ON cm.course_id = c.id
WHERE c.title = 'Basics of Odoo CRM' AND cm.order_index = 4;

INSERT INTO quiz_questions (quiz_id, question_text, question_type, order_index, points) VALUES
(quiz_id, 'In Odoo CRM, leads are converted into:', 'multiple_choice', 1, 1) RETURNING id INTO q_id;
INSERT INTO quiz_options (question_id, option_text, is_correct, order_index) VALUES
(q_id, 'Contacts', false, 1),
(q_id, 'Orders', false, 2),
(q_id, 'Opportunities', true, 3),
(q_id, 'Invoices', false, 4);

INSERT INTO quiz_questions (quiz_id, question_text, question_type, order_index, points) VALUES
(quiz_id, 'CRM pipeline mainly represents:', 'multiple_choice', 2, 1) RETURNING id INTO q_id;
INSERT INTO quiz_options (question_id, option_text, is_correct, order_index) VALUES
(q_id, 'Database flow', false, 1),
(q_id, 'Sales stages', true, 2),
(q_id, 'User roles', false, 3),
(q_id, 'Inventory', false, 4);

INSERT INTO quiz_questions (quiz_id, question_text, question_type, order_index, points) VALUES
(quiz_id, 'Activities in Odoo CRM are used for:', 'multiple_choice', 3, 1) RETURNING id INTO q_id;
INSERT INTO quiz_options (question_id, option_text, is_correct, order_index) VALUES
(q_id, 'Coding', false, 1),
(q_id, 'Scheduling follow-ups', true, 2),
(q_id, 'Reporting', false, 3),
(q_id, 'Accounting', false, 4);

-- Quiz 3 (Module 6)
SELECT id INTO quiz_id FROM module_quizzes mq
JOIN course_modules cm ON mq.module_id = cm.id
JOIN courses c ON cm.course_id = c.id
WHERE c.title = 'Basics of Odoo CRM' AND cm.order_index = 6;

INSERT INTO quiz_questions (quiz_id, question_text, question_type, order_index, points) VALUES
(quiz_id, 'Which feature helps predict revenue?', 'multiple_choice', 1, 1) RETURNING id INTO q_id;
INSERT INTO quiz_options (question_id, option_text, is_correct, order_index) VALUES
(q_id, 'Leads', false, 1),
(q_id, 'Forecasting', true, 2),
(q_id, 'Activities', false, 3),
(q_id, 'Contacts', false, 4);

INSERT INTO quiz_questions (quiz_id, question_text, question_type, order_index, points) VALUES
(quiz_id, 'Odoo CRM integrates directly with:', 'multiple_choice', 2, 1) RETURNING id INTO q_id;
INSERT INTO quiz_options (question_id, option_text, is_correct, order_index) VALUES
(q_id, 'HR only', false, 1),
(q_id, 'Inventory only', false, 2),
(q_id, 'Sales module', true, 3),
(q_id, 'Manufacturing', false, 4);

INSERT INTO quiz_questions (quiz_id, question_text, question_type, order_index, points) VALUES
(quiz_id, 'Automated actions in CRM are used to:', 'multiple_choice', 3, 1) RETURNING id INTO q_id;
INSERT INTO quiz_options (question_id, option_text, is_correct, order_index) VALUES
(q_id, 'Create users', false, 1),
(q_id, 'Auto-trigger tasks', true, 2),
(q_id, 'Backup data', false, 3),
(q_id, 'Install modules', false, 4);

-- Quiz 4 (Module 8)
SELECT id INTO quiz_id FROM module_quizzes mq
JOIN course_modules cm ON mq.module_id = cm.id
JOIN courses c ON cm.course_id = c.id
WHERE c.title = 'Basics of Odoo CRM' AND cm.order_index = 8;

INSERT INTO quiz_questions (quiz_id, question_text, question_type, order_index, points) VALUES
(quiz_id, 'CRM mainly helps improve:', 'multiple_choice', 1, 1) RETURNING id INTO q_id;
INSERT INTO quiz_options (question_id, option_text, is_correct, order_index) VALUES
(q_id, 'Code quality', false, 1),
(q_id, 'Customer relationships', true, 2),
(q_id, 'System security', false, 3),
(q_id, 'Network speed', false, 4);

INSERT INTO quiz_questions (quiz_id, question_text, question_type, order_index, points) VALUES
(quiz_id, 'Real-world CRM implementation focuses on:', 'multiple_choice', 2, 1) RETURNING id INTO q_id;
INSERT INTO quiz_options (question_id, option_text, is_correct, order_index) VALUES
(q_id, 'UI only', false, 1),
(q_id, 'Sales & customers', true, 2),
(q_id, 'Accounting only', false, 3),
(q_id, 'Payroll', false, 4);

INSERT INTO quiz_questions (quiz_id, question_text, question_type, order_index, points) VALUES
(quiz_id, 'Odoo CRM projects usually involve:', 'multiple_choice', 3, 1) RETURNING id INTO q_id;
INSERT INTO quiz_options (question_id, option_text, is_correct, order_index) VALUES
(q_id, 'Frontend only', false, 1),
(q_id, 'Backend only', false, 2),
(q_id, 'Business workflows', true, 3),
(q_id, 'AI training', false, 4);

-- ============================================
-- ADVANCED REACT PATTERNS - 12 Questions (3 per quiz)
-- ============================================

-- Quiz 1 (Module 2)
SELECT id INTO quiz_id FROM module_quizzes mq
JOIN course_modules cm ON mq.module_id = cm.id
JOIN courses c ON cm.course_id = c.id
WHERE c.title = 'Advanced React Patterns' AND cm.order_index = 2;

INSERT INTO quiz_questions (quiz_id, question_text, question_type, order_index, points) VALUES
(quiz_id, 'React is mainly used for:', 'multiple_choice', 1, 1) RETURNING id INTO q_id;
INSERT INTO quiz_options (question_id, option_text, is_correct, order_index) VALUES
(q_id, 'Backend APIs', false, 1),
(q_id, 'Database management', false, 2),
(q_id, 'UI development', true, 3),
(q_id, 'Networking', false, 4);

INSERT INTO quiz_questions (quiz_id, question_text, question_type, order_index, points) VALUES
(quiz_id, 'Virtual DOM improves:', 'multiple_choice', 2, 1) RETURNING id INTO q_id;
INSERT INTO quiz_options (question_id, option_text, is_correct, order_index) VALUES
(q_id, 'Security', false, 1),
(q_id, 'Performance', true, 2),
(q_id, 'Storage', false, 3),
(q_id, 'Routing', false, 4);

INSERT INTO quiz_questions (quiz_id, question_text, question_type, order_index, points) VALUES
(quiz_id, 'Vite is mainly used for:', 'multiple_choice', 3, 1) RETURNING id INTO q_id;
INSERT INTO quiz_options (question_id, option_text, is_correct, order_index) VALUES
(q_id, 'Database', false, 1),
(q_id, 'Build tooling', true, 2),
(q_id, 'Styling', false, 3),
(q_id, 'Testing', false, 4);

-- Quiz 2 (Module 4)
SELECT id INTO quiz_id FROM module_quizzes mq
JOIN course_modules cm ON mq.module_id = cm.id
JOIN courses c ON cm.course_id = c.id
WHERE c.title = 'Advanced React Patterns' AND cm.order_index = 4;

INSERT INTO quiz_questions (quiz_id, question_text, question_type, order_index, points) VALUES
(quiz_id, 'Compound components are used to:', 'multiple_choice', 1, 1) RETURNING id INTO q_id;
INSERT INTO quiz_options (question_id, option_text, is_correct, order_index) VALUES
(q_id, 'Reduce bundle size', false, 1),
(q_id, 'Share state implicitly', true, 2),
(q_id, 'Replace Redux', false, 3),
(q_id, 'Handle APIs', false, 4);

INSERT INTO quiz_questions (quiz_id, question_text, question_type, order_index, points) VALUES
(quiz_id, 'Render Props pattern uses:', 'multiple_choice', 2, 1) RETURNING id INTO q_id;
INSERT INTO quiz_options (question_id, option_text, is_correct, order_index) VALUES
(q_id, 'CSS', false, 1),
(q_id, 'Functions as children', true, 2),
(q_id, 'Classes only', false, 3),
(q_id, 'JSON', false, 4);

INSERT INTO quiz_questions (quiz_id, question_text, question_type, order_index, points) VALUES
(quiz_id, 'HOC stands for:', 'multiple_choice', 3, 1) RETURNING id INTO q_id;
INSERT INTO quiz_options (question_id, option_text, is_correct, order_index) VALUES
(q_id, 'High Order Component', true, 1),
(q_id, 'Heavy Object Component', false, 2),
(q_id, 'Hooked Object Component', false, 3),
(q_id, 'Hybrid Output Component', false, 4);

-- Quiz 3 (Module 6)
SELECT id INTO quiz_id FROM module_quizzes mq
JOIN course_modules cm ON mq.module_id = cm.id
JOIN courses c ON cm.course_id = c.id
WHERE c.title = 'Advanced React Patterns' AND cm.order_index = 6;

INSERT INTO quiz_questions (quiz_id, question_text, question_type, order_index, points) VALUES
(quiz_id, 'useMemo is used to:', 'multiple_choice', 1, 1) RETURNING id INTO q_id;
INSERT INTO quiz_options (question_id, option_text, is_correct, order_index) VALUES
(q_id, 'Fetch data', false, 1),
(q_id, 'Avoid unnecessary recalculations', true, 2),
(q_id, 'Handle routing', false, 3),
(q_id, 'Manage CSS', false, 4);

INSERT INTO quiz_questions (quiz_id, question_text, question_type, order_index, points) VALUES
(quiz_id, 'Context API solves:', 'multiple_choice', 2, 1) RETURNING id INTO q_id;
INSERT INTO quiz_options (question_id, option_text, is_correct, order_index) VALUES
(q_id, 'Performance issues', false, 1),
(q_id, 'Prop drilling', true, 2),
(q_id, 'API calls', false, 3),
(q_id, 'Styling', false, 4);

INSERT INTO quiz_questions (quiz_id, question_text, question_type, order_index, points) VALUES
(quiz_id, 'useCallback optimizes:', 'multiple_choice', 3, 1) RETURNING id INTO q_id;
INSERT INTO quiz_options (question_id, option_text, is_correct, order_index) VALUES
(q_id, 'State', false, 1),
(q_id, 'Functions', true, 2),
(q_id, 'CSS', false, 3),
(q_id, 'JSX', false, 4);

-- Quiz 4 (Module 8)
SELECT id INTO quiz_id FROM module_quizzes mq
JOIN course_modules cm ON mq.module_id = cm.id
JOIN courses c ON cm.course_id = c.id
WHERE c.title = 'Advanced React Patterns' AND cm.order_index = 8;

INSERT INTO quiz_questions (quiz_id, question_text, question_type, order_index, points) VALUES
(quiz_id, 'Feature-based architecture improves:', 'multiple_choice', 1, 1) RETURNING id INTO q_id;
INSERT INTO quiz_options (question_id, option_text, is_correct, order_index) VALUES
(q_id, 'Styling', false, 1),
(q_id, 'Scalability', true, 2),
(q_id, 'API speed', false, 3),
(q_id, 'Security', false, 4);

INSERT INTO quiz_questions (quiz_id, question_text, question_type, order_index, points) VALUES
(quiz_id, 'Production React apps focus on:', 'multiple_choice', 2, 1) RETURNING id INTO q_id;
INSERT INTO quiz_options (question_id, option_text, is_correct, order_index) VALUES
(q_id, 'Components only', false, 1),
(q_id, 'Patterns & structure', true, 2),
(q_id, 'HTML only', false, 3),
(q_id, 'CSS only', false, 4);

INSERT INTO quiz_questions (quiz_id, question_text, question_type, order_index, points) VALUES
(quiz_id, 'Advanced React patterns are mainly tested in:', 'multiple_choice', 3, 1) RETURNING id INTO q_id;
INSERT INTO quiz_options (question_id, option_text, is_correct, order_index) VALUES
(q_id, 'CSS interviews', false, 1),
(q_id, 'Frontend interviews', true, 2),
(q_id, 'DB interviews', false, 3),
(q_id, 'OS exams', false, 4);

RAISE NOTICE 'Successfully added quiz questions for SQL, Odoo CRM, and React courses';

END $$;
