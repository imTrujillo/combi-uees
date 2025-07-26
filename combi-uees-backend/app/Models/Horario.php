<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Horario extends Model
{
    //
    use HasFactory;

    protected $fillable = ["horaSalida", "IDHorario"];

    public function horario(): BelongsTo
    {
        return $this->belongsTo(Ruta::class, 'IDRuta');
    }

    // protected $table = "horario_horas";

}
