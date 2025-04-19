<?php

namespace App\Http\Controllers;

use App\Models\Viajes;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ViajesController extends Controller
{
    //


    public function index()
    {
        $viajes = Viajes::all();

        if (count($viajes) > 0) {
            return response()->json($viajes, 200);
        }
        return response()->json([], 200);
    }

    public function store(Request $request)
    {
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
            return response()->json([
                'message' => 'Error de validación',
                'errors' => $validator->errors()
            ], 422);
        }
        $viajes = new Viajes();
        $viajes->nombrePasajero = $request->input('nombrePasajero');
        $viajes->viajeFecha = $request->input('viajeFecha');
        $viajes->viajeDestino = $request->input('viajeDestino');
        $viajes->viajeEstado = true;
        $viajes->IDRuta = $request->input('IDRuta');
        $viajes->save();

        return response()->json(['message' => 'Viaje registrado exitosamente'], 201);
    }

    public function update(Request $request, string $id)
    {
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
            return response()->json([
                'message' => 'Error de validación',
                'errors' => $validator->errors()
            ], 422);
        }
        $viajes = Viajes::where('viajeID', $id)->first();
        $viajes->nombrePasajero = $request->input('nombrePasajero');
        $viajes->viajeFecha = $request->input('viajeFecha');
        $viajes->viajeDestino = $request->input('viajeDestino');
        $viajes->IDRuta = $request->input('IDRuta');
        $viajes->save();

        return response()->json(['message' => 'Viaje actualizado exitosamente'], 201);
    }

    public function updateStatus(Request $request, string $id)
    {
        $validator = Validator::make($request->all(), [
            'viajeEstado' => 'required|boolean',
        ]);
        if ($validator->fails()) {
            return response()->json([
                'message' => 'Error de validación',
                'errors' => $validator->errors()
            ], 400);
        }
        $viaje = Viajes::where('ViajeID', $id)->first();

        if (!$viaje) {
            return response()->json(['message' => 'Viaje no encontrado'], 404);
        }
        $viaje->viajeEstado = $request->input('viajeEstado');
        $viaje->save();

        return response()->json(['message' => 'El estado del viaje se actualizó'], 201);
    }

    public function delete(string $id)
    {
        $viajes = Viajes::find($id);
        $viajes->delete();

        return response()->json(['message' => 'Viaje borrado exitosamente'], 201);
    }
}
