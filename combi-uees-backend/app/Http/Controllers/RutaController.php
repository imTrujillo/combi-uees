<?php

namespace App\Http\Controllers;

use App\Models\Ruta;
use App\Models\User;
use Illuminate\Http\Request;
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
 *     )
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
        $rutas = Ruta::with(['horarios', 'viajes', 'users'])->get();

        return response()->json($rutas, 200);
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
        $validated = $request->validate([
            'rutaNombre' => 'required|string|max:30|regex:/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/u',
            'rutaLatitud' => 'required|numeric|between:-90,90',
            'rutaLongitud' => 'required|numeric|between:-180,180',
        ]);

        $ruta = Ruta::create([
            ...$validated,
            'rutaBusesDisponibles' => 0,
            'rutaBusesTotales' => 0,
        ]);

        return response()->json(['message' => 'Ruta registrada exitosamente', 'ruta' => $ruta], 201);
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
        $validated = $request->validate([
            'rutaNombre' => 'required|string|max:30|regex:/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/u',
            'rutaLatitud' => 'required|numeric|between:-90,90',
            'rutaLongitud' => 'required|numeric|between:-180,180',
        ]);

        $ruta->update($validated);

        $motoristas = User::where('IDRuta', $ruta->rutaID)->get();

        foreach ($motoristas as $motorista) {
            if ($motorista->motoristaUbicación !== 'UEES') {
                $motorista->motoristaUbicación = $ruta->rutaNombre;
                $motorista->save();
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

    /**
     * @OA\Get(
     *     path="/api/rutas/{id}/ubicacion-buses",
     *     summary="Obtener conteo de motoristas por ubicación",
     *     tags={"Rutas"},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         description="ID de la ruta",
     *         @OA\Schema(type="string")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Conteo de motoristas en UEES y en la ruta",
     *         @OA\JsonContent(
     *             @OA\Property(property="motoristasUEES", type="integer", example=5),
     *             @OA\Property(property="motoristasRuta", type="integer", example=3)
     *         )
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Ruta no encontrada"
     *     )
     * )
     */
    public function ubicaciónBuses(string $id)
    {
        $ruta = Ruta::find($id);

        if (!$ruta) {
            return response()->json(['error' => 'Ruta no encontrada'], 404);
        }

        $motoristas = User::whereHas('roles', function ($query) {
            $query->where('name', 'motorista');
        })->get();

        $motoristasUEES = $motoristas->filter(
            fn($user) =>
            $user->motoristaUbicación === 'UEES' && $ruta->rutaID == $user->IDRuta
        )->count();

        $motoristasRuta = $motoristas->filter(
            fn($user) =>
            $user->motoristaUbicación === $ruta->rutaNombre && $user->IDRuta == $ruta->rutaID
        )->count();

        return response()->json([
            'motoristasUEES' => $motoristasUEES,
            'motoristasRuta' => $motoristasRuta
        ], 200);
    }
}
