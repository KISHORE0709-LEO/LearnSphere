-- ============================================
-- Add Quiz Questions for All 20 Quizzes
-- 5 Courses × 4 Modules = 20 Quizzes
-- ============================================

-- First, let's get the quiz IDs by course and module
-- We'll add 3-5 questions per quiz with multiple choice options

-- ============================================
-- COURSE 1: Basics of Odoo CRM
-- ============================================

-- Module 1 Quiz: Fundamentals Assessment
DO $$
DECLARE
  v_quiz_id UUID;
  v_q1_id UUID;
  v_q2_id UUID;
  v_q3_id UUID;
BEGIN
  -- Get quiz ID for Odoo CRM Module 1
  SELECT q.id INTO v_quiz_id
  FROM quizzes q
  JOIN course_modules cm ON q.module_id = cm.id
  JOIN courses c ON cm.course_id = c.id
  WHERE c.title = 'Basics of Odoo CRM' AND cm.order_index = 1;

  -- Delete existing questions if any
  DELETE FROM quiz_options WHERE question_id IN (SELECT id FROM quiz_questions WHERE quiz_id = v_quiz_id);
  DELETE FROM quiz_questions WHERE quiz_id = v_quiz_id;

  -- Question 1
  INSERT INTO quiz_questions (quiz_id, question_text, question_type, points, order_index)
  VALUES (v_quiz_id, 'What does CRM stand for in business context?', 'multiple_choice', 10, 1)
  RETURNING id INTO v_q1_id;

  INSERT INTO quiz_options (question_id, option_text, is_correct, order_index) VALUES
  (v_q1_id, 'Customer Relationship Management', true, 1),
  (v_q1_id, 'Customer Resource Management', false, 2),
  (v_q1_id, 'Client Revenue Model', false, 3),
  (v_q1_id, 'Corporate Risk Management', false, 4);

  -- Question 2
  INSERT INTO quiz_questions (quiz_id, question_text, question_type, points, order_index)
  VALUES (v_quiz_id, 'Which is a primary benefit of using Odoo CRM?', 'multiple_choice', 10, 2)
  RETURNING id INTO v_q2_id;

  INSERT INTO quiz_options (question_id, option_text, is_correct, order_index) VALUES
  (v_q2_id, 'Centralized customer data and improved sales tracking', true, 1),
  (v_q2_id, 'Only email marketing automation', false, 2),
  (v_q2_id, 'Reduced employee count', false, 3),
  (v_q2_id, 'Automatic product manufacturing', false, 4);

  -- Question 3
  INSERT INTO quiz_questions (quiz_id, question_text, question_type, points, order_index)
  VALUES (v_quiz_id, 'In Odoo CRM, what is a "lead"?', 'multiple_choice', 10, 3)
  RETURNING id INTO v_q3_id;

  INSERT INTO quiz_options (question_id, option_text, is_correct, order_index) VALUES
  (v_q3_id, 'A potential customer or business opportunity', true, 1),
  (v_q3_id, 'A team leader in the organization', false, 2),
  (v_q3_id, 'A completed sale transaction', false, 3),
  (v_q3_id, 'A marketing campaign', false, 4);
END $$;

-- Module 2 Quiz: Core Features Quiz
DO $$
DECLARE
  v_quiz_id UUID;
  v_q1_id UUID;
  v_q2_id UUID;
  v_q3_id UUID;
  v_q4_id UUID;
BEGIN
  SELECT q.id INTO v_quiz_id
  FROM quizzes q
  JOIN course_modules cm ON q.module_id = cm.id
  JOIN courses c ON cm.course_id = c.id
  WHERE c.title = 'Basics of Odoo CRM' AND cm.order_index = 2;

  DELETE FROM quiz_options WHERE question_id IN (SELECT id FROM quiz_questions WHERE quiz_id = v_quiz_id);
  DELETE FROM quiz_questions WHERE quiz_id = v_quiz_id;

  INSERT INTO quiz_questions (quiz_id, question_text, question_type, points, order_index)
  VALUES (v_quiz_id, 'What is the purpose of a sales pipeline in Odoo CRM?', 'multiple_choice', 10, 1)
  RETURNING id INTO v_q1_id;

  INSERT INTO quiz_options (question_id, option_text, is_correct, order_index) VALUES
  (v_q1_id, 'To visualize and track deals through different stages', true, 1),
  (v_q1_id, 'To store customer passwords', false, 2),
  (v_q1_id, 'To generate invoices automatically', false, 3),
  (v_q1_id, 'To schedule employee shifts', false, 4);

  INSERT INTO quiz_questions (quiz_id, question_text, question_type, points, order_index)
  VALUES (v_quiz_id, 'Which feature helps automate repetitive tasks in Odoo CRM?', 'multiple_choice', 10, 2)
  RETURNING id INTO v_q2_id;

  INSERT INTO quiz_options (question_id, option_text, is_correct, order_index) VALUES
  (v_q2_id, 'Automated actions and workflows', true, 1),
  (v_q2_id, 'Manual data entry forms', false, 2),
  (v_q2_id, 'Paper-based checklists', false, 3),
  (v_q2_id, 'Phone call recordings', false, 4);

  INSERT INTO quiz_questions (quiz_id, question_text, question_type, points, order_index)
  VALUES (v_quiz_id, 'How can you convert a lead to an opportunity in Odoo?', 'multiple_choice', 10, 3)
  RETURNING id INTO v_q3_id;

  INSERT INTO quiz_options (question_id, option_text, is_correct, order_index) VALUES
  (v_q3_id, 'Click the "Convert to Opportunity" button after qualifying the lead', true, 1),
  (v_q3_id, 'Delete the lead and create a new record', false, 2),
  (v_q3_id, 'Send an email to the customer', false, 3),
  (v_q3_id, 'Export to Excel and reimport', false, 4);

  INSERT INTO quiz_questions (quiz_id, question_text, question_type, points, order_index)
  VALUES (v_quiz_id, 'What information is typically tracked in an Odoo CRM opportunity?', 'multiple_choice', 10, 4)
  RETURNING id INTO v_q4_id;

  INSERT INTO quiz_options (question_id, option_text, is_correct, order_index) VALUES
  (v_q4_id, 'Expected revenue, probability, and stage', true, 1),
  (v_q4_id, 'Only customer name', false, 2),
  (v_q4_id, 'Employee attendance records', false, 3),
  (v_q4_id, 'Warehouse inventory levels', false, 4);
END $$;

-- Module 3 Quiz: Advanced Techniques Test
DO $$
DECLARE
  v_quiz_id UUID;
  v_q1_id UUID;
  v_q2_id UUID;
  v_q3_id UUID;
