# Advanced React Patterns Course - Links Update

## Overview
This update script replaces the generic placeholder content in the Advanced React Patterns course with the correct, curated links for all 8 modules.

## What's Updated

### Module Structure (8 Modules Total)

1. **Module 1: Introduction & Fundamentals** (Overview, Setup, Architecture)
   - 2 YouTube videos (Kent C. Dodds, Fireship)
   - 2 Images (React component tree, architecture overview)
   - 2 Documents (React Official Docs, Thinking in React)

2. **Module 2: Introduction & Fundamentals + Quiz** (Setup, Architecture Diagram, Tooling)
   - 2 YouTube videos (Traversy Media, Akshay Saini)
   - 2 Images (Render/reconciliation, Virtual DOM)
   - 2 Documents (Vite + React, Rendering Process)
   - **Quiz included**

3. **Module 3: Core Concepts & Features** (Key patterns, workflow, flow charts)
   - 2 YouTube videos (Advanced Patterns, Compound Components)
   - 2 Images (Compound component structure, Hooks data flow)
   - 2 Documents (Kent C. Dodds patterns, Custom Hooks)

4. **Module 4: Core Concepts & Features** (Best Practices, Workflow, Patterns)
   - 2 YouTube videos (Controlled vs Uncontrolled, Render Props & HOC)
   - 2 Images (HOC vs Render Props, State lifting)
   - 2 Documents (React Patterns, Sharing State)

5. **Module 5: Advanced Techniques** (Advanced configuration & optimization)
   - 2 YouTube videos (Performance Optimization, useMemo/useCallback)
   - 2 Images (Memoization flow, Re-render optimization)
   - 2 Documents (Performance Docs, useMemo & useCallback)

6. **Module 6: Advanced Techniques + Quiz** (Masterclass-level patterns)
   - 2 YouTube videos (State Management, Advanced Hooks)
   - 2 Images (Context API flow, State management comparison)
   - 2 Documents (Context API Docs, When to use Redux)
   - **Quiz included**

7. **Module 7: Practical Applications** (Real-world use cases & implementation)
   - 2 YouTube videos (Real-world Architecture, Scalable Apps)
   - 2 Images (Folder structure, Feature-based architecture)
   - 2 Documents (Bulletproof React, Project Structuring)

8. **Module 8: Practical Applications & Projects + Final Assessment** (Projects, templates, workshops)
   - 2 YouTube videos (Advanced Project, Interview Patterns)
   - 2 Images (Project architecture, Production flow)
   - 2 Documents (Advanced Patterns Repo, Vercel Deployment)
   - **Final Assessment Quiz**

## How to Apply the Update

### Option 1: Using psql command line
```bash
psql -U postgres -d learnsphere -f database/update_react_course_links.sql
```

### Option 2: Using pgAdmin 4
1. Open pgAdmin 4
2. Connect to your LearnSphere database
3. Open Query Tool (Tools > Query Tool)
4. Open the file: `database/update_react_course_links.sql`
5. Click Execute (F5)

### Option 3: Using Node.js
```bash
node database/setup.js
# Then manually run the update script through your preferred method
```

## What the Script Does

1. **Finds** the Advanced React Patterns course by title
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
WHERE course_id = (SELECT id FROM courses WHERE title = 'Advanced React Patterns');
-- Expected: 8

-- Check topics count
SELECT COUNT(*) FROM module_topics mt
JOIN course_modules cm ON mt.module_id = cm.id
WHERE cm.course_id = (SELECT id FROM courses WHERE title = 'Advanced React Patterns');
-- Expected: 48

-- Check quizzes count
SELECT COUNT(*) FROM module_quizzes mq
JOIN course_modules cm ON mq.module_id = cm.id
WHERE cm.course_id = (SELECT id FROM courses WHERE title = 'Advanced React Patterns');
-- Expected: 3
```

## Notes

- The script uses `DELETE CASCADE` to remove old data safely
- All URLs are verified and point to legitimate educational resources
- Duration is set to 0 (can be updated later based on actual content length)
- Content types are properly categorized: 'video', 'image', 'document'
- Order indices ensure proper sequential display

## Rollback

If you need to rollback, you can:
1. Restore from a database backup
2. Re-run the original `add_modules_simple.sql` script

## Support

If you encounter any issues:
- Ensure the course "Advanced React Patterns" exists in your database
- Check that the `course_modules`, `module_topics`, and `module_quizzes` tables exist
- Verify PostgreSQL user has proper permissions
