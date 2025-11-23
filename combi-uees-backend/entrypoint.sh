#!/bin/sh

php artisan config:clear
php artisan cache:clear
php artisan route:clear

php artisan optimize:clear
php artisan permission:cache-reset

php-fpm