BEGIN
  SELECT q.id INTO v_quiz_id
  FROM quizzes q
  JOIN course_modules cm ON q.module_id = cm.id
  JOIN courses c ON cm.course_id = c.id
  WHERE c.title = 'Basics of Odoo CRM' AND cm.order_index = 3;

  DELETE FROM quiz_options WHERE question_id IN (SELECT id FROM quiz_questions WHERE quiz_id = v_quiz_id);
  DELETE FROM quiz_questions WHERE quiz_id = v_quiz_id;

  INSERT INTO quiz_questions (quiz_id, question_text, question_type, points, order_index)
  VALUES (v_quiz_id, 'What is lead scoring in Odoo CRM?', 'multiple_choice', 15, 1)
  RETURNING id INTO v_q1_id;

  INSERT INTO quiz_options (question_id, option_text, is_correct, order_index) VALUES
  (v_q1_id, 'A method to rank leads based on their likelihood to convert', true, 1),
  (v_q1_id, 'A game for sales teams', false, 2),
  (v_q1_id, 'A financial audit process', false, 3),
  (v_q1_id, 'A customer satisfaction survey', false, 4);

  INSERT INTO quiz_questions (quiz_id, question_text, question_type, points, order_index)
  VALUES (v_quiz_id, 'How can you optimize your sales pipeline in Odoo?', 'multiple_choice', 15, 2)
  RETURNING id INTO v_q2_id;

  INSERT INTO quiz_options (question_id, option_text, is_correct, order_index) VALUES
  (v_q2_id, 'Analyze stage conversion rates and remove bottlenecks', true, 1),
  (v_q2_id, 'Add more stages randomly', false, 2),
  (v_q2_id, 'Delete all old opportunities', false, 3),
  (v_q2_id, 'Ignore the pipeline completely', false, 4);

  INSERT INTO quiz_questions (quiz_id, question_text, question_type, points, order_index)
  VALUES (v_quiz_id, 'What is the benefit of integrating Odoo CRM with email?', 'multiple_choice', 15, 3)
  RETURNING id INTO v_q3_id;

  INSERT INTO quiz_options (question_id, option_text, is_correct, order_index) VALUES
  (v_q3_id, 'Automatic logging of communications and centralized inbox', true, 1),
  (v_q3_id, 'Faster internet connection', false, 2),
  (v_q3_id, 'Reduced email storage costs', false, 3),
  (v_q3_id, 'Automatic spam filtering only', false, 4);
END $$;

-- Module 4 Quiz: Final Assessment
DO $$
DECLARE
  v_quiz_id UUID;
  v_q1_id UUID;
  v_q2_id UUID;
  v_q3_id UUID;
  v_q4_id UUID;
BEGIN
  SELECT q.id INTO v_quiz_id
  FROM quizzes q
  JOIN course_modules cm ON q.module_id = cm.id
  JOIN courses c ON cm.course_id = c.id
  WHERE c.title = 'Basics of Odoo CRM' AND cm.order_index = 4;

  DELETE FROM quiz_options WHERE question_id IN (SELECT id FROM quiz_questions WHERE quiz_id = v_quiz_id);
  DELETE FROM quiz_questions WHERE quiz_id = v_quiz_id;

  INSERT INTO quiz_questions (quiz_id, question_text, question_type, points, order_index)
  VALUES (v_quiz_id, 'In a real-world scenario, what is the first step in implementing Odoo CRM?', 'multiple_choice', 20, 1)
  RETURNING id INTO v_q1_id;

  INSERT INTO quiz_options (question_id, option_text, is_correct, order_index) VALUES
  (v_q1_id, 'Define business requirements and map existing sales process', true, 1),
  (v_q1_id, 'Install all available modules immediately', false, 2),
  (v_q1_id, 'Fire the existing sales team', false, 3),
  (v_q1_id, 'Start cold calling customers', false, 4);

  INSERT INTO quiz_questions (quiz_id, question_text, question_type, points, order_index)
  VALUES (v_quiz_id, 'What metrics should you track to measure CRM success?', 'multiple_choice', 20, 2)
  RETURNING id INTO v_q2_id;

  INSERT INTO quiz_options (question_id, option_text, is_correct, order_index) VALUES
  (v_q2_id, 'Conversion rates, sales cycle length, and customer retention', true, 1),
  (v_q2_id, 'Only total number of leads', false, 2),
  (v_q2_id, 'Number of emails sent', false, 3),
  (v_q2_id, 'Office temperature', false, 4);

  INSERT INTO quiz_questions (quiz_id, question_text, question_type, points, order_index)
  VALUES (v_quiz_id, 'How should you handle data migration to Odoo CRM?', 'multiple_choice', 20, 3)
  RETURNING id INTO v_q3_id;

  INSERT INTO quiz_options (question_id, option_text, is_correct, order_index) VALUES
  (v_q3_id, 'Clean and validate data, then import using CSV or API', true, 1),
  (v_q3_id, 'Copy-paste everything manually', false, 2),
  (v_q3_id, 'Start fresh without any historical data', false, 3),
  (v_q3_id, 'Take screenshots of old system', false, 4);

  INSERT INTO quiz_questions (quiz_id, question_text, question_type, points, order_index)
  VALUES (v_quiz_id, 'What is a key success factor for CRM adoption?', 'multiple_choice', 20, 4)
  RETURNING id INTO v_q4_id;

  INSERT INTO quiz_options (question_id, option_text, is_correct, order_index) VALUES
  (v_q4_id, 'User training and management buy-in', true, 1),
  (v_q4_id, 'Expensive hardware', false, 2),
  (v_q4_id, 'Complex customizations', false, 3),
  (v_q4_id, 'Ignoring user feedback', false, 4);
END $$;

-- ============================================
-- COURSE 2: Advanced React Patterns
-- ============================================

-- Module 1 Quiz
DO $$
DECLARE
  v_quiz_id UUID;
  v_q1_id UUID;
  v_q2_id UUID;
  v_q3_id UUID;
BEGIN
  SELECT q.id INTO v_quiz_id
  FROM quizzes q
  JOIN course_modules cm ON q.module_id = cm.id
  JOIN courses c ON cm.course_id = c.id
  WHERE c.title = 'Advanced React Patterns' AND cm.order_index = 1;

  DELETE FROM quiz_options WHERE question_id IN (SELECT id FROM quiz_questions WHERE quiz_id = v_quiz_id);
  DELETE FROM quiz_questions WHERE quiz_id = v_quiz_id;

  INSERT INTO quiz_questions (quiz_id, question_text, question_type, points, order_index)
  VALUES (v_quiz_id, 'What is the main purpose of React Hooks?', 'multiple_choice', 10, 1)
  RETURNING id INTO v_q1_id;

  INSERT INTO quiz_options (question_id, option_text, is_correct, order_index) VALUES
  (v_q1_id, 'To use state and lifecycle features in functional components', true, 1),
  (v_q1_id, 'To replace all class components', false, 2),
  (v_q1_id, 'To make React slower', false, 3),
  (v_q1_id, 'To add CSS styling', false, 4);

  INSERT INTO quiz_questions (quiz_id, question_text, question_type, points, order_index)
  VALUES (v_quiz_id, 'Which hook is used for side effects in React?', 'multiple_choice', 10, 2)
  RETURNING id INTO v_q2_id;

  INSERT INTO quiz_options (question_id, option_text, is_correct, order_index) VALUES
  (v_q2_id, 'useEffect', true, 1),
  (v_q2_id, 'useState', false, 2),
  (v_q2_id, 'useCallback', false, 3),
  (v_q2_id, 'useMemo', false, 4);

  INSERT INTO quiz_questions (quiz_id, question_text, question_type, points, order_index)
  VALUES (v_quiz_id, 'What does the useState hook return?', 'multiple_choice', 10, 3)
  RETURNING id INTO v_q3_id;

  INSERT INTO quiz_options (question_id, option_text, is_correct, order_index) VALUES
  (v_q3_id, 'An array with current state and setter function', true, 1),
  (v_q3_id, 'Only the current state value', false, 2),
  (v_q3_id, 'A promise', false, 3),
  (v_q3_id, 'An object with state properties', false, 4);
