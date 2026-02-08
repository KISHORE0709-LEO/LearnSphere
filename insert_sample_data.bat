@echo off
echo ========================================
echo Insert Sample Data for Dashboard
echo ========================================
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
    set DB_HOST=localhost
    set DB_PORT=5432
    set DB_NAME=learnsphere
    set DB_USER=postgres
)

echo Database: %DB_NAME%
echo Host: %DB_HOST%:%DB_PORT%
echo.
echo Inserting sample enrollment data...
echo.

set PGPASSWORD=%DB_PASSWORD%
psql -h %DB_HOST% -p %DB_PORT% -U %DB_USER% -d %DB_NAME% -f database\insert_sample_data.sql

if %ERRORLEVEL% EQU 0 (
    echo.
    echo ========================================
    echo SUCCESS! Sample data inserted.
    echo ========================================
    echo.
    echo Now refresh your dashboard to see the data!
) else (
    echo.
    echo ========================================
    echo ERROR! Failed to insert data.
    echo ========================================
)

echo.
pause
