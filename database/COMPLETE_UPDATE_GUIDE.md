# LearnSphere Database Update - Complete Package

## 📦 Package Contents

This package contains all SQL scripts needed to set up complete course content with modules, topics, quizzes, and questions for 5 courses.

### Main Scripts
1. **`master_update_all.sql`** ⭐ - Run this to update everything
2. **`verify_all_data.sql`** - Verify all data after update

### Course Module & Topic Updates
3. **`update_react_course_links.sql`** - Advanced React Patterns
4. **`update_odoo_course_links.sql`** - Basics of Odoo CRM
5. **`update_sql_course_links.sql`** - SQL Database Mastery

### Quiz Question Updates
6. **`add_quiz_questions_part1.sql`** - SQL, Odoo, React questions
7. **`add_quiz_questions_part2.sql`** - Full Stack, Python questions

### Documentation
8. **`COURSE_UPDATES_README.md`** - Course modules documentation
9. **`QUIZ_QUESTIONS_README.md`** - Quiz questions documentation
10. **`UPDATE_REACT_LINKS_README.md`** - React course details
11. **`UPDATE_ODOO_LINKS_README.md`** - Odoo course details

## 🚀 Quick Start (3 Steps)

### Step 1: Navigate to Database Folder
```bash
cd d:\Kishore\New_project\LearnSphere\database
```

### Step 2: Run Master Update Script
```bash
psql -U postgres -d learnsphere -f master_update_all.sql
```

### Step 3: Verify Data
```bash
psql -U postgres -d learnsphere -f verify_all_data.sql
```

## 📊 What Gets Created

### Per Course (5 Courses Total)
- ✅ 8 Modules
- ✅ 48 Topics (16 videos, 16 images, 16 documents)
- ✅ 4 Quizzes (after modules 2, 4, 6, 8)
- ✅ 12 Questions (3 per quiz)
- ✅ 48 Options (4 per question, 1 correct)

### Total Across All Courses
- ✅ 5 Courses
- ✅ 40 Modules
- ✅ 240 Topics
- ✅ 20 Quizzes
- ✅ 60 Questions
- ✅ 240 Options

## 🎓 Courses Included

1. **SQL Database Mastery**
   - PostgreSQL, MySQL, queries, joins, optimization, ACID
   
2. **Basics of Odoo CRM**
   - Odoo setup, leads, opportunities, pipelines, forecasting
   
3. **Advanced React Patterns**
   - Compound components, HOC, hooks, Context API, performance
   
4. **Full Stack Web Development**
   - MERN stack, REST APIs, authentication, deployment
   
5. **Python for Data Science**
   - NumPy, Pandas, Scikit-learn, ML, Kaggle projects

## 📁 Database Structure

```
courses
  └─ course_modules (8 per course)
      ├─ module_topics (6 per module)
      │   ├─ 2 videos (YouTube)
      │   ├─ 2 images (diagrams/screenshots)
      │   └─ 2 documents (official docs/tutorials)
      │
      └─ module_quizzes (4 per course: modules 2,4,6,8)
          └─ quiz_questions (3 per quiz)
              └─ quiz_options (4 per question)
```

## ✅ Verification Checklist

After running the scripts, verify:

- [ ] All 5 courses have 8 modules each
- [ ] Each module has 6 topics (2 videos, 2 images, 2 documents)
- [ ] Modules 2, 4, 6, 8 have quizzes
- [ ] Each quiz has 3 questions
- [ ] Each question has 4 options
- [ ] Each question has exactly 1 correct answer
- [ ] No orphaned questions or options
- [ ] Content URLs are valid

## 🎯 Module Structure (All Courses)

### Module 1: Introduction & Fundamentals
- Overview, Getting Started, Architecture, Setup
- 6 topics, no quiz

### Module 2: Introduction & Fundamentals + Quiz ✅
- Setup, Architecture Diagram, Configuration
- 6 topics + **Quiz 1** (3 questions)

