-- Add missing quizzes for modules 4 and 8
-- This will create quizzes for ALL modules that should have them

DO $$
DECLARE
  module_rec RECORD;
  quiz_id UUID;
BEGIN

-- Find all modules with order_index 4 or 8 that don't have quizzes
FOR module_rec IN 
  SELECT cm.id, cm.order_index, cm.title, c.title as course_title
  FROM course_modules cm
  JOIN courses c ON cm.course_id = c.id
  WHERE cm.order_index IN (4, 8)
  AND NOT EXISTS (SELECT 1 FROM module_quizzes WHERE module_id = cm.id)
  ORDER BY c.title, cm.order_index
LOOP
  RAISE NOTICE 'Creating quiz for: % - Module %', module_rec.course_title, module_rec.order_index;
  
  INSERT INTO module_quizzes (
    module_id, 
    title, 
    description, 
    passing_score, 
    time_limit,
    points_first_attempt,
    points_second_attempt,
    points_third_attempt,
    points_more_attempts
  ) VALUES (
    module_rec.id,
    CASE 
      WHEN module_rec.order_index = 4 THEN 'Quiz 2: Core Concepts'
      WHEN module_rec.order_index = 8 THEN 'Final Assessment'
    END,
    'Test your knowledge',
    70,
    CASE WHEN module_rec.order_index = 8 THEN 60 ELSE 30 END,
    20, 15, 10, 5
  ) RETURNING id INTO quiz_id;
  
  RAISE NOTICE '  Created quiz ID: %', quiz_id;
END LOOP;

RAISE NOTICE 'Done! All quizzes created.';

END $$;
