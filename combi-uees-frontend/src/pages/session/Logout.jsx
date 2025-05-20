import React from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import SwalLoading from "../../assets/SwalFireLoading";
import { MdLogout } from "react-icons/md";

export default function Logout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    const tokenMotorista = sessionStorage.getItem("tokenMotorista");
    const tokenAdministrador = sessionStorage.getItem("tokenAdministrador");

    if (!tokenMotorista && !tokenAdministrador) {
      Swal.fire({
        title: "Error",
        text: "Inicie sesión nuevamente.",
        icon: "error",
      });
      navigate("/login");
    }
    const token = tokenMotorista ? tokenMotorista : tokenAdministrador;
    SwalLoading();
    axios
      .post(
        "http://127.0.0.1:8000/api/v1/logout",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(() => {
        if (tokenMotorista) {
          sessionStorage.removeItem("tokenMotorista");
          sessionStorage.removeItem("id");
        } else if (tokenAdministrador) {
          sessionStorage.removeItem("tokenAdministrador");
          sessionStorage.removeItem("id");
        }
        Swal.close();
        navigate("/");
      })
      .catch(() => {
        Swal.fire({
          title: "Error de sesión",
          text: "Error al cerrar sesión.",
          icon: "error",
        });
      });
  };
  return (
    <button
      className="fw-bold text-decoration-none d-flex flex-row justify-content-center align-items-center gap-1 p-2 w-75 w-sm-100 mx-auto  mb-3 rounded-4 logout-button"
      onClick={handleLogout}
    >
      <MdLogout />
      <p className="d-none d-lg-block my-auto">Cerrar Sesion</p>
    </button>
  );
}
