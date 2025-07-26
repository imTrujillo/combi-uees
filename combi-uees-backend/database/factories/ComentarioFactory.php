<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Comentarios>
 */
class ComentarioFactory extends Factory
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
            'nombreUsuario' => fake()->name(),
            'comentarioTitulo' => fake()->text(20),
            'comentarioDescripción' => fake()->text(50),
            'IDanuncio' => 1,
        ];
    }
}
