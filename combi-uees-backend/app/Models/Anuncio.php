<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Anuncio extends Model
{
    //
    protected $primaryKey = 'anuncioID';
    protected $fillable = ["anuncioURLFoto"];


    public function comentarios(): HasMany
    {
        return $this->hasMany(Comentario::class, 'IDanuncio');
    }

    //     protected $table = 'anuncios';

}
