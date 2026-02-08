-- ============================================
-- Add indexes for reporting and dashboard queries
-- ============================================

-- Indexes for enrollment queries
CREATE INDEX IF NOT EXISTS idx_enrollments_enrollment_date ON enrollments(enrollment_date DESC);
CREATE INDEX IF NOT EXISTS idx_enrollments_completion_date ON enrollments(completion_date DESC);
CREATE INDEX IF NOT EXISTS idx_enrollments_is_completed ON enrollments(is_completed);
CREATE INDEX IF NOT EXISTS idx_enrollments_last_accessed ON enrollments(last_accessed DESC);

-- Indexes for lesson progress queries
CREATE INDEX IF NOT EXISTS idx_lesson_progress_time_spent ON lesson_progress(time_spent);
CREATE INDEX IF NOT EXISTS idx_lesson_progress_started_at ON lesson_progress(started_at DESC);
CREATE INDEX IF NOT EXISTS idx_lesson_progress_completed_at ON lesson_progress(completed_at DESC);

-- Indexes for courses queries
CREATE INDEX IF NOT EXISTS idx_courses_created_at ON courses(created_at DESC);

-- Composite indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_enrollments_user_course ON enrollments(user_id, course_id);
CREATE INDEX IF NOT EXISTS idx_lesson_progress_enrollment_lesson ON lesson_progress(enrollment_id, lesson_id);

-- Verify indexes
SELECT 
    tablename,
    indexname,
    indexdef
FROM pg_indexes
WHERE schemaname = 'public'
AND tablename IN ('enrollments', 'lesson_progress', 'courses')
ORDER BY tablename, indexname;
