-- ============================================
-- Insert Sample Data for Instructor Dashboard
-- Run this after replacing YOUR_INSTRUCTOR_EMAIL
-- ============================================

-- STEP 1: Find your instructor ID (replace with your email)
DO $$
DECLARE
    v_instructor_id UUID;
    v_instructor_email TEXT := 'YOUR_INSTRUCTOR_EMAIL'; -- CHANGE THIS!
    v_course_ids UUID[];
    v_learner_ids UUID[];
    v_enrollment_id UUID;
    v_lesson_ids UUID[];
BEGIN
    -- Get instructor ID
    SELECT id INTO v_instructor_id FROM users WHERE email = v_instructor_email AND role IN ('instructor', 'admin');
    
    IF v_instructor_id IS NULL THEN
        RAISE EXCEPTION 'Instructor not found with email: %. Please update the email in the script.', v_instructor_email;
    END IF;
    
    RAISE NOTICE 'Found instructor: %', v_instructor_email;
    
    -- Get instructor's courses
    SELECT ARRAY_AGG(id) INTO v_course_ids FROM courses WHERE instructor_id = v_instructor_id AND is_published = true;
    
    IF v_course_ids IS NULL THEN
        RAISE EXCEPTION 'No published courses found for this instructor. Please create and publish courses first.';
    END IF;
    
    RAISE NOTICE 'Found % courses', array_length(v_course_ids, 1);
    
    -- Get or create learner users
    SELECT ARRAY_AGG(id) INTO v_learner_ids FROM users WHERE role = 'learner' LIMIT 15;
    
    IF v_learner_ids IS NULL OR array_length(v_learner_ids, 1) < 5 THEN
        RAISE NOTICE 'Creating sample learner accounts...';
        
        -- Create sample learners
        FOR i IN 1..10 LOOP
            INSERT INTO users (email, password_hash, name, role)
            VALUES (
                'learner' || i || '@test.com',
                '$2b$10$abcdefghijklmnopqrstuvwxyz1234567890ABCDEFGHIJ', -- dummy hash
                'Learner ' || i,
                'learner'
            )
            ON CONFLICT (email) DO NOTHING;
        END LOOP;
        
        SELECT ARRAY_AGG(id) INTO v_learner_ids FROM users WHERE role = 'learner' LIMIT 15;
    END IF;
    
    RAISE NOTICE 'Using % learners', array_length(v_learner_ids, 1);
    
    -- Create enrollments
    FOR i IN 1..array_length(v_learner_ids, 1) LOOP
        FOR j IN 1..array_length(v_course_ids, 1) LOOP
            -- Skip some combinations randomly
            IF random() > 0.3 THEN
                CONTINUE;
            END IF;
            
            -- Determine enrollment status
            DECLARE
                v_status_rand FLOAT := random();
                v_progress INT;
                v_is_completed BOOLEAN;
                v_last_accessed TIMESTAMP;
                v_completion_date TIMESTAMP;
            BEGIN
                IF v_status_rand < 0.25 THEN
                    -- Yet to start (25%)
                    v_progress := 0;
                    v_is_completed := false;
                    v_last_accessed := NULL;
                    v_completion_date := NULL;
                ELSIF v_status_rand < 0.70 THEN
                    -- In progress (45%)
                    v_progress := floor(random() * 80 + 10)::int;
                    v_is_completed := false;
                    v_last_accessed := CURRENT_TIMESTAMP - (random() * 10 || ' days')::INTERVAL;
                    v_completion_date := NULL;
                ELSE
                    -- Completed (30%)
                    v_progress := 100;
                    v_is_completed := true;
                    v_last_accessed := CURRENT_TIMESTAMP - (random() * 5 || ' days')::INTERVAL;
                    v_completion_date := CURRENT_TIMESTAMP - (random() * 3 || ' days')::INTERVAL;
                END IF;
                
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
                    v_last_accessed,
                    v_progress,
                    v_is_completed,
                    v_completion_date
                )
                ON CONFLICT (user_id, course_id) DO UPDATE
                SET 
                    last_accessed = EXCLUDED.last_accessed,
                    progress_percentage = EXCLUDED.progress_percentage,
                    is_completed = EXCLUDED.is_completed,
                    completion_date = EXCLUDED.completion_date
                RETURNING id INTO v_enrollment_id;
                
                -- Add lesson progress if accessed
                IF v_last_accessed IS NOT NULL THEN
                    SELECT ARRAY_AGG(id) INTO v_lesson_ids 
                    FROM lessons 
                    WHERE course_id = v_course_ids[j] 
                    ORDER BY order_index
                    LIMIT GREATEST(1, floor(v_progress / 20.0)::int);
                    
                    IF v_lesson_ids IS NOT NULL THEN
                        FOR k IN 1..array_length(v_lesson_ids, 1) LOOP
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
                                CASE WHEN k < array_length(v_lesson_ids, 1) OR v_is_completed THEN 'completed' ELSE 'in-progress' END,
                                v_last_accessed - (random() * 5 || ' days')::INTERVAL,
                                CASE WHEN k < array_length(v_lesson_ids, 1) OR v_is_completed THEN v_last_accessed - (random() * 3 || ' days')::INTERVAL ELSE NULL END,
                                floor(random() * 3600 + 600)::int
                            )
                            ON CONFLICT (enrollment_id, lesson_id) DO UPDATE
                            SET time_spent = EXCLUDED.time_spent;
                        END LOOP;
                    END IF;
                END IF;
            END;
        END LOOP;
    END LOOP;
    
    -- Update course enrollment counts
    UPDATE courses c
    SET total_enrollments = (SELECT COUNT(*) FROM enrollments WHERE course_id = c.id)
    WHERE instructor_id = v_instructor_id;
    
    RAISE NOTICE 'Sample data created successfully!';
END $$;

-- Show summary
SELECT 
    'Total Enrollments' as metric,
    COUNT(*) as count
FROM enrollments e
JOIN courses c ON e.course_id = c.id
JOIN users u ON c.instructor_id = u.id
WHERE u.email = 'YOUR_INSTRUCTOR_EMAIL' -- CHANGE THIS!
UNION ALL
SELECT 
    'Completed',
    COUNT(*)
FROM enrollments e
JOIN courses c ON e.course_id = c.id
JOIN users u ON c.instructor_id = u.id
WHERE u.email = 'YOUR_INSTRUCTOR_EMAIL' AND e.is_completed = true
UNION ALL
SELECT 
    'In Progress',
    COUNT(*)
FROM enrollments e
JOIN courses c ON e.course_id = c.id
JOIN users u ON c.instructor_id = u.id
WHERE u.email = 'YOUR_INSTRUCTOR_EMAIL' AND e.last_accessed IS NOT NULL AND e.is_completed = false
UNION ALL
SELECT 
    'Yet to Start',
    COUNT(*)
FROM enrollments e
JOIN courses c ON e.course_id = c.id
JOIN users u ON c.instructor_id = u.id
WHERE u.email = 'YOUR_INSTRUCTOR_EMAIL' AND e.last_accessed IS NULL;
