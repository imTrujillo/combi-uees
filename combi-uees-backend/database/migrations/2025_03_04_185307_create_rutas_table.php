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
        Schema::create('rutas', function (Blueprint $table) {
            $table->id('rutaID');
            $table->string('rutaNombre', 50)->unique();
            $table->unsignedBigInteger('rutaBusesDisponibles');
            $table->unsignedBigInteger('rutaBusesTotales');
            $table->decimal('rutaLatitud', 10, 8);
            $table->decimal('rutaLongitud', 11, 8);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('rutas');
    }
};
