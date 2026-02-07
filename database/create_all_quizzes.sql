-- COMPLETE FIX: Create quizzes for all modules
-- This ensures every module that should have a quiz gets one

DO $$
DECLARE
  course_rec RECORD;
  module_rec RECORD;
  quiz_id UUID;
BEGIN

-- Loop through each course
FOR course_rec IN 
  SELECT id, title FROM courses 
  WHERE title IN ('SQL Database Mastery', 'Basics of Odoo CRM', 'Advanced React Patterns', 'Full Stack Web Development', 'Python for Data Science')
LOOP
  RAISE NOTICE 'Processing course: %', course_rec.title;
  
  -- Get modules 2, 4, 6, 8 for this course
  FOR module_rec IN 
    SELECT id, order_index, title FROM course_modules 
    WHERE course_id = course_rec.id AND order_index IN (2, 4, 6, 8)
    ORDER BY order_index
  LOOP
    RAISE NOTICE '  Creating quiz for module %: %', module_rec.order_index, module_rec.title;
    
    -- Delete existing quiz if any
    DELETE FROM module_quizzes WHERE module_id = module_rec.id;
    
    -- Create quiz
    INSERT INTO module_quizzes (module_id, title, description, passing_score, time_limit, points_first_attempt, points_second_attempt, points_third_attempt, points_more_attempts)
    VALUES (
      module_rec.id,
      CASE module_rec.order_index
        WHEN 2 THEN 'Quiz 1: Fundamentals'
        WHEN 4 THEN 'Quiz 2: Core Concepts'
        WHEN 6 THEN 'Quiz 3: Advanced Techniques'
        WHEN 8 THEN 'Final Assessment'
      END,
      'Test your knowledge',
      70,
      30,
      20, 15, 10, 5
    ) RETURNING id INTO quiz_id;
    
    RAISE NOTICE '    Quiz created with ID: %', quiz_id;
  END LOOP;
END LOOP;

RAISE NOTICE 'All quizzes created successfully!';

END $$;

-- Now add questions
\i add_quiz_questions_part1.sql
\i add_quiz_questions_part2.sql
