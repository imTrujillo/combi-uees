<?php

namespace App\Http\Controllers;

use App\Models\Horarios;
use App\Models\Rutas;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class RutasController extends Controller
{
    //
    public function index()
    {
        $rutas = Rutas::all();

        if (count($rutas) > 0) {
            return response()->json($rutas, 200);
        }
        return response()->json([], 200);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'rutaNombre' => 'required|string|max:30',
            'rutaLatitud' => 'required|numeric|between:-90,90',
            'rutaLongitud' => 'required|numeric|between:-180,180',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Error de validación',
                'errors' => $validator->errors()
            ], 400);
        }
        $rutas = new Rutas();
        $rutas->rutaNombre = $request->input('rutaNombre');
        $rutas->rutaLatitud = floatval($request->input('rutaLatitud'));
        $rutas->rutaLongitud = floatval($request->input('rutaLongitud'));
        $rutas->rutaBusesDisponibles = 0;
        $rutas->rutaBusesTotales = 0;
        $rutas->save();

        $horario = new Horarios();
        $horario->IDRuta = $rutas->rutaID;
        $horario->save();

        return response()->json(['message' => 'Ruta registrada exitosamente'], 201);
    }

    public function update(Request $request, string $id)
    {
        $validator = Validator::make($request->all(), [
            'rutaNombre' => 'required|string|max:30',
            'rutaLatitud' => 'required|numeric|between:-90,90',
            'rutaLongitud' => 'required|numeric|between:-180,180',
        ]);
        if ($validator->fails()) {
            return response()->json([
                'message' => 'Error de validación',
                'errors' => $validator->errors()
            ], 400);
        }
        $rutas = Rutas::where('rutaID', $id)->first();
        $rutas->rutaNombre = $request->input('rutaNombre');
        $rutas->rutaLatitud = floatval($request->input('rutaLatitud'));
        $rutas->rutaLongitud = floatval($request->input('rutaLongitud'));
        $rutas->save();

        $motoristas = User::where('IDRuta', $rutas->rutaID)->get();

        foreach ($motoristas as $motorista) {
            if ($motorista->motoristaUbicación !== 'UEES') {
                $motorista->motoristaUbicación = $rutas->rutaNombre;
                $motorista->save();
            }
        }



        return response()->json(['message' => 'Ruta actualizada exitosamente'], 201);
    }

    public function delete(string $id)
    {
        //$motoristas = User::where()
        $rutas = Rutas::find($id);

        if (!$rutas) {
            return response()->json(['message' => 'Ruta no encontrada'], 404);
        }

        $horario = Horarios::where('IDRuta', $rutas->rutaID)->first();
        if ($horario) {
            $horario->delete();
        }
        $rutas->delete();


        return response()->json(['message' => 'Ruta borrada exitosamente'], 201);
    }

    public function ubicaciónBuses(string $id)
    {
        $ruta = Rutas::find($id);

        if (!$ruta) {
            return response()->json(['error' => 'Ruta no encontrada'], 404);
        }

        $motoristas = User::whereHas('roles', function ($query) {
            $query->where('name', 'motorista');
        })->get();

        $motoristasUEES = $motoristas->filter(fn($user) => $user->motoristaUbicación === 'UEES' && $ruta->rutaID == $user->IDRuta)->count();

        $motoristasRuta = $motoristas->filter(fn($user) => $user->motoristaUbicación === $ruta->rutaNombre && $user->IDRuta == $ruta->rutaID)->count();

        return response()->json(['motoristasUEES' => $motoristasUEES, 'motoristasRuta' => $motoristasRuta], 200);
    }
}
