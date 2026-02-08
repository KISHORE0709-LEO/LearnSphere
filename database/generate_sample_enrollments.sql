-- ============================================
-- Generate Sample Enrollment Data for Testing
-- Run this ONLY if you need test data
-- ============================================

-- This script creates sample enrollments and progress data
-- to test the dashboard and reporting features

DO $$
DECLARE
    v_course_id UUID;
    v_user_id UUID;
    v_enrollment_id UUID;
    v_lesson_id UUID;
    v_random_progress INT;
    v_random_time INT;
    v_enrollment_date TIMESTAMP;
BEGIN
    -- Loop through existing courses
    FOR v_course_id IN (SELECT id FROM courses WHERE is_published = true LIMIT 5)
    LOOP
        -- Loop through learner users
        FOR v_user_id IN (SELECT id FROM users WHERE role = 'learner' LIMIT 10)
        LOOP
            -- Random enrollment date in last 30 days
            v_enrollment_date := CURRENT_TIMESTAMP - (random() * 30 || ' days')::INTERVAL;
            
            -- Random progress percentage
            v_random_progress := floor(random() * 100);
            
            -- Create enrollment if not exists
            INSERT INTO enrollments (
                user_id, 
                course_id, 
                enrollment_date,
                last_accessed,
                progress_percentage,
                is_completed
            )
            VALUES (
                v_user_id,
                v_course_id,
                v_enrollment_date,
                CASE 
                    WHEN v_random_progress > 0 THEN v_enrollment_date + (random() * 5 || ' days')::INTERVAL
                    ELSE NULL
                END,
                v_random_progress,
                v_random_progress = 100
            )
            ON CONFLICT (user_id, course_id) DO NOTHING
            RETURNING id INTO v_enrollment_id;
            
            -- If enrollment was created, add lesson progress
            IF v_enrollment_id IS NOT NULL AND v_random_progress > 0 THEN
                -- Add progress for some lessons
                FOR v_lesson_id IN (
                    SELECT id FROM lessons 
                    WHERE course_id = v_course_id 
                    ORDER BY order_index 
                    LIMIT (v_random_progress / 20)
                )
                LOOP
                    v_random_time := floor(random() * 3600) + 300; -- 5 min to 1 hour
                    
                    INSERT INTO lesson_progress (
                        enrollment_id,
                        lesson_id,
                        status,
                        started_at,
                        completed_at,
                        time_spent
                    )
                    VALUES (
                        v_enrollment_id,
                        v_lesson_id,
                        'completed',
                        v_enrollment_date + (random() * 10 || ' days')::INTERVAL,
                        v_enrollment_date + (random() * 15 || ' days')::INTERVAL,
                        v_random_time
                    )
                    ON CONFLICT (enrollment_id, lesson_id) DO NOTHING;
                END LOOP;
            END IF;
        END LOOP;
    END LOOP;
    
    RAISE NOTICE 'Sample enrollment data generated successfully!';
END $$;

-- Update course enrollment counts
UPDATE courses c
SET total_enrollments = (
    SELECT COUNT(*) FROM enrollments WHERE course_id = c.id
)
WHERE is_published = true;

-- Verify the data
SELECT 
    'Total Enrollments' as metric,
    COUNT(*) as count
FROM enrollments
UNION ALL
SELECT 
    'Completed Enrollments',
    COUNT(*)
FROM enrollments
WHERE is_completed = true
UNION ALL
SELECT 
    'In Progress',
    COUNT(*)
FROM enrollments
WHERE last_accessed IS NOT NULL AND is_completed = false
UNION ALL
SELECT 
    'Yet to Start',
    COUNT(*)
FROM enrollments
WHERE last_accessed IS NULL;

-- Show sample data
SELECT 
    c.title as course,
    u.name as learner,
    e.enrollment_date,
    e.progress_percentage,
    e.is_completed,
    COALESCE(SUM(lp.time_spent), 0) as total_time_seconds
FROM enrollments e
JOIN courses c ON e.course_id = c.id
JOIN users u ON e.user_id = u.id
LEFT JOIN lesson_progress lp ON lp.enrollment_id = e.id
GROUP BY c.title, u.name, e.enrollment_date, e.progress_percentage, e.is_completed
ORDER BY e.enrollment_date DESC
LIMIT 20;
