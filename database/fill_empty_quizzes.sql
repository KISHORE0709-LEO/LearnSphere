-- Fill all quizzes that have 0 questions
DO $$
DECLARE
  quiz_rec RECORD;
  q_id UUID;
  question_count INT;
BEGIN

FOR quiz_rec IN 
  SELECT mq.id, mq.title 
  FROM module_quizzes mq
  LEFT JOIN quiz_questions qq ON qq.quiz_id = mq.id
  GROUP BY mq.id, mq.title
  HAVING COUNT(qq.id) = 0
LOOP
  RAISE NOTICE 'Adding questions to: %', quiz_rec.title;
  
  INSERT INTO quiz_questions (quiz_id, question_text, question_type, order_index, points) VALUES
  (quiz_rec.id, 'What is the key concept in this module?', 'multiple_choice', 1, 1) RETURNING id INTO q_id;
  INSERT INTO quiz_options (question_id, option_text, is_correct, order_index) VALUES
  (q_id, 'Basic theory', false, 1), (q_id, 'Practical application and understanding', true, 2), (q_id, 'Memorization', false, 3), (q_id, 'None', false, 4);

  INSERT INTO quiz_questions (quiz_id, question_text, question_type, order_index, points) VALUES
  (quiz_rec.id, 'How should you approach learning this topic?', 'multiple_choice', 2, 1) RETURNING id INTO q_id;
  INSERT INTO quiz_options (question_id, option_text, is_correct, order_index) VALUES
  (q_id, 'Skip practice', false, 1), (q_id, 'Theory and hands-on practice', true, 2), (q_id, 'Only watch videos', false, 3), (q_id, 'Memorize only', false, 4);

  INSERT INTO quiz_questions (quiz_id, question_text, question_type, order_index, points) VALUES
  (quiz_rec.id, 'What is the best way to master these skills?', 'multiple_choice', 3, 1) RETURNING id INTO q_id;
  INSERT INTO quiz_options (question_id, option_text, is_correct, order_index) VALUES
  (q_id, 'Read once', false, 1), (q_id, 'Build real projects', true, 2), (q_id, 'Theory only', false, 3), (q_id, 'Skip exercises', false, 4);

END LOOP;

RAISE NOTICE 'All empty quizzes filled!';
END $$;
