-- Update Python for Data Science Course Content
-- First, find the course ID (replace with actual ID if needed)

-- Step 1: Find the Python course ID
SELECT id, title FROM courses WHERE title LIKE '%Python%' OR title LIKE '%Data Science%';

-- Step 2: Update Module Topics with correct links
-- Replace 'YOUR_COURSE_ID' with the actual course ID from Step 1

-- Get module IDs for the Python course
DO $$
DECLARE
  python_course_id UUID;
  mod1_id UUID;
  mod2_id UUID;
  mod3_id UUID;
  mod4_id UUID;
BEGIN
  -- Find Python course (adjust WHERE clause if needed)
  SELECT id INTO python_course_id FROM courses WHERE title ILIKE '%python%data%science%' LIMIT 1;
  
  IF python_course_id IS NULL THEN
    RAISE NOTICE 'Python course not found. Please check course name.';
    RETURN;
  END IF;

  -- Get module IDs
  SELECT id INTO mod1_id FROM course_modules WHERE course_id = python_course_id AND order_index = 1;
  SELECT id INTO mod2_id FROM course_modules WHERE course_id = python_course_id AND order_index = 2;
  SELECT id INTO mod3_id FROM course_modules WHERE course_id = python_course_id AND order_index = 3;
  SELECT id INTO mod4_id FROM course_modules WHERE course_id = python_course_id AND order_index = 4;

  -- MODULE 1: Introduction & Fundamentals
  UPDATE module_topics SET 
    title = 'Python for Data Science - Introduction',
    content_url = 'https://www.youtube.com/embed/LHBE6Q9XlzI',
    description = 'FreeCodeCamp – Python for Data Science complete introduction'
  WHERE module_id = mod1_id AND order_index = 1 AND content_type = 'video';

  UPDATE module_topics SET 
    title = 'Getting Started with Python',
    content_url = 'https://docs.python.org/3/tutorial/',
    description = 'Python Official Tutorial - Complete getting started guide'
  WHERE module_id = mod1_id AND order_index = 2 AND content_type = 'document';

  UPDATE module_topics SET 
    title = 'Data Science Workflow Diagram',
    content_url = 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200',
    description = 'Data Science lifecycle and workflow visualization'
  WHERE module_id = mod1_id AND order_index = 3 AND content_type = 'image';

  UPDATE module_topics SET 
    title = 'Python Environment Setup Tutorial',
    content_url = 'https://www.youtube.com/embed/HW29067qVWk',
    description = 'Setup Python + Anaconda + Jupyter complete guide'
  WHERE module_id = mod1_id AND order_index = 4 AND content_type = 'video';

  -- MODULE 2: Core Concepts & Features
  UPDATE module_topics SET 
    title = 'NumPy, Pandas, Matplotlib Explained',
    content_url = 'https://www.youtube.com/embed/vmEHCJofslg',
    description = 'Core Data Science libraries comprehensive tutorial'
  WHERE module_id = mod2_id AND order_index = 1 AND content_type = 'video';

  UPDATE module_topics SET 
    title = 'Pandas Complete Documentation',
    content_url = 'https://pandas.pydata.org/docs/',
    description = 'Official Pandas documentation and user guide'
  WHERE module_id = mod2_id AND order_index = 2 AND content_type = 'document';

  UPDATE module_topics SET 
    title = 'Data Analysis Workflow Demo',
    content_url = 'https://www.youtube.com/embed/r-uOLxNrNk8',
    description = 'Hands-on Data Analysis with Python complete workflow'
  WHERE module_id = mod2_id AND order_index = 3 AND content_type = 'video';

  UPDATE module_topics SET 
    title = 'Pandas DataFrame Structure',
    content_url = 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200',
    description = 'Visual guide to Pandas DataFrame structure and operations'
  WHERE module_id = mod2_id AND order_index = 4 AND content_type = 'image';

  -- MODULE 3: Advanced Techniques
  UPDATE module_topics SET 
    title = 'Advanced Pandas Techniques',
    content_url = 'https://www.youtube.com/embed/0P7QnIQDBJY',
    description = 'Advanced Pandas operations and optimization techniques'
  WHERE module_id = mod3_id AND order_index = 1 AND content_type = 'video';

  UPDATE module_topics SET 
    title = 'Python Performance Optimization Guide',
    content_url = 'https://docs.python.org/3/faq/programming.html#performance',
    description = 'Official Python performance tips and best practices'
  WHERE module_id = mod3_id AND order_index = 2 AND content_type = 'document';

  UPDATE module_topics SET 
    title = 'Scikit-learn Machine Learning Course',
    content_url = 'https://www.youtube.com/embed/0B5eIE_1vpU',
    description = 'Complete Scikit-learn tutorial for machine learning'
  WHERE module_id = mod3_id AND order_index = 3 AND content_type = 'video';

  -- MODULE 4: Practical Applications
  UPDATE module_topics SET 
    title = 'Real-world Data Science Projects',
    content_url = 'https://www.youtube.com/embed/7eh4d6sabA0',
    description = 'Industry-level data science project implementations'
  WHERE module_id = mod4_id AND order_index = 1 AND content_type = 'video';

  UPDATE module_topics SET 
    title = 'Kaggle Projects and Datasets',
    content_url = 'https://www.kaggle.com/learn',
    description = 'Kaggle Learn - Hands-on data science projects and datasets'
  WHERE module_id = mod4_id AND order_index = 2 AND content_type = 'document';

  UPDATE module_topics SET 
    title = 'End-to-End Data Science Project',
    content_url = 'https://www.youtube.com/embed/H1ubZZ0z_jQ',
    description = 'Complete end-to-end data science project walkthrough'
  WHERE module_id = mod4_id AND order_index = 3 AND content_type = 'video';

  RAISE NOTICE 'Python for Data Science course updated successfully!';
END $$;
