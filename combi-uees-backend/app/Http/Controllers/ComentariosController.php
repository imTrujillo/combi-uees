<?php

namespace App\Http\Controllers;

use App\Models\Comentarios;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ComentariosController extends Controller
{
    //
    public function index()
    {
        $comentarios = Comentarios::all();

        if (count($comentarios) > 0) {
            return response()->json($comentarios, 200);
        }
        return response()->json([], 200);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'nombreUsuario' => 'required|string|max:50|regex:/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/u',
            'comentarioTitulo' => 'required|string|max:100',
            'comentarioDescripción' => 'required|string|max:200'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Error de validación',
                'errors' => $validator->errors()
            ], 400);
        }

        $comentarios = new Comentarios();
        $comentarios->nombreUsuario = $request->input('nombreUsuario');
        $comentarios->comentarioTitulo = $request->input('comentarioTitulo');
        $comentarios->comentarioDescripción = $request->input('comentarioDescripción');
        $comentarios->IDanuncio = 1;
        $comentarios->save();

        return response()->json(['message' => 'Comentario registrado exitosamente']);
    }
}
