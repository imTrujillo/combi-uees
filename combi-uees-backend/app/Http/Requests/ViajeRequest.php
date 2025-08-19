<?php

namespace App\Http\Requests;

use Carbon\Carbon;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Support\Facades\Log;

class ViajeRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     */
    public function rules(): array
    {
        date_default_timezone_set('America/El_Salvador');
        $now = Carbon::now()->format('Y-m-d H:i:s');

        return [
            'nombrePasajero' => 'required|string|max:100|regex:/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/u',
            'viajeFecha'     => "required|date_format:Y-m-d H:i:s|after_or_equal:$now",
            'viajeEstado'    => "required|boolean",
            'viajeDestino'   => 'required|string|max:255',
        ];
    }

    public function withValidator($validator)
    {
        $validator->after(function ($v) {
            if (!$v->errors()->has('viajeFecha') && $this->has('viajeFecha')) {
                try {
                    $viajeFecha = Carbon::parse($this->input('viajeFecha'));

                    if ($viajeFecha->isSunday()) {
                        $v->errors()->add('viajeFecha', 'La ruta no puede ser domingo.');
                    }

                    if ($viajeFecha->gt(Carbon::now()->addWeek())) {
                        $v->errors()->add('viajeFecha', 'La fecha del viaje no puede ser mayor a una semana desde hoy.');
                    }
                } catch (\Exception $e) {
                    $v->errors()->add('viajeFecha', 'Formato de fecha inválido.');
                }
            }
        });
    }

    /**
     * Handle a failed validation attempt.
     * Esto asegura que siempre se retorne un 422 en caso de error de validación
     */
    protected function failedValidation(Validator $validator)
    {
        throw new HttpResponseException(
            response()->json([
                'message' => 'Error de validación.',
                'errors' => $validator->errors()
            ], 422)
        );
    }
}
