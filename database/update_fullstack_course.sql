-- Update Full Stack Web Development Course Content

DO $$
DECLARE
  fullstack_course_id UUID;
  mod1_id UUID;
  mod2_id UUID;
  mod3_id UUID;
  mod4_id UUID;
BEGIN
  -- Find Full Stack course
  SELECT id INTO fullstack_course_id FROM courses WHERE title ILIKE '%full%stack%' OR title ILIKE '%web%development%' LIMIT 1;
  
  IF fullstack_course_id IS NULL THEN
    RAISE NOTICE 'Full Stack course not found. Please check course name.';
    RETURN;
  END IF;

  -- Get module IDs
  SELECT id INTO mod1_id FROM course_modules WHERE course_id = fullstack_course_id AND order_index = 1;
  SELECT id INTO mod2_id FROM course_modules WHERE course_id = fullstack_course_id AND order_index = 2;
  SELECT id INTO mod3_id FROM course_modules WHERE course_id = fullstack_course_id AND order_index = 3;
  SELECT id INTO mod4_id FROM course_modules WHERE course_id = fullstack_course_id AND order_index = 4;

  -- MODULE 1: Introduction & Fundamentals
  UPDATE module_topics SET 
    title = 'Full Stack Web Development Overview',
    content_url = 'https://www.youtube.com/embed/nu_pCVPKzTk',
    description = 'FreeCodeCamp – Complete Full Stack Web Development overview'
  WHERE module_id = mod1_id AND order_index = 1 AND content_type = 'video';

  UPDATE module_topics SET 
    title = 'MDN Web Docs – Web Basics',
    content_url = 'https://developer.mozilla.org/en-US/docs/Learn',
    description = 'MDN comprehensive guide to web development fundamentals'
  WHERE module_id = mod1_id AND order_index = 2 AND content_type = 'document';

  UPDATE module_topics SET 
    title = 'Full Stack Architecture Diagram',
    content_url = 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200',
    description = 'Complete full stack architecture visualization'
  WHERE module_id = mod1_id AND order_index = 3 AND content_type = 'image';

  UPDATE module_topics SET 
    title = 'VS Code + Git + Node Setup',
    content_url = 'https://www.youtube.com/embed/VqCgcpAypFQ',
    description = 'Complete development environment setup tutorial'
  WHERE module_id = mod1_id AND order_index = 4 AND content_type = 'video';

  -- MODULE 2: Core Concepts & Features
  UPDATE module_topics SET 
    title = 'HTML, CSS, JavaScript Full Course',
    content_url = 'https://www.youtube.com/embed/G3e-cpL7ofc',
    description = 'Complete frontend fundamentals course'
  WHERE module_id = mod2_id AND order_index = 1 AND content_type = 'video';

  UPDATE module_topics SET 
    title = 'JavaScript Documentation (MDN)',
    content_url = 'https://developer.mozilla.org/en-US/docs/Web/JavaScript',
    description = 'Official JavaScript documentation and guides'
  WHERE module_id = mod2_id AND order_index = 2 AND content_type = 'document';

  UPDATE module_topics SET 
    title = 'Express.js Crash Course',
    content_url = 'https://www.youtube.com/embed/L72fhGm1tfE',
    description = 'Complete Express.js backend framework tutorial'
  WHERE module_id = mod2_id AND order_index = 3 AND content_type = 'video';

  UPDATE module_topics SET 
    title = 'REST API Architecture Diagram',
    content_url = 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200',
    description = 'Visual guide to REST API architecture and flow'
  WHERE module_id = mod2_id AND order_index = 4 AND content_type = 'image';

  -- MODULE 3: Advanced Techniques
  UPDATE module_topics SET 
    title = 'MongoDB Full Course',
    content_url = 'https://www.youtube.com/embed/ofme2o29ngU',
    description = 'Complete MongoDB database tutorial'
  WHERE module_id = mod3_id AND order_index = 1 AND content_type = 'video';

  UPDATE module_topics SET 
    title = 'MongoDB Official Documentation',
    content_url = 'https://www.mongodb.com/docs/',
    description = 'Official MongoDB documentation and best practices'
  WHERE module_id = mod3_id AND order_index = 2 AND content_type = 'document';

  UPDATE module_topics SET 
    title = 'JWT Authentication Explained',
    content_url = 'https://www.youtube.com/embed/7Q17ubqLfaM',
    description = 'Complete JWT authentication and security tutorial'
  WHERE module_id = mod3_id AND order_index = 3 AND content_type = 'video';

  -- MODULE 4: Practical Applications
  UPDATE module_topics SET 
    title = 'Full Stack MERN Project',
    content_url = 'https://www.youtube.com/embed/ngc9gnGgUdA',
    description = 'Complete MERN stack project from scratch'
  WHERE module_id = mod4_id AND order_index = 1 AND content_type = 'video';

  UPDATE module_topics SET 
    title = 'MERN Stack Guide & System Design',
    content_url = 'https://www.mongodb.com/mern-stack',
    description = 'Official MERN stack guide and system design principles'
  WHERE module_id = mod4_id AND order_index = 2 AND content_type = 'document';

  UPDATE module_topics SET 
    title = 'Deploy Full Stack App (Vercel/Render)',
    content_url = 'https://www.youtube.com/embed/71wSzpLyW9k',
    description = 'Complete deployment tutorial for full stack applications'
  WHERE module_id = mod4_id AND order_index = 3 AND content_type = 'video';

  RAISE NOTICE 'Full Stack Web Development course updated successfully!';
END $$;
