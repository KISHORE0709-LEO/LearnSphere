-- Simplified migration for modules and topics
-- Works with existing LearnSphere schema

-- Create course_modules table
CREATE TABLE IF NOT EXISTS course_modules (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  course_id UUID NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  order_index INTEGER NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create module_topics table
CREATE TABLE IF NOT EXISTS module_topics (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  module_id UUID NOT NULL REFERENCES course_modules(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  content_type VARCHAR(50) NOT NULL CHECK (content_type IN ('video', 'document', 'image')),
  content_url TEXT,
  description TEXT,
  duration INTEGER DEFAULT 0,
  order_index INTEGER NOT NULL,
  is_completed BOOLEAN DEFAULT FALSE,
  completed_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create module_quizzes table (separate from lessons-based quizzes)
CREATE TABLE IF NOT EXISTS module_quizzes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  module_id UUID NOT NULL REFERENCES course_modules(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  passing_score INTEGER DEFAULT 70,
  time_limit INTEGER,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_course_modules_course_id ON course_modules(course_id);
CREATE INDEX IF NOT EXISTS idx_module_topics_module_id ON module_topics(module_id);
CREATE INDEX IF NOT EXISTS idx_module_quizzes_module_id ON module_quizzes(module_id);

-- Insert sample modules, topics, and quizzes for existing courses
DO $$
DECLARE
  course_record RECORD;
  module1_id UUID;
  module2_id UUID;
  module3_id UUID;
  module4_id UUID;
BEGIN
  FOR course_record IN SELECT id, title FROM courses LOOP
    -- Module 1: Introduction & Fundamentals
    INSERT INTO course_modules (course_id, title, description, order_index)
    VALUES (course_record.id, 'Introduction & Fundamentals', 'Learn the basics and core concepts', 1)
    RETURNING id INTO module1_id;
    
    INSERT INTO module_topics (module_id, title, content_type, duration, order_index, content_url, description)
    VALUES 
      (module1_id, 'Course Overview & Introduction', 'video', 15, 1, 'https://www.youtube.com/embed/yQaAGmHNn9s', 'Complete introduction to the course and what you will learn'),
      (module1_id, 'Getting Started Guide', 'document', 10, 2, 'https://docs.google.com/document/d/1example/export?format=pdf', 'Downloadable PDF guide for getting started'),
      (module1_id, 'System Architecture Diagram', 'image', 5, 3, 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200', 'Visual overview of the system architecture'),
      (module1_id, 'Setup & Configuration Tutorial', 'video', 20, 4, 'https://www.youtube.com/embed/Tn6-PIqc4UM', 'Step-by-step configuration walkthrough');
    
    INSERT INTO module_quizzes (module_id, title, description, passing_score, time_limit)
    VALUES (module1_id, 'Fundamentals Assessment', 'Test your understanding of basic concepts', 70, 30);
    
    -- Module 2: Core Concepts & Features
    INSERT INTO course_modules (course_id, title, description, order_index)
    VALUES (course_record.id, 'Core Concepts & Features', 'Master the key features and workflows', 2)
    RETURNING id INTO module2_id;
    
    INSERT INTO module_topics (module_id, title, content_type, duration, order_index, content_url, description)
    VALUES 
      (module2_id, 'Key Features Deep Dive', 'video', 18, 1, 'https://www.youtube.com/embed/3JZ_D3ELwOQ', 'Comprehensive overview of all major features'),
      (module2_id, 'Best Practices Handbook', 'document', 12, 2, 'https://docs.google.com/document/d/2example/export?format=pdf', 'Industry best practices and guidelines (PDF)'),
      (module2_id, 'Complete Workflow Demo', 'video', 25, 3, 'https://www.youtube.com/embed/ROalU379l3U', 'End-to-end workflow demonstration'),
      (module2_id, 'Process Flow Chart', 'image', 8, 4, 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200', 'Detailed process flow visualization');
    
    INSERT INTO module_quizzes (module_id, title, description, passing_score, time_limit)
    VALUES (module2_id, 'Core Features Quiz', 'Assess your knowledge of key features', 75, 25);
    
    -- Module 3: Advanced Techniques
    INSERT INTO course_modules (course_id, title, description, order_index)
    VALUES (course_record.id, 'Advanced Techniques', 'Learn advanced strategies and optimization', 3)
    RETURNING id INTO module3_id;
    
    INSERT INTO module_topics (module_id, title, content_type, duration, order_index, content_url, description)
    VALUES 
      (module3_id, 'Advanced Configuration', 'video', 22, 1, 'https://www.youtube.com/embed/dQw4w9WgXcQ', 'Advanced configuration options and customization'),
      (module3_id, 'Performance Optimization Guide', 'document', 14, 2, 'https://docs.google.com/document/d/3example/export?format=pdf', 'Optimization strategies and tips (PDF)'),
      (module3_id, 'Advanced Features Masterclass', 'video', 28, 3, 'https://www.youtube.com/embed/kJQP7kiw5Fk', 'Master advanced features and techniques');
    
    INSERT INTO module_quizzes (module_id, title, description, passing_score, time_limit)
    VALUES (module3_id, 'Advanced Techniques Test', 'Challenge your advanced knowledge', 80, 35);
    
    -- Module 4: Practical Applications
    INSERT INTO course_modules (course_id, title, description, order_index)
    VALUES (course_record.id, 'Practical Applications & Projects', 'Apply your knowledge to real-world scenarios', 4)
    RETURNING id INTO module4_id;
    
    INSERT INTO module_topics (module_id, title, content_type, duration, order_index, content_url, description)
    VALUES 
      (module4_id, 'Real-World Case Studies', 'video', 20, 1, 'https://www.youtube.com/embed/9bZkp7q19f0', 'Industry case studies and success stories'),
      (module4_id, 'Project Templates & Resources', 'document', 15, 2, 'https://docs.google.com/document/d/4example/export?format=pdf', 'Downloadable project templates and checklists'),
      (module4_id, 'Implementation Workshop', 'video', 25, 3, 'https://www.youtube.com/embed/TcMBFSGVi1c', 'Hands-on implementation workshop');
    
    INSERT INTO module_quizzes (module_id, title, description, passing_score, time_limit)
    VALUES (module4_id, 'Final Assessment', 'Comprehensive final exam', 85, 45);
  END LOOP;
END $$;