END $$;

-- Module 2 Quiz
DO $$
DECLARE
  v_quiz_id UUID;
  v_q1_id UUID;
  v_q2_id UUID;
  v_q3_id UUID;
  v_q4_id UUID;
BEGIN
  SELECT q.id INTO v_quiz_id
  FROM quizzes q
  JOIN course_modules cm ON q.module_id = cm.id
  JOIN courses c ON cm.course_id = c.id
  WHERE c.title = 'Advanced React Patterns' AND cm.order_index = 2;

  DELETE FROM quiz_options WHERE question_id IN (SELECT id FROM quiz_questions WHERE quiz_id = v_quiz_id);
  DELETE FROM quiz_questions WHERE quiz_id = v_quiz_id;

  INSERT INTO quiz_questions (quiz_id, question_text, question_type, points, order_index)
  VALUES (v_quiz_id, 'What is the Compound Components pattern?', 'multiple_choice', 10, 1)
  RETURNING id INTO v_q1_id;

  INSERT INTO quiz_options (question_id, option_text, is_correct, order_index) VALUES
  (v_q1_id, 'A pattern where components work together sharing implicit state', true, 1),
  (v_q1_id, 'Using multiple npm packages', false, 2),
  (v_q1_id, 'Combining CSS files', false, 3),
  (v_q1_id, 'A database design pattern', false, 4);

  INSERT INTO quiz_questions (quiz_id, question_text, question_type, points, order_index)
  VALUES (v_quiz_id, 'What is the benefit of the Render Props pattern?', 'multiple_choice', 10, 2)
  RETURNING id INTO v_q2_id;

  INSERT INTO quiz_options (question_id, option_text, is_correct, order_index) VALUES
  (v_q2_id, 'Sharing code between components using a prop whose value is a function', true, 1),
  (v_q2_id, 'Faster rendering speed', false, 2),
  (v_q2_id, 'Automatic error handling', false, 3),
  (v_q2_id, 'Built-in authentication', false, 4);

  INSERT INTO quiz_questions (quiz_id, question_text, question_type, points, order_index)
  VALUES (v_quiz_id, 'When should you use the Context API?', 'multiple_choice', 10, 3)
  RETURNING id INTO v_q3_id;

  INSERT INTO quiz_options (question_id, option_text, is_correct, order_index) VALUES
  (v_q3_id, 'When you need to pass data through component tree without props drilling', true, 1),
  (v_q3_id, 'For all state management needs', false, 2),
  (v_q3_id, 'Only for styling', false, 3),
  (v_q3_id, 'To replace Redux in all cases', false, 4);

  INSERT INTO quiz_questions (quiz_id, question_text, question_type, points, order_index)
  VALUES (v_quiz_id, 'What hook is essential for using Context?', 'multiple_choice', 10, 4)
  RETURNING id INTO v_q4_id;

  INSERT INTO quiz_options (question_id, option_text, is_correct, order_index) VALUES
  (v_q4_id, 'useContext', true, 1),
  (v_q4_id, 'useState', false, 2),
  (v_q4_id, 'useReducer', false, 3),
  (v_q4_id, 'useRef', false, 4);
END $$;

-- Module 3 Quiz
DO $$
DECLARE
  v_quiz_id UUID;
  v_q1_id UUID;
  v_q2_id UUID;
  v_q3_id UUID;
BEGIN
  SELECT q.id INTO v_quiz_id
  FROM quizzes q
  JOIN course_modules cm ON q.module_id = cm.id
  JOIN courses c ON cm.course_id = c.id
  WHERE c.title = 'Advanced React Patterns' AND cm.order_index = 3;

  DELETE FROM quiz_options WHERE question_id IN (SELECT id FROM quiz_questions WHERE quiz_id = v_quiz_id);
  DELETE FROM quiz_questions WHERE quiz_id = v_quiz_id;

  INSERT INTO quiz_questions (quiz_id, question_text, question_type, points, order_index)
  VALUES (v_quiz_id, 'What is the purpose of useMemo hook?', 'multiple_choice', 15, 1)
  RETURNING id INTO v_q1_id;

  INSERT INTO quiz_options (question_id, option_text, is_correct, order_index) VALUES
  (v_q1_id, 'To memoize expensive calculations and avoid unnecessary re-computations', true, 1),
  (v_q1_id, 'To store component state', false, 2),
  (v_q1_id, 'To handle side effects', false, 3),
  (v_q1_id, 'To create refs', false, 4);

  INSERT INTO quiz_questions (quiz_id, question_text, question_type, points, order_index)
  VALUES (v_quiz_id, 'When should you use useCallback?', 'multiple_choice', 15, 2)
  RETURNING id INTO v_q2_id;

  INSERT INTO quiz_options (question_id, option_text, is_correct, order_index) VALUES
  (v_q2_id, 'To memoize functions and prevent unnecessary re-renders of child components', true, 1),
  (v_q2_id, 'For all function definitions', false, 2),
  (v_q2_id, 'To make API calls', false, 3),
  (v_q2_id, 'To handle form submissions', false, 4);

  INSERT INTO quiz_questions (quiz_id, question_text, question_type, points, order_index)
  VALUES (v_quiz_id, 'What is React.memo used for?', 'multiple_choice', 15, 3)
  RETURNING id INTO v_q3_id;

  INSERT INTO quiz_options (question_id, option_text, is_correct, order_index) VALUES
  (v_q3_id, 'To prevent re-rendering of components when props haven''t changed', true, 1),
  (v_q3_id, 'To store data in memory', false, 2),
  (v_q3_id, 'To create memoized state', false, 3),
  (v_q3_id, 'To optimize CSS', false, 4);
END $$;

-- Module 4 Quiz
DO $$
DECLARE
  v_quiz_id UUID;
  v_q1_id UUID;
  v_q2_id UUID;
  v_q3_id UUID;
  v_q4_id UUID;
