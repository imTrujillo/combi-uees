<?php

namespace App\Http\Controllers;

use App\Models\Rutas;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller
{
    //
    public function index()
    {
        $motoristas = User::whereHas('roles', function ($query) {
            $query->where('name', 'motorista');
        })->get();

        if (count($motoristas) > 0) {
            return response()->json($motoristas, 200);
        }
        return response()->json([], 200);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:100|regex:/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/u',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|string',
            'motoristaURLFotoDePerfil' => 'required|url',
            'motoristaEstado' => 'required|boolean',
            'motoristaUbicación' => 'required',
            'IDRuta' => 'required|integer|exists:rutas,rutaID'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Error de validación',
                'errors' => $validator->errors()
            ], 400);
        }
        $user = new User();
        $user->name = $request->input('name');
        $user->email = $request->input('email');
        $user->password = Hash::make($request->input('password'));
        $user->motoristaURLFotoDePerfil = $request->input('motoristaURLFotoDePerfil');
        $user->motoristaEstado = $request->input('motoristaEstado');
        $user->motoristaUbicación = $request->input('motoristaUbicación');
        $user->assignRole('motorista');
        $user->IDRuta = $request->input('IDRuta');
        $user->save();

        $ruta = Rutas::where('rutaID', $user->IDRuta)->first();
        if ($ruta) {
            if ($user->motoristaEstado == 0) {
                $ruta->rutaBusesDisponibles += 1;
                $ruta->rutaBusesTotales += 1;
                $ruta->save();
            } else {
                $ruta->rutaBusesTotales += 1;
                $ruta->save();
            }
        }

        return response()->json(['message' => 'Motorista registrado exitosamente'], 201);
    }

    public function update(Request $request, string $id)
    {

        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:100|regex:/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/u',
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
            ], 400);
        }

        $user = User::find($id);
        $estadoOriginal = $user->motoristaEstado;
        $rutaOriginal = Rutas::where('rutaID', $user->IDRuta)->first();
        $rutaNueva = Rutas::where('rutaID', $request->IDRuta)->first();

        $cambioDeRuta = $rutaOriginal->rutaID !== $rutaNueva->rutaID;
        $cambioDeEstado = $estadoOriginal !== (int) $request->motoristaEstado;

        if ($cambioDeRuta) {
            if ($rutaOriginal) {
                $rutaOriginal->rutaBusesTotales -= 1;
                if ($estadoOriginal == 0) {
                    $rutaOriginal->rutaBusesDisponibles -= 1;
                }
                $rutaOriginal->save();
            }

            if ($rutaNueva) {
                $rutaNueva->rutaBusesTotales += 1;
                if ((int) $request->motoristaEstado == 0) {
                    $rutaNueva->rutaBusesDisponibles += 1;
                }
                $rutaNueva->save();
            }
        } elseif ($cambioDeEstado) {
            if ($estadoOriginal == 1 && (int) $request->motoristaEstado == 0) {
                $rutaOriginal->rutaBusesDisponibles += 1;
            } elseif ($estadoOriginal == 0 && (int) $request->motoristaEstado == 1) {
                $rutaOriginal->rutaBusesDisponibles -= 1;
            }
            $rutaOriginal->save();
        }

        $user->name = $request->input('name');
        $user->password = Hash::make($request->input('password'));
        $user->motoristaURLFotoDePerfil = $request->input('motoristaURLFotoDePerfil');
        $user->motoristaEstado = $request->input('motoristaEstado');
        $user->motoristaUbicación = $request->input('motoristaUbicación');
        $user->IDRuta = $request->input('IDRuta');
        $user->save();

        return response()->json(['message' => 'Motorista actualizado exitosamente'], 201);
    }

    public function updateStatus(Request $request, string $id)
    {
        $validator = Validator::make($request->all(), [
            'motoristaEstado' => 'required|boolean'
        ]);
        if ($validator->fails()) {
            return response()->json([
                'message' => 'Error de validación',
                'errors' => $validator->errors()
            ], 400);
        }

        $user = User::find($id);
        $estadoOriginal = $user->motoristaEstado;
        $rutaOriginal = Rutas::where('rutaID', $user->IDRuta)->first();

        $cambioDeEstado = $estadoOriginal !== (int) $request->motoristaEstado;


        if ($cambioDeEstado) {
            if ($estadoOriginal == 1 && (int) $request->motoristaEstado == 0) {
                $rutaOriginal->rutaBusesDisponibles += 1;
            } elseif ($estadoOriginal == 0 && (int) $request->motoristaEstado == 1) {
                $rutaOriginal->rutaBusesDisponibles -= 1;
            }
            $rutaOriginal->save();
        }
        $user->motoristaEstado = $request->input('motoristaEstado');
        $user->save();

        return response()->json(['message' => 'Motorista actualizado exitosamente'], 201);
    }


    public function delete(string $id)
    {
        $user = User::find($id);
        $user->delete();

        if (!$user) {
            return response()->json(['message' => 'Usuario no encontrado'], 404);
        }

        $ruta = Rutas::where('rutaID', $user->IDRuta)->first();
        if ($ruta) {
            $ruta->rutaBusesDisponibles -= 1;
            $ruta->rutaBusesTotales -= 1;
            $ruta->save();
        }

        return response()->json(['message' => 'Motorista borrado exitosamente'], 201);
    }

    public function getUser(string $id)
    {
        $user = User::find($id);

        if (!$user) {
            return response()->json(['message' => 'Usuario no encontrado'], 404);
        }

        return response()->json($user, 200);
    }
}
