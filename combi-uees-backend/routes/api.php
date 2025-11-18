<?php
require base_path('routes/motorista.php');
require base_path('routes/admin.php');

use App\Http\Controllers\AnuncioController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ComentarioController;
use App\Http\Controllers\HorarioController;
use App\Http\Controllers\RutaController;
use App\Http\Controllers\ViajeController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


// Rutas públicas o de usuario general
// Autenticación
Route::post('/auth/login', [AuthController::class, 'store'])->name('auth.login');

// Comentarios
Route::resource('/anuncios/{anuncio}/comentarios', ComentarioController::class)->only(['index', 'store']);

// Rutas, horarios, anuncios, viajes
Route::get('/anuncio', [AnuncioController::class, 'index']);
Route::get('/rutas', [RutaController::class, 'index']);
Route::post('/viajes', [ViajeController::class, 'store']);
Route::get('/rutas/{ruta}/horarios', [HorarioController::class, 'index']);


// Ruta para manejar acceso sin token
Route::get('/token', function () {
    return response()->json(['message' => 'Necesitas un token'], 401);
})->name('login');
