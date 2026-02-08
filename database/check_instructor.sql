-- Check data for specific instructor
SELECT 
    u.id as instructor_id,
    u.email,
    u.name,
    COUNT(DISTINCT c.id) as total_courses,
    COUNT(DISTINCT CASE WHEN c.is_published THEN c.id END) as published_courses,
    COUNT(DISTINCT e.id) as enrollments
FROM users u
LEFT JOIN courses c ON c.instructor_id = u.id
LEFT JOIN enrollments e ON e.course_id = c.id
WHERE u.email = 'kishoremurali0726@gmail.com'
GROUP BY u.id, u.email, u.name;

-- Show courses for this instructor
SELECT 
    c.id,
    c.title,
    c.is_published,
    c.instructor_id,
    COUNT(e.id) as enrollments
FROM courses c
LEFT JOIN enrollments e ON e.course_id = c.id
WHERE c.instructor_id = (SELECT id FROM users WHERE email = 'kishoremurali0726@gmail.com')
GROUP BY c.id, c.title, c.is_published, c.instructor_id;

-- Show all enrollments
SELECT 
    c.title as course,
    c.instructor_id,
    u_instructor.email as instructor_email,
    COUNT(e.id) as enrollments
FROM courses c
LEFT JOIN users u_instructor ON c.instructor_id = u_instructor.id
LEFT JOIN enrollments e ON e.course_id = c.id
GROUP BY c.id, c.title, c.instructor_id, u_instructor.email
ORDER BY enrollments DESC;
