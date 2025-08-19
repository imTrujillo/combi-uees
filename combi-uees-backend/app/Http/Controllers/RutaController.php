<?php

namespace App\Http\Controllers;

use App\Models\Ruta;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use OpenApi\Annotations as OA;

/**
 * @OA\Tag(
 *     name="Rutas",
 *     description="Gestión de rutas de transporte"
 * )
 */


/**
 * @OA\Schema(
 *     schema="Ruta",
 *     title="Ruta",
 *     description="Información de una ruta de transporte",
 *     type="object",
 *     required={"rutaID", "rutaNombre", "rutaLatitud", "rutaLongitud", "rutaBusesDisponibles", "rutaBusesTotales"},
 *
 *     @OA\Property(
 *         property="rutaID",
 *         type="integer",
 *         example=1
 *     ),
 *     @OA\Property(
 *         property="rutaNombre",
 *         type="string",
 *         maxLength=30,
 *         example="Ruta Norte"
 *     ),
 *     @OA\Property(
 *         property="rutaLatitud",
 *         type="number",
 *         format="float",
 *         example=-2.1458
 *     ),
 *     @OA\Property(
 *         property="rutaLongitud",
 *         type="number",
 *         format="float",
 *         example=-79.9675
 *     ),
 *     @OA\Property(
 *         property="rutaBusesDisponibles",
 *         type="integer",
 *         example=2
 *     ),
 *     @OA\Property(
 *         property="rutaBusesTotales",
 *         type="integer",
 *         example=5
 *     ),
 *     @OA\Property(
 *         property="created_at",
 *         type="string",
 *         format="date-time",
 *         example="2025-07-26T15:40:00Z"
 *     ),
 *     @OA\Property(
 *         property="updated_at",
 *         type="string",
 *         format="date-time",
 *         example="2025-07-26T15:45:00Z"
 *     ),
 *     @OA\Property(
 *         property="motoristasUEES",
 *         type="integer",
 *         example=5
 *     ),
 *     @OA\Property(
 *         property="motoristasRuta",
 *         type="integer",
 *         example=3)
 * )
 */
class RutaController extends Controller
{
    /**
     * @OA\Get(
     *     path="/api/rutas",
     *     summary="Obtener todas las rutas con sus relaciones",
     *     tags={"Rutas"},
     *     @OA\Response(
     *         response=200,
     *         description="Lista de rutas completas",
     *         @OA\JsonContent(
     *             type="array",
     *             @OA\Items(ref="#/components/schemas/Ruta")
     *         )
     *     )
     * )
     */
    public function index()
    {
        $rutas = Ruta::with(['horarios', 'viajes', 'users'])->conMotoristas()->paginate(1);

        return response()->json(
            $rutas,
            200
        );
    }

    /**
     * @OA\Post(
     *     path="/api/rutas",
     *     summary="Crear una nueva ruta",
     *     tags={"Rutas"},
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             required={"rutaNombre", "rutaLatitud", "rutaLongitud"},
     *             @OA\Property(property="rutaNombre", type="string", maxLength=30, example="Ruta Norte"),
     *             @OA\Property(property="rutaLatitud", type="number", format="float", example=-2.1458),
     *             @OA\Property(property="rutaLongitud", type="number", format="float", example=-79.9675)
     *         )
     *     ),
     *     @OA\Response(
     *         response=201,
     *         description="Ruta creada exitosamente",
     *         @OA\JsonContent(ref="#/components/schemas/Ruta")
     *     ),
     *     @OA\Response(
     *         response=422,
     *         description="Error de validación"
     *     )
     * )
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'rutaNombre' => 'required|string|unique:rutas,rutaNombre|max:30|regex:/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/u',
            'rutaLatitud' => 'required|numeric|between:-90,90',
            'rutaLongitud' => 'required|numeric|between:-180,180',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Error de validación',
                'errors' => $validator->errors()
            ], 422);
        }

        $data = $validator->validated();
        $data['rutaBusesDisponibles'] = 0;
        $data['rutaBusesTotales'] = 0;

        $ruta = Ruta::create($data);
        return response()->json(['message' => 'Ruta registrada exitosamente', 'ruta' => $data], 201);
    }

    /**
     * @OA\Put(
     *     path="/api/rutas/{ruta}",
     *     summary="Actualizar una ruta existente",
     *     tags={"Rutas"},
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
     *             required={"rutaNombre", "rutaLatitud", "rutaLongitud"},
     *             @OA\Property(property="rutaNombre", type="string", maxLength=30, example="Ruta Norte Actualizada"),
     *             @OA\Property(property="rutaLatitud", type="number", format="float", example=-2.1460),
     *             @OA\Property(property="rutaLongitud", type="number", format="float", example=-79.9680)
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Ruta actualizada exitosamente",
     *         @OA\JsonContent(ref="#/components/schemas/Ruta")
     *     ),
     *     @OA\Response(
     *         response=422,
     *         description="Error de validación"
     *     )
     * )
     */
    public function update(Request $request, Ruta $ruta)
    {
        $validator = Validator::make($request->all(), [
            'rutaNombre' => 'required|string|max:30|regex:/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/u',
            'rutaLatitud' => 'required|numeric|between:-90,90',
            'rutaLongitud' => 'required|numeric|between:-180,180',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Error de validación',
                'errors' => $validator->errors()
            ], 422);
        }

        $ruta->update($validator->validated());

        foreach ($ruta->users as $motorista) {
            if ($motorista->motoristaUbicación != 'UEES') {
                $motorista->update(['motoristaUbicación' => $ruta->rutaNombre]);
            }
        }

        return response()->json(['message' => 'Ruta actualizada exitosamente', 'ruta' => $ruta], 200);
    }

    /**
     * @OA\Delete(
     *     path="/api/rutas/{ruta}",
     *     summary="Eliminar una ruta",
     *     tags={"Rutas"},
     *     @OA\Parameter(
     *         name="ruta",
     *         in="path",
     *         required=true,
     *         description="ID de la ruta",
     *         @OA\Schema(type="string")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Ruta eliminada exitosamente"
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Ruta no encontrada"
     *     )
     * )
     */
    public function destroy(Ruta $ruta)
    {
        $ruta->delete();

        return response()->json(['message' => 'Ruta borrada exitosamente'], 200);
    }
}