BEGIN
  SELECT q.id INTO v_quiz_id
  FROM quizzes q
  JOIN course_modules cm ON q.module_id = cm.id
  JOIN courses c ON cm.course_id = c.id
  WHERE c.title = 'Advanced React Patterns' AND cm.order_index = 4;

  DELETE FROM quiz_options WHERE question_id IN (SELECT id FROM quiz_questions WHERE quiz_id = v_quiz_id);
  DELETE FROM quiz_questions WHERE quiz_id = v_quiz_id;

  INSERT INTO quiz_questions (quiz_id, question_text, question_type, points, order_index)
  VALUES (v_quiz_id, 'What is the best approach for state management in large React apps?', 'multiple_choice', 20, 1)
  RETURNING id INTO v_q1_id;

  INSERT INTO quiz_options (question_id, option_text, is_correct, order_index) VALUES
  (v_q1_id, 'Combine Context API for global state and local state for component-specific data', true, 1),
  (v_q1_id, 'Use only global state for everything', false, 2),
  (v_q1_id, 'Avoid state management completely', false, 3),
  (v_q1_id, 'Store all state in localStorage', false, 4);

  INSERT INTO quiz_questions (quiz_id, question_text, question_type, points, order_index)
  VALUES (v_quiz_id, 'How do you optimize React app performance?', 'multiple_choice', 20, 2)
  RETURNING id INTO v_q2_id;

  INSERT INTO quiz_options (question_id, option_text, is_correct, order_index) VALUES
  (v_q2_id, 'Use code splitting, lazy loading, memoization, and avoid unnecessary re-renders', true, 1),
  (v_q2_id, 'Add more servers', false, 2),
  (v_q2_id, 'Remove all components', false, 3),
  (v_q2_id, 'Use inline styles everywhere', false, 4);

  INSERT INTO quiz_questions (quiz_id, question_text, question_type, points, order_index)
  VALUES (v_quiz_id, 'What is the purpose of Error Boundaries in React?', 'multiple_choice', 20, 3)
  RETURNING id INTO v_q3_id;

  INSERT INTO quiz_options (question_id, option_text, is_correct, order_index) VALUES
  (v_q3_id, 'To catch JavaScript errors in component tree and display fallback UI', true, 1),
  (v_q3_id, 'To validate form inputs', false, 2),
  (v_q3_id, 'To set component boundaries in CSS', false, 3),
  (v_q3_id, 'To prevent API calls', false, 4);

  INSERT INTO quiz_questions (quiz_id, question_text, question_type, points, order_index)
  VALUES (v_quiz_id, 'What is a custom hook in React?', 'multiple_choice', 20, 4)
  RETURNING id INTO v_q4_id;

  INSERT INTO quiz_options (question_id, option_text, is_correct, order_index) VALUES
  (v_q4_id, 'A JavaScript function that uses React hooks and can be reused across components', true, 1),
  (v_q4_id, 'A CSS styling technique', false, 2),
  (v_q4_id, 'A third-party library', false, 3),
  (v_q4_id, 'A database query', false, 4);
END $$;

-- ============================================
-- COURSE 3: Python for Data Science
-- ============================================

-- Module 1 Quiz
DO $$
DECLARE
  v_quiz_id UUID;
  v_q1_id UUID;
  v_q2_id UUID;
  v_q3_id UUID;
BEGIN
  SELECT q.id INTO v_quiz_id
  FROM quizzes q
  JOIN course_modules cm ON q.module_id = cm.id
  JOIN courses c ON cm.course_id = c.id
  WHERE c.title = 'Python for Data Science' AND cm.order_index = 1;

  DELETE FROM quiz_options WHERE question_id IN (SELECT id FROM quiz_questions WHERE quiz_id = v_quiz_id);
  DELETE FROM quiz_questions WHERE quiz_id = v_quiz_id;

  INSERT INTO quiz_questions (quiz_id, question_text, question_type, points, order_index)
  VALUES (v_quiz_id, 'Which Python library is primarily used for data manipulation?', 'multiple_choice', 10, 1)
  RETURNING id INTO v_q1_id;

  INSERT INTO quiz_options (question_id, option_text, is_correct, order_index) VALUES
  (v_q1_id, 'Pandas', true, 1),
  (v_q1_id, 'Flask', false, 2),
  (v_q1_id, 'Django', false, 3),
  (v_q1_id, 'Requests', false, 4);

  INSERT INTO quiz_questions (quiz_id, question_text, question_type, points, order_index)
  VALUES (v_quiz_id, 'What is NumPy used for?', 'multiple_choice', 10, 2)
  RETURNING id INTO v_q2_id;

  INSERT INTO quiz_options (question_id, option_text, is_correct, order_index) VALUES
  (v_q2_id, 'Numerical computing and array operations', true, 1),
  (v_q2_id, 'Web development', false, 2),
  (v_q2_id, 'Game development', false, 3),
  (v_q2_id, 'Mobile app development', false, 4);

  INSERT INTO quiz_questions (quiz_id, question_text, question_type, points, order_index)
  VALUES (v_quiz_id, 'What data structure does Pandas primarily use?', 'multiple_choice', 10, 3)
  RETURNING id INTO v_q3_id;

  INSERT INTO quiz_options (question_id, option_text, is_correct, order_index) VALUES
  (v_q3_id, 'DataFrame and Series', true, 1),
  (v_q3_id, 'Lists and Tuples', false, 2),
  (v_q3_id, 'Sets and Dictionaries', false, 3),
  (v_q3_id, 'Strings and Integers', false, 4);
END $$;

-- Module 2 Quiz
DO $$
DECLARE
  v_quiz_id UUID;
  v_q1_id UUID;
  v_q2_id UUID;
  v_q3_id UUID;
  v_q4_id UUID;
BEGIN
  SELECT q.id INTO v_quiz_id
  FROM quizzes q
  JOIN course_modules cm ON q.module_id = cm.id
  JOIN courses c ON cm.course_id = c.id
  WHERE c.title = 'Python for Data Science' AND cm.order_index = 2;

  DELETE FROM quiz_options WHERE question_id IN (SELECT id FROM quiz_questions WHERE quiz_id = v_quiz_id);
  DELETE FROM quiz_questions WHERE quiz_id = v_quiz_id;

  INSERT INTO quiz_questions (quiz_id, question_text, question_type, points, order_index)
  VALUES (v_quiz_id, 'Which library is best for data visualization in Python?', 'multiple_choice', 10, 1)
  RETURNING id INTO v_q1_id;

  INSERT INTO quiz_options (question_id, option_text, is_correct, order_index) VALUES
  (v_q1_id, 'Matplotlib and Seaborn', true, 1),
  (v_q1_id, 'NumPy', false, 2),
  (v_q1_id, 'SQLAlchemy', false, 3),
  (v_q1_id, 'BeautifulSoup', false, 4);

  INSERT INTO quiz_questions (quiz_id, question_text, question_type, points, order_index)
  VALUES (v_quiz_id, 'What method is used to read a CSV file in Pandas?', 'multiple_choice', 10, 2)
  RETURNING id INTO v_q2_id;

  INSERT INTO quiz_options (question_id, option_text, is_correct, order_index) VALUES
  (v_q2_id, 'pd.read_csv()', true, 1),
  (v_q2_id, 'pd.load_csv()', false, 2),
  (v_q2_id, 'pd.import_csv()', false, 3),
  (v_q2_id, 'pd.open_csv()', false, 4);

  INSERT INTO quiz_questions (quiz_id, question_text, question_type, points, order_index)
  VALUES (v_quiz_id, 'How do you handle missing data in Pandas?', 'multiple_choice', 10, 3)
  RETURNING id INTO v_q3_id;

  INSERT INTO quiz_options (question_id, option_text, is_correct, order_index) VALUES
  (v_q3_id, 'Using fillna(), dropna(), or interpolate() methods', true, 1),
  (v_q3_id, 'Ignore it completely', false, 2),
  (v_q3_id, 'Delete the entire dataset', false, 3),
  (v_q3_id, 'Convert to strings', false, 4);

  INSERT INTO quiz_questions (quiz_id, question_text, question_type, points, order_index)
  VALUES (v_quiz_id, 'What is the purpose of groupby() in Pandas?', 'multiple_choice', 10, 4)
  RETURNING id INTO v_q4_id;

  INSERT INTO quiz_options (question_id, option_text, is_correct, order_index) VALUES
  (v_q4_id, 'To group data by one or more columns and perform aggregate operations', true, 1),
  (v_q4_id, 'To sort data alphabetically', false, 2),
  (v_q4_id, 'To delete rows', false, 3),
  (v_q4_id, 'To rename columns', false, 4);
