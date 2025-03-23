<?php

use App\Http\Controllers\AnunciosController;
use App\Http\Controllers\AutenticarController;
use App\Http\Controllers\ComentariosController;
use App\Http\Controllers\HorarioHorasController;
use App\Http\Controllers\HorariosController;
use App\Http\Controllers\RutasController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ViajesController;
use App\Models\Horarios;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');


//Rutas de Administrador
Route::middleware(['auth:sanctum', 'role:administrador'])->group(function () {
    Route::patch('/v1/anuncios/{id}', [AnunciosController::class, 'update']);

    Route::get('/v1/user', [UserController::class, 'index']);
    Route::post('/v1/user', [UserController::class, 'store']);
    Route::delete('/v1/user/{id}', [UserController::class, 'delete']);

    Route::post('/v1/rutas', [RutasController::class, 'store']);
    Route::patch('/v1/rutas/{id}', [RutasController::class, 'update']);
    Route::delete('/v1/rutas/{id}', [RutasController::class, 'delete']);

    Route::post('/v1/horarios/horas', [HorarioHorasController::class, 'store']);
    Route::delete('/v1/horarios/horas/{id}', [HorarioHorasController::class, 'delete']);
});

//Rutas de Motorista o Administrador
Route::middleware(['auth:sanctum', 'role:motorista|administrador'])->group(function () {
    Route::get('/v1/viajes', [ViajesController::class, 'index']);
    Route::patch('/v1/viajes/{id}', [ViajesController::class, 'update']);
    Route::patch('/v1/viajes/status/{id}', [ViajesController::class, 'updateStatus']);
    Route::delete('/v1/viajes/{id}', [ViajesController::class, 'delete']);

    Route::post('/v1/logout', [AutenticarController::class, 'logout']);
    Route::get('/v1/user/{id}', [UserController::class, 'getUser']);
    Route::patch('/v1/user/{id}', [UserController::class, 'update']);
    Route::patch('/v1/user/status/{id}', [UserController::class, 'updateStatus']);
});

//Rutas de usuario
Route::post('/v1/login', [AutenticarController::class, 'login']);
Route::get('/v1/rutas', [RutasController::class, 'index']);
Route::get('/v1/anuncio', [AnunciosController::class, 'index']);
Route::get('/v1/comentarios', [ComentariosController::class, 'index']);
Route::post('/v1/comentarios', [ComentariosController::class, 'store']);
Route::post('/v1/viajes', [ViajesController::class, 'store']);
Route::get('/v1/horarios', [HorariosController::class, 'index']);
Route::get('/v1/horarios/horas/{id}', [HorarioHorasController::class, 'index']);
Route::get('/v1/rutas/ubicacion/{id}', [RutasController::class, 'ubicaciónBuses']);



Route::get('/token', function () {
    return response()->json(['message' => 'Necesitas un token'], 401);
})->name('login');
