@echo off
echo ========================================
echo Quick Insert - Instructor Dashboard Data
echo ========================================
echo.
echo This will create sample enrollments for
echo ALL instructors in the database.
echo.

REM Load environment variables
if exist .env (
    for /f "tokens=1,2 delims==" %%a in (.env) do (
        if "%%a"=="DB_PASSWORD" set DB_PASSWORD=%%b
    )
)

set PGPASSWORD=%DB_PASSWORD%
psql -U postgres -d learnsphere -f database\quick_insert_data.sql

if %ERRORLEVEL% EQU 0 (
    echo.
    echo ========================================
    echo SUCCESS! Data inserted.
    echo ========================================
    echo.
    echo Now:
    echo 1. Restart your backend: node server.js
    echo 2. Refresh your dashboard
    echo 3. You should see data!
) else (
    echo.
    echo ERROR! Check the output above.
)

echo.
pause
