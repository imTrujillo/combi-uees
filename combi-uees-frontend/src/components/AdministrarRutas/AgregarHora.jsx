import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import SwalFireLoading from "../../assets/SwalFireLoading";

export default function AgregarHora({
  propIDRuta,
  tokenAdministrador,
  setHorasHorario,
  horasHorario,
}) {
  const [hora, setHora] = useState("");

  function handleSubmitAgregar(e) {
    e.preventDefault();
    if (!hora) {
      Swal.fire("Error", "Debes escribir una hora.", "error");
      return;
    }
    SwalFireLoading();
    const nuevaHora = {
      IDHorario: propIDRuta,
      horaSalida: hora,
    };

    axios
      .post("http://127.0.0.1:8000/api/v1/horarios/horas", nuevaHora, {
        headers: { Authorization: `Bearer ${tokenAdministrador}` },
      })
      .then((response) => {
        Swal.fire("Éxito", "La hora se ha guardado.", "success");
        setHorasHorario((prevHoras) => [
          ...prevHoras,
          { id: response.data.id, horaSalida: hora },
        ]);
        setHora("");
      })
      .catch((error) => {
        console.error("Error al guardar la hora:", error);
        Swal.fire("Error", "No se pudo guardar la hora.", "error");
      });
  }

  return (
    <>
      <form
        className="p-4 text-start d-flex row "
        onSubmit={handleSubmitAgregar}
      >
        <div className="col-8">
          <label className="form-label">Agregar una hora de salida</label>
          <input
            type="time"
            className="form-control"
            value={hora}
            step="1"
            onChange={(e) => setHora(e.target.value)}
          />
        </div>

        <div className="modal-footer col-4">
          <button type="submit" className="btn btn-success">
            Agregar Hora
          </button>
        </div>
      </form>
    </>
  );
}