END $$;

-- Module 3 Quiz
DO $$
DECLARE
  v_quiz_id UUID;
  v_q1_id UUID;
  v_q2_id UUID;
  v_q3_id UUID;
BEGIN
  SELECT q.id INTO v_quiz_id
  FROM quizzes q
  JOIN course_modules cm ON q.module_id = cm.id
  JOIN courses c ON cm.course_id = c.id
  WHERE c.title = 'Python for Data Science' AND cm.order_index = 3;

  DELETE FROM quiz_options WHERE question_id IN (SELECT id FROM quiz_questions WHERE quiz_id = v_quiz_id);
  DELETE FROM quiz_questions WHERE quiz_id = v_quiz_id;

  INSERT INTO quiz_questions (quiz_id, question_text, question_type, points, order_index)
  VALUES (v_quiz_id, 'What is scikit-learn used for?', 'multiple_choice', 15, 1)
  RETURNING id INTO v_q1_id;

  INSERT INTO quiz_options (question_id, option_text, is_correct, order_index) VALUES
  (v_q1_id, 'Machine learning algorithms and model building', true, 1),
  (v_q1_id, 'Web scraping', false, 2),
  (v_q1_id, 'Database management', false, 3),
  (v_q1_id, 'Image editing', false, 4);

  INSERT INTO quiz_questions (quiz_id, question_text, question_type, points, order_index)
  VALUES (v_quiz_id, 'What is the difference between supervised and unsupervised learning?', 'multiple_choice', 15, 2)
  RETURNING id INTO v_q2_id;

  INSERT INTO quiz_options (question_id, option_text, is_correct, order_index) VALUES
  (v_q2_id, 'Supervised uses labeled data, unsupervised finds patterns in unlabeled data', true, 1),
  (v_q2_id, 'They are the same thing', false, 2),
  (v_q2_id, 'Supervised is faster', false, 3),
  (v_q2_id, 'Unsupervised requires more memory', false, 4);

  INSERT INTO quiz_questions (quiz_id, question_text, question_type, points, order_index)
  VALUES (v_quiz_id, 'What is feature engineering?', 'multiple_choice', 15, 3)
  RETURNING id INTO v_q3_id;

  INSERT INTO quiz_options (question_id, option_text, is_correct, order_index) VALUES
  (v_q3_id, 'Creating new features from existing data to improve model performance', true, 1),
  (v_q3_id, 'Deleting all features', false, 2),
  (v_q3_id, 'Renaming columns', false, 3),
  (v_q3_id, 'Sorting the dataset', false, 4);
END $$;

-- Module 4 Quiz
DO $$
DECLARE
  v_quiz_id UUID;
  v_q1_id UUID;
  v_q2_id UUID;
  v_q3_id UUID;
  v_q4_id UUID;
BEGIN
  SELECT q.id INTO v_quiz_id
  FROM quizzes q
  JOIN course_modules cm ON q.module_id = cm.id
  JOIN courses c ON cm.course_id = c.id
  WHERE c.title = 'Python for Data Science' AND cm.order_index = 4;

  DELETE FROM quiz_options WHERE question_id IN (SELECT id FROM quiz_questions WHERE quiz_id = v_quiz_id);
  DELETE FROM quiz_questions WHERE quiz_id = v_quiz_id;

  INSERT INTO quiz_questions (quiz_id, question_text, question_type, points, order_index)
  VALUES (v_quiz_id, 'What is cross-validation in machine learning?', 'multiple_choice', 20, 1)
  RETURNING id INTO v_q1_id;

  INSERT INTO quiz_options (question_id, option_text, is_correct, order_index) VALUES
  (v_q1_id, 'A technique to assess model performance by splitting data into training and validation sets', true, 1),
  (v_q1_id, 'A way to clean data', false, 2),
  (v_q1_id, 'A visualization technique', false, 3),
  (v_q1_id, 'A database operation', false, 4);

  INSERT INTO quiz_questions (quiz_id, question_text, question_type, points, order_index)
  VALUES (v_quiz_id, 'How do you prevent overfitting in machine learning models?', 'multiple_choice', 20, 2)
  RETURNING id INTO v_q2_id;

  INSERT INTO quiz_options (question_id, option_text, is_correct, order_index) VALUES
  (v_q2_id, 'Use regularization, cross-validation, and more training data', true, 1),
  (v_q2_id, 'Use more complex models', false, 2),
  (v_q2_id, 'Train for longer periods', false, 3),
  (v_q2_id, 'Remove all features', false, 4);

  INSERT INTO quiz_questions (quiz_id, question_text, question_type, points, order_index)
  VALUES (v_quiz_id, 'What metrics are used to evaluate classification models?', 'multiple_choice', 20, 3)
  RETURNING id INTO v_q3_id;

  INSERT INTO quiz_options (question_id, option_text, is_correct, order_index) VALUES
  (v_q3_id, 'Accuracy, Precision, Recall, F1-score, and ROC-AUC', true, 1),
  (v_q3_id, 'Only accuracy', false, 2),
  (v_q3_id, 'Mean squared error', false, 3),
  (v_q3_id, 'Standard deviation', false, 4);

  INSERT INTO quiz_questions (quiz_id, question_text, question_type, points, order_index)
  VALUES (v_quiz_id, 'What is the purpose of train-test split?', 'multiple_choice', 20, 4)
  RETURNING id INTO v_q4_id;

  INSERT INTO quiz_options (question_id, option_text, is_correct, order_index) VALUES
  (v_q4_id, 'To evaluate model performance on unseen data', true, 1),
  (v_q4_id, 'To make the dataset smaller', false, 2),
  (v_q4_id, 'To clean the data', false, 3),
  (v_q4_id, 'To visualize the data', false, 4);
END $$;

-- ============================================
-- COURSE 4: Full Stack Web Development
-- ============================================

-- Module 1 Quiz
DO $$
DECLARE
  v_quiz_id UUID;
  v_q1_id UUID;
  v_q2_id UUID;
  v_q3_id UUID;
