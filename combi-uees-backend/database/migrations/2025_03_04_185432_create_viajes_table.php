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
        Schema::create('viajes', function (Blueprint $table) {
            $table->id('viajeID');
            $table->string('nombrePasajero', 200);
            $table->dateTime('viajeFecha');
            $table->string('viajeDestino');
            $table->boolean('viajeEstado');
            $table->foreignId('IDRuta')->references('rutaID')->on('rutas')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('viajes');
    }
};
