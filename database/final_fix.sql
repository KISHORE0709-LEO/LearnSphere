-- Check what courses exist and assign to instructor
SELECT 'COURSES IN DATABASE' as info;
SELECT id, title, instructor_id, is_published FROM courses;

SELECT 'INSTRUCTORS' as info;
SELECT id, email, name, role FROM users WHERE role IN ('instructor', 'admin');

-- Assign ALL courses to kishoremurali0726@gmail.com
UPDATE courses 
SET instructor_id = '0839232d-7cb8-4b91-8f94-0200fc1816e7',
    is_published = true
WHERE instructor_id IS NULL OR instructor_id != '0839232d-7cb8-4b91-8f94-0200fc1816e7';

-- Show updated courses
SELECT id, title, instructor_id, is_published FROM courses;

-- Now create enrollments
DO $$
DECLARE
    v_course_ids UUID[];
    v_learner_ids UUID[];
    v_enrollment_id UUID;
    v_lesson_ids UUID[];
BEGIN
    -- Create learners
    FOR i IN 1..20 LOOP
        INSERT INTO users (email, password_hash, name, role)
        VALUES (
            'student' || i || '@learnsphere.com',
            '$2b$10$dummyhash',
            'Student ' || i,
            'learner'
        ) ON CONFLICT (email) DO NOTHING;
    END LOOP;
    
    SELECT ARRAY_AGG(id) INTO v_learner_ids FROM users WHERE role = 'learner' LIMIT 20;
    SELECT ARRAY_AGG(id) INTO v_course_ids FROM courses WHERE instructor_id = '0839232d-7cb8-4b91-8f94-0200fc1816e7';
    
    IF v_course_ids IS NULL THEN
        RAISE NOTICE 'Still no courses!';
        RETURN;
    END IF;
    
    RAISE NOTICE 'Creating enrollments for % courses', array_length(v_course_ids, 1);
    
    -- Create enrollments
    FOR i IN 1..array_length(v_learner_ids, 1) LOOP
        FOR j IN 1..array_length(v_course_ids, 1) LOOP
            IF random() > 0.5 THEN CONTINUE; END IF;
            
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
                ON CONFLICT (user_id, course_id) DO NOTHING
                RETURNING id INTO v_enrollment_id;
                
                IF v_accessed IS NOT NULL AND v_enrollment_id IS NOT NULL THEN
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
                                'completed',
                                v_accessed,
                                v_accessed + (random() * 2 || ' hours')::INTERVAL,
                                floor(random() * 5400 + 1200)::int
                            )
                            ON CONFLICT (enrollment_id, lesson_id) DO NOTHING;
                        END LOOP;
                    END IF;
                END IF;
            END;
        END LOOP;
    END LOOP;
    
    UPDATE courses SET total_enrollments = (
        SELECT COUNT(*) FROM enrollments WHERE course_id = courses.id
    );
    
    RAISE NOTICE 'SUCCESS!';
END $$;

-- Show final results
SELECT 
    c.title,
    c.is_published,
    COUNT(e.id) as enrollments,
    COUNT(CASE WHEN e.is_completed THEN 1 END) as completed,
    COUNT(CASE WHEN e.last_accessed IS NOT NULL AND NOT e.is_completed THEN 1 END) as in_progress,
    COUNT(CASE WHEN e.last_accessed IS NULL THEN 1 END) as yet_to_start
FROM courses c
LEFT JOIN enrollments e ON e.course_id = c.id
WHERE c.instructor_id = '0839232d-7cb8-4b91-8f94-0200fc1816e7'
GROUP BY c.id, c.title, c.is_published;
