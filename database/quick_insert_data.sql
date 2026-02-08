-- ============================================
-- Quick Insert: Sample Data for ANY Instructor
-- This will create data for ALL instructors
-- ============================================

DO $$
DECLARE
    v_instructor RECORD;
    v_course_ids UUID[];
    v_learner_ids UUID[];
    v_enrollment_id UUID;
    v_lesson_ids UUID[];
    v_total_created INT := 0;
BEGIN
    -- Ensure we have learners
    IF NOT EXISTS (SELECT 1 FROM users WHERE role = 'learner') THEN
        RAISE NOTICE 'Creating sample learner accounts...';
        FOR i IN 1..15 LOOP
            INSERT INTO users (email, password_hash, name, role)
            VALUES (
                'learner' || i || '@example.com',
                '$2b$10$dummyhashfordemopurposesonly1234567890',
                'Student ' || i,
                'learner'
            )
            ON CONFLICT (email) DO NOTHING;
        END LOOP;
    END IF;
    
    -- Get all learners
    SELECT ARRAY_AGG(id) INTO v_learner_ids FROM users WHERE role = 'learner';
    
    -- Loop through each instructor
    FOR v_instructor IN (SELECT id, email, name FROM users WHERE role IN ('instructor', 'admin')) LOOP
        RAISE NOTICE 'Processing instructor: % (%)', v_instructor.name, v_instructor.email;
        
        -- Get instructor's published courses
        SELECT ARRAY_AGG(id) INTO v_course_ids 
        FROM courses 
        WHERE instructor_id = v_instructor.id AND is_published = true;
        
        IF v_course_ids IS NULL THEN
            RAISE NOTICE '  No published courses found, skipping...';
            CONTINUE;
        END IF;
        
        RAISE NOTICE '  Found % courses', array_length(v_course_ids, 1);
        
        -- Create enrollments for this instructor's courses
        FOR i IN 1..LEAST(array_length(v_learner_ids, 1), 12) LOOP
            FOR j IN 1..array_length(v_course_ids, 1) LOOP
                IF random() > 0.4 THEN CONTINUE; END IF;
                
                DECLARE
                    v_rand FLOAT := random();
                    v_progress INT;
                    v_completed BOOLEAN;
                    v_accessed TIMESTAMP;
                    v_comp_date TIMESTAMP;
                BEGIN
                    -- 20% yet to start, 50% in progress, 30% completed
                    IF v_rand < 0.20 THEN
                        v_progress := 0;
                        v_completed := false;
                        v_accessed := NULL;
                        v_comp_date := NULL;
                    ELSIF v_rand < 0.70 THEN
                        v_progress := floor(random() * 75 + 15)::int;
                        v_completed := false;
                        v_accessed := CURRENT_TIMESTAMP - (random() * 15 || ' days')::INTERVAL;
                        v_comp_date := NULL;
                    ELSE
                        v_progress := 100;
                        v_completed := true;
                        v_accessed := CURRENT_TIMESTAMP - (random() * 10 || ' days')::INTERVAL;
                        v_comp_date := CURRENT_TIMESTAMP - (random() * 5 || ' days')::INTERVAL;
                    END IF;
                    
                    INSERT INTO enrollments (
                        user_id, course_id, enrollment_date, last_accessed,
                        progress_percentage, is_completed, completion_date
                    ) VALUES (
                        v_learner_ids[i], v_course_ids[j],
                        CURRENT_TIMESTAMP - (random() * 45 || ' days')::INTERVAL,
                        v_accessed, v_progress, v_completed, v_comp_date
                    )
                    ON CONFLICT (user_id, course_id) DO UPDATE
                    SET last_accessed = EXCLUDED.last_accessed,
                        progress_percentage = EXCLUDED.progress_percentage,
                        is_completed = EXCLUDED.is_completed,
                        completion_date = EXCLUDED.completion_date
                    RETURNING id INTO v_enrollment_id;
                    
                    v_total_created := v_total_created + 1;
                    
                    -- Add lesson progress
                    IF v_accessed IS NOT NULL THEN
                        SELECT ARRAY_AGG(id) INTO v_lesson_ids 
                        FROM lessons WHERE course_id = v_course_ids[j] 
                        ORDER BY order_index LIMIT GREATEST(1, floor(v_progress / 25.0)::int);
                        
                        IF v_lesson_ids IS NOT NULL THEN
                            FOR k IN 1..array_length(v_lesson_ids, 1) LOOP
                                INSERT INTO lesson_progress (
                                    enrollment_id, lesson_id, status, started_at, completed_at, time_spent
                                ) VALUES (
                                    v_enrollment_id, v_lesson_ids[k],
                                    CASE WHEN k < array_length(v_lesson_ids, 1) OR v_completed THEN 'completed' ELSE 'in-progress' END,
                                    v_accessed - (random() * 8 || ' days')::INTERVAL,
                                    CASE WHEN k < array_length(v_lesson_ids, 1) OR v_completed THEN v_accessed - (random() * 4 || ' days')::INTERVAL ELSE NULL END,
                                    floor(random() * 4200 + 900)::int
                                )
                                ON CONFLICT (enrollment_id, lesson_id) DO UPDATE SET time_spent = EXCLUDED.time_spent;
                            END LOOP;
                        END IF;
                    END IF;
                END;
            END LOOP;
        END LOOP;
    END LOOP;
    
    -- Update all course enrollment counts
    UPDATE courses c SET total_enrollments = (SELECT COUNT(*) FROM enrollments WHERE course_id = c.id);
    
    RAISE NOTICE '';
    RAISE NOTICE '========================================';
    RAISE NOTICE 'SUCCESS! Created % enrollments', v_total_created;
    RAISE NOTICE '========================================';
END $$;

-- Show results for all instructors
SELECT 
    u.name as instructor,
    u.email,
    COUNT(DISTINCT c.id) as courses,
    COUNT(DISTINCT e.id) as enrollments,
    COUNT(DISTINCT CASE WHEN e.is_completed THEN e.id END) as completed,
    COUNT(DISTINCT CASE WHEN e.last_accessed IS NOT NULL AND NOT e.is_completed THEN e.id END) as in_progress,
    COUNT(DISTINCT CASE WHEN e.last_accessed IS NULL THEN e.id END) as yet_to_start
FROM users u
LEFT JOIN courses c ON c.instructor_id = u.id AND c.is_published = true
LEFT JOIN enrollments e ON e.course_id = c.id
WHERE u.role IN ('instructor', 'admin')
GROUP BY u.id, u.name, u.email
ORDER BY u.name;
