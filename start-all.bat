@echo off
setlocal

REM === RUTA RAIZ DEL PROYECTO ===
set ROOT_DIR=%~dp0
set FRONTEND_DIR=%~dp0frontend

echo ===============================
echo Iniciando BACKEND (Spring Boot)
echo ===============================
start "Backend - Spring Boot" cmd /k "cd /d %ROOT_DIR% && mvnw.cmd clean spring-boot:run"

echo Esperando 5 segundos...
timeout /t 5 /nobreak >nul

echo ===============================
echo Iniciando FRONTEND (Vite)
echo ===============================
start "Frontend - Vite" cmd /k "cd /d %FRONTEND_DIR% && npm run dev"

echo ===============================
echo TODO ARRANCADO
echo ===============================
exit