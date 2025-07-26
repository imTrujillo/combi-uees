<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Comentario extends Model
{
    //
    use HasFactory;
    protected $primaryKey = 'comentarioID';

    protected $fillable = [
        "nombreUsuario",
        "comentarioTitulo",
        "comentarioDescripción",
        "IDanuncio"
    ];

    public function anuncio(): BelongsTo
    {
        return $this->belongsTo(Anuncio::class, 'IDanuncio');
    }

    // protected $table = 'comentarios';
}
