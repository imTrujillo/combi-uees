<?php

namespace App\Http\Controllers;

use App\Models\Anuncio;
use Illuminate\Http\Request;
use OpenApi\Annotations as OA;

/**
 * @OA\Tag(
 *     name="Anuncios",
 *     description="Gestión de anuncios"
 * )
 */
class AnuncioController extends Controller
{
    /**
     * @OA\Get(
     *     path="/api/anuncios",
     *     summary="Obtener todos los anuncios con sus comentarios",
     *     tags={"Anuncios"},
     *     @OA\Response(response=200, description="Lista de anuncios con comentarios")
     * )
     */
    public function index(Anuncio $anuncio)
    {

        $anuncios = Anuncio::with('comentarios')->get();

        return response()->json($anuncios, 200);
    }

    /**
     * @OA\Put(
     *     path="/api/anuncios/{anuncio}",
     *     summary="Actualizar la URL de la foto del anuncio",
     *     tags={"Anuncios"},
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
     *             required={"anuncioURLFoto"},
     *             @OA\Property(property="anuncioURLFoto", type="string", format="url")
     *         )
     *     ),
     *     @OA\Response(response=200, description="Anuncio actualizado exitosamente"),
     *     @OA\Response(response=422, description="Error de validación")
     * )
     */
    public function update(Request $request, Anuncio $anuncio)
    {
        $validated = $request->validate([
            'anuncioURLFoto' => 'required|url',
        ]);

        $anuncio->update($validated);

        return response()->json(['message' => 'Anuncio actualizado exitosamente'], 200);
    }
}