### Module 3: Core Concepts & Features
- Key concepts, workflow, features
- 6 topics, no quiz

### Module 4: Core Concepts & Features ✅
- Best Practices, Workflow, Process Diagrams
- 6 topics + **Quiz 2** (3 questions)

### Module 5: Advanced Techniques
- Advanced configuration, optimization
- 6 topics, no quiz

### Module 6: Advanced Techniques + Quiz ✅
- Performance, Advanced Features, Masterclass
- 6 topics + **Quiz 3** (3 questions)

### Module 7: Practical Applications
- Use Cases, Case Studies, Implementation
- 6 topics, no quiz

### Module 8: Practical Applications & Projects + Final Assessment ✅
- Projects, Templates, Workshops
- 6 topics + **Quiz 4 (Final)** (3 questions)

## 🔧 Troubleshooting

### Issue: Course Not Found
**Solution**: Ensure course exists with exact title match
```sql
SELECT id, title FROM courses WHERE title LIKE '%React%';
```

### Issue: Quizzes Not Created
**Solution**: Run module updates before quiz questions
```bash
psql -U postgres -d learnsphere -f update_react_course_links.sql
psql -U postgres -d learnsphere -f add_quiz_questions_part1.sql
```

### Issue: Questions Not Appearing
**Solution**: Check quiz-question relationship
```sql
SELECT mq.title, COUNT(qq.id) 
FROM module_quizzes mq
LEFT JOIN quiz_questions qq ON mq.id = qq.quiz_id
GROUP BY mq.id, mq.title;
```

## 🎨 Frontend Integration

The data will automatically appear in the frontend when:

1. **Course Detail Page**: Shows all 8 modules
2. **Module View**: Shows 6 topics per module
3. **Topic Player**: Displays video/image/document content
4. **Quiz Interface**: Appears after completing module content
5. **Quiz Questions**: Shows 3 questions with 4 options each
6. **Results**: Calculates score and awards points

## 📈 Gamification

### Points System (from module_quizzes table)
- 1st attempt: 20 points
- 2nd attempt: 15 points
- 3rd attempt: 10 points
- 4+ attempts: 5 points

### Badge Levels (from users table)
- Newbie: 0 points
- Explorer: 50 points
- Achiever: 100 points
- Specialist: 200 points
- Expert: 300 points
- Master: 500 points

## 🔄 Update Process Flow

```
1. master_update_all.sql
   ↓
2. update_react_course_links.sql
   update_odoo_course_links.sql
   update_sql_course_links.sql
   ↓
3. add_quiz_questions_part1.sql
   add_quiz_questions_part2.sql
   ↓
4. verify_all_data.sql
```

## 📞 Support & Next Steps

### After Successful Update
1. ✅ Run verification script
2. ✅ Test frontend course display
3. ✅ Test module navigation
4. ✅ Test topic content display
5. ✅ Test quiz functionality
6. ✅ Test scoring and points
7. ✅ Test badge level updates

### For Issues
- Check PostgreSQL logs
- Run verification queries
- Review individual README files
- Ensure database schema is up to date

## 📝 Notes

- All scripts are idempotent (safe to run multiple times)
- Scripts use `DELETE CASCADE` for clean updates
- Duration fields set to 0 (update manually if needed)
- All URLs point to legitimate educational resources
- Content types properly categorized: 'video', 'image', 'document'

## 🎉 Success Criteria

Your update is successful when:
- ✅ Verification script shows expected counts
- ✅ Frontend displays all courses with 8 modules
- ✅ Topics display correctly with proper content types
- ✅ Quizzes appear after modules 2, 4, 6, 8
- ✅ Questions display with 4 options each
- ✅ Correct answers are properly marked
- ✅ Points are awarded on quiz completion
- ✅ Badge levels update based on total points

---

**Ready to update?** Run: `psql -U postgres -d learnsphere -f master_update_all.sql`
