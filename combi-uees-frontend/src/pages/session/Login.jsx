import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "../../../css/modal.css";
import "../../../css/motorista.css";
import { useAuth } from "./AuthProvider";

import { IoLogInSharp } from "react-icons/io5";
import img from "../../assets/images/loginphoto.jpg";
import logoUEES from "../../assets/images/logo-uees.png";
import logo from "../../assets/images/combi-uees-logo.png";
import video from "../../assets/images/fondo.mp4";

export default function Login() {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  const handleInput = (e) => {
    const { name, value } = e.target;
    setInputs((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const navigate = useNavigate();

  const auth = useAuth();
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!inputs) {
      Swal.fire({
        title: "¡Alerta!",
        text: "Debes llenar todos los datos del formulario.",
        icon: "warning",
      });
      return;
    }

    auth.login(inputs);
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
        {/* ENCABEZADOS */}
        <div className="d-flex justify-content-lg-start justify-content-sm-center justify-content-center py-3 mx-5 gap-3">
          <img src={logo} style={{ height: "60px" }} alt="logo" />
          <img src={logoUEES} style={{ height: "60px" }} alt="logoUEES" />
        </div>
        <div className="d-flex flex-row align-items-center justify-content-center">
          <h2 className="fw-bold fs-1 text-white my-3 me-3">
            ¡Bienvenido al team UEES!
          </h2>
        </div>

        {/* IMAGEN DEL LOGIN */}
        <div className=" d-flex flex-sm-column flex-lg-row flex-column justify-content-center">
          <div className="position-relative z-2 my-3">
            <img
              src={img}
              className="position-sm-relative position-lg-absolute position-relative  shadow-lg rounded-5 seccion-imagen-login"
              alt="Sample image"
            />
          </div>

          {/* CUADRO DEL LOGIN */}
          <div
            className="rounded-5 z-1 seccion-login col-lg-5"
            style={{
              backgroundColor: "#4c8c08a2",
            }}
          >
            <form
              onSubmit={handleSubmit}
              className="p-4 d-flex flex-column justify-content-center align-items-center h-100"
            >
              <h5 className="text-start my-4">Ingresa tus credenciales</h5>

              <div data-mdb-input-init className="form-outline mb-3 text-start">
                <label className="form-label ">Correo:</label>
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  placeholder="example@example.com"
                  onChange={handleInput}
                />
              </div>

              <div data-mdb-input-init className="form-outline mb-3 text-start">
                <label className="form-label">Contraseña: </label>
                <input
                  type="password"
                  name="password"
                  className="form-control"
                  placeholder="Tu contraseña aquí"
                  onChange={handleInput}
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
