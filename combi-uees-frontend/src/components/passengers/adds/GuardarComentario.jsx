import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import SwalLoading from "../../../assets/SwalFireLoading";
import { IoIosSend } from "react-icons/io";

export default function GuardarComentario() {
  const [nombre, setNombre] = useState("");
  const [titulo, setTitulo] = useState("");
  const [descripción, setDescripción] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!nombre || !titulo || !descripción) {
      Swal.fire({
        title: "Comentario incompleto",
        text: "Por favor, completa todos los campos",
        icon: "warning",
      });
    }
    SwalLoading();
    const nuevoComentario = {
      nombreUsuario: nombre,
      comentarioTitulo: titulo,
      comentarioDescripción: descripción,
    };

    axios
      .post("http://127.0.0.1:8000/api/anuncios/1/comentarios", nuevoComentario)
      .then(() => {
        Swal.fire({
          title: "!Operación exitosa!",
          text: "Se añadió el comentario",
          icon: "success",
        });
      })
      .catch(() => {
        Swal.fire({
          title: "!Operación fallida!",
          text: "Error al añadir el comentario",
          icon: "error",
        });
      });

    setTitulo("");
    setNombre("");
    setDescripción("");
  };

  return (
    <div>
      <form action="" onSubmit={handleSubmit} className="text-start mt-2">
        <div className="d-flex flex-sm-column flex-lg-row flex-column m-3 mb-4">
          <div className="col">
            <div data-mdb-input-init className="form-outline my-2">
              <input
                type="text"
                id="form6Example1"
                className="form-control"
                placeholder="Nombre (alias)"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
              />
            </div>
            <div data-mdb-input-init className="form-outline mb-2">
              <input
                type="text"
                id="form6Example2"
                className="form-control"
                placeholder="Tu título"
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
              />
            </div>
            <div data-mdb-input-init className="form-outline">
              <textarea
                type="text"
                id="form6Example2"
                className="form-control"
                placeholder="Descripción"
                value={descripción}
                onChange={(e) => setDescripción(e.target.value)}
              />
            </div>
          </div>
          <button
            type="submit"
            className="col col-11 col-lg-2 col-11 footer-btn btn-light-shadow fs-4 px-1 py-1 mt-2 h-25 rounded-4 border-0 mx-2"
          >
            <IoIosSend />
          </button>
        </div>
      </form>
    </div>
  );
}
