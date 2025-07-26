<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Ruta extends Model
{
    //
    use HasFactory;

    protected $fillable = [
        "rutaNombre",
        "rutaBusesDisponibles",
        "rutaBusesTotales",
        "rutaLatitud",
        "rutaLongitud",
    ];

    // protected $table = 'rutas';
    protected $primaryKey = 'rutaID';

    public function horarios(): HasMany
    {
        return $this->hasMany(Horario::class, 'IDRuta');
    }

    public function viajes(): HasMany
    {
        return $this->hasMany(Viaje::class, 'IDRuta');
    }


    public function users(): HasMany
    {
        return $this->hasMany(User::class, "IDRuta");
    }
}
