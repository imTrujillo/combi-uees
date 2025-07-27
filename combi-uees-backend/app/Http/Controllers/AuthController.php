<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use OpenApi\Annotations as OA;

/**
 * @OA\Tag(
 *     name="Autenticación",
 *     description="Login y logout de usuarios"
 * )
 */
class AuthController extends Controller
{
    /**
     * @OA\Post(
     *     path="/api/login",
     *     summary="Iniciar sesión",
     *     tags={"Autenticación"},
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             required={"email","password"},
     *             @OA\Property(property="email", type="string", format="email"),
     *             @OA\Property(property="password", type="string"),
     *             @OA\Property(property="remember", type="boolean", nullable=true)
     *         )
     *     ),
     *     @OA\Response(response=200, description="Inicio de sesión exitoso"),
     *     @OA\Response(response=400, description="Error de validación"),
     *     @OA\Response(response=401, description="Credenciales incorrectas")
     * )
     */
    public function store(Request $request)
    {
        // Validación de entrada
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required|string'
        ]);

        // Si la validación falla
        if ($validator->fails()) {
            return response()->json([
                'message' => 'Error de validación',
                'errors' => $validator->errors()
            ], 400);
        }

        // Intentar autenticar al usuario
        $credentials = $validator->validated();
        $remember = $request->filled('remember');

        if (Auth::attempt($credentials, $remember)) {
            $user = Auth::user();

            $rol = $user->hasRole('motorista') ? 'motorista' : ($user->hasRole('administrador') ? 'administrador' : 'otro');

            $token = $user->createToken("token_$rol")->plainTextToken;

            return response()->json([
                'rol' => $rol,
                'correo' => $user->email,
                'id' => $user->id,
                'token' => $token
            ], 200);
        } else {
            return response()->json(['message' => 'Credenciales incorrectas'], 401);
        }
    }

    /**
     * @OA\Post(
     *     path="/api/logout",
     *     summary="Cerrar sesión",
     *     tags={"Autenticación"},
     *     security={{"sanctum": {}}},
     *     @OA\Response(response=200, description="Sesión cerrada exitosamente")
     * )
     */
    public function destroy(Request $request)
    {
        $request->user()->currentAccessToken()->delete();
        // Auth::logout();
        // $request->session()->invalidate();
        // $request->session()->regenerateToken();

        return response()->json(['message' => 'Has cerrado sesión']);
    }
}
