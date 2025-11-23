#!/bin/sh

php artisan config:clear
php artisan cache:clear
php artisan route:clear

# Limpiar las caches antes de iniciar el servidor
php artisan optimize:clear
php artisan permission:cache-reset

php artisan serve --host=0.0.0.0 --port=8000
