# Quiz Questions Update - Complete Guide

## Overview
This package adds complete quiz questions and options for all 5 courses in the LearnSphere platform.

## 📚 Quiz Structure

### Per Course
- **4 Quizzes** (after modules 2, 4, 6, and 8)
- **3 Questions** per quiz
- **4 Options** per question (multiple choice)
- **1 Correct answer** per question

### Total Across All Courses
- **5 Courses**
- **20 Quizzes** (4 per course)
- **60 Questions** (12 per course)
- **240 Options** (48 per course)

## 🎯 Courses Covered

1. **SQL Database Mastery** - 12 questions (Q1-Q12)
2. **Basics of Odoo CRM** - 12 questions (Q13-Q24)
3. **Advanced React Patterns** - 12 questions (Q25-Q36)
4. **Full Stack Web Development** - 12 questions (Q37-Q48)
5. **Python for Data Science** - 12 questions (Q49-Q60)

## 🚀 Quick Start

### Run Complete Update (Recommended)
```bash
cd database
psql -U postgres -d learnsphere -f master_update_all.sql
```

This will:
1. Update all course modules and topics
2. Add all quiz questions (Part 1: SQL, Odoo, React)
3. Add all quiz questions (Part 2: Full Stack, Python)

### Run Quiz Questions Only
If you've already updated modules and topics:

```bash
# Add questions for SQL, Odoo, React
psql -U postgres -d learnsphere -f add_quiz_questions_part1.sql

# Add questions for Full Stack, Python
psql -U postgres -d learnsphere -f add_quiz_questions_part2.sql
```

## 📊 Quiz Distribution

### Quiz Placement
- **Quiz 1**: After Module 2 (Introduction & Fundamentals + Quiz)
- **Quiz 2**: After Module 4 (Core Concepts & Features)
- **Quiz 3**: After Module 6 (Advanced Techniques + Quiz)
- **Quiz 4**: After Module 8 (Final Assessment)

### Question Topics by Course

#### SQL Database Mastery
- **Quiz 1 (M2)**: SQL basics, DBMS components, PostgreSQL commands
- **Quiz 2 (M4)**: WHERE clause, JOINs, aggregate functions
- **Quiz 3 (M6)**: Indexes, ACID properties, transactions
- **Quiz 4 (M8)**: ER diagrams, DML, SQL practice platforms

#### Basics of Odoo CRM
- **Quiz 1 (M2)**: Odoo basics, CRM definition, Community Edition
- **Quiz 2 (M4)**: Leads/Opportunities, pipelines, activities
- **Quiz 3 (M6)**: Forecasting, integrations, automation
- **Quiz 4 (M8)**: CRM benefits, implementation, workflows

#### Advanced React Patterns
- **Quiz 1 (M2)**: React basics, Virtual DOM, Vite
- **Quiz 2 (M4)**: Compound components, Render Props, HOC
- **Quiz 3 (M6)**: useMemo, Context API, useCallback
- **Quiz 4 (M8)**: Architecture, patterns, interviews

#### Full Stack Web Development
- **Quiz 1 (M2)**: Full stack definition, Node.js, Git
- **Quiz 2 (M4)**: REST API, Express.js, DOM
- **Quiz 3 (M6)**: MongoDB, JWT, OWASP
- **Quiz 4 (M8)**: MERN stack, CI/CD, projects

#### Python for Data Science
- **Quiz 1 (M2)**: Python popularity, Jupyter, Anaconda
- **Quiz 2 (M4)**: NumPy, Pandas, preprocessing
- **Quiz 3 (M6)**: Vectorization, Scikit-learn, training
- **Quiz 4 (M8)**: Kaggle, end-to-end DS, projects

## ✅ Verification Queries

### Check All Quiz Questions
```sql
SELECT 
  c.title as course,
  cm.order_index as module,
  mq.title as quiz,
  COUNT(qq.id) as questions,
  COUNT(qo.id) as options
FROM courses c
JOIN course_modules cm ON c.id = cm.course_id
JOIN module_quizzes mq ON cm.id = mq.module_id
LEFT JOIN quiz_questions qq ON mq.id = qq.quiz_id
LEFT JOIN quiz_options qo ON qq.id = qo.question_id
GROUP BY c.title, cm.order_index, mq.title
ORDER BY c.title, cm.order_index;
```

