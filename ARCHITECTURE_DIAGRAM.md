# Architecture Diagram - Dynamic Dashboard & Reporting

## System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         FRONTEND (React)                         │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│  ┌──────────────────────┐      ┌──────────────────────┐        │
│  │  AdminDashboard.tsx  │      │ AdminReporting.tsx   │        │
│  │                      │      │                      │        │
│  │  - Stats Cards       │      │  - Overview Stats    │        │
│  │  - Recent Activity   │      │  - Detailed Table    │        │
│  │  - Quick Actions     │      │  - Search & Filter   │        │
│  └──────────┬───────────┘      └──────────┬───────────┘        │
│             │                              │                     │
│             │ useEffect()                  │ useEffect()         │
│             │ fetch()                      │ fetch()             │
│             ▼                              ▼                     │
└─────────────┼──────────────────────────────┼─────────────────────┘
              │                              │
              │ HTTP GET                     │ HTTP GET
              │                              │
┌─────────────┼──────────────────────────────┼─────────────────────┐
│             ▼                              ▼                     │
│  ┌──────────────────────┐      ┌──────────────────────┐        │
│  │ /api/admin/          │      │ /api/admin/          │        │
│  │ dashboard-stats      │      │ reporting            │        │
│  └──────────┬───────────┘      └──────────┬───────────┘        │
│             │                              │                     │
│  ┌──────────┴───────────┐                 │                     │
│  │ /api/admin/          │                 │                     │
│  │ recent-activity      │                 │                     │
│  └──────────┬───────────┘                 │                     │
│             │                              │                     │
│             │                              │                     │
│         BACKEND (Express.js / Node.js)                          │
│             │                              │                     │
│             │ SQL Queries                  │ SQL Queries         │
│             ▼                              ▼                     │
└─────────────┼──────────────────────────────┼─────────────────────┘
              │                              │
              │                              │
┌─────────────┼──────────────────────────────┼─────────────────────┐
│             ▼                              ▼                     │
│  ┌──────────────────────────────────────────────────────┐      │
│  │              PostgreSQL Database                      │      │
│  ├──────────────────────────────────────────────────────┤      │
│  │                                                        │      │
│  │  ┌──────────────┐  ┌──────────────┐  ┌────────────┐ │      │
│  │  │  enrollments │  │    courses   │  │   users    │ │      │
│  │  │              │  │              │  │            │ │      │
│  │  │ - user_id    │  │ - id         │  │ - id       │ │      │
│  │  │ - course_id  │  │ - title      │  │ - name     │ │      │
│  │  │ - progress   │  │ - instructor │  │ - role     │ │      │
│  │  │ - completed  │  │              │  │            │ │      │
│  │  └──────────────┘  └──────────────┘  └────────────┘ │      │
│  │                                                        │      │
│  │  ┌──────────────────────────────────────────┐        │      │
│  │  │         lesson_progress                   │        │      │
│  │  │                                            │        │      │
│  │  │ - enrollment_id                            │        │      │
│  │  │ - lesson_id                                │        │      │
│  │  │ - time_spent                               │        │      │
│  │  │ - status                                   │        │      │
│  │  └──────────────────────────────────────────┘        │      │
│  │                                                        │      │
│  └──────────────────────────────────────────────────────┘      │
│                                                                  │
│                    DATABASE LAYER                               │
└──────────────────────────────────────────────────────────────────┘
```

## Data Flow - Dashboard Stats

```
┌─────────────┐
│   Browser   │
│  (Learner)  │
└──────┬──────┘
       │
       │ 1. User enrolls in course
       ▼
┌─────────────────────┐
│  POST /api/         │
│  enrollments        │
└──────┬──────────────┘
       │
       │ 2. Insert enrollment
       ▼
┌─────────────────────┐
│   enrollments       │
│   table             │
└──────┬──────────────┘
       │
       │ 3. Instructor opens dashboard
       ▼
┌─────────────────────┐
│  AdminDashboard     │
│  Component          │
└──────┬──────────────┘
       │
       │ 4. Fetch stats
       ▼
┌─────────────────────┐
│  GET /api/admin/    │
│  dashboard-stats    │
└──────┬──────────────┘
       │
       │ 5. Query database
       ▼
┌─────────────────────┐
│  SELECT COUNT(*)    │
│  FROM enrollments   │
│  WHERE ...          │
└──────┬──────────────┘
       │
       │ 6. Return results
       ▼
┌─────────────────────┐
│  { totalLearners:   │
│    234 }            │
└──────┬──────────────┘
       │
       │ 7. Update UI
       ▼
┌─────────────────────┐
│  Display: 234       │
│  Total Learners     │
└─────────────────────┘
```

## Query Flow - Reporting

```
┌──────────────────────────────────────────────────────────┐
│                    Reporting Query                        │
├──────────────────────────────────────────────────────────┤
│                                                            │
│  SELECT                                                    │
│    e.id,                                                   │
│    c.title as course_name,          ← FROM courses        │
│    u.name as participant_name,      ← FROM users          │
│    e.enrollment_date,               ← FROM enrollments    │
│    e.last_accessed as start_date,   ← FROM enrollments    │
│    SUM(lp.time_spent) as time,      ← FROM lesson_progress│
│    e.progress_percentage,           ← FROM enrollments    │
│    e.completion_date,               ← FROM enrollments    │
│    CASE                                                    │
│      WHEN e.is_completed THEN 'completed'                 │
│      WHEN e.last_accessed IS NOT NULL THEN 'in-progress'  │
│      ELSE 'yet-to-start'                                  │
│    END as status                                          │
│  FROM enrollments e                                       │
│  JOIN users u ON e.user_id = u.id                         │
│  JOIN courses c ON e.course_id = c.id                     │
│  LEFT JOIN lesson_progress lp ON lp.enrollment_id = e.id │
│  WHERE c.instructor_id = $1  ← Role-based filtering       │
│  GROUP BY e.id, c.title, u.name, ...                      │
│  ORDER BY e.enrollment_date DESC                          │
│                                                            │
└──────────────────────────────────────────────────────────┘
```

## Role-Based Access Control

```
┌─────────────────────────────────────────────────────────┐
│                    User Login                            │
└────────────────────┬────────────────────────────────────┘
                     │
                     ▼
              ┌──────────────┐
              │  Check Role  │
              └──────┬───────┘
                     │
         ┌───────────┴───────────┐
         │                       │
         ▼                       ▼
    ┌────────┐            ┌──────────┐
    │ Admin  │            │Instructor│
    └────┬───┘            └────┬─────┘
         │                     │
         │                     │
         ▼                     ▼
