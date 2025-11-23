import axios from "axios";
import Swal from "sweetalert2";
import SwalFireLoading from "../../../assets/SwalFireLoading";
import { FaMinusCircle } from "react-icons/fa";
import "../../../../css/colores.css";

export default function Hora({
  propHoraID,
  propHora,
  propIDRuta,
  token,
  setHorasHorario,
}) {
  function handleEliminar(e) {
    e.preventDefault();
    SwalFireLoading();
    axios
      .delete(
        `${
          import.meta.env.VITE_API_URL
        }rutas/${propIDRuta}/horarios/${propHoraID}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then(() => {
        Swal.fire("Eliminado", "La hora ha sido borrada.", "success");
        setHorasHorario((prevHoras) =>
          prevHoras.filter((hora) => hora.id !== propHoraID)
        );
      })
      .catch((error) => {
        console.error("Ocurrió un error:", error);
        Swal.fire(
          "¡Error!",
          "Ocurrió un problema al eliminar la hora.",
          "error"
        );
      });
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
