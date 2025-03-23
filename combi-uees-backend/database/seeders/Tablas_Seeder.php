<?php

namespace Database\Seeders;

use App\Models\Comentarios;
use App\Models\Rutas;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class Tablas_Seeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        Comentarios::factory(10)->create();
        User::factory(10)->create();
    }
}
