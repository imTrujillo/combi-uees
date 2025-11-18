<?php

namespace App\Http\Controllers;

use App\Models\Ruta;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

/**
 * @OA\Tag(
 *     name="Motoristas",
 *     description="Gestión de motoristas de transporte"
 * )
 */

/**
 * @OA\Schema(
 *     schema="Motorista",
 *     title="Motorista",
 *     description="Modelo de un motorista asignado a una ruta",
 *     type="object",
 *     required={
 *         "id", "name", "email", "motoristaURLFotoDePerfil", "motoristaEstado", "motoristaUbicación", "IDRuta"
 *     },
 *     @OA\Property(property="id", type="integer", example=1),
 *     @OA\Property(property="name", type="string", example="Carlos López"),
 *     @OA\Property(property="email", type="string", format="email", example="motorista@example.com"),
 *     @OA\Property(property="motoristaURLFotoDePerfil", type="string", format="url", example="https://ejemplo.com/foto.jpg"),
 *     @OA\Property(property="motoristaEstado", type="boolean", example=true),
 *     @OA\Property(property="motoristaUbicación", type="string", example="Campus UEES"),
 *     @OA\Property(property="IDRuta", type="integer", example=2),
 *     @OA\Property(property="created_at", type="string", format="date-time", example="2025-07-26T12:34:56Z"),
 *     @OA\Property(property="updated_at", type="string", format="date-time", example="2025-07-26T12:45:00Z")
 * )
 */
class UserController extends Controller
{
    /**
     * @OA\Get(
     *     path="/api/rutas/{ruta}/users",
     *     summary="Obtener todos los motoristas de una ruta",
     *     tags={"Motoristas"},
     *     @OA\Parameter(
     *         name="ruta",
     *         in="path",
     *         required=true,
     *         description="ID de la ruta",
     *         @OA\Schema(type="string")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Lista de motoristas ordenados y paginados",
     *         @OA\JsonContent(
     *             type="array",
     *             @OA\Items(ref="#/components/schemas/Motorista")
     *         )
     *     )
     * )
     */
    public function index(Request $request)
    {
        $users = User::withBusRouteName()->where('id', '<>', '1');

        $isPaginated = $request->query('paginated', 1);
        if ($isPaginated) {
            $users = $users->paginate(10);
        } else {
            $users = $users->latest()->get();
        }

        return response()->json($users, 200);
    }

    /**
     * @OA\Get(
     *     path="/api/users/{user}",
     *     summary="Obtener un motorista de una ruta",
     *     tags={"Motoristas"},
     *     @OA\Parameter(
     *         name="ruta",
     *         in="path",
     *         required=true,
     *         description="ID de la ruta",
     *         @OA\Schema(type="string")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Detalles de un Motorista",
     *         @OA\JsonContent(
     *             type="array",
     *             @OA\Items(ref="#/components/schemas/Motorista")
     *         )
     *     )
     * )
     */
    public function show(Request $request, User $user)
    {
        Gate::authorize('show', $user);

        return response()->json($user->load(['ruta']), 200);
    }



