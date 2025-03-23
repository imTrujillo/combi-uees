<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class HorarioHoras extends Model
{
    //
    use HasFactory;
    protected $table = "horario_horas";
    public function horario()
    {
        return $this->belongsTo(Horarios::class, 'horarioID');
    }
}
