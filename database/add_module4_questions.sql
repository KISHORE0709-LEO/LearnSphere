-- Add remaining specific questions for Module 4 quizzes
DO $$
DECLARE
  quiz_id UUID;
  q_id UUID;
BEGIN

-- SQL Module 4
SELECT mq.id INTO quiz_id FROM module_quizzes mq JOIN course_modules cm ON mq.module_id = cm.id JOIN courses c ON cm.course_id = c.id WHERE c.title = 'SQL Database Mastery' AND cm.order_index = 4;
IF quiz_id IS NOT NULL THEN
  DELETE FROM quiz_questions WHERE quiz_id = quiz_id;
  INSERT INTO quiz_questions (quiz_id, question_text, question_type, order_index, points) VALUES (quiz_id, 'Which clause filters rows in SQL?', 'multiple_choice', 1, 1) RETURNING id INTO q_id;
  INSERT INTO quiz_options (question_id, option_text, is_correct, order_index) VALUES (q_id, 'SELECT', false, 1), (q_id, 'WHERE', true, 2), (q_id, 'GROUP BY', false, 3), (q_id, 'ORDER BY', false, 4);
  INSERT INTO quiz_questions (quiz_id, question_text, question_type, order_index, points) VALUES (quiz_id, 'Which JOIN returns only matching rows?', 'multiple_choice', 2, 1) RETURNING id INTO q_id;
  INSERT INTO quiz_options (question_id, option_text, is_correct, order_index) VALUES (q_id, 'LEFT JOIN', false, 1), (q_id, 'RIGHT JOIN', false, 2), (q_id, 'FULL JOIN', false, 3), (q_id, 'INNER JOIN', true, 4);
  INSERT INTO quiz_questions (quiz_id, question_text, question_type, order_index, points) VALUES (quiz_id, 'Which function counts rows?', 'multiple_choice', 3, 1) RETURNING id INTO q_id;
  INSERT INTO quiz_options (question_id, option_text, is_correct, order_index) VALUES (q_id, 'SUM()', false, 1), (q_id, 'COUNT()', true, 2), (q_id, 'AVG()', false, 3), (q_id, 'MAX()', false, 4);
END IF;

-- Odoo Module 4
SELECT mq.id INTO quiz_id FROM module_quizzes mq JOIN course_modules cm ON mq.module_id = cm.id JOIN courses c ON cm.course_id = c.id WHERE c.title = 'Basics of Odoo CRM' AND cm.order_index = 4;
IF quiz_id IS NOT NULL THEN
  DELETE FROM quiz_questions WHERE quiz_id = quiz_id;
  INSERT INTO quiz_questions (quiz_id, question_text, question_type, order_index, points) VALUES (quiz_id, 'In Odoo CRM, leads are converted into:', 'multiple_choice', 1, 1) RETURNING id INTO q_id;
  INSERT INTO quiz_options (question_id, option_text, is_correct, order_index) VALUES (q_id, 'Contacts', false, 1), (q_id, 'Orders', false, 2), (q_id, 'Opportunities', true, 3), (q_id, 'Invoices', false, 4);
  INSERT INTO quiz_questions (quiz_id, question_text, question_type, order_index, points) VALUES (quiz_id, 'CRM pipeline mainly represents:', 'multiple_choice', 2, 1) RETURNING id INTO q_id;
  INSERT INTO quiz_options (question_id, option_text, is_correct, order_index) VALUES (q_id, 'Database flow', false, 1), (q_id, 'Sales stages', true, 2), (q_id, 'User roles', false, 3), (q_id, 'Inventory', false, 4);
  INSERT INTO quiz_questions (quiz_id, question_text, question_type, order_index, points) VALUES (quiz_id, 'Activities in Odoo CRM are used for:', 'multiple_choice', 3, 1) RETURNING id INTO q_id;
  INSERT INTO quiz_options (question_id, option_text, is_correct, order_index) VALUES (q_id, 'Coding', false, 1), (q_id, 'Scheduling follow-ups', true, 2), (q_id, 'Reporting', false, 3), (q_id, 'Accounting', false, 4);
END IF;

