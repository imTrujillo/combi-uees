import React from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import SwalLoading from "../../assets/SwalFireLoading";

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
        Swal.fire({
          title: "Sesión Cerrada",
          text: "Has cerrado sesión.",
          icon: "success",
        });
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
  return <button onClick={handleLogout}>Cerrar Sesión</button>;
}
