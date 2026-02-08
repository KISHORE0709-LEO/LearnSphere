-- Reassign ALL courses to kishoremurali0726@gmail.com
UPDATE courses 
SET instructor_id = '0839232d-7cb8-4b91-8f94-0200fc1816e7'
WHERE id IN (
    'c4eebc99-9c0b-4ef8-bb6d-6bb9bd380a34',
    'c5eebc99-9c0b-4ef8-bb6d-6bb9bd380a35',
    'c1eebc99-9c0b-4ef8-bb6d-6bb9bd380a31',
    'c2eebc99-9c0b-4ef8-bb6d-6bb9bd380a32',
    'c3eebc99-9c0b-4ef8-bb6d-6bb9bd380a33'
);

-- Verify
SELECT 
    title,
    instructor_id,
    is_published,
    total_enrollments
FROM courses
WHERE instructor_id = '0839232d-7cb8-4b91-8f94-0200fc1816e7';

-- Show enrollment summary
SELECT 
    'Total Enrollments' as metric,
    COUNT(*) as count
FROM enrollments e
JOIN courses c ON e.course_id = c.id
WHERE c.instructor_id = '0839232d-7cb8-4b91-8f94-0200fc1816e7';
