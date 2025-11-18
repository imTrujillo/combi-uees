<?php

namespace App\Http\Controllers;

use App\Http\Requests\ViajeRequest;
use App\Models\Ruta;
use App\Models\Viaje;
use Illuminate\Http\Request;

/**
 * @OA\Tag(
 *     name="Viajes",
 *     description="Gestión de viajes de transporte"
 * )
 */

/**
 * @OA\Schema(
 *     schema="Viaje",
 *     title="Viaje",
 *     description="Información de un viaje asignado a una ruta",
 *     type="object",
 *     required={
 *         "ViajeID", "nombrePasajero", "viajeFecha", "viajeDestino", "viajeEstado", "IDRuta"
 *     },
 *     @OA\Property(property="ViajeID", type="integer", example=1),
 *     @OA\Property(property="nombrePasajero", type="string", example="Juan Pérez"),
 *     @OA\Property(property="viajeFecha", type="string", format="date-time", example="2025-08-01 14:30:00"),
 *     @OA\Property(property="viajeDestino", type="string", example="UEES"),
 *     @OA\Property(property="viajeEstado", type="boolean", example=true),
 *     @OA\Property(property="IDRuta", type="integer", example=2),
 *     @OA\Property(property="created_at", type="string", format="date-time", example="2025-07-26T12:34:56Z"),
 *     @OA\Property(property="updated_at", type="string", format="date-time", example="2025-07-26T12:45:00Z")
 * )
 */
class ViajeController extends Controller
{
    /**
     * @OA\Get(
     *     path="/api/rutas/{ruta}/viajes",
     *     summary="Obtener todos los viajes de una ruta",
     *     tags={"Viajes"},
     *     @OA\Parameter(
     *         name="ruta",
     *         in="path",
     *         required=true,
     *         description="ID de la ruta",
     *         @OA\Schema(type="string")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Lista de viajes ordenados por fecha más reciente",
     *         @OA\JsonContent(
     *             type="array",
     *             @OA\Items(ref="#/components/schemas/Viaje")
     *         )
     *     )
     * )
     */
    public function index(Request $request)
    {
        $viajes = Viaje::latest();

        $isPaginated = $request->query('paginated', 1);
        if ($isPaginated) {
            $viajes = $viajes->paginate(10);
        } else {
            $viajes = $viajes->get();
        }

        return response()->json($viajes, 200);
    }

    /**
     * @OA\Post(
     *     path="/api/rutas/{ruta}/viajes",
     *     summary="Crear un nuevo viaje en una ruta",
     *     tags={"Viajes"},
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
     *             required={"nombrePasajero", "viajeFecha", "viajeDestino"},
     *             @OA\Property(property="nombrePasajero", type="string", maxLength=100, example="Juan Pérez"),
     *             @OA\Property(property="viajeFecha", type="string", format="date-time", example="2023-12-15 14:30:00"),
     *             @OA\Property(property="viajeDestino", type="string", example="Campus UEES")
     *         )
     *     ),
     *     @OA\Response(
     *         response=201,
     *         description="Viaje creado exitosamente",
     *         @OA\JsonContent(ref="#/components/schemas/Viaje")
     *     ),
     *     @OA\Response(
     *         response=422,
     *         description="Error de validación",
     *         @OA\JsonContent(
     *             @OA\Examples(
     *                 example="Domingo no permitido",
     *                 value={"errors": {"viajeFecha": "La ruta no puede ser en domingo."}},
     *                 summary="Viaje en domingo"
     *             ),
     *             @OA\Examples(
     *                 example="Fecha mayor a una semana",
     *                 value={"errors": {"viajeFecha": "La fecha del viaje no puede ser mayor a una semana desde hoy."}},
     *                 summary="Fecha muy lejana"
     *             )
     *         )
     *     )
     * )
     */
    public function store(ViajeRequest $request)
    {
        $ruta = Ruta::find($request->IDRuta);
        $viaje = $ruta->viajes()->create($request->validated());

        return response()->json(['message' => 'Viaje registrado exitosamente', 'viaje' => $viaje], 201);
    }

    /**
     * @OA\Put(
     *     path="/api/rutas/{ruta}/viajes/{id}",
     *     summary="Actualizar un viaje existente",
     *     tags={"Viajes"},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         description="ID del viaje",
     *         @OA\Schema(type="string")
     *     ),
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             required={"nombrePasajero", "viajeFecha", "viajeDestino", "IDRuta"},
     *             @OA\Property(property="nombrePasajero", type="string", maxLength=100, example="Juan Pérez"),
     *             @OA\Property(property="viajeFecha", type="string", format="date-time", example="2023-12-15 14:30:00"),
     *             @OA\Property(property="viajeDestino", type="string", example="Campus UEES"),
     *             @OA\Property(property="IDRuta", type="integer", example=1)
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Viaje actualizado exitosamente",
     *         @OA\JsonContent(ref="#/components/schemas/Viaje")
     *     ),
     *     @OA\Response(
     *         response=422,
     *         description="Error de validación"
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Viaje no encontrado"
     *     )
     * )
     */
    public function update(ViajeRequest $request, Viaje $viaje)
    {
        $viaje = $viaje->update($request->validated());

        return response()->json(['message' => 'Viaje actualizado exitosamente', 'viaje' => $viaje], 200);
    }

    /**
     * @OA\Delete(
     *     path="/api/rutas/{ruta}/viajes/{id}",
     *     summary="Eliminar un viaje",
     *     tags={"Viajes"},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         description="ID del viaje",
     *         @OA\Schema(type="string")
     *     ),
     *     @OA\Response(
     *         response=204,
     *         description="Viaje eliminado exitosamente"
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Viaje no encontrado"
     *     )
     * )
     */
    public function destroy(Viaje $viaje)
    {
        $viaje->delete();

        return response()->json(['message' => 'Viaje borrado exitosamente'], 204);
    }
}
