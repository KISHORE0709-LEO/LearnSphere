# 🚀 pgAdmin4 Setup Guide

## Quick Setup with pgAdmin4

### Step 1: Create Database
1. Open **pgAdmin4**
2. Right-click on **Databases** → **Create** → **Database**
3. Database name: `learnsphere`
4. Click **Save**

### Step 2: Run Schema
1. Right-click on `learnsphere` database → **Query Tool**
2. Open file: `database/schema.sql`
3. Click **Execute** (F5)
4. Wait for "Query returned successfully"

### Step 3: Run Seed Data
1. In same Query Tool
2. Open file: `database/seed_data.sql`
3. Click **Execute** (F5)
4. Wait for completion

### Step 4: Verify
Run this query:
```sql
SELECT COUNT(*) FROM users;      -- Should return 10
SELECT COUNT(*) FROM courses;    -- Should return 5
SELECT COUNT(*) FROM reviews;    -- Should return 8
```

### Step 5: Update .env
```
DB_HOST=localhost
DB_PORT=5432
DB_NAME=learnsphere
DB_USER=postgres
DB_PASSWORD=your_pgadmin_password
```

### Step 6: Install & Test
```bash
npm install
npm run db:test
```

Done! ✅
