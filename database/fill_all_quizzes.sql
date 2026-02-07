-- Delete all old quiz questions
DELETE FROM quiz_options;
DELETE FROM quiz_questions;

-- Add questions to ALL module_quizzes
DO $$
DECLARE
  quiz_rec RECORD;
  q_id UUID;
BEGIN

FOR quiz_rec IN SELECT id, title FROM module_quizzes ORDER BY id LOOP
  RAISE NOTICE 'Adding questions to quiz: %', quiz_rec.title;
  
  -- Question 1
  INSERT INTO quiz_questions (quiz_id, question_text, question_type, order_index, points) VALUES
  (quiz_rec.id, 'What is the main concept covered in this module?', 'multiple_choice', 1, 1) RETURNING id INTO q_id;
  INSERT INTO quiz_options (question_id, option_text, is_correct, order_index) VALUES
  (q_id, 'Basic fundamentals', false, 1),
  (q_id, 'Core concepts and practical applications', true, 2),
  (q_id, 'Advanced theory only', false, 3),
  (q_id, 'None of the above', false, 4);

  -- Question 2
  INSERT INTO quiz_questions (quiz_id, question_text, question_type, order_index, points) VALUES
  (quiz_rec.id, 'Which approach is recommended for learning?', 'multiple_choice', 2, 1) RETURNING id INTO q_id;
  INSERT INTO quiz_options (question_id, option_text, is_correct, order_index) VALUES
  (q_id, 'Theory only', false, 1),
  (q_id, 'Practice only', false, 2),
  (q_id, 'Theory combined with hands-on practice', true, 3),
  (q_id, 'Memorization', false, 4);

  -- Question 3
  INSERT INTO quiz_questions (quiz_id, question_text, question_type, order_index, points) VALUES
  (quiz_rec.id, 'What is the best way to master the concepts?', 'multiple_choice', 3, 1) RETURNING id INTO q_id;
  INSERT INTO quiz_options (question_id, option_text, is_correct, order_index) VALUES
  (q_id, 'Read once', false, 1),
  (q_id, 'Watch videos only', false, 2),
  (q_id, 'Practice and apply in real projects', true, 3),
  (q_id, 'Skip exercises', false, 4);

END LOOP;

RAISE NOTICE 'All quizzes now have 3 questions!';
END $$;
