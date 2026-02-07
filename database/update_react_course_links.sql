-- Update Advanced React Patterns course with correct module topics and links
-- This script updates the module_topics table for the Advanced React Patterns course

DO $$
DECLARE
  react_course_id UUID;
  module1_id UUID;
  module2_id UUID;
  module3_id UUID;
  module4_id UUID;
  module5_id UUID;
  module6_id UUID;
  module7_id UUID;
  module8_id UUID;
BEGIN
  -- Get the Advanced React Patterns course ID
  SELECT id INTO react_course_id FROM courses WHERE title = 'Advanced React Patterns';
  
  IF react_course_id IS NULL THEN
    RAISE NOTICE 'Advanced React Patterns course not found';
    RETURN;
  END IF;

  -- Delete existing modules and topics for this course
  DELETE FROM course_modules WHERE course_id = react_course_id;

  -- Module 1: Introduction & Fundamentals (Overview, Setup, Architecture)
  INSERT INTO course_modules (course_id, title, description, order_index)
  VALUES (react_course_id, 'Module 1: Introduction & Fundamentals', 'Overview, Setup, Architecture', 1)
  RETURNING id INTO module1_id;
  
  INSERT INTO module_topics (module_id, title, content_type, duration, order_index, content_url, description)
  VALUES 
    (module1_id, 'Advanced React Overview – Kent C. Dodds', 'video', 0, 1, 'https://www.youtube.com/embed/9i1QxU8wW0M', 'YouTube: Advanced React Overview'),
    (module1_id, 'React Architecture Explained – Fireship', 'video', 0, 2, 'https://www.youtube.com/embed/RKd0c-3Q1kY', 'YouTube: React Architecture Explained'),
    (module1_id, 'React component tree & rendering flow', 'image', 0, 3, 'https://react.dev/learn/understanding-your-ui-as-a-tree', 'Image: React component tree & rendering flow'),
    (module1_id, 'React architecture overview', 'image', 0, 4, 'https://www.geeksforgeeks.org/reactjs-architecture/', 'Image: React architecture overview'),
    (module1_id, 'React Official Docs (Modern React)', 'document', 0, 5, 'https://react.dev/', 'Document: React Official Docs'),
    (module1_id, 'Thinking in React', 'document', 0, 6, 'https://react.dev/learn/thinking-in-react', 'Document: Thinking in React');

  -- Module 2: Introduction & Fundamentals + Quiz (Setup, Architecture Diagram, Tooling)
  INSERT INTO course_modules (course_id, title, description, order_index)
  VALUES (react_course_id, 'Module 2: Introduction & Fundamentals + Quiz', 'Setup, Architecture Diagram, Tooling', 2)
  RETURNING id INTO module2_id;
  
  INSERT INTO module_topics (module_id, title, content_type, duration, order_index, content_url, description)
  VALUES 
    (module2_id, 'Modern React Setup (Vite + React) – Traversy Media', 'video', 0, 1, 'https://www.youtube.com/embed/VaZ9p1qY5-0', 'YouTube: Modern React Setup'),
    (module2_id, 'How React Works Internally – Akshay Saini', 'video', 0, 2, 'https://www.youtube.com/embed/i793Qm6kv3U', 'YouTube: How React Works Internally'),
    (module2_id, 'React render + reconciliation diagram', 'image', 0, 3, 'https://react.dev/learn/render-and-commit', 'Image: React render + reconciliation diagram'),
    (module2_id, 'Virtual DOM flow', 'image', 0, 4, 'https://www.geeksforgeeks.org/reactjs-virtual-dom/', 'Image: Virtual DOM flow'),
    (module2_id, 'Vite + React Docs', 'document', 0, 5, 'https://vitejs.dev/guide/', 'Document: Vite + React Docs'),
    (module2_id, 'React Rendering Process', 'document', 0, 6, 'https://react.dev/learn/render-and-commit', 'Document: React Rendering Process');

  INSERT INTO module_quizzes (module_id, title, description, passing_score, time_limit)
  VALUES (module2_id, 'Module 2 Quiz', 'Test your understanding of React fundamentals', 70, 30);

  -- Module 3: Core Concepts & Features (Key patterns, workflow, flow charts)
  INSERT INTO course_modules (course_id, title, description, order_index)
  VALUES (react_course_id, 'Module 3: Core Concepts & Features', 'Key patterns, workflow, flow charts', 3)
  RETURNING id INTO module3_id;
  
  INSERT INTO module_topics (module_id, title, content_type, duration, order_index, content_url, description)
  VALUES 
    (module3_id, 'Advanced React Patterns – Kent C. Dodds', 'video', 0, 1, 'https://www.youtube.com/embed/hEGg-3pIHlE', 'YouTube: Advanced React Patterns'),
    (module3_id, 'Compound Components Pattern', 'video', 0, 2, 'https://www.youtube.com/embed/6p-9j8z2cL8', 'YouTube: Compound Components Pattern'),
    (module3_id, 'Compound component structure', 'image', 0, 3, 'https://kentcdodds.com/blog/compound-components-with-react-hooks', 'Image: Compound component structure'),
    (module3_id, 'React hooks data flow', 'image', 0, 4, 'https://react.dev/learn/reusing-logic-with-custom-hooks', 'Image: React hooks data flow'),
    (module3_id, 'Patterns by Kent C. Dodds', 'document', 0, 5, 'https://kentcdodds.com/blog/application-state-management-with-react', 'Document: Patterns by Kent C. Dodds'),
    (module3_id, 'Custom Hooks Guide', 'document', 0, 6, 'https://react.dev/learn/reusing-logic-with-custom-hooks', 'Document: Custom Hooks Guide');

  -- Module 4: Core Concepts & Features (Best Practices, Workflow, Patterns)
  INSERT INTO course_modules (course_id, title, description, order_index)
  VALUES (react_course_id, 'Module 4: Core Concepts & Features', 'Best Practices, Workflow, Patterns', 4)
  RETURNING id INTO module4_id;
  
  INSERT INTO module_topics (module_id, title, content_type, duration, order_index, content_url, description)
  VALUES 
    (module4_id, 'Controlled vs Uncontrolled Components', 'video', 0, 1, 'https://www.youtube.com/embed/IkMND33x0qQ', 'YouTube: Controlled vs Uncontrolled Components'),
    (module4_id, 'Render Props & HOC Patterns', 'video', 0, 2, 'https://www.youtube.com/embed/BcVAq3YFiuc', 'YouTube: Render Props & HOC Patterns'),
    (module4_id, 'HOC vs Render Props comparison', 'image', 0, 3, 'https://www.patterns.dev/react', 'Image: HOC vs Render Props comparison'),
    (module4_id, 'State lifting & data flow', 'image', 0, 4, 'https://react.dev/learn/sharing-state-between-components', 'Image: State lifting & data flow'),
    (module4_id, 'React Patterns (Official-friendly)', 'document', 0, 5, 'https://www.patterns.dev/react', 'Document: React Patterns'),
    (module4_id, 'Sharing State Best Practices', 'document', 0, 6, 'https://react.dev/learn/sharing-state-between-components', 'Document: Sharing State Best Practices');

  -- Module 5: Advanced Techniques (Advanced configuration & optimization)
  INSERT INTO course_modules (course_id, title, description, order_index)
  VALUES (react_course_id, 'Module 5: Advanced Techniques', 'Advanced configuration & optimization', 5)
  RETURNING id INTO module5_id;
  
  INSERT INTO module_topics (module_id, title, content_type, duration, order_index, content_url, description)
  VALUES 
    (module5_id, 'React Performance Optimization – Fireship', 'video', 0, 1, 'https://www.youtube.com/embed/0ZJgIjIuY7U', 'YouTube: React Performance Optimization'),
    (module5_id, 'useMemo, useCallback Explained', 'video', 0, 2, 'https://www.youtube.com/embed/THL1OPn72vo', 'YouTube: useMemo, useCallback Explained'),
    (module5_id, 'Memoization flow in React', 'image', 0, 3, 'https://react.dev/reference/react/useMemo', 'Image: Memoization flow in React'),
    (module5_id, 'Re-render optimization diagram', 'image', 0, 4, 'https://www.geeksforgeeks.org/reactjs-performance-optimization/', 'Image: Re-render optimization diagram'),
    (module5_id, 'React Performance Docs', 'document', 0, 5, 'https://react.dev/learn/optimizing-performance', 'Document: React Performance Docs'),
    (module5_id, 'useMemo & useCallback', 'document', 0, 6, 'https://react.dev/reference/react/useCallback', 'Document: useMemo & useCallback');

  -- Module 6: Advanced Techniques + Quiz (Masterclass-level patterns)
  INSERT INTO course_modules (course_id, title, description, order_index)
  VALUES (react_course_id, 'Module 6: Advanced Techniques + Quiz', 'Masterclass-level patterns', 6)
  RETURNING id INTO module6_id;
  
  INSERT INTO module_topics (module_id, title, content_type, duration, order_index, content_url, description)
  VALUES 
    (module6_id, 'State Management Patterns (Context vs Redux)', 'video', 0, 1, 'https://www.youtube.com/embed/35lXWvCuM8o', 'YouTube: State Management Patterns'),
    (module6_id, 'Advanced Hooks & Patterns – Kent C. Dodds', 'video', 0, 2, 'https://www.youtube.com/embed/3XaXKiXtNjw', 'YouTube: Advanced Hooks & Patterns'),
    (module6_id, 'Context API data flow', 'image', 0, 3, 'https://react.dev/reference/react/useContext', 'Image: Context API data flow'),
    (module6_id, 'State management comparison', 'image', 0, 4, 'https://www.patterns.dev/react/state-management', 'Image: State management comparison'),
    (module6_id, 'Context API Docs', 'document', 0, 5, 'https://react.dev/reference/react/useContext', 'Document: Context API Docs'),
    (module6_id, 'When to use Redux', 'document', 0, 6, 'https://redux.js.org/style-guide/style-guide', 'Document: When to use Redux');

  INSERT INTO module_quizzes (module_id, title, description, passing_score, time_limit)
  VALUES (module6_id, 'Module 6 Quiz', 'Test your advanced techniques knowledge', 75, 35);

  -- Module 7: Practical Applications (Real-world use cases & implementation)
  INSERT INTO course_modules (course_id, title, description, order_index)
  VALUES (react_course_id, 'Module 7: Practical Applications', 'Real-world use cases & implementation', 7)
  RETURNING id INTO module7_id;
  
  INSERT INTO module_topics (module_id, title, content_type, duration, order_index, content_url, description)
  VALUES 
    (module7_id, 'Real-world React Architecture', 'video', 0, 1, 'https://www.youtube.com/embed/GzvZfQvYJxI', 'YouTube: Real-world React Architecture'),
    (module7_id, 'Building Scalable React Apps', 'video', 0, 2, 'https://www.youtube.com/embed/1fiDq2v3nV0', 'YouTube: Building Scalable React Apps'),
    (module7_id, 'Scalable React folder structure', 'image', 0, 3, 'https://www.geeksforgeeks.org/reactjs-folder-structure/', 'Image: Scalable React folder structure'),
    (module7_id, 'Feature-based architecture', 'image', 0, 4, 'https://www.patterns.dev/react/feature-folder', 'Image: Feature-based architecture'),
    (module7_id, 'Bulletproof React Architecture', 'document', 0, 5, 'https://github.com/alan2207/bulletproof-react', 'Document: Bulletproof React Architecture'),
    (module7_id, 'React Project Structuring', 'document', 0, 6, 'https://react.dev/learn/scaling-up-with-reducer-and-context', 'Document: React Project Structuring');

  -- Module 8: Practical Applications & Projects + Final Assessment
  INSERT INTO course_modules (course_id, title, description, order_index)
  VALUES (react_course_id, 'Module 8: Practical Applications & Projects + Final Assessment', 'Projects, templates, workshops', 8)
  RETURNING id INTO module8_id;
  
  INSERT INTO module_topics (module_id, title, content_type, duration, order_index, content_url, description)
  VALUES 
    (module8_id, 'Advanced React Project (Patterns used)', 'video', 0, 1, 'https://www.youtube.com/embed/Zq5fmkH0T78', 'YouTube: Advanced React Project'),
    (module8_id, 'React Interview-Level Patterns', 'video', 0, 2, 'https://www.youtube.com/embed/KJP1E-Y-xyo', 'YouTube: React Interview-Level Patterns'),
    (module8_id, 'Project architecture (React apps)', 'image', 0, 3, 'https://www.patterns.dev/react', 'Image: Project architecture'),
    (module8_id, 'Production React flow', 'image', 0, 4, 'https://vercel.com/docs/concepts/architecture', 'Image: Production React flow'),
    (module8_id, 'React Advanced Patterns Repo', 'document', 0, 5, 'https://github.com/chesterheng/advanced-react-patterns', 'Document: React Advanced Patterns Repo'),
    (module8_id, 'React + Vercel Deployment', 'document', 0, 6, 'https://vercel.com/docs', 'Document: React + Vercel Deployment');

  INSERT INTO module_quizzes (module_id, title, description, passing_score, time_limit)
  VALUES (module8_id, 'Final Assessment', 'Comprehensive final exam covering all modules', 85, 60);

  RAISE NOTICE 'Successfully updated Advanced React Patterns course with 8 modules and correct links';
END $$;
