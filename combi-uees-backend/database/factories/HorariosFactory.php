<?php

namespace Database\Factories;

use App\Models\Horarios;
use App\Models\Rutas;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Model>
 */
class HorariosFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    protected $model = Horarios::class;

    public function definition(): array
    {
        return [
            'IDRuta' => Rutas::factory(),
        ];
    }
}
