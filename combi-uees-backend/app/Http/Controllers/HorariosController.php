<?php

namespace App\Http\Controllers;

use App\Models\Horarios;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class HorariosController extends Controller
{
    //
    public function index()
    {
        $horarios = Horarios::all();

        if (count($horarios) > 0) {
            return response()->json($horarios, 200);
        }
        return response()->json([], 200);
    }
}
