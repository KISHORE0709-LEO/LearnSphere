-- Check actual quiz table structure
SELECT table_name, column_name, data_type 
FROM information_schema.columns 
WHERE table_name IN ('quizzes', 'module_quizzes')
ORDER BY table_name, ordinal_position;
