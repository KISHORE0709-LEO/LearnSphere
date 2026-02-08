-- Link enrollments to kishoremurali0726@gmail.com's courses
DO $$
DECLARE
    v_instructor_id UUID;
    v_course_ids UUID[];
    v_learner_ids UUID[];
    v_enrollment_id UUID;
    v_lesson_ids UUID[];
BEGIN
    -- Get instructor ID
    SELECT id INTO v_instructor_id FROM users WHERE email = 'kishoremurali0726@gmail.com';
    
    IF v_instructor_id IS NULL THEN
        RAISE EXCEPTION 'Instructor not found';
    END IF;
    
    RAISE NOTICE 'Instructor ID: %', v_instructor_id;
    
    -- Get instructor's courses
    SELECT ARRAY_AGG(id) INTO v_course_ids FROM courses WHERE instructor_id = v_instructor_id AND is_published = true;
    
    IF v_course_ids IS NULL THEN
        RAISE EXCEPTION 'No published courses found';
    END IF;
    
    RAISE NOTICE 'Found % courses', array_length(v_course_ids, 1);
    
    -- Get learners
    SELECT ARRAY_AGG(id) INTO v_learner_ids FROM users WHERE role = 'learner' LIMIT 15;
    
    IF v_learner_ids IS NULL THEN
        -- Create learners
        FOR i IN 1..15 LOOP
            INSERT INTO users (email, password_hash, name, role)
            VALUES (
                'student' || i || '@learnsphere.com',
                '$2b$10$dummyhash',
                'Student ' || i,
                'learner'
            ) ON CONFLICT DO NOTHING;
        END LOOP;
        
        SELECT ARRAY_AGG(id) INTO v_learner_ids FROM users WHERE role = 'learner' LIMIT 15;
    END IF;
    
    -- Delete old enrollments for these courses
    DELETE FROM lesson_progress WHERE enrollment_id IN (
        SELECT id FROM enrollments WHERE course_id = ANY(v_course_ids)
    );
    DELETE FROM enrollments WHERE course_id = ANY(v_course_ids);
    
    -- Create new enrollments
    FOR i IN 1..array_length(v_learner_ids, 1) LOOP
        FOR j IN 1..array_length(v_course_ids, 1) LOOP
            IF random() > 0.3 THEN CONTINUE; END IF;
            
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
                    v_progress := 0;
                    v_completed := false;
                    v_accessed := NULL;
                    v_comp_date := NULL;
                ELSIF v_rand < 0.70 THEN
                    v_progress := floor(random() * 80 + 10)::int;
                    v_completed := false;
                    v_accessed := v_enroll_date + (random() * 20 || ' days')::INTERVAL;
                    v_comp_date := NULL;
                ELSE
                    v_progress := 100;
                    v_completed := true;
                    v_accessed := v_enroll_date + (random() * 15 || ' days')::INTERVAL;
                    v_comp_date := v_enroll_date + (random() * 25 || ' days')::INTERVAL;
                END IF;
                
                INSERT INTO enrollments (
                    user_id, course_id, enrollment_date, last_accessed,
                    progress_percentage, is_completed, completion_date
                ) VALUES (
                    v_learner_ids[i], v_course_ids[j], v_enroll_date,
                    v_accessed, v_progress, v_completed, v_comp_date
                )
                RETURNING id INTO v_enrollment_id;
                
                -- Add lesson progress
                IF v_accessed IS NOT NULL THEN
                    SELECT ARRAY_AGG(id) INTO v_lesson_ids 
                    FROM lessons WHERE course_id = v_course_ids[j] 
                    ORDER BY order_index LIMIT GREATEST(1, floor(v_progress / 25.0)::int);
                    
                    IF v_lesson_ids IS NOT NULL THEN
                        FOR k IN 1..array_length(v_lesson_ids, 1) LOOP
                            INSERT INTO lesson_progress (
                                enrollment_id, lesson_id, status,
                                started_at, completed_at, time_spent
                            ) VALUES (
                                v_enrollment_id, v_lesson_ids[k],
                                CASE WHEN k < array_length(v_lesson_ids, 1) OR v_completed THEN 'completed' ELSE 'in-progress' END,
                                v_accessed,
                                CASE WHEN k < array_length(v_lesson_ids, 1) OR v_completed THEN v_accessed + (random() * 2 || ' hours')::INTERVAL ELSE NULL END,
                                floor(random() * 5400 + 1200)::int
                            );
                        END LOOP;
                    END IF;
                END IF;
            END;
        END LOOP;
    END LOOP;
    
    -- Update counts
    UPDATE courses SET total_enrollments = (
        SELECT COUNT(*) FROM enrollments WHERE course_id = courses.id
    ) WHERE instructor_id = v_instructor_id;
    
    RAISE NOTICE 'Done!';
END $$;

-- Show results
SELECT 
    c.title,
    COUNT(e.id) as enrollments,
    COUNT(CASE WHEN e.is_completed THEN 1 END) as completed,
    COUNT(CASE WHEN e.last_accessed IS NOT NULL AND NOT e.is_completed THEN 1 END) as in_progress,
    COUNT(CASE WHEN e.last_accessed IS NULL THEN 1 END) as yet_to_start
FROM courses c
LEFT JOIN enrollments e ON e.course_id = c.id
WHERE c.instructor_id = (SELECT id FROM users WHERE email = 'kishoremurali0726@gmail.com')
GROUP BY c.title;
