import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import SwalLoading from "../../assets/SwalFireLoading";

export default function GuardarComentario() {
  const [nombre, setNombre] = useState("");
  const [titulo, setTitulo] = useState("");
  const [descripción, setDescripción] = useState("");

  const handleNombre = (e) => {
    setNombre(e.target.value);
  };
  const handleTitulo = (e) => {
    setTitulo(e.target.value);
  };
  const handleDescripción = (e) => {
    setDescripción(e.target.value);
  };

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
      .post("http://127.0.0.1:8000/api/v1/comentarios", nuevoComentario)
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
  };

  return (
    <div>
      <form action="" onSubmit={handleSubmit} className="text-start">
        <div className="row mb-4">
          <div className="col">
            <div data-mdb-input-init className="form-outline">
              <input
                type="text"
                id="form6Example1"
                className="form-control"
                placeholder="Ingresa tu nombre..."
                onChange={(e) => handleNombre(e)}
              />
            </div>
          </div>
          <div className="col">
            <div data-mdb-input-init className="form-outline">
              <input
                type="text"
                id="form6Example2"
                className="form-control"
                placeholder="Título del comentario..."
                onChange={(e) => handleTitulo(e)}
              />
            </div>
            <div className="col">
              <div data-mdb-input-init className="form-outline">
                <textarea
                  type="text"
                  id="form6Example2"
                  className="form-control"
                  placeholder="Comenta aquí..."
                  onChange={(e) => handleDescripción(e)}
                />
              </div>
            </div>
          </div>
        </div>

        <button type="submit" className="btn btn-primary btn-block mb-4">
          Enviar
        </button>
      </form>
    </div>
  );
}
