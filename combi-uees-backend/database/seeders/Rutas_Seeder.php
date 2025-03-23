<?php

namespace Database\Seeders;

use App\Models\Rutas;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Log;

class Rutas_Seeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        Rutas::factory(3)->create();
        Log::info('Rutas_Seeder completado');
    }
}
