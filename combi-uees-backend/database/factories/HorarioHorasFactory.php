<?php

namespace Database\Factories;

use App\Models\Horarios;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\HorarioHoras>
 */
class HorarioHorasFactory extends Factory
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
            'IDHorario' => Horarios::factory(),
            'horaSalida' => fake()->time('H:i:s'),
        ];
    }
}
