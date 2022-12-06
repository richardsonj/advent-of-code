@echo off
IF exist %1 ( echo %1 exists ) ELSE ( mkdir %1 && Xcopy /S template\* "%1\" && cd %1 && npm install )