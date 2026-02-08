-- ============================================
-- Check Database and Insert Data
-- ============================================

-- First, let's see what we have
SELECT 'INSTRUCTORS' as info, COUNT(*) as count FROM users WHERE role IN ('instructor', 'admin')
UNION ALL
SELECT 'LEARNERS', COUNT(*) FROM users WHERE role = 'learner'
UNION ALL
SELECT 'COURSES', COUNT(*) FROM courses
UNION ALL
SELECT 'PUBLISHED COURSES', COUNT(*) FROM courses WHERE is_published = true
UNION ALL
SELECT 'LESSONS', COUNT(*) FROM lessons
UNION ALL
SELECT 'ENROLLMENTS', COUNT(*) FROM enrollments;

-- Show instructors and their courses
SELECT 
    u.email as instructor_email,
    u.name as instructor_name,
    COUNT(c.id) as total_courses,
    COUNT(CASE WHEN c.is_published THEN 1 END) as published_courses
FROM users u
LEFT JOIN courses c ON c.instructor_id = u.id
WHERE u.role IN ('instructor', 'admin')
GROUP BY u.id, u.email, u.name;

-- Now insert the data
DO $$
DECLARE
    v_instructor_id UUID;
    v_learner_id UUID;
    v_course_id UUID;
    v_lesson_id UUID;
    v_enrollment_id UUID;
    v_count INT := 0;
BEGIN
    -- Create learners if none exist
    FOR i IN 1..20 LOOP
        INSERT INTO users (email, password_hash, name, role)
        VALUES (
            'student' || i || '@learnsphere.com',
            '$2b$10$abcdefghijklmnopqrstuvwxyz123456',
            'Student ' || i,
            'learner'
        )
        ON CONFLICT (email) DO NOTHING;
    END LOOP;
    
    -- For each instructor
    FOR v_instructor_id IN (SELECT id FROM users WHERE role IN ('instructor', 'admin')) LOOP
        
        -- For each of their published courses
        FOR v_course_id IN (SELECT id FROM courses WHERE instructor_id = v_instructor_id AND is_published = true) LOOP
            
            -- Enroll 10-15 learners per course
            FOR v_learner_id IN (SELECT id FROM users WHERE role = 'learner' ORDER BY random() LIMIT 12) LOOP
                
                -- Random status
                DECLARE
                    v_rand FLOAT := random();
                    v_progress INT;
                    v_completed BOOLEAN;
                    v_accessed TIMESTAMP;
                    v_comp_date TIMESTAMP;
                    v_enroll_date TIMESTAMP;
                BEGIN
                    v_enroll_date := CURRENT_TIMESTAMP - (random() * 60 || ' days')::INTERVAL;
                    
                    IF v_rand < 0.25 THEN
                        -- Yet to start
                        v_progress := 0;
                        v_completed := false;
                        v_accessed := NULL;
                        v_comp_date := NULL;
                    ELSIF v_rand < 0.70 THEN
                        -- In progress
                        v_progress := floor(random() * 80 + 10)::int;
                        v_completed := false;
                        v_accessed := v_enroll_date + (random() * 20 || ' days')::INTERVAL;
                        v_comp_date := NULL;
                    ELSE
                        -- Completed
                        v_progress := 100;
                        v_completed := true;
                        v_accessed := v_enroll_date + (random() * 15 || ' days')::INTERVAL;
                        v_comp_date := v_enroll_date + (random() * 25 || ' days')::INTERVAL;
                    END IF;
                    
                    INSERT INTO enrollments (
                        user_id, course_id, enrollment_date, last_accessed,
                        progress_percentage, is_completed, completion_date
                    ) VALUES (
                        v_learner_id, v_course_id, v_enroll_date,
                        v_accessed, v_progress, v_completed, v_comp_date
                    )
                    ON CONFLICT (user_id, course_id) DO UPDATE
                    SET last_accessed = EXCLUDED.last_accessed,
                        progress_percentage = EXCLUDED.progress_percentage,
                        is_completed = EXCLUDED.is_completed,
                        completion_date = EXCLUDED.completion_date
                    RETURNING id INTO v_enrollment_id;
                    
                    v_count := v_count + 1;
                    
                    -- Add lesson progress if accessed
                    IF v_accessed IS NOT NULL THEN
                        FOR v_lesson_id IN (
                            SELECT id FROM lessons 
                            WHERE course_id = v_course_id 
                            ORDER BY order_index 
                            LIMIT GREATEST(1, floor(v_progress / 20.0)::int)
                        ) LOOP
                            INSERT INTO lesson_progress (
                                enrollment_id, lesson_id, status,
                                started_at, completed_at, time_spent
                            ) VALUES (
                                v_enrollment_id, v_lesson_id,
                                CASE WHEN v_completed OR random() > 0.3 THEN 'completed' ELSE 'in-progress' END,
                                v_accessed,
                                CASE WHEN v_completed OR random() > 0.3 THEN v_accessed + (random() * 2 || ' hours')::INTERVAL ELSE NULL END,
                                floor(random() * 5400 + 1200)::int
                            )
                            ON CONFLICT (enrollment_id, lesson_id) DO UPDATE
                            SET time_spent = EXCLUDED.time_spent;
                        END LOOP;
                    END IF;
                END;
            END LOOP;
        END LOOP;
    END LOOP;
    
    -- Update course counts
    UPDATE courses c SET total_enrollments = (
        SELECT COUNT(*) FROM enrollments WHERE course_id = c.id
    );
    
    RAISE NOTICE 'Created % enrollments successfully!', v_count;
END $$;

-- Show final results
SELECT 
    u.name as instructor,
    c.title as course,
    COUNT(e.id) as enrollments,
    COUNT(CASE WHEN e.is_completed THEN 1 END) as completed,
    COUNT(CASE WHEN e.last_accessed IS NOT NULL AND NOT e.is_completed THEN 1 END) as in_progress,
    COUNT(CASE WHEN e.last_accessed IS NULL THEN 1 END) as yet_to_start
FROM users u
JOIN courses c ON c.instructor_id = u.id
LEFT JOIN enrollments e ON e.course_id = c.id
WHERE u.role IN ('instructor', 'admin') AND c.is_published = true
GROUP BY u.name, c.title
ORDER BY u.name, c.title;
