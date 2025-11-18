<?php

namespace Database\Factories;

use App\Models\Horario;
use App\Models\Ruta;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Log;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Ruta>
 */
class RutaFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            //
            'rutaNombre' => fake()->unique()->word(),
            'rutaBusesDisponibles' => 0,
            'rutaBusesTotales' => 0,
            'rutaLatitud' => fake()->latitude(),
            'rutaLongitud' => fake()->longitude(),
        ];
    }

    public function configure()
    {
        return $this->afterCreating(function (Ruta $ruta) {
            Horario::factory(3)->create(['IDRuta' => $ruta->rutaID]);
        });
    }
}
