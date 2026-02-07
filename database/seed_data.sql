-- ============================================
-- LearnSphere Seed Data
-- Comprehensive Mock Data for All Tables
-- ============================================

-- ============================================
-- USERS
-- ============================================

INSERT INTO users (id, email, password_hash, name, role, total_points, badge_level) VALUES
('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'admin@learnsphere.com', '$2a$10$abcdefghijklmnopqrstuv', 'Admin User', 'admin', 0, 'Newbie'),
('b1eebc99-9c0b-4ef8-bb6d-6bb9bd380a12', 'john.instructor@learnsphere.com', '$2a$10$abcdefghijklmnopqrstuv', 'John Smith', 'instructor', 0, 'Newbie'),
('c2eebc99-9c0b-4ef8-bb6d-6bb9bd380a13', 'sarah.instructor@learnsphere.com', '$2a$10$abcdefghijklmnopqrstuv', 'Sarah Johnson', 'instructor', 0, 'Newbie'),
('d3eebc99-9c0b-4ef8-bb6d-6bb9bd380a14', 'alice.learner@gmail.com', '$2a$10$abcdefghijklmnopqrstuv', 'Alice Williams', 'learner', 150, 'Achiever'),
('e4eebc99-9c0b-4ef8-bb6d-6bb9bd380a15', 'bob.learner@gmail.com', '$2a$10$abcdefghijklmnopqrstuv', 'Bob Martinez', 'learner', 85, 'Explorer'),
('f5eebc99-9c0b-4ef8-bb6d-6bb9bd380a16', 'carol.learner@gmail.com', '$2a$10$abcdefghijklmnopqrstuv', 'Carol Davis', 'learner', 320, 'Expert'),
('a6eebc99-9c0b-4ef8-bb6d-6bb9bd380a17', 'david.learner@gmail.com', '$2a$10$abcdefghijklmnopqrstuv', 'David Brown', 'learner', 45, 'Newbie'),
('b7eebc99-9c0b-4ef8-bb6d-6bb9bd380a18', 'emma.learner@gmail.com', '$2a$10$abcdefghijklmnopqrstuv', 'Emma Wilson', 'learner', 210, 'Specialist'),
('c8eebc99-9c0b-4ef8-bb6d-6bb9bd380a19', 'frank.learner@gmail.com', '$2a$10$abcdefghijklmnopqrstuv', 'Frank Taylor', 'learner', 550, 'Master'),
('d9eebc99-9c0b-4ef8-bb6d-6bb9bd380a20', 'grace.learner@gmail.com', '$2a$10$abcdefghijklmnopqrstuv', 'Grace Anderson', 'learner', 120, 'Achiever');

-- ============================================
-- TAGS
-- ============================================

INSERT INTO tags (id, name) VALUES
('a1eebc99-9c0b-4ef8-bb6d-6bb9bd380a21', 'React'),
('a2eebc99-9c0b-4ef8-bb6d-6bb9bd380a22', 'JavaScript'),
('a3eebc99-9c0b-4ef8-bb6d-6bb9bd380a23', 'Frontend'),
('a4eebc99-9c0b-4ef8-bb6d-6bb9bd380a24', 'CRM'),
('a5eebc99-9c0b-4ef8-bb6d-6bb9bd380a25', 'Odoo'),
('a6eebc99-9c0b-4ef8-bb6d-6bb9bd380a26', 'Python'),
('a7eebc99-9c0b-4ef8-bb6d-6bb9bd380a27', 'Backend'),
('a8eebc99-9c0b-4ef8-bb6d-6bb9bd380a28', 'Database'),
('a9eebc99-9c0b-4ef8-bb6d-6bb9bd380a29', 'SQL'),
('b0eebc99-9c0b-4ef8-bb6d-6bb9bd380a30', 'Web Development');

-- ============================================
-- COURSES
-- ============================================

INSERT INTO courses (id, title, description, instructor_id, cover_image_url, category, difficulty_level, estimated_duration, is_published, average_rating, total_reviews, total_enrollments) VALUES
('c1eebc99-9c0b-4ef8-bb6d-6bb9bd380a31', 'Basics of Odoo CRM', 'Learn the fundamentals of Odoo CRM system and master customer relationship management', 'b1eebc99-9c0b-4ef8-bb6d-6bb9bd380a12', 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800', 'Business', 'Beginner', 480, true, 4.50, 3, 6),
('c2eebc99-9c0b-4ef8-bb6d-6bb9bd380a32', 'Advanced React Patterns', 'Master advanced React patterns including compound components, render props, and custom hooks', 'c2eebc99-9c0b-4ef8-bb6d-6bb9bd380a13', 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800', 'Programming', 'Advanced', 510, true, 4.80, 5, 8),
('c3eebc99-9c0b-4ef8-bb6d-6bb9bd380a33', 'Python for Data Science', 'Complete guide to Python programming for data analysis and machine learning', 'b1eebc99-9c0b-4ef8-bb6d-6bb9bd380a12', 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800', 'Data Science', 'Intermediate', 720, true, 4.65, 8, 12),
('c4eebc99-9c0b-4ef8-bb6d-6bb9bd380a34', 'Full Stack Web Development', 'Build modern web applications from scratch using MERN stack', 'c2eebc99-9c0b-4ef8-bb6d-6bb9bd380a13', 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800', 'Web Development', 'Intermediate', 900, true, 4.70, 6, 10),
('c5eebc99-9c0b-4ef8-bb6d-6bb9bd380a35', 'SQL Database Mastery', 'Master SQL queries, database design, and optimization techniques', 'b1eebc99-9c0b-4ef8-bb6d-6bb9bd380a12', 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=800', 'Database', 'Beginner', 360, true, 4.55, 4, 7);

-- ============================================
-- COURSE TAGS
-- ============================================

INSERT INTO course_tags (course_id, tag_id) VALUES
('c1eebc99-9c0b-4ef8-bb6d-6bb9bd380a31', 'a4eebc99-9c0b-4ef8-bb6d-6bb9bd380a24'),
('c1eebc99-9c0b-4ef8-bb6d-6bb9bd380a31', 'a5eebc99-9c0b-4ef8-bb6d-6bb9bd380a25'),
('c2eebc99-9c0b-4ef8-bb6d-6bb9bd380a32', 'a1eebc99-9c0b-4ef8-bb6d-6bb9bd380a21'),
('c2eebc99-9c0b-4ef8-bb6d-6bb9bd380a32', 'a2eebc99-9c0b-4ef8-bb6d-6bb9bd380a22'),
('c2eebc99-9c0b-4ef8-bb6d-6bb9bd380a32', 'a3eebc99-9c0b-4ef8-bb6d-6bb9bd380a23'),
('c3eebc99-9c0b-4ef8-bb6d-6bb9bd380a33', 'a6eebc99-9c0b-4ef8-bb6d-6bb9bd380a26'),
('c4eebc99-9c0b-4ef8-bb6d-6bb9bd380a34', 'a2eebc99-9c0b-4ef8-bb6d-6bb9bd380a22'),
('c4eebc99-9c0b-4ef8-bb6d-6bb9bd380a34', 'b0eebc99-9c0b-4ef8-bb6d-6bb9bd380a30'),
('c5eebc99-9c0b-4ef8-bb6d-6bb9bd380a35', 'a8eebc99-9c0b-4ef8-bb6d-6bb9bd380a28'),
('c5eebc99-9c0b-4ef8-bb6d-6bb9bd380a35', 'a9eebc99-9c0b-4ef8-bb6d-6bb9bd380a29');

-- ============================================
-- LESSONS FOR ODOO CRM COURSE
-- ============================================

INSERT INTO lessons (id, course_id, title, description, lesson_type, content_url, content_text, duration, order_index) VALUES
('a01ebc99-9c0b-4ef8-bb6d-6bb9bd380a41', 'c1eebc99-9c0b-4ef8-bb6d-6bb9bd380a31', 'Introduction to CRM Concepts', 'Learn the fundamentals of CRM and its importance in business', 'video', 'https://www.youtube.com/embed/dpw9EHDh2bM', NULL, 750, 1),
('a02ebc99-9c0b-4ef8-bb6d-6bb9bd380a42', 'c1eebc99-9c0b-4ef8-bb6d-6bb9bd380a31', 'Getting Started with Odoo CRM', 'Step-by-step guide to setting up Odoo CRM', 'document', NULL, 'This document covers the initial setup and configuration of Odoo CRM. You will learn how to create your first pipeline, add stages, and configure basic settings for your sales team.', 8, 2),
('a03ebc99-9c0b-4ef8-bb6d-6bb9bd380a43', 'c1eebc99-9c0b-4ef8-bb6d-6bb9bd380a31', 'CRM Dashboard Overview', 'Explore the CRM dashboard and its features', 'video', 'https://www.youtube.com/embed/dpw9EHDh2bM', NULL, 920, 3),
('a04ebc99-9c0b-4ef8-bb6d-6bb9bd380a44', 'c1eebc99-9c0b-4ef8-bb6d-6bb9bd380a31', 'Lead Management Guide', 'Complete guide to managing leads in Odoo CRM', 'document', NULL, 'Learn how to capture, qualify, and convert leads into opportunities. This guide covers lead scoring, assignment rules, and automation.', 10, 4),
('a05ebc99-9c0b-4ef8-bb6d-6bb9bd380a45', 'c1eebc99-9c0b-4ef8-bb6d-6bb9bd380a31', 'Pipeline Configuration', 'Configure sales pipelines for your team', 'video', 'https://www.youtube.com/embed/dpw9EHDh2bM', NULL, 1125, 5),
('a06ebc99-9c0b-4ef8-bb6d-6bb9bd380a46', 'c1eebc99-9c0b-4ef8-bb6d-6bb9bd380a31', 'Sales Process Flowchart', 'Visual representation of the sales process', 'image', 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800', NULL, 0, 6),
('a07ebc99-9c0b-4ef8-bb6d-6bb9bd380a47', 'c1eebc99-9c0b-4ef8-bb6d-6bb9bd380a31', 'Module 1 Quiz: CRM Basics', 'Test your knowledge of CRM fundamentals', 'quiz', NULL, NULL, 0, 7);

-- ============================================
-- LESSONS FOR REACT COURSE
-- ============================================

INSERT INTO lessons (id, course_id, title, description, lesson_type, content_url, content_text, duration, order_index) VALUES
('a08ebc99-9c0b-4ef8-bb6d-6bb9bd380a48', 'c2eebc99-9c0b-4ef8-bb6d-6bb9bd380a32', 'Introduction to Advanced Patterns', 'Overview of advanced React patterns', 'video', 'https://www.youtube.com/embed/dpw9EHDh2bM', NULL, 750, 1),
('a09ebc99-9c0b-4ef8-bb6d-6bb9bd380a49', 'c2eebc99-9c0b-4ef8-bb6d-6bb9bd380a32', 'Compound Components Pattern', 'Learn the compound components pattern', 'video', 'https://www.youtube.com/embed/dpw9EHDh2bM', NULL, 1125, 2),
('b10ebc99-9c0b-4ef8-bb6d-6bb9bd380a50', 'c2eebc99-9c0b-4ef8-bb6d-6bb9bd380a32', 'Pattern Documentation', 'Comprehensive documentation of patterns', 'document', NULL, 'Detailed documentation covering all React patterns with code examples and best practices.', 10, 3),
('b11ebc99-9c0b-4ef8-bb6d-6bb9bd380a51', 'c2eebc99-9c0b-4ef8-bb6d-6bb9bd380a32', 'Render Props Deep Dive', 'Master the render props pattern', 'video', 'https://www.youtube.com/embed/dpw9EHDh2bM', NULL, 1335, 4),
('b12ebc99-9c0b-4ef8-bb6d-6bb9bd380a52', 'c2eebc99-9c0b-4ef8-bb6d-6bb9bd380a32', 'Module 1 Quiz', 'Test your understanding', 'quiz', NULL, NULL, 0, 5);

-- ============================================
-- QUIZZES
-- ============================================

INSERT INTO quizzes (id, lesson_id, title, description, passing_score, points_first_attempt, points_second_attempt, points_third_attempt, points_more_attempts) VALUES
('b01ebc99-9c0b-4ef8-bb6d-6bb9bd380a61', 'a07ebc99-9c0b-4ef8-bb6d-6bb9bd380a47', 'CRM Basics Quiz', 'Test your knowledge of CRM fundamentals', 70, 20, 15, 10, 5),
('b02ebc99-9c0b-4ef8-bb6d-6bb9bd380a62', 'b12ebc99-9c0b-4ef8-bb6d-6bb9bd380a52', 'React Patterns Quiz', 'Test your understanding of React patterns', 70, 20, 15, 10, 5);

-- ============================================
-- QUIZ QUESTIONS
-- ============================================

INSERT INTO quiz_questions (id, quiz_id, question_text, question_type, order_index, points) VALUES
('b11ebc99-9c0b-4ef8-bb6d-6bb9bd380a71', 'b01ebc99-9c0b-4ef8-bb6d-6bb9bd380a61', 'What does CRM stand for?', 'multiple_choice', 1, 1),
('b12ebc99-9c0b-4ef8-bb6d-6bb9bd380a72', 'b01ebc99-9c0b-4ef8-bb6d-6bb9bd380a61', 'Which is a key benefit of using CRM?', 'multiple_choice', 2, 1),
('b13ebc99-9c0b-4ef8-bb6d-6bb9bd380a73', 'b02ebc99-9c0b-4ef8-bb6d-6bb9bd380a62', 'What is the main purpose of Compound Components?', 'multiple_choice', 1, 1),
('b14ebc99-9c0b-4ef8-bb6d-6bb9bd380a74', 'b02ebc99-9c0b-4ef8-bb6d-6bb9bd380a62', 'Which hook is essential for Context pattern?', 'multiple_choice', 2, 1);

-- ============================================
-- QUIZ OPTIONS
-- ============================================

INSERT INTO quiz_options (id, question_id, option_text, is_correct, order_index) VALUES
('b21ebc99-9c0b-4ef8-bb6d-6bb9bd380a81', 'b11ebc99-9c0b-4ef8-bb6d-6bb9bd380a71', 'Customer Relationship Management', true, 1),
('b22ebc99-9c0b-4ef8-bb6d-6bb9bd380a82', 'b11ebc99-9c0b-4ef8-bb6d-6bb9bd380a71', 'Customer Resource Management', false, 2),
('b23ebc99-9c0b-4ef8-bb6d-6bb9bd380a83', 'b11ebc99-9c0b-4ef8-bb6d-6bb9bd380a71', 'Client Relationship Model', false, 3),
('b24ebc99-9c0b-4ef8-bb6d-6bb9bd380a84', 'b12ebc99-9c0b-4ef8-bb6d-6bb9bd380a72', 'Better customer insights', true, 1),
('b25ebc99-9c0b-4ef8-bb6d-6bb9bd380a85', 'b12ebc99-9c0b-4ef8-bb6d-6bb9bd380a72', 'Reduced costs only', false, 2),
('b26ebc99-9c0b-4ef8-bb6d-6bb9bd380a86', 'b13ebc99-9c0b-4ef8-bb6d-6bb9bd380a73', 'To create flexible, declarative APIs', true, 1),
('b27ebc99-9c0b-4ef8-bb6d-6bb9bd380a87', 'b13ebc99-9c0b-4ef8-bb6d-6bb9bd380a73', 'To reduce bundle size', false, 2),
('b28ebc99-9c0b-4ef8-bb6d-6bb9bd380a88', 'b14ebc99-9c0b-4ef8-bb6d-6bb9bd380a74', 'useContext', true, 1),
('b29ebc99-9c0b-4ef8-bb6d-6bb9bd380a89', 'b14ebc99-9c0b-4ef8-bb6d-6bb9bd380a74', 'useState', false, 2);

-- ============================================
-- ENROLLMENTS
-- ============================================

INSERT INTO enrollments (id, user_id, course_id, enrollment_date, progress_percentage, is_completed, last_accessed) VALUES
('e01ebc99-9c0b-4ef8-bb6d-6bb9bd380a91', 'd3eebc99-9c0b-4ef8-bb6d-6bb9bd380a14', 'c1eebc99-9c0b-4ef8-bb6d-6bb9bd380a31', '2024-01-10', 30.00, false, '2024-01-20'),
('e02ebc99-9c0b-4ef8-bb6d-6bb9bd380a92', 'e4eebc99-9c0b-4ef8-bb6d-6bb9bd380a15', 'c1eebc99-9c0b-4ef8-bb6d-6bb9bd380a31', '2024-01-12', 45.00, false, '2024-01-21'),
('e03ebc99-9c0b-4ef8-bb6d-6bb9bd380a93', 'f5eebc99-9c0b-4ef8-bb6d-6bb9bd380a16', 'c2eebc99-9c0b-4ef8-bb6d-6bb9bd380a32', '2024-01-08', 80.00, false, '2024-01-22'),
('e04ebc99-9c0b-4ef8-bb6d-6bb9bd380a94', 'b7eebc99-9c0b-4ef8-bb6d-6bb9bd380a18', 'c2eebc99-9c0b-4ef8-bb6d-6bb9bd380a32', '2024-01-15', 62.00, false, '2024-01-23'),
('e05ebc99-9c0b-4ef8-bb6d-6bb9bd380a95', 'c8eebc99-9c0b-4ef8-bb6d-6bb9bd380a19', 'c3eebc99-9c0b-4ef8-bb6d-6bb9bd380a33', '2024-01-05', 100.00, true, '2024-01-18'),
('e06ebc99-9c0b-4ef8-bb6d-6bb9bd380a96', 'd9eebc99-9c0b-4ef8-bb6d-6bb9bd380a20', 'c4eebc99-9c0b-4ef8-bb6d-6bb9bd380a34', '2024-01-14', 25.00, false, '2024-01-24');

-- ============================================
-- LESSON PROGRESS
-- ============================================

INSERT INTO lesson_progress (id, enrollment_id, lesson_id, status, started_at, completed_at) VALUES
('c01ebc99-9c0b-4ef8-bb6d-6bb9bd380aa1', 'e01ebc99-9c0b-4ef8-bb6d-6bb9bd380a91', 'a01ebc99-9c0b-4ef8-bb6d-6bb9bd380a41', 'completed', '2024-01-10', '2024-01-10'),
('c02ebc99-9c0b-4ef8-bb6d-6bb9bd380aa2', 'e01ebc99-9c0b-4ef8-bb6d-6bb9bd380a91', 'a02ebc99-9c0b-4ef8-bb6d-6bb9bd380a42', 'completed', '2024-01-11', '2024-01-11'),
('c03ebc99-9c0b-4ef8-bb6d-6bb9bd380aa3', 'e01ebc99-9c0b-4ef8-bb6d-6bb9bd380a91', 'a03ebc99-9c0b-4ef8-bb6d-6bb9bd380a43', 'in-progress', '2024-01-20', NULL),
('c04ebc99-9c0b-4ef8-bb6d-6bb9bd380aa4', 'e03ebc99-9c0b-4ef8-bb6d-6bb9bd380a93', 'a08ebc99-9c0b-4ef8-bb6d-6bb9bd380a48', 'completed', '2024-01-08', '2024-01-08'),
('c05ebc99-9c0b-4ef8-bb6d-6bb9bd380aa5', 'e03ebc99-9c0b-4ef8-bb6d-6bb9bd380a93', 'a09ebc99-9c0b-4ef8-bb6d-6bb9bd380a49', 'completed', '2024-01-09', '2024-01-09'),
('c06ebc99-9c0b-4ef8-bb6d-6bb9bd380aa6', 'e03ebc99-9c0b-4ef8-bb6d-6bb9bd380a93', 'b10ebc99-9c0b-4ef8-bb6d-6bb9bd380a50', 'completed', '2024-01-10', '2024-01-10');

-- ============================================
-- REVIEWS
-- ============================================

INSERT INTO reviews (id, course_id, user_id, rating, comment, created_at) VALUES
('d01ebc99-9c0b-4ef8-bb6d-6bb9bd380ab1', 'c1eebc99-9c0b-4ef8-bb6d-6bb9bd380a31', 'd3eebc99-9c0b-4ef8-bb6d-6bb9bd380a14', 5, 'Excellent course! The content is well-structured and easy to follow. I learned so much about Odoo CRM.', '2024-01-15'),
('d02ebc99-9c0b-4ef8-bb6d-6bb9bd380ab2', 'c1eebc99-9c0b-4ef8-bb6d-6bb9bd380a31', 'e4eebc99-9c0b-4ef8-bb6d-6bb9bd380a15', 4, 'Great course overall. The instructor explains concepts clearly. Would love to see more practical examples.', '2024-01-16'),
('d03ebc99-9c0b-4ef8-bb6d-6bb9bd380ab3', 'c1eebc99-9c0b-4ef8-bb6d-6bb9bd380a31', 'a6eebc99-9c0b-4ef8-bb6d-6bb9bd380a17', 5, 'Best CRM course I have taken! The hands-on approach really helped me understand the system better.', '2024-01-17'),
('d04ebc99-9c0b-4ef8-bb6d-6bb9bd380ab4', 'c2eebc99-9c0b-4ef8-bb6d-6bb9bd380a32', 'f5eebc99-9c0b-4ef8-bb6d-6bb9bd380a16', 5, 'Outstanding! The compound components section was particularly enlightening.', '2024-01-12'),
('d05ebc99-9c0b-4ef8-bb6d-6bb9bd380ab5', 'c2eebc99-9c0b-4ef8-bb6d-6bb9bd380a32', 'b7eebc99-9c0b-4ef8-bb6d-6bb9bd380a18', 5, 'Best React course ever. The instructor explains complex topics very clearly.', '2024-01-14'),
('d06ebc99-9c0b-4ef8-bb6d-6bb9bd380ab6', 'c2eebc99-9c0b-4ef8-bb6d-6bb9bd380a32', 'd9eebc99-9c0b-4ef8-bb6d-6bb9bd380a20', 4, 'Great content, well structured. Would love more practical examples.', '2024-01-16'),
('d07ebc99-9c0b-4ef8-bb6d-6bb9bd380ab7', 'c3eebc99-9c0b-4ef8-bb6d-6bb9bd380a33', 'c8eebc99-9c0b-4ef8-bb6d-6bb9bd380a19', 5, 'Perfect introduction to Python for data science. Highly recommended!', '2024-01-18'),
('d08ebc99-9c0b-4ef8-bb6d-6bb9bd380ab8', 'c3eebc99-9c0b-4ef8-bb6d-6bb9bd380a33', 'd3eebc99-9c0b-4ef8-bb6d-6bb9bd380a14', 4, 'Very comprehensive course with good examples.', '2024-01-19');

-- ============================================
-- BADGES
-- ============================================

INSERT INTO badges (id, name, description, points_required) VALUES
('e01ebc99-9c0b-4ef8-bb6d-6bb9bd380ac1', 'Newbie', 'Welcome to LearnSphere!', 0),
('e02ebc99-9c0b-4ef8-bb6d-6bb9bd380ac2', 'Explorer', 'Earned 50 points', 50),
('e03ebc99-9c0b-4ef8-bb6d-6bb9bd380ac3', 'Achiever', 'Earned 100 points', 100),
('e04ebc99-9c0b-4ef8-bb6d-6bb9bd380ac4', 'Specialist', 'Earned 200 points', 200),
('e05ebc99-9c0b-4ef8-bb6d-6bb9bd380ac5', 'Expert', 'Earned 300 points', 300),
('e06ebc99-9c0b-4ef8-bb6d-6bb9bd380ac6', 'Master', 'Earned 500 points', 500);