BEGIN
  SELECT q.id INTO v_quiz_id
  FROM quizzes q
  JOIN course_modules cm ON q.module_id = cm.id
  JOIN courses c ON cm.course_id = c.id
  WHERE c.title = 'Full Stack Web Development' AND cm.order_index = 1;

  DELETE FROM quiz_options WHERE question_id IN (SELECT id FROM quiz_questions WHERE quiz_id = v_quiz_id);
  DELETE FROM quiz_questions WHERE quiz_id = v_quiz_id;

  INSERT INTO quiz_questions (quiz_id, question_text, question_type, points, order_index)
  VALUES (v_quiz_id, 'What does MERN stack stand for?', 'multiple_choice', 10, 1)
  RETURNING id INTO v_q1_id;

  INSERT INTO quiz_options (question_id, option_text, is_correct, order_index) VALUES
  (v_q1_id, 'MongoDB, Express, React, Node.js', true, 1),
  (v_q1_id, 'MySQL, Express, React, Node.js', false, 2),
  (v_q1_id, 'MongoDB, Ember, React, Node.js', false, 3),
  (v_q1_id, 'MongoDB, Express, Ruby, Node.js', false, 4);

  INSERT INTO quiz_questions (quiz_id, question_text, question_type, points, order_index)
  VALUES (v_quiz_id, 'What is the role of Node.js in the MERN stack?', 'multiple_choice', 10, 2)
  RETURNING id INTO v_q2_id;

  INSERT INTO quiz_options (question_id, option_text, is_correct, order_index) VALUES
  (v_q2_id, 'Server-side JavaScript runtime environment', true, 1),
  (v_q2_id, 'Frontend framework', false, 2),
  (v_q2_id, 'Database management system', false, 3),
  (v_q2_id, 'CSS preprocessor', false, 4);

  INSERT INTO quiz_questions (quiz_id, question_text, question_type, points, order_index)
  VALUES (v_quiz_id, 'What is Express.js used for?', 'multiple_choice', 10, 3)
  RETURNING id INTO v_q3_id;

  INSERT INTO quiz_options (question_id, option_text, is_correct, order_index) VALUES
  (v_q3_id, 'Building web applications and APIs on Node.js', true, 1),
  (v_q3_id, 'Frontend state management', false, 2),
  (v_q3_id, 'Database queries', false, 3),
  (v_q3_id, 'CSS styling', false, 4);
END $$;

-- Module 2 Quiz
DO $$
DECLARE
  v_quiz_id UUID;
  v_q1_id UUID;
  v_q2_id UUID;
  v_q3_id UUID;
  v_q4_id UUID;
BEGIN
  SELECT q.id INTO v_quiz_id
  FROM quizzes q
  JOIN course_modules cm ON q.module_id = cm.id
  JOIN courses c ON cm.course_id = c.id
  WHERE c.title = 'Full Stack Web Development' AND cm.order_index = 2;

  DELETE FROM quiz_options WHERE question_id IN (SELECT id FROM quiz_questions WHERE quiz_id = v_quiz_id);
  DELETE FROM quiz_questions WHERE quiz_id = v_quiz_id;

  INSERT INTO quiz_questions (quiz_id, question_text, question_type, points, order_index)
  VALUES (v_quiz_id, 'What is MongoDB?', 'multiple_choice', 10, 1)
  RETURNING id INTO v_q1_id;

  INSERT INTO quiz_options (question_id, option_text, is_correct, order_index) VALUES
  (v_q1_id, 'A NoSQL document-oriented database', true, 1),
  (v_q1_id, 'A relational database', false, 2),
  (v_q1_id, 'A frontend framework', false, 3),
  (v_q1_id, 'A CSS library', false, 4);

  INSERT INTO quiz_questions (quiz_id, question_text, question_type, points, order_index)
  VALUES (v_quiz_id, 'What is RESTful API?', 'multiple_choice', 10, 2)
  RETURNING id INTO v_q2_id;

  INSERT INTO quiz_options (question_id, option_text, is_correct, order_index) VALUES
  (v_q2_id, 'An architectural style for designing networked applications using HTTP methods', true, 1),
  (v_q2_id, 'A database query language', false, 2),
  (v_q2_id, 'A JavaScript framework', false, 3),
  (v_q2_id, 'A CSS methodology', false, 4);

  INSERT INTO quiz_questions (quiz_id, question_text, question_type, points, order_index)
  VALUES (v_quiz_id, 'What HTTP method is used to create a new resource?', 'multiple_choice', 10, 3)
  RETURNING id INTO v_q3_id;

  INSERT INTO quiz_options (question_id, option_text, is_correct, order_index) VALUES
  (v_q3_id, 'POST', true, 1),
  (v_q3_id, 'GET', false, 2),
  (v_q3_id, 'DELETE', false, 3),
  (v_q3_id, 'PUT', false, 4);

  INSERT INTO quiz_questions (quiz_id, question_text, question_type, points, order_index)
  VALUES (v_quiz_id, 'What is middleware in Express.js?', 'multiple_choice', 10, 4)
  RETURNING id INTO v_q4_id;

  INSERT INTO quiz_options (question_id, option_text, is_correct, order_index) VALUES
  (v_q4_id, 'Functions that have access to request and response objects', true, 1),
  (v_q4_id, 'A database layer', false, 2),
  (v_q4_id, 'A frontend component', false, 3),
  (v_q4_id, 'A CSS framework', false, 4);
END $$;

-- Module 3 Quiz
DO $$
DECLARE
  v_quiz_id UUID;
  v_q1_id UUID;
  v_q2_id UUID;
  v_q3_id UUID;
BEGIN
  SELECT q.id INTO v_quiz_id
  FROM quizzes q
  JOIN course_modules cm ON q.module_id = cm.id
  JOIN courses c ON cm.course_id = c.id
  WHERE c.title = 'Full Stack Web Development' AND cm.order_index = 3;

  DELETE FROM quiz_options WHERE question_id IN (SELECT id FROM quiz_questions WHERE quiz_id = v_quiz_id);
  DELETE FROM quiz_questions WHERE quiz_id = v_quiz_id;

  INSERT INTO quiz_questions (quiz_id, question_text, question_type, points, order_index)
  VALUES (v_quiz_id, 'What is JWT used for?', 'multiple_choice', 15, 1)
  RETURNING id INTO v_q1_id;

  INSERT INTO quiz_options (question_id, option_text, is_correct, order_index) VALUES
  (v_q1_id, 'Authentication and secure information exchange between parties', true, 1),
  (v_q1_id, 'Database encryption', false, 2),
  (v_q1_id, 'CSS styling', false, 3),
  (v_q1_id, 'Image compression', false, 4);

  INSERT INTO quiz_questions (quiz_id, question_text, question_type, points, order_index)
  VALUES (v_quiz_id, 'What is the purpose of bcrypt?', 'multiple_choice', 15, 2)
  RETURNING id INTO v_q2_id;

  INSERT INTO quiz_options (question_id, option_text, is_correct, order_index) VALUES
  (v_q2_id, 'To hash and salt passwords securely', true, 1),
  (v_q2_id, 'To compress files', false, 2),
  (v_q2_id, 'To validate email addresses', false, 3),
  (v_q2_id, 'To format dates', false, 4);

  INSERT INTO quiz_questions (quiz_id, question_text, question_type, points, order_index)
  VALUES (v_quiz_id, 'What is CORS?', 'multiple_choice', 15, 3)
  RETURNING id INTO v_q3_id;

  INSERT INTO quiz_options (question_id, option_text, is_correct, order_index) VALUES
  (v_q3_id, 'Cross-Origin Resource Sharing - a security feature for web browsers', true, 1),
  (v_q3_id, 'A database management tool', false, 2),
  (v_q3_id, 'A CSS framework', false, 3),
  (v_q3_id, 'A JavaScript library', false, 4);
END $$;

-- Module 4 Quiz
DO $$
DECLARE
  v_quiz_id UUID;
  v_q1_id UUID;
  v_q2_id UUID;
  v_q3_id UUID;
  v_q4_id UUID;
