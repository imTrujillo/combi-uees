<?php

namespace App\Http\Controllers;

use App\Models\Anuncios;
use App\Models\Comentarios;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class AnunciosController extends Controller
{
    //
    public function index()
    {
        $anuncio = Anuncios::all();

        if (count($anuncio) > 0) {
            return response()->json($anuncio, 200);
        }
        return response()->json([], 200);
    }

    public function update(Request $request, string $id)
    {
        $validator = Validator::make($request->all(), [
            'anuncioURLFoto' => 'required|url',
        ]);
        if ($validator->fails()) {
            return response()->json([
                'message' => 'Error de validación',
                'errors' => $validator->errors()
            ], 400);
        }
        $rutas = Anuncios::where('anuncioID', $id)->first();
        $rutas->anuncioURLFoto = $request->input('anuncioURLFoto');
        $rutas->save();

        $comentarios = Comentarios::query()->delete();

        return response()->json(['message' => 'Anuncio actualizado exitosamente'], 201);
    }
}
