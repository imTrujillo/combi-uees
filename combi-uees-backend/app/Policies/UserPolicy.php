<?php

namespace App\Policies;

use App\Models\User;
use Illuminate\Auth\Access\Response;

class UserPolicy
{
    public function show(User $user, User $model): bool
    {
        return $user->hasRole('administrador') || $user->id === $model->id;
    }

    public function update(User $user, User $model): bool
    {
        return $user->hasRole('administrador') || $user->id === $model->id;
    }
}
