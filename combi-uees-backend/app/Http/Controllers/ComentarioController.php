<?php

namespace App\Http\Controllers;

use App\Models\Anuncio;
use Illuminate\Http\Request;
use OpenApi\Annotations as OA;

/**
 * @OA\Tag(
 *     name="Comentarios",
 *     description="Operaciones relacionadas con comentarios en anuncios"
 * )
 */

class ComentarioController extends Controller
{
    /**
     * @OA\Get(
     *     path="/api/anuncios/{anuncio}/comentarios",
     *     summary="Listar comentarios de un anuncio",
     *     tags={"Comentarios"},
     *     @OA\Parameter(
     *         name="anuncio",
     *         in="path",
     *         required=true,
     *         description="ID del anuncio",
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(response=200, description="Lista de comentarios")
     * )
     */

    public function index(Anuncio $anuncio)
    {
        $comentarios = $anuncio->comentarios()->latest()->get();

        return response()->json($comentarios, 200);
    }

    /**
     * @OA\Post(
     *     path="/api/anuncios/{anuncio}/comentarios",
     *     summary="Crear un comentario en un anuncio",
     *     tags={"Comentarios"},
     *     @OA\Parameter(
     *         name="anuncio",
     *         in="path",
     *         required=true,
     *         description="ID del anuncio",
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             required={"nombreUsuario","comentarioTitulo","comentarioDescripción"},
     *             @OA\Property(property="nombreUsuario", type="string", maxLength=100),
     *             @OA\Property(property="comentarioTitulo", type="string", maxLength=255),
     *             @OA\Property(property="comentarioDescripción", type="string")
     *         )
     *     ),
     *     @OA\Response(response=200, description="Comentario registrado exitosamente"),
     *     @OA\Response(response=422, description="Error de validación")
     * )
     */
    public function store(Request $request, Anuncio $anuncio)
    {
        $comentario = $anuncio->comentarios()->create(
            $request->validate([
                'nombreUsuario' => 'required|string|max:100',
                'comentarioTitulo' => 'required|string|max:255',
                'comentarioDescripción' => 'required|string',
            ])
        );

        return response()->json(['message' => 'Comentario registrado exitosamente', 'comentario' => $comentario]);
    }
}
