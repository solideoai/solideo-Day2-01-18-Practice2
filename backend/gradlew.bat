@rem Gradle startup script for Windows

@rem Set local scope for the variables with windows NT shell
if "%OS%"=="Windows_NT" setlocal

set DIRNAME=%~dp0
if "%DIRNAME%"=="" set DIRNAME=.
set APP_BASE_NAME=%~n0
set APP_HOME=%DIRNAME%

@rem Resolve any "." and ".." in APP_HOME to make it shorter.
for %%i in ("%APP_HOME%") do set APP_HOME=%%~fi

@rem Add default JVM options here.
set DEFAULT_JVM_OPTS=

@rem Find gradle
set GRADLE_CMD=gradle.bat

if defined GRADLE_HOME goto findGradleFromGradleHome

echo.
echo ERROR: GRADLE_HOME is not set and no 'gradle' command could be found in your PATH.
echo.
echo Please set the GRADLE_HOME variable in your environment to match the
echo location of your Gradle installation.

goto fail

:findGradleFromGradleHome
set GRADLE_HOME=%GRADLE_HOME:"=%
set GRADLE_CMD=%GRADLE_HOME%\bin\gradle.bat

if exist "%GRADLE_CMD%" goto execute

echo.
echo ERROR: GRADLE_HOME is set to an invalid directory: %GRADLE_HOME%
echo.
echo Please set the GRADLE_HOME variable in your environment to match the
echo location of your Gradle installation.

goto fail

:execute
"%GRADLE_CMD%" %*

:fail
exit /b 1
