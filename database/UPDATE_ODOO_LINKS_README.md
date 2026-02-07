# Basics of Odoo CRM Course - Links Update

## Overview
This update script replaces the generic placeholder content in the Basics of Odoo CRM course with the correct, curated links for all 8 modules.

## What's Updated

### Module Structure (8 Modules Total)

1. **Module 1: Introduction & Fundamentals** (Overview, Getting Started, Architecture, Setup)
   - 2 YouTube videos (Odoo CRM Overview, Architecture & Modules)
   - 2 Images (ERP & CRM architecture, CRM workflow)
   - 2 Documents (Odoo CRM Introduction, What is CRM)

2. **Module 2: Introduction & Fundamentals + Quiz** (Setup, Architecture Diagram, Configuration)
   - 2 YouTube videos (Install Odoo, Initial Configuration)
   - 2 Images (Modules structure, Pipeline stages)
   - 2 Documents (Installation Guide, Pipeline Configuration)
   - **Quiz included**

3. **Module 3: Core Concepts & Features** (Leads, Opportunities, Workflow, Quiz)
   - 2 YouTube videos (Leads vs Opportunities, Complete Workflow)
   - 2 Images (Lead to Opportunity flow, Sales funnel)
   - 2 Documents (Acquire & Manage Leads, Manage Opportunities)

4. **Module 4: Core Concepts & Features** (Best Practices, Workflow, Process Diagrams)
   - 2 YouTube videos (Best Practices, Automating Sales)
   - 2 Images (Automated workflow, Activity scheduling)
   - 2 Documents (Activities & Follow-ups, Automation Rules)

5. **Module 5: Advanced Techniques** (Advanced Configuration, Optimization)
   - 2 YouTube videos (Customizing Pipelines, Sales Forecasting)
   - 2 Images (Forecasting & reporting, Dashboard visuals)
   - 2 Documents (Forecast & Revenue, Reporting & Dashboards)

6. **Module 6: Advanced Techniques + Quiz** (Performance, Advanced Features)
   - 2 YouTube videos (Advanced Features, CRM Integration)
   - 2 Images (CRM + Sales integration, Cross-module flow)
   - 2 Documents (CRM & Sales Integration, Advanced Usage)
   - **Quiz included**

7. **Module 7: Practical Applications** (Use Cases, Case Studies, Implementation)
   - 2 YouTube videos (Real-World Use Case, Implementing CRM)
   - 2 Images (Industry use cases, CRM lifecycle)
   - 2 Documents (Business Use Cases, Implementation Guide)

8. **Module 8: Practical Applications & Projects + Final Assessment** (Projects, Templates, Workshops)
   - 2 YouTube videos (Mini Project, Interviews & Projects)
   - 2 Images (Project architecture, Deployment flow)
   - 2 Documents (CRM Slides & Training, Community Examples)
   - **Final Assessment Quiz**

## How to Apply the Update

### Option 1: Using psql command line
```bash
psql -U postgres -d learnsphere -f database/update_odoo_course_links.sql
```

### Option 2: Using pgAdmin 4
1. Open pgAdmin 4
2. Connect to your LearnSphere database
3. Open Query Tool (Tools > Query Tool)
4. Open the file: `database/update_odoo_course_links.sql`
5. Click Execute (F5)

## What the Script Does

1. **Finds** the Basics of Odoo CRM course by title
2. **Deletes** all existing modules and topics for this course (CASCADE)
3. **Creates** 8 new modules with proper descriptions
4. **Inserts** 48 module topics (6 per module) with correct URLs
5. **Adds** 3 quizzes (Module 2, Module 6, Module 8/Final)

## Database Tables Affected

- `course_modules` - 8 modules created
- `module_topics` - 48 topics created
- `module_quizzes` - 3 quizzes created

## Verification

After running the script, verify the update:

```sql
-- Check modules count
SELECT COUNT(*) FROM course_modules 
WHERE course_id = (SELECT id FROM courses WHERE title = 'Basics of Odoo CRM');
-- Expected: 8

-- Check topics count
SELECT COUNT(*) FROM module_topics mt
JOIN course_modules cm ON mt.module_id = cm.id
WHERE cm.course_id = (SELECT id FROM courses WHERE title = 'Basics of Odoo CRM');
-- Expected: 48

-- Check quizzes count
SELECT COUNT(*) FROM module_quizzes mq
JOIN course_modules cm ON mq.module_id = cm.id
WHERE cm.course_id = (SELECT id FROM courses WHERE title = 'Basics of Odoo CRM');
-- Expected: 3
```

## Notes

- All URLs point to official Odoo documentation (v17.0) and verified educational resources
- Duration is set to 0 (can be updated later based on actual content length)
- Content types are properly categorized: 'video', 'image', 'document'
- Order indices ensure proper sequential display
