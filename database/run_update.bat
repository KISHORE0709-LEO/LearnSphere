@echo off
REM LearnSphere Database Update Script
REM Run this file to update all courses with modules, topics, and quizzes

echo ==========================================
echo LearnSphere - Database Update
echo ==========================================
echo.

REM Check if PostgreSQL is in PATH
where psql >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ERROR: psql command not found!
    echo Please add PostgreSQL bin directory to your PATH
    echo Example: C:\Program Files\PostgreSQL\15\bin
    pause
    exit /b 1
)

echo PostgreSQL found!
echo.

REM Set database connection details
set PGHOST=localhost
set PGPORT=5432
set PGDATABASE=learnsphere
set PGUSER=postgres

echo Connecting to database: %PGDATABASE%
echo Host: %PGHOST%:%PGPORT%
echo User: %PGUSER%
echo.

REM Prompt for password
echo Please enter PostgreSQL password when prompted
echo.

REM Run the master update script
psql -U %PGUSER% -d %PGDATABASE% -f master_update_all.sql

if %ERRORLEVEL% EQU 0 (
    echo.
    echo ==========================================
    echo Update completed successfully!
    echo ==========================================
    echo.
    echo Running verification...
    echo.
    psql -U %PGUSER% -d %PGDATABASE% -f verify_all_data.sql
) else (
    echo.
    echo ==========================================
    echo ERROR: Update failed!
    echo ==========================================
    echo Please check the error messages above
)

echo.
pause
