import React, { useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import SwalFireLoading from "../../../assets/SwalFireLoading";
import { FaMinusCircle } from "react-icons/fa";
import "../../../../css/colores.css";

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
        <td className="text-end">
          <button
            onClick={handleEliminar}
            className="btn btn-danger rounded-circle btn-light-shadow"
            style={{ width: "3rem", height: "3rem" }}
          >
            <FaMinusCircle className="fs-4" />
          </button>
        </td>
      </tr>
    </>
  );
}