┌─────────────────┐   ┌─────────────────┐
│ Query ALL       │   │ Query WHERE     │
│ courses         │   │ instructor_id   │
│                 │   │ = user.id       │
└────────┬────────┘   └────────┬────────┘
         │                     │
         └──────────┬──────────┘
                    │
                    ▼
         ┌──────────────────┐
         │  Return Filtered │
         │  Data            │
         └──────────────────┘
```

## Database Indexes Impact

```
WITHOUT INDEXES:
┌─────────────────────────────────────┐
│  Query: Get enrollments             │
│  Execution: FULL TABLE SCAN         │
│  Time: 2000ms (slow!)               │
│  Rows Scanned: 10,000               │
└─────────────────────────────────────┘

WITH INDEXES:
┌─────────────────────────────────────┐
│  Query: Get enrollments             │
│  Execution: INDEX SCAN              │
│  Time: 50ms (fast!)                 │
│  Rows Scanned: 234 (only needed)   │
└─────────────────────────────────────┘

Indexes Used:
- idx_enrollments_enrollment_date
- idx_enrollments_course
- idx_lesson_progress_enrollment
```

## Component Lifecycle

```
┌─────────────────────────────────────────────────────────┐
│              AdminDashboard Component                    │
├─────────────────────────────────────────────────────────┤
│                                                           │
│  1. Component Mounts                                     │
│     └─> useEffect(() => { ... }, [])                    │
│                                                           │
│  2. Set Loading State                                    │
│     └─> setLoading(true)                                │
│                                                           │
│  3. Fetch Data                                           │
│     └─> fetch('/api/admin/dashboard-stats')             │
│                                                           │
│  4. Wait for Response                                    │
│     └─> await response.json()                           │
│                                                           │
│  5. Update State                                         │
│     ├─> setStats(data)                                  │
│     └─> setLoading(false)                               │
│                                                           │
│  6. Re-render with Data                                  │
│     └─> Display stats cards                             │
│                                                           │
└─────────────────────────────────────────────────────────┘
```

## Error Handling Flow

```
┌─────────────────────────────────────────────────────────┐
│                    Error Handling                        │
├─────────────────────────────────────────────────────────┤
│                                                           │
│  Frontend Request                                        │
│       │                                                  │
│       ▼                                                  │
│  try {                                                   │
│    fetch(...)                                            │
│  } catch (error) {                                       │
│    console.error(error)                                  │
│    // Show error message                                │
│  }                                                       │
│       │                                                  │
│       ▼                                                  │
│  Backend Processing                                      │
│       │                                                  │
│       ▼                                                  │
│  try {                                                   │
│    db.query(...)                                         │
│  } catch (error) {                                       │
│    res.status(500).json({ error: error.message })       │
│  }                                                       │
│       │                                                  │
│       ▼                                                  │
│  Database Query                                          │
│       │                                                  │
│       ▼                                                  │
│  Return Results or Error                                │
│                                                           │
└─────────────────────────────────────────────────────────┘
```

## Performance Optimization

```
┌─────────────────────────────────────────────────────────┐
│              Performance Strategies                      │
├─────────────────────────────────────────────────────────┤
│                                                           │
│  1. Database Level                                       │
│     ├─> Indexes on frequently queried columns           │
│     ├─> Composite indexes for JOINs                     │
│     ├─> Aggregation at database level                   │
│     └─> Efficient query design                          │
│                                                           │
│  2. Backend Level                                        │
│     ├─> Single query for multiple stats                 │
│     ├─> Minimal data processing                         │
│     ├─> Proper error handling                           │
│     └─> Connection pooling                              │
│                                                           │
│  3. Frontend Level                                       │
│     ├─> Loading states                                  │
│     ├─> Efficient re-renders                            │
│     ├─> Memoization where needed                        │
│     └─> Lazy loading                                    │
│                                                           │
└─────────────────────────────────────────────────────────┘
```

## Scalability Considerations

```
Current: 100-1000 users
┌─────────────────────────────────────┐
│  Direct database queries            │
│  No caching needed                  │
│  Simple architecture                │
└─────────────────────────────────────┘

Future: 10,000+ users
┌─────────────────────────────────────┐
│  Add Redis caching layer            │
│  Implement pagination               │
│  Add query result caching           │
│  Consider read replicas             │
└─────────────────────────────────────┘

Future: 100,000+ users
┌─────────────────────────────────────┐
│  Microservices architecture         │
│  Separate analytics database        │
│  Real-time data pipeline            │
│  CDN for static assets              │
└─────────────────────────────────────┘
```

---

This architecture provides a solid foundation that can scale as your platform grows!