BEGIN
  SELECT q.id INTO v_quiz_id
  FROM quizzes q
  JOIN course_modules cm ON q.module_id = cm.id
  JOIN courses c ON cm.course_id = c.id
  WHERE c.title = 'Full Stack Web Development' AND cm.order_index = 4;

  DELETE FROM quiz_options WHERE question_id IN (SELECT id FROM quiz_questions WHERE quiz_id = v_quiz_id);
  DELETE FROM quiz_questions WHERE quiz_id = v_quiz_id;

  INSERT INTO quiz_questions (quiz_id, question_text, question_type, points, order_index)
  VALUES (v_quiz_id, 'What is the best practice for deploying a MERN application?', 'multiple_choice', 20, 1)
  RETURNING id INTO v_q1_id;

  INSERT INTO quiz_options (question_id, option_text, is_correct, order_index) VALUES
  (v_q1_id, 'Use environment variables, separate frontend and backend, implement CI/CD', true, 1),
  (v_q1_id, 'Deploy everything on one server without configuration', false, 2),
  (v_q1_id, 'Hardcode all credentials', false, 3),
  (v_q1_id, 'Skip testing before deployment', false, 4);

  INSERT INTO quiz_questions (quiz_id, question_text, question_type, points, order_index)
  VALUES (v_quiz_id, 'What is Docker used for in web development?', 'multiple_choice', 20, 2)
  RETURNING id INTO v_q2_id;

  INSERT INTO quiz_options (question_id, option_text, is_correct, order_index) VALUES
  (v_q2_id, 'Containerizing applications for consistent deployment across environments', true, 1),
  (v_q2_id, 'Writing CSS', false, 2),
  (v_q2_id, 'Database design', false, 3),
  (v_q2_id, 'Image editing', false, 4);

  INSERT INTO quiz_questions (quiz_id, question_text, question_type, points, order_index)
  VALUES (v_quiz_id, 'What is the purpose of load balancing?', 'multiple_choice', 20, 3)
  RETURNING id INTO v_q3_id;

  INSERT INTO quiz_options (question_id, option_text, is_correct, order_index) VALUES
  (v_q3_id, 'Distributing network traffic across multiple servers for better performance', true, 1),
  (v_q3_id, 'Reducing code size', false, 2),
  (v_q3_id, 'Compressing images', false, 3),
  (v_q3_id, 'Validating forms', false, 4);

  INSERT INTO quiz_questions (quiz_id, question_text, question_type, points, order_index)
  VALUES (v_quiz_id, 'What should you monitor in a production application?', 'multiple_choice', 20, 4)
  RETURNING id INTO v_q4_id;

  INSERT INTO quiz_options (question_id, option_text, is_correct, order_index) VALUES
  (v_q4_id, 'Server performance, error logs, user activity, and response times', true, 1),
  (v_q4_id, 'Only server uptime', false, 2),
  (v_q4_id, 'Nothing, it will work fine', false, 3),
  (v_q4_id, 'Only database size', false, 4);
END $$;

-- ============================================
-- COURSE 5: SQL Database Mastery
-- ============================================

-- Module 1 Quiz
DO $$
DECLARE
  v_quiz_id UUID;
  v_q1_id UUID;
  v_q2_id UUID;
  v_q3_id UUID;
BEGIN
  SELECT q.id INTO v_quiz_id
  FROM quizzes q
  JOIN course_modules cm ON q.module_id = cm.id
  JOIN courses c ON cm.course_id = c.id
  WHERE c.title = 'SQL Database Mastery' AND cm.order_index = 1;

  DELETE FROM quiz_options WHERE question_id IN (SELECT id FROM quiz_questions WHERE quiz_id = v_quiz_id);
  DELETE FROM quiz_questions WHERE quiz_id = v_quiz_id;

  INSERT INTO quiz_questions (quiz_id, question_text, question_type, points, order_index)
  VALUES (v_quiz_id, 'What does SQL stand for?', 'multiple_choice', 10, 1)
  RETURNING id INTO v_q1_id;

  INSERT INTO quiz_options (question_id, option_text, is_correct, order_index) VALUES
  (v_q1_id, 'Structured Query Language', true, 1),
  (v_q1_id, 'Simple Query Language', false, 2),
  (v_q1_id, 'Standard Question Language', false, 3),
  (v_q1_id, 'System Query Logic', false, 4);

  INSERT INTO quiz_questions (quiz_id, question_text, question_type, points, order_index)
  VALUES (v_quiz_id, 'Which SQL command is used to retrieve data from a database?', 'multiple_choice', 10, 2)
  RETURNING id INTO v_q2_id;

  INSERT INTO quiz_options (question_id, option_text, is_correct, order_index) VALUES
  (v_q2_id, 'SELECT', true, 1),
  (v_q2_id, 'GET', false, 2),
  (v_q2_id, 'FETCH', false, 3),
  (v_q2_id, 'RETRIEVE', false, 4);

  INSERT INTO quiz_questions (quiz_id, question_text, question_type, points, order_index)
  VALUES (v_quiz_id, 'What is a primary key?', 'multiple_choice', 10, 3)
  RETURNING id INTO v_q3_id;

  INSERT INTO quiz_options (question_id, option_text, is_correct, order_index) VALUES
  (v_q3_id, 'A unique identifier for each record in a table', true, 1),
  (v_q3_id, 'The first column in a table', false, 2),
  (v_q3_id, 'A password for the database', false, 3),
  (v_q3_id, 'The most important data field', false, 4);
END $$;

-- Module 2 Quiz
DO $$
DECLARE
  v_quiz_id UUID;
  v_q1_id UUID;
  v_q2_id UUID;
  v_q3_id UUID;
  v_q4_id UUID;
BEGIN
  SELECT q.id INTO v_quiz_id
  FROM quizzes q
  JOIN course_modules cm ON q.module_id = cm.id
  JOIN courses c ON cm.course_id = c.id
  WHERE c.title = 'SQL Database Mastery' AND cm.order_index = 2;

  DELETE FROM quiz_options WHERE question_id IN (SELECT id FROM quiz_questions WHERE quiz_id = v_quiz_id);
  DELETE FROM quiz_questions WHERE quiz_id = v_quiz_id;

  INSERT INTO quiz_questions (quiz_id, question_text, question_type, points, order_index)
  VALUES (v_quiz_id, 'What is a JOIN in SQL?', 'multiple_choice', 10, 1)
  RETURNING id INTO v_q1_id;

  INSERT INTO quiz_options (question_id, option_text, is_correct, order_index) VALUES
  (v_q1_id, 'A clause used to combine rows from two or more tables', true, 1),
  (v_q1_id, 'A way to delete data', false, 2),
  (v_q1_id, 'A method to create tables', false, 3),
  (v_q1_id, 'A backup command', false, 4);

  INSERT INTO quiz_questions (quiz_id, question_text, question_type, points, order_index)
  VALUES (v_quiz_id, 'What is the difference between INNER JOIN and LEFT JOIN?', 'multiple_choice', 10, 2)
  RETURNING id INTO v_q2_id;

  INSERT INTO quiz_options (question_id, option_text, is_correct, order_index) VALUES
  (v_q2_id, 'INNER JOIN returns only matching rows, LEFT JOIN returns all left table rows', true, 1),
  (v_q2_id, 'They are exactly the same', false, 2),
  (v_q2_id, 'LEFT JOIN is faster', false, 3),
  (v_q2_id, 'INNER JOIN returns more data', false, 4);

  INSERT INTO quiz_questions (quiz_id, question_text, question_type, points, order_index)
  VALUES (v_quiz_id, 'What does the GROUP BY clause do?', 'multiple_choice', 10, 3)
  RETURNING id INTO v_q3_id;

  INSERT INTO quiz_options (question_id, option_text, is_correct, order_index) VALUES
  (v_q3_id, 'Groups rows that have the same values in specified columns', true, 1),
  (v_q3_id, 'Sorts data alphabetically', false, 2),
  (v_q3_id, 'Deletes duplicate rows', false, 3),
  (v_q3_id, 'Creates a new table', false, 4);

  INSERT INTO quiz_questions (quiz_id, question_text, question_type, points, order_index)
  VALUES (v_quiz_id, 'Which aggregate function calculates the average?', 'multiple_choice', 10, 4)
  RETURNING id INTO v_q4_id;

  INSERT INTO quiz_options (question_id, option_text, is_correct, order_index) VALUES
  (v_q4_id, 'AVG()', true, 1),
  (v_q4_id, 'MEAN()', false, 2),
  (v_q4_id, 'AVERAGE()', false, 3),
  (v_q4_id, 'CALC()', false, 4);
