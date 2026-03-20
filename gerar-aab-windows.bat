@echo off
REM Script para gerar o arquivo AAB do EduPlay no Windows
REM Basta clicar 2 vezes para executar!

echo ========================================
echo EduPlay - Gerador de Build AAB
echo ========================================
echo.
echo Este script vai gerar o arquivo AAB para publicar no Play Store.
echo.
echo Requisitos:
echo - Node.js instalado
echo - EAS CLI instalado (npm install -g eas-cli)
echo - Conta Expo criada
echo.
pause

REM Verificar se Node.js está instalado
node --version >nul 2>&1
if errorlevel 1 (
    echo ERRO: Node.js nao esta instalado!
    echo Baixe em: https://nodejs.org/
    pause
    exit /b 1
)

REM Verificar se EAS CLI está instalado
eas --version >nul 2>&1
if errorlevel 1 (
    echo Instalando EAS CLI...
    npm install -g eas-cli
)

REM Fazer login Expo
echo.
echo Fazendo login com sua conta Expo...
echo (Digite seu email e senha quando solicitado)
echo.
eas login

REM Gerar o build AAB
echo.
echo Gerando o arquivo AAB...
echo Isto pode levar 15-20 minutos...
echo.
eas build -p android -e production

echo.
echo ========================================
echo Build concluido!
echo ========================================
echo.
echo Seu arquivo AAB esta pronto para upload no Google Play Store.
echo Voce recebera um link para baixar o arquivo.
echo.
pause
