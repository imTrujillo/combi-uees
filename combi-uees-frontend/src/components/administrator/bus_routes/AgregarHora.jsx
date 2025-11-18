import React from "react";
import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import SwalFireLoading from "../../../assets/SwalFireLoading";
import { MdAddCircle } from "react-icons/md";
import "../../../../css/colores.css";

export default function AgregarHora({ propIDRuta, token, setHorasHorario }) {
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
      .post(
        `http://127.0.0.1:8000/api/rutas/${propIDRuta}/horarios`,
        nuevaHora,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response) => {
        setHorasHorario((prevHoras) => [
          ...prevHoras,
          { id: response.data.id, horaSalida: hora },
        ]);
        setHora("");
        Swal.close();
      })
      .catch((error) => {
        console.error("Error al guardar la hora:", error);
        Swal.fire("Error", "No se pudo guardar la hora.", "error");
      });
    setHora("");
  }

  return (
    <>
      <form
        className="p-4 text-start d-flex flex-row justify-content-end align-items-center gap-4"
        onSubmit={handleSubmitAgregar}
      >
        <div>
          <label className="form-label">Agregar una hora de salida</label>
          <input
            type="time"
            className="form-control"
            value={hora}
            step="1"
            onChange={(e) => setHora(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="btn btn-success rounded-circle verde btn-light-shadow"
          style={{ width: "3.3rem", height: "3.3rem" }}
        >
          <MdAddCircle className="fs-3" />
        </button>
      </form>
    </>
  );
}
