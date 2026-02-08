# Dynamic Dashboard & Reporting Implementation

## Overview
The instructor dashboard and reporting pages now fetch real-time data from the PostgreSQL database instead of displaying static/mock data.

## Changes Made

### 1. Backend API Endpoints (server.js)

#### `/api/admin/dashboard-stats`
Fetches dashboard statistics including:
- **Total Courses**: Count of all courses (filtered by instructor if not admin)
- **Courses This Month**: New courses created in current month
- **Total Learners**: Unique enrolled users
- **Learners This Week**: New enrollments this week
- **Completion Rate**: Percentage of completed enrollments
- **Completion Rate Change**: Comparison with last month
- **Average Time Spent**: Average hours spent per course

**Query Parameters:**
- `instructorId`: UUID of the instructor
- `isAdmin`: Boolean indicating if user is admin

#### `/api/admin/recent-activity`
Fetches recent learner activities:
- Enrollments
- Course completions
- Course starts (first lesson access)

Returns last 10 activities sorted by timestamp.

**Query Parameters:**
- `instructorId`: UUID of the instructor
- `isAdmin`: Boolean indicating if user is admin

#### `/api/admin/reporting`
Fetches detailed reporting data for all enrollments:
- Course name
- Participant name
- Enrollment date
- Start date (first access)
- Time spent (hours and minutes)
- Completion percentage
- Completion date
- Status (yet-to-start, in-progress, completed)

Also returns overview statistics:
- Total participants
- Yet to start count
- In progress count
- Completed count

**Query Parameters:**
- `instructorId`: UUID of the instructor
- `isAdmin`: Boolean indicating if user is admin

### 2. Frontend Components

#### AdminDashboard.tsx
- Fetches dashboard stats on component mount
- Displays real-time statistics
- Shows recent activity with relative timestamps
- Loading state while fetching data
- Automatically filters data based on user role (admin sees all, instructor sees only their courses)

#### AdminReporting.tsx
- Fetches reporting data on component mount
- Displays overview statistics with filtering capability
- Shows detailed enrollment table with:
  - Search functionality
  - Status filtering
  - Column customization
  - Proper date formatting
  - Time spent formatting
- Loading state while fetching data
- Export functionality (UI ready, backend can be extended)

### 3. Database Optimizations

#### New Indexes (add_reporting_indexes.sql)
Added indexes for better query performance:
- `idx_enrollments_enrollment_date`: For sorting by enrollment date
- `idx_enrollments_completion_date`: For completion queries
- `idx_enrollments_is_completed`: For filtering completed courses
- `idx_enrollments_last_accessed`: For recent activity queries
- `idx_lesson_progress_time_spent`: For time calculation queries
- `idx_lesson_progress_started_at`: For activity tracking
- `idx_lesson_progress_completed_at`: For completion tracking
- `idx_courses_created_at`: For recent courses queries
- Composite indexes for join optimization

## Setup Instructions

### 1. Apply Database Indexes
Run the SQL file to add performance indexes:

```bash
psql -U postgres -d learnsphere -f database/add_reporting_indexes.sql
```

Or using pgAdmin:
1. Open pgAdmin
2. Connect to your database
3. Open Query Tool
4. Load and execute `database/add_reporting_indexes.sql`

### 2. Restart Backend Server
```bash
node server.js
```

### 3. Test the Application
1. Login as instructor or admin
2. Navigate to Dashboard (`/admin/dashboard`)
3. Navigate to Reporting (`/admin/reporting`)
4. Verify data is loading from database

## Data Flow

### Dashboard Stats Flow
```
Frontend (AdminDashboard.tsx)
  ↓ HTTP GET
Backend (/api/admin/dashboard-stats)
  ↓ SQL Queries
PostgreSQL Database (enrollments, courses, lesson_progress)
  ↓ Results
Backend (Aggregated Stats)
  ↓ JSON Response
Frontend (Display Stats)
```