Expected: Each quiz should have 3 questions and 12 options (4 per question)

### Check Correct Answers
```sql
SELECT 
  c.title as course,
  COUNT(DISTINCT qq.id) as total_questions,
  COUNT(DISTINCT CASE WHEN qo.is_correct THEN qo.id END) as correct_answers
FROM courses c
JOIN course_modules cm ON c.id = cm.course_id
JOIN module_quizzes mq ON cm.id = mq.module_id
JOIN quiz_questions qq ON mq.id = qq.quiz_id
JOIN quiz_options qo ON qq.id = qo.question_id
GROUP BY c.title;
```

Expected: Each course should have 12 questions and 12 correct answers (1 per question)

### Check Specific Course Quizzes
```sql
-- Replace 'Course Name' with actual course title
SELECT 
  cm.order_index,
  mq.title as quiz_title,
  qq.question_text,
  qo.option_text,
  qo.is_correct
FROM courses c
JOIN course_modules cm ON c.id = cm.course_id
JOIN module_quizzes mq ON cm.id = mq.module_id
JOIN quiz_questions qq ON mq.id = qq.quiz_id
JOIN quiz_options qo ON qq.id = qo.question_id
WHERE c.title = 'SQL Database Mastery'
ORDER BY cm.order_index, qq.order_index, qo.order_index;
```

## 🗄️ Database Tables

### Tables Modified
- `quiz_questions` - Question text and metadata
- `quiz_options` - Answer options with correct flag

### Relationships
```
courses
  └─ course_modules
      └─ module_quizzes
          └─ quiz_questions
              └─ quiz_options
```

## 📝 Question Format

All questions follow this structure:
```sql
Question: "Question text here?"
  A. Option 1
  B. Option 2
  C. Option 3 ✅ (correct)
  D. Option 4
```

## 🔄 Frontend Integration

The quizzes will automatically appear in the frontend when:
1. Learner completes the previous module content
2. Quiz is associated with the correct module
3. Questions and options are properly linked

### Expected Frontend Behavior
- Display quiz after module completion
- Show 3 questions per quiz
- Present 4 options per question
- Allow single selection (radio buttons)
- Calculate score based on correct answers
- Award points based on attempt number

## 🎓 Scoring System

Based on the existing `module_quizzes` table:
- **1st Attempt**: 20 points (if passing score met)
- **2nd Attempt**: 15 points
- **3rd Attempt**: 10 points
- **4+ Attempts**: 5 points

Passing score: 70% (2 out of 3 questions correct)

## 🛠️ Troubleshooting

### No Questions Appearing
**Check if quizzes exist:**
```sql
SELECT * FROM module_quizzes WHERE module_id IN (
  SELECT id FROM course_modules WHERE course_id = (
    SELECT id FROM courses WHERE title = 'Your Course Name'
  )
);
```

### Questions Not Linked
**Verify question-quiz relationship:**
```sql
SELECT mq.title, COUNT(qq.id) as question_count
FROM module_quizzes mq
LEFT JOIN quiz_questions qq ON mq.id = qq.quiz_id
GROUP BY mq.id, mq.title
HAVING COUNT(qq.id) = 0;
```

### Missing Correct Answers
**Find questions without correct answers:**
```sql
SELECT qq.question_text
FROM quiz_questions qq
WHERE NOT EXISTS (
  SELECT 1 FROM quiz_options qo 
  WHERE qo.question_id = qq.id AND qo.is_correct = true
);
```

## 📞 Support

For issues:
1. Run verification queries above
2. Check that modules and quizzes were created first
3. Ensure course titles match exactly
4. Review PostgreSQL logs for errors

## 🎯 Next Steps

After running the scripts:
1. ✅ Verify all questions are added
2. ✅ Test quiz display in frontend
3. ✅ Test quiz submission and scoring
4. ✅ Verify points are awarded correctly
5. ✅ Test multiple attempts functionality
6. ✅ Check badge level updates after quiz completion
