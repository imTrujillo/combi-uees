<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

use function Laravel\Prompts\password;

class AutenticarController extends Controller
{
    //
    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required|string'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Error de validación',
                'errors' => $validator->errors()
            ], 400);
        }

        $correo = $request->input('email');
        $contraseña = $request->input('password');

        $user = User::where('email', $correo)->first();
        if (!$user || !Hash::check($contraseña, $user->password)) {
            return response()->json(['message' => 'Credenciales incorrectas'], 401);
        }

        if ($user) {
            $rol = $user->hasRole('motorista') ? 'motorista' : ($user->hasRole('administrador') ? 'administrador' : 'otro');
            $token = $user->createToken("token_$rol")->plainTextToken;

            return response()->json([
                'rol' => $rol,
                'correo' => $user->email,
                'id' => $user->id,
                'token' => $token
            ], 200);
        } else {
            return response()->json(['message' => 'No estás autorizado'], 401);
        }
    }

    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();
        return response()->json(['message' => 'Has cerrado sesión']);
    }
}
