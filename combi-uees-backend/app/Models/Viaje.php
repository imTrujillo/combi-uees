<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Viaje extends Model
{
    //
    protected $primaryKey = 'viajeID';
    protected $fillable = [
        "nombrePasajero",
        "viajeFecha",
        "viajeDestino",
        "viajeEstado",
        "IDRuta"
    ];

    public function ruta(): BelongsTo
    {
        return $this->belongsTo(Ruta::class, "IDRuta");
    }

    // protected $table = 'viajes';

}
