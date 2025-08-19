<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ViajeController;
use Illuminate\Support\Facades\Route;

// Rutas de Motorista o Administrador
Route::middleware(['auth:sanctum', 'role:motorista|administrador'])->group(function () {
    // CRUD de viajes
    Route::resource('/rutas/{ruta}/viajes', ViajeController::class)->only(['index', 'update', 'destroy']);

    // Usuarios
    Route::resource('/rutas/{ruta}/users', UserController::class)->only(['update']);

    // Logout
    Route::post('/auth/logout', [AuthController::class, 'destroy'])->name('auth.logout');
});
