<?php

namespace Database\Seeders;

use App\Models\Anuncios;
use App\Models\Roles;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Log;
use Spatie\Permission\Models\Role;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */

    public function run(): void
    {
        // User::factory(10)->create();
        set_time_limit(0);
        Role::create(['name' => 'administrador']);
        Role::create(['name' => 'motorista']);

        Anuncios::create([
            'anuncioID' => 1,
            'anuncioURLFoto' => 'google.com',
        ]);
        $user = User::create([
            'id' => 1,
            'name' => 'administrator',
            'email' => 'admin@gmail.com',
            'password' => '123456'
        ]);
        $user->assignRole('administrador');
        Log::info('Usuarios creados: ' . $user);
        $this->call([
            Rutas_Seeder::class,
            Tablas_Seeder::class,
        ]);
    }
}
