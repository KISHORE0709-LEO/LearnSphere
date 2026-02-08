@echo off
echo ========================================
echo LearnSphere - Generate Sample Data
echo ========================================
echo.
echo WARNING: This will create sample enrollments
echo for testing the dashboard and reporting.
echo.
echo Only run this if you need test data!
echo.
pause
echo.

REM Load environment variables
if exist .env (
    for /f "tokens=1,2 delims==" %%a in (.env) do (
        if "%%a"=="DB_HOST" set DB_HOST=%%b
        if "%%a"=="DB_PORT" set DB_PORT=%%b
        if "%%a"=="DB_NAME" set DB_NAME=%%b
        if "%%a"=="DB_USER" set DB_USER=%%b
        if "%%a"=="DB_PASSWORD" set DB_PASSWORD=%%b
    )
) else (
    echo .env file not found! Using defaults...
    set DB_HOST=localhost
    set DB_PORT=5432
    set DB_NAME=learnsphere
    set DB_USER=postgres
)

echo Database: %DB_NAME%
echo Host: %DB_HOST%:%DB_PORT%
echo User: %DB_USER%
echo.

echo Generating sample enrollment data...
echo.

set PGPASSWORD=%DB_PASSWORD%
psql -h %DB_HOST% -p %DB_PORT% -U %DB_USER% -d %DB_NAME% -f database\generate_sample_enrollments.sql

if %ERRORLEVEL% EQU 0 (
    echo.
    echo ========================================
    echo SUCCESS! Sample data generated.
    echo ========================================
    echo.
    echo You can now test the dashboard and reporting!
) else (
    echo.
    echo ========================================
    echo ERROR! Failed to generate sample data.
    echo ========================================
)

echo.
pause
