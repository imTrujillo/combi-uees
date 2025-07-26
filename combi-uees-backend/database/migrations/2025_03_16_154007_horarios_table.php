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
        //
        Schema::create('horarios', function (Blueprint $table) {
            $table->id();
            $table->foreignId('IDRuta')->references('rutaID')->on('rutas')->onDelete('cascade');
            $table->time('horaSalida');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('horarios', function (Blueprint $table) {
            $table->dropForeign(['IDRuta']);
        });

        Schema::dropIfExists('horarios');
    }
};
