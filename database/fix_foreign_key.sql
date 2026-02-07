-- Check the foreign key constraint
SELECT 
    tc.constraint_name, 
    tc.table_name, 
    kcu.column_name, 
    ccu.table_name AS foreign_table_name,
    ccu.column_name AS foreign_column_name 
FROM information_schema.table_constraints AS tc 
JOIN information_schema.key_column_usage AS kcu
  ON tc.constraint_name = kcu.constraint_name
JOIN information_schema.constraint_column_usage AS ccu
  ON ccu.constraint_name = tc.constraint_name
WHERE tc.table_name = 'quiz_questions' AND tc.constraint_type = 'FOREIGN KEY';

-- Drop old constraint and add new one
ALTER TABLE quiz_questions DROP CONSTRAINT IF EXISTS quiz_questions_quiz_id_fkey;
ALTER TABLE quiz_questions ADD CONSTRAINT quiz_questions_quiz_id_fkey 
  FOREIGN KEY (quiz_id) REFERENCES module_quizzes(id) ON DELETE CASCADE;

-- Verify
SELECT 'Foreign key fixed!' as status;
