<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Rutas extends Model
{
    //
    use HasFactory;
    protected $table = 'rutas';
    protected $primaryKey = 'rutaID';

    public function horarios()
    {
        return $this->hasOne(Horarios::class, 'IDRuta');
    }
}
