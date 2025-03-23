import React, { useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import SwalFireLoading from "../../assets/SwalFireLoading";

export default function Hora({
  propHoraID,
  propHora,
  tokenAdministrador,
  setHorasHorario,
}) {
  function handleEliminar(e) {
    e.preventDefault();
    SwalFireLoading();
    axios
      .delete(`http://127.0.0.1:8000/api/v1/horarios/horas/${propHoraID}`, {
        headers: { Authorization: `Bearer ${tokenAdministrador}` },
      })
      .then(() => {
        Swal.fire("Eliminado", "La hora ha sido borrada.", "success");
      })
      .catch(() => {
        Swal.fire(
          "¡Error!",
          "Ocurrió un problema al eliminar la hora.",
          "error"
        );
      });

    setHorasHorario((prevHoras) =>
      prevHoras.filter((hora) => hora.id !== propHoraID)
    );
  }

  return (
    <>
      <tr>
        <td>{propHora}</td>{" "}
        <td>
          <button onClick={handleEliminar} className="btn btn-danger">
            Eliminar
          </button>
        </td>{" "}
      </tr>
    </>
  );
}
