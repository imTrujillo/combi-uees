<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('comentarios', function (Blueprint $table) {
            $table->id('comentarioID');
            $table->string('nombreUsuario', 100);
            $table->string('comentarioTitulo', 100);
            $table->string('comentarioDescripción', 100);
            $table->foreignId('IDanuncio')->references('anuncioID')->on('anuncios')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('comentarios');
    }
};
