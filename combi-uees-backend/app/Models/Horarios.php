<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Horarios extends Model
{
    //
    use HasFactory;
    protected $table = 'horarios';
    protected $primaryKey = 'horarioID';

    public function ruta()
    {
        return $this->belongsTo(Rutas::class, 'IDRuta');
    }

    public function horarioHoras()
    {
        return $this->hasMany(HorarioHoras::class, 'IDHorario');
    }
}
