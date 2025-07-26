<?php

namespace App\Http\Controllers;

use App\Models\Ruta;
use App\Models\Viaje;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Validator;

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
 *     @OA\Property(property="viajeDestino", type="string", example="Campus UEES"),
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
    public function index(Ruta $ruta)
    {
        $viajes = $ruta->viajes()->latest()->get();

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
    public function store(Request $request, Ruta $ruta)
    {

        date_default_timezone_set('America/El_Salvador');
        $now = Carbon::now()->format('Y-m-d H:i:s');

        $validator = Validator::make($request->all(), [
            'nombrePasajero' => 'required|string|max:100|regex:/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/u',
            'viajeFecha' => "required|date_format:Y-m-d H:i:s|after_or_equal:$now",
            'viajeDestino' => 'required|string',
        ]);

        $validator->after(function ($validator) use ($request) {
            $viajeFecha = Carbon::parse($request->input('viajeFecha'));

            if ($viajeFecha->isSunday()) {
                $validator->errors()->add('viajeFecha', 'La ruta no puede ser en domingo.');
            }
            if ($viajeFecha->gt(Carbon::now()->addWeek())) {
                $validator->errors()->add('viajeFecha', 'La fecha del viaje no puede ser mayor a una semana desde hoy.');
            }
        });

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $viaje = Viaje::create([...$validator->validated(), 'IDRuta' => $ruta->rutaID, 'viajeEstado' => true]);

        return response()->json(['message' => 'Viaje registrado exitosamente', 'viaje' => $viaje], 201);
    }

    /**
     * @OA\Put(
     *     path="/api/viajes/{id}",
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
    public function update(Request $request, string $id)
    {
        $viaje = Viaje::findOrFail($id);

        date_default_timezone_set('America/El_Salvador');
        $now = Carbon::now()->format('Y-m-d H:i:s');

        $validator = Validator::make($request->all(), [
            'nombrePasajero' => 'required|string|max:100|regex:/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/u',
            'viajeFecha' => "required|date_format:Y-m-d H:i:s|after_or_equal:$now",
            'viajeDestino' => 'required|string',
            'IDRuta' => 'required|integer|exists:rutas,rutaID'
        ]);

        $validator->after(function ($validator) use ($request) {
            $viajeFecha = Carbon::parse($request->input('viajeFecha'));

            if ($viajeFecha->isSunday()) {
                $validator->errors()->add('viajeFecha', 'La ruta no puede ser en domingo.');
            }
            if ($viajeFecha->gt(Carbon::now()->addWeek())) {
                $validator->errors()->add('viajeFecha', 'La fecha del viaje no puede ser mayor a una semana desde hoy.');
            }
        });

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $viaje->update($validator->validated());

        return response()->json(['message' => 'Viaje actualizado exitosamente', 'viaje' => $viaje], 200);
    }

    /**
     * @OA\Patch(
     *     path="/api/viajes/{id}/estado",
     *     summary="Cambiar el estado de un viaje",
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
     *             required={"viajeEstado"},
     *             @OA\Property(property="viajeEstado", type="boolean", example=false)
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Estado del viaje actualizado",
     *         @OA\JsonContent(ref="#/components/schemas/Viaje")
     *     ),
     *     @OA\Response(
     *         response=400,
     *         description="Error de validación"
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Viaje no encontrado"
     *     )
     * )
     */
    public function updateStatus(Request $request, string $id)
    {
        $viaje = Viaje::where('ViajeID', $id)->first();

        if (!$viaje) {
            return response()->json(['message' => 'Viaje no encontrado'], 404);
        }

        $validator = Validator::make($request->all(), [
            'viajeEstado' => 'required|boolean',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Error de validación',
                'errors' => $validator->errors()
            ], 400);
        }

        $viaje->viajeEstado = $request->input('viajeEstado');
        $viaje->save();

        return response()->json(['message' => 'El estado del viaje se actualizó', 'viaje' => $viaje], 200);
    }

    /**
     * @OA\Delete(
     *     path="/api/viajes/{id}",
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
    public function destroy(string $id)
    {
        $viaje = Viaje::findOrFail($id);
        $viaje->delete();

        return response()->json(['message' => 'Viaje borrado exitosamente'], 204);
    }
}
