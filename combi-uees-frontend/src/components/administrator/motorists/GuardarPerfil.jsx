import React from "react";
import axios from "axios";
import Swal from "sweetalert2";
import SwalFireLoading from "../../../assets/SwalFireLoading";
import { FaSave } from "react-icons/fa";

export default function GuardarPerfil({
  id,
  nombre,
  contraseña,
  fotoPerfil,
  estado,
  ubicación,
  ruta,
  token,
}) {
  const handleSubmit = (e) => {
    e.preventDefault();

    SwalFireLoading();

    const data = {
      name: nombre,
      password: contraseña,
      motoristaURLFotoDePerfil: fotoPerfil,
      motoristaEstado: estado,
      motoristaUbicación: ubicación,
      IDRuta: ruta,
    };

    const usuarioActualizado = Object.fromEntries(
      Object.entries(data).filter(
        ([_, value]) => value !== null && value !== "" && value !== undefined
      )
    );

    axios
      .put(`http://127.0.0.1:8000/api/users/${id}`, usuarioActualizado, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        Swal.fire({
          title: "!Operación exitosa!",
          text: "Se actualizó el perfil",
          icon: "success",
        });
      })
      .catch((error) => {
        console.error(error.response.data);
        Swal.fire({
          title: "!Operación fallida!",
          text: "Ocurrió un error al actualizar el usuario",
          icon: "error",
        });
      });
  };
  return (
    <button
      type="submit"
      className="btn-guardar px-4 py-2 rounded-3 border-0"
      onClick={handleSubmit}
    >
      <FaSave className="fs-4 me-3 " />
      Guardar cambios
    </button>
  );
}
