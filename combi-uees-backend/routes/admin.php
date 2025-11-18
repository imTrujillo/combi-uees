<?php

use App\Http\Controllers\AnuncioController;
use App\Http\Controllers\HorarioController;
use App\Http\Controllers\RutaController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

// Rutas de Administrador
Route::middleware(['auth:sanctum', 'role:administrador'])->group(function () {

    // CRUD Rutas
    Route::resource('/rutas', RutaController::class)->only(['store', 'update', 'destroy']);

    // CRUD Motoristas
    Route::resource('/users', UserController::class)->only(['index', 'store', 'destroy']);

    // CRUD Horarios
    Route::resource('/rutas/{ruta}/horarios', HorarioController::class)->only(['store', 'destroy']);

    // Anuncios
    Route::put('/anuncios/{anuncio}', [AnuncioController::class, 'update']);
});
