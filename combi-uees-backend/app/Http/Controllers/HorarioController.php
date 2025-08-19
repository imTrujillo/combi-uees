<?php

namespace App\Http\Controllers;

use App\Models\Horario;
use App\Models\Ruta;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use OpenApi\Annotations as OA;

/**
 * @OA\Tag(
 *     name="Horarios",
 *     description="Gestión de horarios de rutas"
 * )
 */

/**
 * @OA\Schema(
 *     schema="Horario",
 *     type="object",
 *     title="Horario",
 *     required={"id", "inicio", "fin"},
 *     @OA\Property(property="id", type="integer"),
 *     @OA\Property(property="IDRuta", type="integer"),
 *     @OA\Property(property="horaSalida", type="string", format="time")
 * )
 */

class HorarioController extends Controller
{
    /**
     * @OA\Get(
     *     path="/api/rutas/{ruta}/horarios",
     *     summary="Obtener todos los horarios de una ruta específica",
     *     tags={"Horarios"},
     *     @OA\Parameter(
     *         name="ruta",
     *         in="path",
     *         required=true,
     *         description="ID de la ruta",
     *         @OA\Schema(type="string")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Lista de horarios",
     *         @OA\JsonContent(
     *             type="array",
     *             @OA\Items(ref="#/components/schemas/Horario")
     *         )
     *     )
     * )
     */
    public function index(Ruta $ruta)
    {
        $horas = $ruta->horarios()->get();

        return response()->json($horas, 200);
    }

    /**
     * @OA\Post(
     *     path="/api/rutas/{ruta}/horarios",
     *     summary="Crear un nuevo horario para una ruta",
     *     tags={"Horarios"},
     *     @OA\Parameter(
     *         name="ruta",
     *         in="path",
     *         required=true,
     *         description="ID de la ruta",
     *         @OA\Schema(type="string")
     *     ),
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             required={"horaSalida"},
     *             @OA\Property(property="horaSalida", type="string", format="time", example="14:30:00")
     *         )
     *     ),
     *     @OA\Response(
     *         response=201,
     *         description="Horario creado exitosamente",
     *         @OA\JsonContent(ref="#/components/schemas/Horario")
     *     ),
     *     @OA\Response(
     *         response=422,
     *         description="Error de validación"
     *     )
     * )
     */
    public function store(Request $request, Ruta $ruta)
    {

        $validator = Validator::make($request->all(), [
            'horaSalida' => [
                'required',
                'date_format:H:i:s',
                'unique:horarios,horaSalida,NULL,id,IDRuta,' . $ruta->rutaID,
            ],
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Error de validación',
                'errors' => $validator->errors()
            ], 422);
        }

        $hora = $ruta->horarios()->create($validator->validated());

        return response()->json(['message' => 'Registro exitoso', 'hora' => $hora], 201);
    }

    /**
     * @OA\Delete(
     *     path="/api/rutas/{ruta}/horarios/{id}",
     *     summary="Eliminar un horario por su ID",
     *     tags={"Horarios"},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         description="ID del horario a eliminar",
     *         @OA\Schema(type="string")
     *     ),
     *     @OA\Response(
     *         response=204,
     *         description="Horario eliminado exitosamente"
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Horario no encontrado"
     *     )
     * )
     */
    public function destroy(Ruta $ruta, Horario $horario)
    {
        $horario->delete();

        return response()->json(['message' => 'Hora borrada exitosamente'], 204);
    }
}