END $$;

-- Module 3 Quiz
DO $$
DECLARE
  v_quiz_id UUID;
  v_q1_id UUID;
  v_q2_id UUID;
  v_q3_id UUID;
BEGIN
  SELECT q.id INTO v_quiz_id
  FROM quizzes q
  JOIN course_modules cm ON q.module_id = cm.id
  JOIN courses c ON cm.course_id = c.id
  WHERE c.title = 'SQL Database Mastery' AND cm.order_index = 3;

  DELETE FROM quiz_options WHERE question_id IN (SELECT id FROM quiz_questions WHERE quiz_id = v_quiz_id);
  DELETE FROM quiz_questions WHERE quiz_id = v_quiz_id;

  INSERT INTO quiz_questions (quiz_id, question_text, question_type, points, order_index)
  VALUES (v_quiz_id, 'What is database normalization?', 'multiple_choice', 15, 1)
  RETURNING id INTO v_q1_id;

  INSERT INTO quiz_options (question_id, option_text, is_correct, order_index) VALUES
  (v_q1_id, 'Organizing data to reduce redundancy and improve data integrity', true, 1),
  (v_q1_id, 'Making all data the same format', false, 2),
  (v_q1_id, 'Deleting old records', false, 3),
  (v_q1_id, 'Backing up the database', false, 4);

  INSERT INTO quiz_questions (quiz_id, question_text, question_type, points, order_index)
  VALUES (v_quiz_id, 'What is an index in SQL?', 'multiple_choice', 15, 2)
  RETURNING id INTO v_q2_id;

  INSERT INTO quiz_options (question_id, option_text, is_correct, order_index) VALUES
  (v_q2_id, 'A database object that improves the speed of data retrieval', true, 1),
  (v_q2_id, 'A list of all tables', false, 2),
  (v_q2_id, 'A type of join', false, 3),
  (v_q2_id, 'A backup file', false, 4);

  INSERT INTO quiz_questions (quiz_id, question_text, question_type, points, order_index)
  VALUES (v_quiz_id, 'What is a stored procedure?', 'multiple_choice', 15, 3)
  RETURNING id INTO v_q3_id;

  INSERT INTO quiz_options (question_id, option_text, is_correct, order_index) VALUES
  (v_q3_id, 'A prepared SQL code that can be saved and reused', true, 1),
  (v_q3_id, 'A temporary table', false, 2),
  (v_q3_id, 'A backup method', false, 3),
  (v_q3_id, 'A type of index', false, 4);
END $$;

-- Module 4 Quiz
DO $$
DECLARE
  v_quiz_id UUID;
  v_q1_id UUID;
  v_q2_id UUID;
  v_q3_id UUID;
  v_q4_id UUID;
BEGIN
  SELECT q.id INTO v_quiz_id
  FROM quizzes q
  JOIN course_modules cm ON q.module_id = cm.id
  JOIN courses c ON cm.course_id = c.id
  WHERE c.title = 'SQL Database Mastery' AND cm.order_index = 4;

  DELETE FROM quiz_options WHERE question_id IN (SELECT id FROM quiz_questions WHERE quiz_id = v_quiz_id);
  DELETE FROM quiz_questions WHERE quiz_id = v_quiz_id;

  INSERT INTO quiz_questions (quiz_id, question_text, question_type, points, order_index)
  VALUES (v_quiz_id, 'What is query optimization?', 'multiple_choice', 20, 1)
  RETURNING id INTO v_q1_id;

  INSERT INTO quiz_options (question_id, option_text, is_correct, order_index) VALUES
  (v_q1_id, 'The process of improving query performance and reducing execution time', true, 1),
  (v_q1_id, 'Writing longer queries', false, 2),
  (v_q1_id, 'Adding more tables', false, 3),
  (v_q1_id, 'Deleting indexes', false, 4);

  INSERT INTO quiz_questions (quiz_id, question_text, question_type, points, order_index)
  VALUES (v_quiz_id, 'What is a transaction in SQL?', 'multiple_choice', 20, 2)
  RETURNING id INTO v_q2_id;

  INSERT INTO quiz_options (question_id, option_text, is_correct, order_index) VALUES
  (v_q2_id, 'A sequence of operations performed as a single logical unit of work', true, 1),
  (v_q2_id, 'A type of table', false, 2),
  (v_q2_id, 'A backup operation', false, 3),
  (v_q2_id, 'A user permission', false, 4);

  INSERT INTO quiz_questions (quiz_id, question_text, question_type, points, order_index)
  VALUES (v_quiz_id, 'What does ACID stand for in database transactions?', 'multiple_choice', 20, 3)
  RETURNING id INTO v_q3_id;

  INSERT INTO quiz_options (question_id, option_text, is_correct, order_index) VALUES
  (v_q3_id, 'Atomicity, Consistency, Isolation, Durability', true, 1),
  (v_q3_id, 'Access, Control, Identity, Data', false, 2),
  (v_q3_id, 'Automatic, Consistent, Indexed, Durable', false, 3),
  (v_q3_id, 'Advanced, Complete, Integrated, Database', false, 4);

  INSERT INTO quiz_questions (quiz_id, question_text, question_type, points, order_index)
  VALUES (v_quiz_id, 'What is the best practice for database security?', 'multiple_choice', 20, 4)
  RETURNING id INTO v_q4_id;

  INSERT INTO quiz_options (question_id, option_text, is_correct, order_index) VALUES
  (v_q4_id, 'Use parameterized queries, encrypt sensitive data, implement access controls', true, 1),
  (v_q4_id, 'Give everyone admin access', false, 2),
  (v_q4_id, 'Store passwords in plain text', false, 3),
  (v_q4_id, 'Disable all security features', false, 4);
END $$;

-- ============================================
-- VERIFICATION QUERY
-- ============================================

-- Run this to verify all questions were added
SELECT 
  c.title as course,
  cm.order_index as module_num,
  cm.title as module_title,
  mq.title as quiz_title,
  COUNT(qq.id) as question_count
FROM courses c
JOIN course_modules cm ON c.id = cm.course_id
LEFT JOIN quizzes mq ON cm.id = mq.module_id
LEFT JOIN quiz_questions qq ON mq.id = qq.quiz_id
GROUP BY c.title, cm.order_index, cm.title, mq.title
ORDER BY c.title, cm.order_index;
