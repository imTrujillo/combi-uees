<?php

use Illuminate\Support\Facades\Route;


// Swagger Documentation
Route::get('/', fn() => redirect('api/documentation'));
