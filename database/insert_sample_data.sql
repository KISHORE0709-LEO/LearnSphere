-- ============================================
-- Insert Sample Data for Dashboard & Reporting
-- ============================================

-- Insert sample enrollments with various statuses
DO $$
DECLARE
    v_learner_ids UUID[];
    v_course_ids UUID[];
    v_lesson_ids UUID[];
    v_enrollment_id UUID;
BEGIN
    -- Get existing learner IDs
    SELECT ARRAY_AGG(id) INTO v_learner_ids FROM users WHERE role = 'learner' LIMIT 10;
    
    -- Get existing course IDs
    SELECT ARRAY_AGG(id) INTO v_course_ids FROM courses WHERE is_published = true LIMIT 5;
    
    -- If no data exists, exit
    IF v_learner_ids IS NULL OR v_course_ids IS NULL THEN
        RAISE NOTICE 'No learners or courses found. Please ensure you have users and courses in the database.';
        RETURN;
    END IF;
    
    -- Create enrollments for each learner-course combination
    FOR i IN 1..LEAST(array_length(v_learner_ids, 1), 10) LOOP
        FOR j IN 1..LEAST(array_length(v_course_ids, 1), 3) LOOP
            -- Insert enrollment
            INSERT INTO enrollments (
                user_id,
                course_id,
                enrollment_date,
                last_accessed,
                progress_percentage,
                is_completed,
                completion_date
            ) VALUES (
                v_learner_ids[i],
                v_course_ids[j],
                CURRENT_TIMESTAMP - (random() * 30 || ' days')::INTERVAL,
                CASE 
                    WHEN random() > 0.2 THEN CURRENT_TIMESTAMP - (random() * 20 || ' days')::INTERVAL
                    ELSE NULL
                END,
                CASE 
                    WHEN random() > 0.2 THEN floor(random() * 100)
                    ELSE 0
                END,
                random() > 0.7,
                CASE 
                    WHEN random() > 0.7 THEN CURRENT_TIMESTAMP - (random() * 10 || ' days')::INTERVAL
                    ELSE NULL
                END
            )
            ON CONFLICT (user_id, course_id) DO NOTHING
            RETURNING id INTO v_enrollment_id;
            
            -- Add lesson progress if enrollment was created
            IF v_enrollment_id IS NOT NULL THEN
                -- Get lessons for this course
                SELECT ARRAY_AGG(id) INTO v_lesson_ids 
                FROM lessons 
                WHERE course_id = v_course_ids[j] 
                LIMIT 5;
                
                -- Add progress for some lessons
                IF v_lesson_ids IS NOT NULL THEN
                    FOR k IN 1..LEAST(array_length(v_lesson_ids, 1), floor(random() * 5 + 1)::int) LOOP
                        INSERT INTO lesson_progress (
                            enrollment_id,
                            lesson_id,
                            status,
                            started_at,
                            completed_at,
                            time_spent
                        ) VALUES (
                            v_enrollment_id,
                            v_lesson_ids[k],
                            CASE 
                                WHEN random() > 0.3 THEN 'completed'
                                ELSE 'in-progress'
                            END,
                            CURRENT_TIMESTAMP - (random() * 15 || ' days')::INTERVAL,
                            CASE 
                                WHEN random() > 0.3 THEN CURRENT_TIMESTAMP - (random() * 10 || ' days')::INTERVAL
                                ELSE NULL
                            END,
                            floor(random() * 3600 + 300)::int
                        )
                        ON CONFLICT (enrollment_id, lesson_id) DO NOTHING;
                    END LOOP;
                END IF;
            END IF;
        END LOOP;
    END LOOP;
    
    RAISE NOTICE 'Sample enrollment data inserted successfully!';
END $$;

-- Update course enrollment counts
UPDATE courses c
SET total_enrollments = (
    SELECT COUNT(*) FROM enrollments WHERE course_id = c.id
)
WHERE is_published = true;

-- Display summary
SELECT 
    'Total Enrollments' as metric,
    COUNT(*) as count
FROM enrollments
UNION ALL
SELECT 
    'Completed',
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
WHERE last_accessed IS NULL
UNION ALL
SELECT
    'Total Lesson Progress',
    COUNT(*)
FROM lesson_progress;

-- Show sample enrollments
SELECT 
    c.title as course,
    u.name as learner,
    e.enrollment_date,
    e.progress_percentage,
    CASE 
        WHEN e.is_completed THEN 'Completed'
        WHEN e.last_accessed IS NOT NULL THEN 'In Progress'
        ELSE 'Yet to Start'
    END as status,
    COALESCE(SUM(lp.time_spent), 0) as total_time_seconds
FROM enrollments e
JOIN courses c ON e.course_id = c.id
JOIN users u ON e.user_id = u.id
LEFT JOIN lesson_progress lp ON lp.enrollment_id = e.id
GROUP BY c.title, u.name, e.enrollment_date, e.progress_percentage, e.is_completed, e.last_accessed
ORDER BY e.enrollment_date DESC
LIMIT 20;
