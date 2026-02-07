# Course Links Update - Complete Guide

## Overview
This package contains SQL scripts to update all course module topics with correct, curated educational links.

## 📚 Courses Included

### 1. Advanced React Patterns
- **File**: `update_react_course_links.sql`
- **Modules**: 8
- **Topics**: 48 (6 per module)
- **Quizzes**: 3 (Modules 2, 6, 8)
- **Content**: React patterns, hooks, performance, architecture

### 2. Basics of Odoo CRM
- **File**: `update_odoo_course_links.sql`
- **Modules**: 8
- **Topics**: 48 (6 per module)
- **Quizzes**: 3 (Modules 2, 6, 8)
- **Content**: Odoo CRM, leads, pipelines, automation, forecasting

### 3. SQL Database Mastery
- **File**: `update_sql_course_links.sql`
- **Modules**: 8
- **Topics**: 48 (6 per module)
- **Quizzes**: 3 (Modules 2, 6, 8)
- **Content**: SQL queries, joins, optimization, transactions, ACID

## 🚀 Quick Start

### Update All Courses at Once
```bash
cd database
psql -U postgres -d learnsphere -f update_all_courses.sql
```

### Update Individual Courses
```bash
# React only
psql -U postgres -d learnsphere -f update_react_course_links.sql

# Odoo only
psql -U postgres -d learnsphere -f update_odoo_course_links.sql

# SQL only
psql -U postgres -d learnsphere -f update_sql_course_links.sql
```

### Using pgAdmin 4
1. Open pgAdmin 4
2. Connect to LearnSphere database
3. Open Query Tool (Tools > Query Tool)
4. Open desired SQL file
5. Execute (F5)

## 📊 What Gets Updated

Each course follows the same structure:

### Module Pattern (8 Modules per Course)
1. **Module 1**: Introduction & Fundamentals
2. **Module 2**: Introduction & Fundamentals + Quiz ✅
3. **Module 3**: Core Concepts & Features
4. **Module 4**: Core Concepts & Features
5. **Module 5**: Advanced Techniques
6. **Module 6**: Advanced Techniques + Quiz ✅
7. **Module 7**: Practical Applications
8. **Module 8**: Practical Applications & Projects + Final Assessment ✅

### Topic Pattern (6 Topics per Module)
- 2 YouTube videos
- 2 Images/Diagrams
- 2 Documents/References

## 🗄️ Database Impact

### Tables Modified
- `course_modules` - Course module structure
- `module_topics` - Individual learning resources
- `module_quizzes` - Assessment quizzes

### Total Changes
- **Courses Updated**: 3
- **Modules Created**: 24 (8 per course)
- **Topics Created**: 144 (48 per course)
- **Quizzes Created**: 9 (3 per course)

## ✅ Verification Queries

### Check All Courses
```sql
SELECT 
  c.title,
  COUNT(DISTINCT cm.id) as modules,
  COUNT(DISTINCT mt.id) as topics,
  COUNT(DISTINCT mq.id) as quizzes
FROM courses c
LEFT JOIN course_modules cm ON c.id = cm.course_id
LEFT JOIN module_topics mt ON cm.id = mt.module_id
LEFT JOIN module_quizzes mq ON cm.id = mq.module_id
WHERE c.title IN ('Advanced React Patterns', 'Basics of Odoo CRM', 'SQL Database Mastery')
GROUP BY c.title;
```

Expected output:
```
         title              | modules | topics | quizzes
---------------------------+---------+--------+---------
 Advanced React Patterns   |    8    |   48   |    3
 Basics of Odoo CRM        |    8    |   48   |    3
 SQL Database Mastery      |    8    |   48   |    3
```

### Check Specific Course
```sql
-- Replace 'Course Name' with actual course title
SELECT 
  cm.order_index,
  cm.title as module_title,
  COUNT(mt.id) as topic_count,
  COUNT(mq.id) as quiz_count
FROM course_modules cm
LEFT JOIN module_topics mt ON cm.id = mt.module_id
LEFT JOIN module_quizzes mq ON cm.id = mq.module_id
WHERE cm.course_id = (SELECT id FROM courses WHERE title = 'Advanced React Patterns')
GROUP BY cm.id, cm.order_index, cm.title
ORDER BY cm.order_index;
```

## 🔄 Rollback

If you need to rollback:

1. **Restore from backup** (recommended)
2. **Re-run original seed script**:
   ```bash
   psql -U postgres -d learnsphere -f add_modules_simple.sql
   ```

## 📝 Notes

- All scripts use `DELETE CASCADE` to safely remove old data
- Duration is set to 0 (update manually if needed)
- Content types: 'video', 'image', 'document'
- All URLs are verified and point to legitimate resources
- Scripts are idempotent (can be run multiple times safely)

## 🎯 Content Sources

### Advanced React Patterns
- Official React documentation
- Kent C. Dodds tutorials
- Patterns.dev
- Fireship videos

### Basics of Odoo CRM
- Official Odoo documentation (v17.0)
- Odoo training slides
- Community tutorials

### SQL Database Mastery
- PostgreSQL official docs
- W3Schools tutorials
- FreeCodeCamp courses
- GeeksforGeeks references

## 🛠️ Troubleshooting

### Course Not Found
```
NOTICE: [Course Name] course not found
```
**Solution**: Ensure the course exists in the `courses` table with exact title match.

### Permission Denied
**Solution**: Ensure PostgreSQL user has proper permissions:
```sql
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO your_user;
```

### Foreign Key Violations
**Solution**: Ensure `course_modules` and `module_topics` tables exist:
```bash
psql -U postgres -d learnsphere -f add_modules_simple.sql
```

## 📞 Support

For issues or questions:
1. Check verification queries above
2. Review individual course README files
3. Ensure database schema is up to date
4. Check PostgreSQL logs for detailed errors

## 🎓 Next Steps

After updating:
1. Verify all courses using verification queries
2. Test frontend display of modules and topics
3. Update duration fields if needed
4. Add quiz questions to module_quizzes
5. Test learner enrollment and progress tracking