    /**
     * @OA\Post(
     *     path="/api/rutas/{ruta}/users",
     *     summary="Registrar un nuevo motorista en una ruta",
     *     tags={"Motoristas"},
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
     *             required={"name", "email", "password", "motoristaURLFotoDePerfil", "motoristaEstado", "motoristaUbicación", "IDRuta"},
     *             @OA\Property(property="name", type="string", maxLength=100, example="Carlos López"),
     *             @OA\Property(property="email", type="string", format="email", example="motorista@example.com"),
     *             @OA\Property(property="password", type="string", example="contraseñaSegura123"),
     *             @OA\Property(property="motoristaURLFotoDePerfil", type="string", format="url", example="https://ejemplo.com/foto.jpg"),
     *             @OA\Property(property="motoristaEstado", type="boolean", example=true),
     *             @OA\Property(property="motoristaUbicación", type="string", example="UEES"),
     *             @OA\Property(property="IDRuta", type="integer", example=1)
     *         )
     *     ),
     *     @OA\Response(
     *         response=201,
     *         description="Motorista registrado exitosamente",
     *         @OA\JsonContent(ref="#/components/schemas/Motorista")
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
            'name' => 'required|string|max:100|regex:/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/u',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|string',
            'motoristaURLFotoDePerfil' => 'required|url',
            'motoristaEstado' => 'required|boolean',
            'motoristaUbicación' => 'required|string',
            'IDRuta' => 'required|exists:rutas,rutaID'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Error de validación',
                'errors' => $validator->errors()
            ], 422);
        }

        $ruta = Ruta::find($request->IDRuta);


        $ruta->rutaBusesTotales += 1;
        if ($request->motoristaEstado == 0) {
            $ruta->rutaBusesDisponibles += 1;
        }
        $ruta->save();

        $data = $validator->validated();
        $data['password'] = Hash::make($data['password']);
        $ubicacion = $data['motoristaUbicación'];

        if ($ruta->rutaNombre !== $ubicacion && $ubicacion !== "UEES") {
            return response()->json([
                'error' => 'La ubicación del motorista debe coincidir con la ruta seleccionada.',
                'rutaNombreEsperado' => $ruta->rutaNombre,
            ], 422);
        }

        $user = $ruta->users()->create($data);

        return response()->json(['message' => 'Motorista registrado exitosamente', 'motorista' => $user], 201);
    }

    /**
     * @OA\Put(
     *     path="/api/rutas/{ruta}/users/{user}",
     *     summary="Actualizar los datos de un motorista",
     *     tags={"Motoristas"},
     *     @OA\Parameter(
     *         name="user",
     *         in="path",
     *         required=true,
     *         description="ID del motorista",
     *         @OA\Schema(type="string")
     *     ),
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             required={"name", "password", "motoristaURLFotoDePerfil", "motoristaEstado", "motoristaUbicación", "IDRuta"},
     *             @OA\Property(property="name", type="string", maxLength=100, example="Carlos López"),
     *             @OA\Property(property="password", type="string", example="nuevaContraseñaSegura123"),
     *             @OA\Property(property="motoristaURLFotoDePerfil", type="string", format="url", example="https://ejemplo.com/nueva-foto.jpg"),
     *             @OA\Property(property="motoristaEstado", type="boolean", example=false),
     *             @OA\Property(property="motoristaUbicación", type="string", example="Ruta Norte"),
     *             @OA\Property(property="IDRuta", type="integer", example=2)
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Motorista actualizado exitosamente",
     *         @OA\JsonContent(ref="#/components/schemas/Motorista")
     *     ),
     *     @OA\Response(
     *         response=403,
     *         description="No autorizado"
     *     ),
     *     @OA\Response(
     *         response=422,
     *         description="Error de validación"
     *     )
     * )
     */
    public function update(Request $request, User $user)
    {
        Gate::authorize('update', $user);

        // Guardar estado original antes de cambios
        $estadoOriginal = $user->motoristaEstado;

        $ruta = Ruta::find($user->IDRuta);
        $ubicacion = $request->motoristaUbicación;

        if ($ruta->rutaNombre !== $ubicacion && $ubicacion !== "UEES" && $ubicacion !== null) {
            return response()->json([
                'error' => 'La ubicación del motorista debe coincidir con la ruta seleccionada.',
                'rutaNombreEsperado' => $ruta->rutaNombre,
            ], 422);
        }

        $data = $request->validate([
            'name' => 'string|max:100|regex:/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/u',
            'password' => 'string',
            'motoristaURLFotoDePerfil' => 'url',
            'motoristaEstado' => 'boolean',
            'motoristaUbicación' => 'string',
            'IDRuta' => 'required|exists:rutas,rutaID'
        ]);

        if (!empty($data['password'])) {
            $data['password'] = Hash::make($data['password']);
        } else {
            unset($data['password']);
        }

        $user->update($data);


        $rutaNueva = Ruta::find($request->IDRuta);

        $cambioDeRuta = $ruta->IDRuta != $rutaNueva->IDRuta; //Motorista cambia de ruta
        $cambioDeEstado = $estadoOriginal != $request->motoristaEstado; //Motorista cambia de estado

        if ($cambioDeRuta) {
            $ruta->rutaBusesTotales -= 1;
            $ruta->rutaBusesDisponibles -= 1;
            $rutaNueva->rutaBusesTotales += 1;

            if ($cambioDeEstado && $request->motoristaEstado == 0) {
                $rutaNueva->rutaBusesDisponibles += 1;
            } else if ($cambioDeEstado && $request->motoristaEstado == 1) {
                $rutaNueva->rutaBusesDisponibles -= 1;
            }
            $rutaNueva->save();
        } else {
            if ($cambioDeEstado && $request->motoristaEstado == 0) {
                $ruta->rutaBusesDisponibles += 1;
            } else if ($cambioDeEstado && $request->motoristaEstado == 1) {
                $ruta->rutaBusesDisponibles -= 1;
            }
        }

        $ruta->save();

        return response()->json([
            'message' => 'Motorista actualizado exitosamente',
            'motorista' => $user
        ], 201);
    }

    /**
     * @OA\Delete(
     *     path="/api/rutas/{ruta}/users/{user}",
     *     summary="Eliminar un motorista",
     *     tags={"Motoristas"},
     *     @OA\Parameter(
     *         name="ruta",
     *         in="path",
     *         required=true,
     *         description="ID de la ruta",
     *         @OA\Schema(type="string")
     *     ),
     *     @OA\Parameter(
     *         name="user",
     *         in="path",
     *         required=true,
     *         description="ID del motorista",
     *         @OA\Schema(type="string")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Motorista eliminado exitosamente"
     *     ),
     *     @OA\Response(
     *         response=403,
     *         description="No autorizado"
     *     )
     * )
     */
    public function destroy(User $user)
    {
        $ruta = Ruta::find($user->IDRuta);
        if ($ruta) {
            $ruta->rutaBusesTotales -= 1;
            if ($user->motoristaEstado == 0) {
                $ruta->rutaBusesDisponibles -= 1;
            }
            $ruta->save();
        }

        $user->delete();

        return response()->json(['message' => 'Motorista eliminado exitosamente'], 201);
    }
}
