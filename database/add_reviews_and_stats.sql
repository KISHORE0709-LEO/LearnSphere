-- Add more reviews for all courses
INSERT INTO reviews (course_id, user_id, rating, comment, created_at) VALUES
-- Basics of Odoo CRM (more reviews)
((SELECT id FROM courses WHERE title = 'Basics of Odoo CRM'), 
 (SELECT id FROM users WHERE email = 'bob.learner@gmail.com'), 
 5, 'Excellent course! Very practical and easy to follow.', NOW() - INTERVAL '5 days'),
((SELECT id FROM courses WHERE title = 'Basics of Odoo CRM'), 
 (SELECT id FROM users WHERE email = 'emma.learner@gmail.com'), 
 4, 'Good content but could use more real-world examples.', NOW() - INTERVAL '3 days'),

-- Advanced React Patterns (more reviews)
((SELECT id FROM courses WHERE title = 'Advanced React Patterns'), 
 (SELECT id FROM users WHERE email = 'alice.learner@gmail.com'), 
 5, 'Best React course I have taken! Highly recommended.', NOW() - INTERVAL '7 days'),
((SELECT id FROM courses WHERE title = 'Advanced React Patterns'), 
 (SELECT id FROM users WHERE email = 'david.learner@gmail.com'), 
 4, 'Great explanations of complex patterns.', NOW() - INTERVAL '4 days'),

-- Python for Data Science (more reviews)
((SELECT id FROM courses WHERE title = 'Python for Data Science'), 
 (SELECT id FROM users WHERE email = 'alice.learner@gmail.com'), 
 5, 'Perfect for beginners and intermediates alike!', NOW() - INTERVAL '6 days'),
((SELECT id FROM courses WHERE title = 'Python for Data Science'), 
 (SELECT id FROM users WHERE email = 'bob.learner@gmail.com'), 
 5, 'Comprehensive coverage of data science fundamentals.', NOW() - INTERVAL '2 days'),
((SELECT id FROM courses WHERE title = 'Python for Data Science'), 
 (SELECT id FROM users WHERE email = 'emma.learner@gmail.com'), 
 4, 'Very informative with good practical exercises.', NOW() - INTERVAL '1 day'),

-- Full Stack Web Development (more reviews)
((SELECT id FROM courses WHERE title = 'Full Stack Web Development'), 
 (SELECT id FROM users WHERE email = 'frank.learner@gmail.com'), 
 5, 'Amazing course! Covers everything you need to know.', NOW() - INTERVAL '8 days'),
((SELECT id FROM courses WHERE title = 'Full Stack Web Development'), 
 (SELECT id FROM users WHERE email = 'grace.learner@gmail.com'), 
 4, 'Well structured and comprehensive.', NOW() - INTERVAL '5 days'),
((SELECT id FROM courses WHERE title = 'Full Stack Web Development'), 
 (SELECT id FROM users WHERE email = 'alice.learner@gmail.com'), 
 5, 'Excellent hands-on projects!', NOW() - INTERVAL '3 days'),

-- SQL Database Mastery (more reviews)
((SELECT id FROM courses WHERE title = 'SQL Database Mastery'), 
 (SELECT id FROM users WHERE email = 'bob.learner@gmail.com'), 
 4, 'Great SQL fundamentals course.', NOW() - INTERVAL '9 days'),
((SELECT id FROM courses WHERE title = 'SQL Database Mastery'), 
 (SELECT id FROM users WHERE email = 'david.learner@gmail.com'), 
 5, 'Clear explanations and good examples.', NOW() - INTERVAL '6 days'),
((SELECT id FROM courses WHERE title = 'SQL Database Mastery'), 
 (SELECT id FROM users WHERE email = 'emma.learner@gmail.com'), 
 5, 'Best SQL course for beginners!', NOW() - INTERVAL '2 days')
ON CONFLICT (course_id, user_id) DO NOTHING;

-- Create view for course statistics
CREATE OR REPLACE VIEW course_statistics AS
SELECT 
  c.id as course_id,
  c.title,
  COUNT(DISTINCT cm.id) as total_modules,
  COUNT(DISTINCT mt.id) as total_topics,
  COUNT(DISTINCT q.id) as total_quizzes,
  (COUNT(DISTINCT mt.id) + COUNT(DISTINCT q.id)) as total_content_items
FROM courses c
LEFT JOIN course_modules cm ON c.id = cm.course_id
LEFT JOIN module_topics mt ON cm.id = mt.module_id
LEFT JOIN quizzes q ON cm.id = q.module_id
GROUP BY c.id, c.title;

-- Create view for enrollment progress statistics
CREATE OR REPLACE VIEW enrollment_progress_stats AS
SELECT 
  e.id as enrollment_id,
  e.user_id,
  e.course_id,
  c.title as course_title,
  COUNT(DISTINCT cm.id) as total_modules,
  COUNT(DISTINCT CASE WHEN mt.is_completed = true THEN cm.id END) as completed_modules,
  COUNT(DISTINCT CASE WHEN mt.is_completed = false OR mt.is_completed IS NULL THEN cm.id END) as incomplete_modules,
  COUNT(DISTINCT mt.id) as total_topics,
  COUNT(DISTINCT CASE WHEN mt.is_completed = true THEN mt.id END) as completed_topics,
  COUNT(DISTINCT q.id) as total_quizzes,
  (COUNT(DISTINCT mt.id) + COUNT(DISTINCT q.id)) as total_content_items,
  (COUNT(DISTINCT CASE WHEN mt.is_completed = true THEN mt.id END)) as completed_content_items,
  CASE 
    WHEN (COUNT(DISTINCT mt.id) + COUNT(DISTINCT q.id)) > 0 
    THEN ROUND((COUNT(DISTINCT CASE WHEN mt.is_completed = true THEN mt.id END)::numeric / 
                (COUNT(DISTINCT mt.id) + COUNT(DISTINCT q.id))::numeric) * 100, 2)
    ELSE 0 
  END as progress_percentage
FROM enrollments e
JOIN courses c ON e.course_id = c.id
LEFT JOIN course_modules cm ON c.id = cm.course_id
LEFT JOIN module_topics mt ON cm.id = mt.module_id
LEFT JOIN quizzes q ON cm.id = q.module_id
GROUP BY e.id, e.user_id, e.course_id, c.title;