### Reporting Data Flow
```
Frontend (AdminReporting.tsx)
  ↓ HTTP GET
Backend (/api/admin/reporting)
  ↓ SQL Query with JOINs
PostgreSQL Database (enrollments, users, courses, lesson_progress)
  ↓ Results
Backend (Formatted Data + Overview Stats)
  ↓ JSON Response
Frontend (Display Table + Overview)
```

## Key Features

### Role-Based Access
- **Admin**: Sees all courses and all learners across the platform
- **Instructor**: Sees only their own courses and enrolled learners

### Real-Time Calculations
- Completion rates calculated on-the-fly
- Time spent aggregated from lesson_progress table
- Status determined by enrollment state

### Performance Optimizations
- Database indexes on frequently queried columns
- Efficient SQL queries with proper JOINs
- Aggregation done at database level
- Minimal data transfer

### User Experience
- Loading states during data fetch
- Relative timestamps (e.g., "2 hours ago")
- Formatted dates and times
- Search and filter capabilities
- Column customization

## Database Tables Used

### enrollments
- Tracks user course enrollments
- Stores progress percentage
- Records enrollment and completion dates
- Tracks last access time

### lesson_progress
- Tracks individual lesson completion
- Records time spent per lesson
- Stores start and completion timestamps

### courses
- Course information
- Instructor relationship
- Creation timestamps

### users
- User information
- Role-based access

## API Response Examples

### Dashboard Stats Response
```json
{
  "totalCourses": 12,
  "coursesThisMonth": 2,
  "totalLearners": 234,
  "learnersThisWeek": 15,
  "completionRate": 78,
  "completionRateChange": 5,
  "avgTimeSpent": 2.5
}
```

### Recent Activity Response
```json
[
  {
    "type": "enrolled",
    "user_name": "John Doe",
    "course_title": "React Patterns",
    "timestamp": "2024-01-20T10:30:00Z"
  },
  {
    "type": "completed",
    "user_name": "Jane Smith",
    "course_title": "Python Basics",
    "timestamp": "2024-01-20T08:15:00Z"
  }
]
```

### Reporting Response
```json
{
  "overview": {
    "total": 234,
    "yetToStart": 45,
    "inProgress": 128,
    "completed": 61
  },
  "data": [
    {
      "id": "uuid",
      "course_name": "Advanced React Patterns",
      "participant_name": "John Doe",
      "enrollment_date": "2024-01-15T00:00:00Z",
      "start_date": "2024-01-16T10:00:00Z",
      "hours_spent": 4,
      "minutes_spent": 32,
      "completion": 75.5,
      "completion_date": null,
      "status": "in-progress"
    }
  ]
}
```

## Future Enhancements

1. **Export Functionality**: Implement CSV/Excel export for reporting data
2. **Date Range Filters**: Add date range selection for custom reporting periods
3. **Advanced Analytics**: Add charts and graphs for visual representation
4. **Real-time Updates**: Implement WebSocket for live data updates
5. **Caching**: Add Redis caching for frequently accessed data
6. **Pagination**: Implement server-side pagination for large datasets
7. **Email Reports**: Schedule and send automated reports to instructors

## Troubleshooting

### No Data Showing
- Ensure database has enrollment data
- Check if user is logged in
- Verify user role (admin/instructor)
- Check browser console for errors
- Verify backend server is running on port 3001

### Slow Performance
- Run the index creation SQL file
- Check database connection
- Monitor query execution time in PostgreSQL logs
- Consider adding more indexes based on query patterns

### Incorrect Statistics
- Verify enrollment data in database
- Check lesson_progress records
- Ensure timestamps are properly set
- Review SQL queries in server.js

## Testing Checklist

- [ ] Dashboard loads without errors
- [ ] Stats show real numbers from database
- [ ] Recent activity displays actual enrollments
- [ ] Reporting page loads all enrollments
- [ ] Search functionality works
- [ ] Status filters work correctly
- [ ] Column customization works
- [ ] Time calculations are accurate
- [ ] Admin sees all data
- [ ] Instructor sees only their courses
- [ ] Loading states display properly
- [ ] Dates format correctly
