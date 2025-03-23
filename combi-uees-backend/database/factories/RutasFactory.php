<?php

namespace Database\Factories;

use App\Models\HorarioHoras;
use App\Models\Horarios;
use App\Models\Rutas;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Log;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Rutas>
 */
class RutasFactory extends Factory
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
            'rutaNombre' => fake()->word(),
            'rutaBusesDisponibles' => 0,
            'rutaBusesTotales' => 0,
            'rutaLatitud' => fake()->latitude(),
            'rutaLongitud' => fake()->longitude(),
        ];
    }

    public function configure()
    {
        return $this->afterCreating(function (Rutas $ruta) {
            $horario = Horarios::factory()->create(['IDRuta' => $ruta->rutaID]);
            Log::info('Horario creado: ' . $horario->horarioID);
            HorarioHoras::factory(3)->create(['IDHorario' => $horario->horarioID]);
            Log::info('HorarioHoras creadas para Horario: ' . $horario->horarioID);
        });
    }
}
