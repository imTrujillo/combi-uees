<?php

namespace App\Models;

use Illuminate\Contracts\Database\Query\Builder as QueryBuilder;
use Illuminate\Database\Eloquent\Builder;
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

    public function scopeConMotoristas(Builder|QueryBuilder $query)
    {
        return $query->withCount([
            'users as motoristasRuta' => fn($q) => $q->whereColumn('users.motoristaUbicación', 'rutas.rutaNombre'),
            'users as motoristasUniversidad' => fn($q) => $q->where('users.motoristaUbicación', 'Universidad')
        ]);
    }
}
