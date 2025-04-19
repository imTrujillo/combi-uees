import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import SwalLoading from "../../assets/SwalFireLoading";
import "../../../css/modal.css";
import "../../../css/motorista.css";

import { IoLogInSharp } from "react-icons/io5";
import img from "../../assets/loginphoto.jpg";
import logoUEES from "../../assets/logo-uees.png";
import logo from "../../assets/combi-uees-logo.png";
import video from "../../assets/fondo.mp4";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password) {
      Swal.fire({
        title: "¡Alerta!",
        text: "Debes llenar todos los datos del formulario.",
        icon: "warning",
      });
      return;
    }

    login(email, password);
  };

  const login = (email, password) => {
    SwalLoading();
    axios
      .post("http://localhost:8000/api/v1/login", { email, password })
      .then((response) => {
        const rol = response.data.rol;

        if (rol == "motorista") {
          const tokenMotorista = response.data.token;
          const id = response.data.id;
          sessionStorage.setItem("tokenMotorista", tokenMotorista);
          sessionStorage.setItem("id", id);
          Swal.fire({
            title: "Bienvenido!",
            text: "Has iniciado sesión como motorista",
            icon: "success",
          });
          navigate("/viajes");
        } else if (rol == "administrador") {
          const tokenAdministrador = response.data.token;
          const id = response.data.id;
          sessionStorage.setItem("tokenAdministrador", tokenAdministrador);
          sessionStorage.setItem("id", id);
          Swal.fire({
            title: "Bienvenido!",
            text: "Has iniciado sesión como administrador",
            icon: "success",
          });
          navigate("/administrador");
        }
      })
      .catch(() => {
        Swal.fire({
          title: "Error de sesión",
          text: "Verifica tus credenciales",
          icon: "error",
        });
      });
  };

  return (
    <div className="position-relative min-vh-100 w-100 overflow-hidden">
      <video
        autoPlay
        loop
        muted
        className="position-absolute top-0 start-0 w-100 h-100 object-fit-cover overflow-hidden"
        style={{ zIndex: -1, filter: "blur(8px)", transform: "scale(1.05)" }}
      >
        <source src={video} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <section className="mx-4 text-white min-vh-100">
        <div className="d-flex justify-content-lg-start justify-content-sm-center justify-content-center py-3 mx-5 gap-3">
          <img src={logo} style={{ height: "60px" }} alt="logo" />
          <img src={logoUEES} style={{ height: "60px" }} alt="logoUEES" />
        </div>
        <div className="d-flex flex-row align-items-center justify-content-center">
          <h2 className="fw-bold fs-1 text-white my-3 me-3">
            ¡Bienvenido al team UEES!
          </h2>
        </div>
        <div className=" d-flex flex-sm-column flex-lg-row flex-column justify-content-center m-5">
          <div className="position-relative z-2 my-3">
            <img
              src={img}
              className="position-sm-relative position-lg-absolute position-relative  shadow-lg rounded-5 seccion-imagen-login"
              style={{ width: "100%", maxWidth: "30rem" }}
              alt="Sample image"
            />
          </div>
          <div
            className="d-sm-none d-lg-flex d-none"
            style={{ width: "125px" }}
          ></div>

          <div
            className="rounded-5 z-1 mx-2 mx-lg-5 mx-2 seccion-login"
            style={{
              backgroundColor: "#4c8c08a2",
            }}
          >
            <form onSubmit={handleSubmit} className="p-4">
              <h5 className="text-start my-4">Ingresa tus credenciales</h5>

              <div data-mdb-input-init className="form-outline mb-3 text-start">
                <label className="form-label ">Correo:</label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="example@example.com"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div data-mdb-input-init className="form-outline mb-3 text-start">
                <label className="form-label">Contraseña: </label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="-------"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div className="text-center text-lg-start mt-4 pt-2">
                <button
                  type="submit"
                  className="btn-guardar rounded-5 py-2 px-5 fs-5 border-0"
                  style={{ paddingLeft: "2.5rem", paddingRight: "2.5rem" }}
                >
                  <IoLogInSharp className="me-2" />
                  Conectarse
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
