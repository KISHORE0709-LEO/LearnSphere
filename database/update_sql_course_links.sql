-- Update SQL Database Mastery course with correct module topics and links
-- This script updates the module_topics table for the SQL Database Mastery course

DO $$
DECLARE
  sql_course_id UUID;
  module1_id UUID;
  module2_id UUID;
  module3_id UUID;
  module4_id UUID;
  module5_id UUID;
  module6_id UUID;
  module7_id UUID;
  module8_id UUID;
BEGIN
  -- Get the SQL Database Mastery course ID
  SELECT id INTO sql_course_id FROM courses WHERE title = 'SQL Database Mastery';
  
  IF sql_course_id IS NULL THEN
    RAISE NOTICE 'SQL Database Mastery course not found';
    RETURN;
  END IF;

  -- Delete existing modules and topics for this course
  DELETE FROM course_modules WHERE course_id = sql_course_id;

  -- Module 1: Introduction & Fundamentals (Overview, Getting Started, Architecture, Setup)
  INSERT INTO course_modules (course_id, title, description, order_index)
  VALUES (sql_course_id, 'Module 1: Introduction & Fundamentals', 'Overview, Getting Started, Architecture, Setup', 1)
  RETURNING id INTO module1_id;
  
  INSERT INTO module_topics (module_id, title, content_type, duration, order_index, content_url, description)
  VALUES 
    (module1_id, 'SQL Explained for Beginners – FreeCodeCamp', 'video', 0, 1, 'https://www.youtube.com/embed/HXV3zeQKqGY', 'YouTube: SQL Explained for Beginners'),
    (module1_id, 'What is a Database? DBMS Basics – Gate Smashers', 'video', 0, 2, 'https://www.youtube.com/embed/HcOc7P5BMi4', 'YouTube: DBMS Basics'),
    (module1_id, 'DBMS architecture diagram', 'image', 0, 3, 'https://www.geeksforgeeks.org/dbms-architecture/', 'Image: DBMS architecture'),
    (module1_id, 'Client–Server database model', 'image', 0, 4, 'https://www.postgresql.org/docs/current/tutorial-arch.html', 'Image: Client-Server model'),
    (module1_id, 'SQL Basics (W3Schools – beginner friendly)', 'document', 0, 5, 'https://www.w3schools.com/sql/', 'Document: SQL Basics'),
    (module1_id, 'PostgreSQL Tutorial (Official)', 'document', 0, 6, 'https://www.postgresql.org/docs/current/tutorial.html', 'Document: PostgreSQL Tutorial');

  -- Module 2: Introduction & Fundamentals + Quiz (Setup, Architecture Diagram, Configuration)
  INSERT INTO course_modules (course_id, title, description, order_index)
  VALUES (sql_course_id, 'Module 2: Introduction & Fundamentals + Quiz', 'Setup, Architecture Diagram, Configuration', 2)
  RETURNING id INTO module2_id;
  
  INSERT INTO module_topics (module_id, title, content_type, duration, order_index, content_url, description)
  VALUES 
    (module2_id, 'Install PostgreSQL & pgAdmin', 'video', 0, 1, 'https://www.youtube.com/embed/qw--VYLpxG4', 'YouTube: Install PostgreSQL & pgAdmin'),
    (module2_id, 'MySQL Installation & Setup', 'video', 0, 2, 'https://www.youtube.com/embed/u96rVINbAUI', 'YouTube: MySQL Installation'),
    (module2_id, 'PostgreSQL system architecture', 'image', 0, 3, 'https://www.postgresql.org/docs/current/overview.html', 'Image: PostgreSQL architecture'),
    (module2_id, 'SQL query execution flow', 'image', 0, 4, 'https://www.geeksforgeeks.org/sql-query-processing/', 'Image: Query execution flow'),
    (module2_id, 'PostgreSQL Installation Docs', 'document', 0, 5, 'https://www.postgresql.org/docs/current/installation.html', 'Document: PostgreSQL Installation'),
    (module2_id, 'MySQL Documentation', 'document', 0, 6, 'https://dev.mysql.com/doc/', 'Document: MySQL Documentation');

  INSERT INTO module_quizzes (module_id, title, description, passing_score, time_limit)
  VALUES (module2_id, 'Module 2 Quiz', 'Test your understanding of SQL setup and architecture', 70, 30);

  -- Module 3: Core Concepts & Features (Queries, Tables, Workflow, Quiz)
  INSERT INTO course_modules (course_id, title, description, order_index)
  VALUES (sql_course_id, 'Module 3: Core Concepts & Features', 'Queries, Tables, Workflow, Quiz', 3)
  RETURNING id INTO module3_id;
  
  INSERT INTO module_topics (module_id, title, content_type, duration, order_index, content_url, description)
  VALUES 
    (module3_id, 'SQL SELECT, WHERE, ORDER BY, LIMIT', 'video', 0, 1, 'https://www.youtube.com/embed/7S_tz1z_5bA', 'YouTube: SQL SELECT queries'),
    (module3_id, 'SQL CRUD Operations Explained', 'video', 0, 2, 'https://www.youtube.com/embed/9yeOJ0ZMUYw', 'YouTube: CRUD Operations'),
    (module3_id, 'SQL query flow chart', 'image', 0, 3, 'https://www.geeksforgeeks.org/sql-query-execution-order/', 'Image: SQL query flow'),
    (module3_id, 'Table & row structure diagram', 'image', 0, 4, 'https://www.postgresql.org/docs/current/ddl-basics.html', 'Image: Table structure'),
    (module3_id, 'SQL SELECT Statement (Postgres)', 'document', 0, 5, 'https://www.postgresql.org/docs/current/sql-select.html', 'Document: SQL SELECT'),
    (module3_id, 'SQL Tutorial – CRUD', 'document', 0, 6, 'https://www.sqltutorial.org/', 'Document: SQL CRUD Tutorial');

  -- Module 4: Core Concepts & Features (Best Practices, Joins, Process Diagrams)
  INSERT INTO course_modules (course_id, title, description, order_index)
  VALUES (sql_course_id, 'Module 4: Core Concepts & Features', 'Best Practices, Joins, Process Diagrams', 4)
  RETURNING id INTO module4_id;
  
  INSERT INTO module_topics (module_id, title, content_type, duration, order_index, content_url, description)
  VALUES 
    (module4_id, 'SQL Joins Explained Visually', 'video', 0, 1, 'https://www.youtube.com/embed/9yeOJ0ZMUYw', 'YouTube: SQL Joins'),
    (module4_id, 'GROUP BY, HAVING, Aggregate Functions', 'video', 0, 2, 'https://www.youtube.com/embed/XRmQ2KfC6bM', 'YouTube: Aggregate Functions'),
    (module4_id, 'SQL joins Venn diagram', 'image', 0, 3, 'https://www.geeksforgeeks.org/sql-join-set-1-inner-left-right-and-full-joins/', 'Image: SQL joins Venn diagram'),
    (module4_id, 'Aggregation flow', 'image', 0, 4, 'https://mode.com/sql-tutorial/sql-aggregation/', 'Image: Aggregation flow'),
    (module4_id, 'PostgreSQL Joins', 'document', 0, 5, 'https://www.postgresql.org/docs/current/queries-table-expressions.html', 'Document: PostgreSQL Joins'),
    (module4_id, 'SQL Aggregate Functions', 'document', 0, 6, 'https://www.postgresql.org/docs/current/functions-aggregate.html', 'Document: Aggregate Functions');

  -- Module 5: Advanced Techniques (Advanced Queries, Optimization)
  INSERT INTO course_modules (course_id, title, description, order_index)
  VALUES (sql_course_id, 'Module 5: Advanced Techniques', 'Advanced Queries, Optimization', 5)
  RETURNING id INTO module5_id;
  
  INSERT INTO module_topics (module_id, title, content_type, duration, order_index, content_url, description)
  VALUES 
    (module5_id, 'Subqueries & CTEs Explained', 'video', 0, 1, 'https://www.youtube.com/embed/IY1E5Yy5zqk', 'YouTube: Subqueries & CTEs'),
    (module5_id, 'Indexes & Performance Tuning', 'video', 0, 2, 'https://www.youtube.com/embed/Hh4nq0m0JkA', 'YouTube: Performance Tuning'),
    (module5_id, 'Indexing structure (B-Tree)', 'image', 0, 3, 'https://www.postgresql.org/docs/current/indexes.html', 'Image: B-Tree indexing'),
    (module5_id, 'Query optimization flow', 'image', 0, 4, 'https://www.geeksforgeeks.org/query-optimization-in-dbms/', 'Image: Query optimization'),
    (module5_id, 'PostgreSQL Indexes', 'document', 0, 5, 'https://www.postgresql.org/docs/current/indexes.html', 'Document: PostgreSQL Indexes'),
    (module5_id, 'EXPLAIN & Query Planner', 'document', 0, 6, 'https://www.postgresql.org/docs/current/using-explain.html', 'Document: EXPLAIN & Query Planner');

  -- Module 6: Advanced Techniques + Quiz (Transactions, Performance, Masterclass)
  INSERT INTO course_modules (course_id, title, description, order_index)
  VALUES (sql_course_id, 'Module 6: Advanced Techniques + Quiz', 'Transactions, Performance, Masterclass', 6)
  RETURNING id INTO module6_id;
  
  INSERT INTO module_topics (module_id, title, content_type, duration, order_index, content_url, description)
  VALUES 
    (module6_id, 'ACID Properties & Transactions', 'video', 0, 1, 'https://www.youtube.com/embed/GFQaEYEc8_8', 'YouTube: ACID Properties'),
    (module6_id, 'Locks, Isolation Levels', 'video', 0, 2, 'https://www.youtube.com/embed/G4QJXzYF5tU', 'YouTube: Locks & Isolation'),
    (module6_id, 'ACID transaction lifecycle', 'image', 0, 3, 'https://www.geeksforgeeks.org/acid-properties-in-dbms/', 'Image: ACID lifecycle'),
    (module6_id, 'Locking & concurrency diagram', 'image', 0, 4, 'https://www.postgresql.org/docs/current/mvcc.html', 'Image: Locking & concurrency'),
    (module6_id, 'PostgreSQL Transactions', 'document', 0, 5, 'https://www.postgresql.org/docs/current/tutorial-transactions.html', 'Document: PostgreSQL Transactions'),
    (module6_id, 'MVCC & Concurrency Control', 'document', 0, 6, 'https://www.postgresql.org/docs/current/mvcc.html', 'Document: MVCC & Concurrency');

  INSERT INTO module_quizzes (module_id, title, description, passing_score, time_limit)
  VALUES (module6_id, 'Module 6 Quiz', 'Test your advanced SQL techniques knowledge', 75, 35);

  -- Module 7: Practical Applications (Use Cases, Case Studies, Implementation)
  INSERT INTO course_modules (course_id, title, description, order_index)
  VALUES (sql_course_id, 'Module 7: Practical Applications', 'Use Cases, Case Studies, Implementation', 7)
  RETURNING id INTO module7_id;
  
  INSERT INTO module_topics (module_id, title, content_type, duration, order_index, content_url, description)
  VALUES 
    (module7_id, 'Real-World SQL Interview Queries', 'video', 0, 1, 'https://www.youtube.com/embed/9LQxL8G2X6Q', 'YouTube: SQL Interview Queries'),
    (module7_id, 'SQL for Data Analysis (Hands-on)', 'video', 0, 2, 'https://www.youtube.com/embed/2Q6pJZr4YHc', 'YouTube: SQL for Data Analysis'),
    (module7_id, 'Business database schema example', 'image', 0, 3, 'https://www.geeksforgeeks.org/database-schema/', 'Image: Database schema'),
    (module7_id, 'ER diagram example', 'image', 0, 4, 'https://www.geeksforgeeks.org/er-diagram-in-dbms/', 'Image: ER diagram'),
    (module7_id, 'SQL Case Studies (Mode Analytics)', 'document', 0, 5, 'https://mode.com/sql-tutorial/', 'Document: SQL Case Studies'),
    (module7_id, 'PostgreSQL Sample Databases', 'document', 0, 6, 'https://www.postgresqltutorial.com/postgresql-sample-database/', 'Document: Sample Databases');

  -- Module 8: Practical Applications & Projects + Final Assessment
  INSERT INTO course_modules (course_id, title, description, order_index)
  VALUES (sql_course_id, 'Module 8: Practical Applications & Projects + Final Assessment', 'Projects, Templates, Workshops', 8)
  RETURNING id INTO module8_id;
  
  INSERT INTO module_topics (module_id, title, content_type, duration, order_index, content_url, description)
  VALUES 
    (module8_id, 'SQL Mini Projects (End-to-End)', 'video', 0, 1, 'https://www.youtube.com/embed/9yeOJ0ZMUYw', 'YouTube: SQL Mini Projects'),
    (module8_id, 'SQL for Placements & Projects', 'video', 0, 2, 'https://www.youtube.com/embed/7S_tz1z_5bA', 'YouTube: SQL for Placements'),
    (module8_id, 'Project DB architecture', 'image', 0, 3, 'https://www.postgresql.org/docs/current/tutorial-arch.html', 'Image: Project DB architecture'),
    (module8_id, 'ETL + SQL pipeline', 'image', 0, 4, 'https://www.ibm.com/topics/etl', 'Image: ETL pipeline'),
    (module8_id, 'PostgreSQL Project Examples', 'document', 0, 5, 'https://github.com/postgres/postgres', 'Document: PostgreSQL Projects'),
    (module8_id, 'SQL Practice Problems', 'document', 0, 6, 'https://leetcode.com/problemset/database/', 'Document: SQL Practice Problems');

  INSERT INTO module_quizzes (module_id, title, description, passing_score, time_limit)
  VALUES (module8_id, 'Final Assessment', 'Comprehensive final exam covering all SQL modules', 85, 60);

  RAISE NOTICE 'Successfully updated SQL Database Mastery course with 8 modules and correct links';
END $$;
