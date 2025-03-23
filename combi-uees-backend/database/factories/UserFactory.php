<?php

namespace Database\Factories;

use App\Models\Roles;
use App\Models\Rutas;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\User>
 */
class UserFactory extends Factory
{
    /**
     * The current password being used by the factory.
     */
    protected static ?string $password;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $ruta = Rutas::inRandomOrder()->first();
        $rutaID = $ruta ? $ruta->rutaID : null;
        $nombreRuta = $ruta ? $ruta->rutaNombre : 'Desconocido';
        return [
            'name' => fake()->name(),
            'email' => fake()->unique()->safeEmail(),
            'email_verified_at' => now(),
            'password' => static::$password ??= Hash::make('password'),
            'motoristaURLFotoDePerfil' => fake()->url(),
            'motoristaEstado' => fake()->boolean(),
            'IDRuta' => $rutaID,
            'motoristaUbicación' => fake()->randomElement(['UEES', $nombreRuta]),
            'remember_token' => Str::random(10),
        ];
    }

    public function configure(): static
    {
        return $this->afterCreating(function (User $user) {
            $user->assignRole('motorista');
            if ($user->IDRuta) {
                $ruta = Rutas::find($user->IDRuta);

                if ($ruta) {
                    if ($user->motoristaEstado === 1) {
                        $ruta->increment('rutaBusesTotales');
                    } else {
                        $ruta->increment('rutaBusesTotales');
                        $ruta->increment('rutaBusesDisponibles');
                    }
                }
            }
        });
    }

    /**
     * Indicate that the model's email address should be unverified.
     */
    public function unverified(): static
    {
        return $this->state(fn(array $attributes) => [
            'email_verified_at' => null,
        ]);
    }
}
