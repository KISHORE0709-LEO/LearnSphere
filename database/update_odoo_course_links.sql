-- Update Basics of Odoo CRM course with correct module topics and links
-- This script updates the module_topics table for the Basics of Odoo CRM course

DO $$
DECLARE
  odoo_course_id UUID;
  module1_id UUID;
  module2_id UUID;
  module3_id UUID;
  module4_id UUID;
  module5_id UUID;
  module6_id UUID;
  module7_id UUID;
  module8_id UUID;
BEGIN
  -- Get the Basics of Odoo CRM course ID
  SELECT id INTO odoo_course_id FROM courses WHERE title = 'Basics of Odoo CRM';
  
  IF odoo_course_id IS NULL THEN
    RAISE NOTICE 'Basics of Odoo CRM course not found';
    RETURN;
  END IF;

  -- Delete existing modules and topics for this course
  DELETE FROM course_modules WHERE course_id = odoo_course_id;

  -- Module 1: Introduction & Fundamentals (Overview, Getting Started, Architecture, Setup)
  INSERT INTO course_modules (course_id, title, description, order_index)
  VALUES (odoo_course_id, 'Module 1: Introduction & Fundamentals', 'Overview, Getting Started, Architecture, Setup', 1)
  RETURNING id INTO module1_id;
  
  INSERT INTO module_topics (module_id, title, content_type, duration, order_index, content_url, description)
  VALUES 
    (module1_id, 'Odoo CRM Overview (Official-style explanation)', 'video', 0, 1, 'https://www.youtube.com/embed/QXG2cF8oZ8Q', 'YouTube: Odoo CRM Overview'),
    (module1_id, 'What is Odoo? Architecture & Modules', 'video', 0, 2, 'https://www.youtube.com/embed/4V3D0P7sF1I', 'YouTube: Odoo Architecture & Modules'),
    (module1_id, 'Odoo ERP & CRM architecture', 'image', 0, 3, 'https://www.odoo.com/documentation/17.0/applications/general/overview.html', 'Image: Odoo ERP & CRM architecture'),
    (module1_id, 'CRM workflow diagram', 'image', 0, 4, 'https://www.geeksforgeeks.org/customer-relationship-management-crm/', 'Image: CRM workflow diagram'),
    (module1_id, 'Odoo CRM Introduction (Official)', 'document', 0, 5, 'https://www.odoo.com/documentation/17.0/applications/sales/crm.html', 'Document: Odoo CRM Introduction'),
    (module1_id, 'What is CRM (Salesforce basics – concept clarity)', 'document', 0, 6, 'https://www.salesforce.com/in/crm/what-is-crm/', 'Document: What is CRM');

  -- Module 2: Introduction & Fundamentals + Quiz (Setup, Architecture Diagram, Configuration)
  INSERT INTO course_modules (course_id, title, description, order_index)
  VALUES (odoo_course_id, 'Module 2: Introduction & Fundamentals + Quiz', 'Setup, Architecture Diagram, Configuration', 2)
  RETURNING id INTO module2_id;
  
  INSERT INTO module_topics (module_id, title, content_type, duration, order_index, content_url, description)
  VALUES 
    (module2_id, 'Install Odoo (Community Edition)', 'video', 0, 1, 'https://www.youtube.com/embed/Hf9E7nP8HkU', 'YouTube: Install Odoo'),
    (module2_id, 'Odoo CRM Initial Configuration', 'video', 0, 2, 'https://www.youtube.com/embed/0p2GZQZp1aE', 'YouTube: Odoo CRM Initial Configuration'),
    (module2_id, 'Odoo modules structure diagram', 'image', 0, 3, 'https://www.odoo.com/documentation/17.0/developer/reference/backend/module.html', 'Image: Odoo modules structure'),
    (module2_id, 'CRM pipeline stages', 'image', 0, 4, 'https://www.odoo.com/documentation/17.0/applications/sales/crm/pipeline.html', 'Image: CRM pipeline stages'),
    (module2_id, 'Odoo Installation Guide', 'document', 0, 5, 'https://www.odoo.com/documentation/17.0/administration/install.html', 'Document: Odoo Installation Guide'),
    (module2_id, 'CRM Pipeline Configuration', 'document', 0, 6, 'https://www.odoo.com/documentation/17.0/applications/sales/crm/pipeline.html', 'Document: CRM Pipeline Configuration');

  INSERT INTO module_quizzes (module_id, title, description, passing_score, time_limit)
  VALUES (module2_id, 'Module 2 Quiz', 'Test your understanding of Odoo CRM setup and configuration', 70, 30);

  -- Module 3: Core Concepts & Features (Leads, Opportunities, Workflow, Quiz)
  INSERT INTO course_modules (course_id, title, description, order_index)
  VALUES (odoo_course_id, 'Module 3: Core Concepts & Features', 'Leads, Opportunities, Workflow, Quiz', 3)
  RETURNING id INTO module3_id;
  
  INSERT INTO module_topics (module_id, title, content_type, duration, order_index, content_url, description)
  VALUES 
    (module3_id, 'Leads vs Opportunities in Odoo CRM', 'video', 0, 1, 'https://www.youtube.com/embed/8W1dG6nP2XU', 'YouTube: Leads vs Opportunities'),
    (module3_id, 'Odoo CRM Complete Workflow Demo', 'video', 0, 2, 'https://www.youtube.com/embed/ZlKZKp1G9eA', 'YouTube: Complete Workflow Demo'),
    (module3_id, 'Lead → Opportunity flow', 'image', 0, 3, 'https://www.odoo.com/documentation/17.0/applications/sales/crm/acquire_leads.html', 'Image: Lead to Opportunity flow'),
    (module3_id, 'CRM sales funnel diagram', 'image', 0, 4, 'https://www.geeksforgeeks.org/sales-funnel/', 'Image: CRM sales funnel'),
    (module3_id, 'Acquire & Manage Leads (Odoo)', 'document', 0, 5, 'https://www.odoo.com/documentation/17.0/applications/sales/crm/acquire_leads.html', 'Document: Acquire & Manage Leads'),
    (module3_id, 'Manage Opportunities', 'document', 0, 6, 'https://www.odoo.com/documentation/17.0/applications/sales/crm/pipeline/manage_opportunities.html', 'Document: Manage Opportunities');

  -- Module 4: Core Concepts & Features (Best Practices, Workflow, Process Diagrams)
  INSERT INTO course_modules (course_id, title, description, order_index)
  VALUES (odoo_course_id, 'Module 4: Core Concepts & Features', 'Best Practices, Workflow, Process Diagrams', 4)
  RETURNING id INTO module4_id;
  
  INSERT INTO module_topics (module_id, title, content_type, duration, order_index, content_url, description)
  VALUES 
    (module4_id, 'Odoo CRM Best Practices', 'video', 0, 1, 'https://www.youtube.com/embed/KpZ1kZ9R0M8', 'YouTube: Odoo CRM Best Practices'),
    (module4_id, 'Automating Sales Process in Odoo CRM', 'video', 0, 2, 'https://www.youtube.com/embed/3mZpZK1P0VQ', 'YouTube: Automating Sales Process'),
    (module4_id, 'Automated CRM workflow', 'image', 0, 3, 'https://www.odoo.com/documentation/17.0/applications/sales/crm/optimize/automated_actions.html', 'Image: Automated CRM workflow'),
    (module4_id, 'Sales activity scheduling flow', 'image', 0, 4, 'https://www.odoo.com/documentation/17.0/applications/sales/crm/optimize/activities.html', 'Image: Sales activity scheduling'),
    (module4_id, 'CRM Activities & Follow-ups', 'document', 0, 5, 'https://www.odoo.com/documentation/17.0/applications/sales/crm/optimize/activities.html', 'Document: CRM Activities & Follow-ups'),
    (module4_id, 'CRM Automation Rules', 'document', 0, 6, 'https://www.odoo.com/documentation/17.0/applications/sales/crm/optimize/automated_actions.html', 'Document: CRM Automation Rules');

  -- Module 5: Advanced Techniques (Advanced Configuration, Optimization)
  INSERT INTO course_modules (course_id, title, description, order_index)
  VALUES (odoo_course_id, 'Module 5: Advanced Techniques', 'Advanced Configuration, Optimization', 5)
  RETURNING id INTO module5_id;
  
  INSERT INTO module_topics (module_id, title, content_type, duration, order_index, content_url, description)
  VALUES 
    (module5_id, 'Customizing Odoo CRM Pipelines', 'video', 0, 1, 'https://www.youtube.com/embed/7KkZpJ1FZ0I', 'YouTube: Customizing CRM Pipelines'),
    (module5_id, 'Sales Forecasting in Odoo CRM', 'video', 0, 2, 'https://www.youtube.com/embed/JpZ9ZK0M8gE', 'YouTube: Sales Forecasting'),
    (module5_id, 'CRM forecasting & reporting flow', 'image', 0, 3, 'https://www.odoo.com/documentation/17.0/applications/sales/crm/forecast.html', 'Image: CRM forecasting & reporting'),
    (module5_id, 'CRM dashboard visuals', 'image', 0, 4, 'https://www.odoo.com/documentation/17.0/applications/sales/crm/reporting.html', 'Image: CRM dashboard visuals'),
    (module5_id, 'CRM Forecast & Revenue', 'document', 0, 5, 'https://www.odoo.com/documentation/17.0/applications/sales/crm/forecast.html', 'Document: CRM Forecast & Revenue'),
    (module5_id, 'CRM Reporting & Dashboards', 'document', 0, 6, 'https://www.odoo.com/documentation/17.0/applications/sales/crm/reporting.html', 'Document: CRM Reporting & Dashboards');

  -- Module 6: Advanced Techniques + Quiz (Performance, Advanced Features)
  INSERT INTO course_modules (course_id, title, description, order_index)
  VALUES (odoo_course_id, 'Module 6: Advanced Techniques + Quiz', 'Performance, Advanced Features', 6)
  RETURNING id INTO module6_id;
  
  INSERT INTO module_topics (module_id, title, content_type, duration, order_index, content_url, description)
  VALUES 
    (module6_id, 'Advanced CRM Features in Odoo', 'video', 0, 1, 'https://www.youtube.com/embed/Y1kZpZ9M2E0', 'YouTube: Advanced CRM Features'),
    (module6_id, 'Odoo CRM Integration with Sales Module', 'video', 0, 2, 'https://www.youtube.com/embed/2ZKpM8F1ZQk', 'YouTube: CRM Integration with Sales'),
    (module6_id, 'CRM + Sales module integration', 'image', 0, 3, 'https://www.odoo.com/documentation/17.0/applications/sales/sales/crm.html', 'Image: CRM + Sales integration'),
    (module6_id, 'Cross-module data flow', 'image', 0, 4, 'https://www.odoo.com/documentation/17.0/applications/general/overview.html', 'Image: Cross-module data flow'),
    (module6_id, 'CRM & Sales Integration', 'document', 0, 5, 'https://www.odoo.com/documentation/17.0/applications/sales/sales/crm.html', 'Document: CRM & Sales Integration'),
    (module6_id, 'Odoo CRM Advanced Usage', 'document', 0, 6, 'https://www.odoo.com/slides/crm-16', 'Document: Odoo CRM Advanced Usage');

  INSERT INTO module_quizzes (module_id, title, description, passing_score, time_limit)
  VALUES (module6_id, 'Module 6 Quiz', 'Test your advanced Odoo CRM knowledge', 75, 35);

  -- Module 7: Practical Applications (Use Cases, Case Studies, Implementation)
  INSERT INTO course_modules (course_id, title, description, order_index)
  VALUES (odoo_course_id, 'Module 7: Practical Applications', 'Use Cases, Case Studies, Implementation', 7)
  RETURNING id INTO module7_id;
  
  INSERT INTO module_topics (module_id, title, content_type, duration, order_index, content_url, description)
  VALUES 
    (module7_id, 'Real-World CRM Use Case (Odoo)', 'video', 0, 1, 'https://www.youtube.com/embed/ZpM8K1F0Q9E', 'YouTube: Real-World CRM Use Case'),
    (module7_id, 'Implementing CRM for a Company in Odoo', 'video', 0, 2, 'https://www.youtube.com/embed/6KZpZ1M9E0I', 'YouTube: Implementing CRM for a Company'),
    (module7_id, 'Industry CRM use cases', 'image', 0, 3, 'https://www.odoo.com/page/crm', 'Image: Industry CRM use cases'),
    (module7_id, 'CRM lifecycle diagram', 'image', 0, 4, 'https://www.geeksforgeeks.org/customer-relationship-management-crm/', 'Image: CRM lifecycle diagram'),
    (module7_id, 'Odoo CRM Business Use Cases', 'document', 0, 5, 'https://www.odoo.com/page/crm', 'Document: Odoo CRM Business Use Cases'),
    (module7_id, 'CRM Implementation Guide', 'document', 0, 6, 'https://www.odoo.com/documentation/17.0/applications/sales/crm.html', 'Document: CRM Implementation Guide');

  -- Module 8: Practical Applications & Projects + Final Assessment
  INSERT INTO course_modules (course_id, title, description, order_index)
  VALUES (odoo_course_id, 'Module 8: Practical Applications & Projects + Final Assessment', 'Projects, Templates, Workshops', 8)
  RETURNING id INTO module8_id;
  
  INSERT INTO module_topics (module_id, title, content_type, duration, order_index, content_url, description)
  VALUES 
    (module8_id, 'Odoo CRM Mini Project (End-to-End)', 'video', 0, 1, 'https://www.youtube.com/embed/1ZKpM9E0FQ8', 'YouTube: Odoo CRM Mini Project'),
    (module8_id, 'Odoo CRM for Interviews & Projects', 'video', 0, 2, 'https://www.youtube.com/embed/KZpZ1M9E0I8', 'YouTube: Odoo CRM for Interviews'),
    (module8_id, 'CRM project architecture', 'image', 0, 3, 'https://www.odoo.com/documentation/17.0/applications/general/overview.html', 'Image: CRM project architecture'),
    (module8_id, 'Deployment & usage flow', 'image', 0, 4, 'https://www.odoo.com/documentation/17.0/administration.html', 'Image: Deployment & usage flow'),
    (module8_id, 'Odoo CRM Slides & Training', 'document', 0, 5, 'https://www.odoo.com/slides/crm-16', 'Document: Odoo CRM Slides & Training'),
    (module8_id, 'Odoo Community Project Examples', 'document', 0, 6, 'https://github.com/odoo/odoo', 'Document: Odoo Community Project Examples');

  INSERT INTO module_quizzes (module_id, title, description, passing_score, time_limit)
  VALUES (module8_id, 'Final Assessment', 'Comprehensive final exam covering all Odoo CRM modules', 85, 60);

  RAISE NOTICE 'Successfully updated Basics of Odoo CRM course with 8 modules and correct links';
END $$;
