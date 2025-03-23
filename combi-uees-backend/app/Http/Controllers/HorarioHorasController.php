<?php

namespace App\Http\Controllers;

use App\Models\HorarioHoras;
use App\Models\Horarios;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class HorarioHorasController extends Controller
{
    //
    public function index(string $id)
    {
        $horas = HorarioHoras::where('IDHorario', $id)->get();

        if (count($horas) > 0) {
            return response()->json($horas, 200);
        }
        return response()->json([], 200);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'IDHorario' => 'required|integer',
            'horaSalida' => 'required|date_format:H:i:s|unique:horario_horas,horaSalida,NULL,id,IDHorario,' . $request->IDHorario,
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Error de validación',
                'errors' => $validator->errors()
            ], 400);
        }
        $rutas = new HorarioHoras();
        $rutas->IDHorario = $request->input("IDHorario");
        $rutas->horaSalida = $request->input('horaSalida');
        $rutas->save();

        return response()->json(['message' => 'Registro exitoso'], 201);
    }

    public function delete(string $id)
    {
        //$motoristas = User::where()
        $horas = HorarioHoras::find($id);
        $horas->delete();

        if (!$horas) {
            return response()->json(['message' => 'Hora no encontrada'], 404);
        }

        return response()->json(['message' => 'Hora borrada exitosamente'], 201);
    }
}