-- React Module 4
SELECT mq.id INTO quiz_id FROM module_quizzes mq JOIN course_modules cm ON mq.module_id = cm.id JOIN courses c ON cm.course_id = c.id WHERE c.title = 'Advanced React Patterns' AND cm.order_index = 4;
IF quiz_id IS NOT NULL THEN
  DELETE FROM quiz_questions WHERE quiz_id = quiz_id;
  INSERT INTO quiz_questions (quiz_id, question_text, question_type, order_index, points) VALUES (quiz_id, 'Compound components are used to:', 'multiple_choice', 1, 1) RETURNING id INTO q_id;
  INSERT INTO quiz_options (question_id, option_text, is_correct, order_index) VALUES (q_id, 'Reduce bundle size', false, 1), (q_id, 'Share state implicitly', true, 2), (q_id, 'Replace Redux', false, 3), (q_id, 'Handle APIs', false, 4);
  INSERT INTO quiz_questions (quiz_id, question_text, question_type, order_index, points) VALUES (quiz_id, 'Render Props pattern uses:', 'multiple_choice', 2, 1) RETURNING id INTO q_id;
  INSERT INTO quiz_options (question_id, option_text, is_correct, order_index) VALUES (q_id, 'CSS', false, 1), (q_id, 'Functions as children', true, 2), (q_id, 'Classes only', false, 3), (q_id, 'JSON', false, 4);
  INSERT INTO quiz_questions (quiz_id, question_text, question_type, order_index, points) VALUES (quiz_id, 'HOC stands for:', 'multiple_choice', 3, 1) RETURNING id INTO q_id;
  INSERT INTO quiz_options (question_id, option_text, is_correct, order_index) VALUES (q_id, 'High Order Component', true, 1), (q_id, 'Heavy Object Component', false, 2), (q_id, 'Hooked Object Component', false, 3), (q_id, 'Hybrid Output Component', false, 4);
END IF;

-- Full Stack Module 4
SELECT mq.id INTO quiz_id FROM module_quizzes mq JOIN course_modules cm ON mq.module_id = cm.id JOIN courses c ON cm.course_id = c.id WHERE c.title = 'Full Stack Web Development' AND cm.order_index = 4;
IF quiz_id IS NOT NULL THEN
  DELETE FROM quiz_questions WHERE quiz_id = quiz_id;
  INSERT INTO quiz_questions (quiz_id, question_text, question_type, order_index, points) VALUES (quiz_id, 'REST API uses which protocol?', 'multiple_choice', 1, 1) RETURNING id INTO q_id;
  INSERT INTO quiz_options (question_id, option_text, is_correct, order_index) VALUES (q_id, 'FTP', false, 1), (q_id, 'SMTP', false, 2), (q_id, 'HTTP', true, 3), (q_id, 'TCP', false, 4);
  INSERT INTO quiz_questions (quiz_id, question_text, question_type, order_index, points) VALUES (quiz_id, 'Express.js is a:', 'multiple_choice', 2, 1) RETURNING id INTO q_id;
  INSERT INTO quiz_options (question_id, option_text, is_correct, order_index) VALUES (q_id, 'Database', false, 1), (q_id, 'Frontend library', false, 2), (q_id, 'Backend framework', true, 3), (q_id, 'CSS tool', false, 4);
  INSERT INTO quiz_questions (quiz_id, question_text, question_type, order_index, points) VALUES (quiz_id, 'DOM is managed by:', 'multiple_choice', 3, 1) RETURNING id INTO q_id;
  INSERT INTO quiz_options (question_id, option_text, is_correct, order_index) VALUES (q_id, 'Server', false, 1), (q_id, 'Browser', true, 2), (q_id, 'Database', false, 3), (q_id, 'OS', false, 4);
END IF;

-- Python Module 4
SELECT mq.id INTO quiz_id FROM module_quizzes mq JOIN course_modules cm ON mq.module_id = cm.id JOIN courses c ON cm.course_id = c.id WHERE c.title = 'Python for Data Science' AND cm.order_index = 4;
IF quiz_id IS NOT NULL THEN
  DELETE FROM quiz_questions WHERE quiz_id = quiz_id;
  INSERT INTO quiz_questions (quiz_id, question_text, question_type, order_index, points) VALUES (quiz_id, 'Which library is used for arrays?', 'multiple_choice', 1, 1) RETURNING id INTO q_id;
  INSERT INTO quiz_options (question_id, option_text, is_correct, order_index) VALUES (q_id, 'Pandas', false, 1), (q_id, 'NumPy', true, 2), (q_id, 'Matplotlib', false, 3), (q_id, 'Seaborn', false, 4);
  INSERT INTO quiz_questions (quiz_id, question_text, question_type, order_index, points) VALUES (quiz_id, 'Pandas DataFrame is:', 'multiple_choice', 2, 1) RETURNING id INTO q_id;
  INSERT INTO quiz_options (question_id, option_text, is_correct, order_index) VALUES (q_id, '1D', false, 1), (q_id, '2D tabular structure', true, 2), (q_id, 'Graph', false, 3), (q_id, 'Tree', false, 4);
  INSERT INTO quiz_questions (quiz_id, question_text, question_type, order_index, points) VALUES (quiz_id, 'Data preprocessing is done to:', 'multiple_choice', 3, 1) RETURNING id INTO q_id;
  INSERT INTO quiz_options (question_id, option_text, is_correct, order_index) VALUES (q_id, 'Delete data', false, 1), (q_id, 'Clean data', true, 2), (q_id, 'Encrypt data', false, 3), (q_id, 'Compress data', false, 4);
END IF;

RAISE NOTICE 'Module 4 questions added for all courses!';
END $$;
