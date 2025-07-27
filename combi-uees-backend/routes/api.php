<?php

use App\Http\Controllers\AnuncioController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ComentarioController;
use App\Http\Controllers\HorarioController;
use App\Http\Controllers\RutaController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ViajeController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


// Ruta protegida básica
Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// Rutas de Administrador
Route::middleware(['auth:sanctum', 'role:administrador'])->prefix('/v1')->group(function () {

    // CRUD Rutas
    Route::resource('/rutas', RutaController::class)->only(['store', 'update', 'destroy']);

    // CRUD Motoristas
    Route::resource('/rutas/{ruta}/users', UserController::class)->only(['index', 'store', 'destroy']);

    // CRUD Horarios
    Route::resource('/rutas/{ruta}/horarios', HorarioController::class)->only(['store', 'destroy']);

    // Anuncios
    Route::put('/anuncios/{id}', [AnuncioController::class, 'update']);
});

// Rutas de Motorista o Administrador
Route::middleware(['auth:sanctum', 'role:motorista|administrador'])->prefix('/v1')->group(function () {
    // CRUD de viajes
    Route::resource('/rutas/{ruta}/viajes', ViajeController::class)->only(['index', 'update', 'destroy']);

    //Actualizar estado de viajes
    Route::put('/rutas/{ruta}/viajes/{id}/status', [ViajeController::class, 'updateStatus']);

    // Usuarios
    Route::get('/user', [UserController::class, 'user']);
    Route::put('/user/{user}', [UserController::class, 'update']);
    Route::put('/rutas/{ruta}/user/{user}/status', [UserController::class, 'updateStatus']);

    // Logout
    Route::delete('/logout', [AuthController::class, 'destroy'])->name('logout');
});

// Rutas públicas o de usuario general

// Autenticación
Route::resource('/auth', AuthController::class)->only(['store']);

// Comentarios
Route::resource('/anuncios/{anuncio}/comentarios', ComentarioController::class)->only(['index', 'store']);

// Rutas, horarios, anuncios, viajes
Route::prefix('/v1')->group(function () {
    Route::get('/anuncio', [AnuncioController::class, 'index']);
    Route::get('/rutas', [RutaController::class, 'index']);
    Route::get('/rutas/ubicacion/{id}', [RutaController::class, 'ubicaciónBuses']);
    Route::post('/rutas/{ruta}/viajes', [ViajeController::class, 'store']);
    Route::get('/rutas/{ruta}/horarios', [HorarioController::class, 'index']);
});

// Ruta para manejar acceso sin token
Route::get('/token', function () {
    return response()->json(['message' => 'Necesitas un token'], 401);
})->name('login');
