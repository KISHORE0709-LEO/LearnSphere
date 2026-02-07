@echo off
echo ==========================================
echo LearnSphere - Complete Setup
echo ==========================================
echo.

echo Step 1: Updating database...
cd database
psql -U postgres -d learnsphere -f final_update.sql
cd ..

echo.
echo Step 2: Starting backend server...
start "LearnSphere Backend" cmd /k "node server.js"

echo.
echo ==========================================
echo Setup Complete!
echo ==========================================
echo.
echo Backend server is running in a new window
echo Now open your browser and test the quiz
echo.
pause
