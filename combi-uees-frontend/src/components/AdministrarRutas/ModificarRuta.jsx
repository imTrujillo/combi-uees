import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import SwalFireLoading from "../../assets/SwalFireLoading";
import { createPortal } from "react-dom";
import "../../../css/modal.css";
import { RiEditCircleFill } from "react-icons/ri";
import { MdDeleteForever } from "react-icons/md";

export default function ModificarRuta({
  propIDRuta,
  propNombre,
  propLatitud,
  propLongitud,
  tokenAdministrador,
  listaRutas,
}) {
  const [modal, setModal] = useState(false);
  const [nombre, setNombre] = useState(propNombre);
  const [latitud, setLatitud] = useState(propLatitud);
  const [longitud, setLongitud] = useState(propLongitud);

  function handleSubmitEditar(e) {
    e.preventDefault();
    if (!nombre || !latitud || !longitud) {
      Swal.fire(
        "Error",
        "Debes ingresar todos los campos del formulario.",
        "error"
      );
      return;
    }
    SwalFireLoading();
    const rutaEditada = {
      rutaNombre: nombre,
      rutaLatitud: latitud,
      rutaLongitud: longitud,
    };
    axios
      .patch(`http://127.0.0.1:8000/api/v1/rutas/${propIDRuta}`, rutaEditada, {
        headers: { Authorization: `Bearer ${tokenAdministrador}` },
      })
      .then(() => {
        Swal.fire("Éxito", "La ruta se ha actualizado.", "success");

        setModal(false);
      })
      .catch(() => {
        Swal.fire("Error", "No se pudo actualizar la ruta.", "error");
      });
  }
  function handleEliminar(e) {
    e.preventDefault();
    Swal.fire({
      title: "Eliminar ruta",
      text: "¿Deseas eliminar esta ruta?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, bórralo",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        SwalFireLoading();
        axios
          .delete(`http://127.0.0.1:8000/api/v1/rutas/${propIDRuta}`, {
            headers: { Authorization: `Bearer ${tokenAdministrador}` },
          })
          .then(() => {
            Swal.fire("Eliminado", "la ruta ha sido borrada.", "success");
          })
          .catch(() => {
            Swal.fire(
              "¡Error!",
              "Ocurrió un problema al eliminar la ruta.",
              "error"
            );
          });
      }
    });
  }

  return (
    <>
      <td>
        <button
          className="btn btn-warning rounded-circle amarillo"
          style={{ width: "3rem", height: "3rem" }}
          onClick={() => setModal(true)}
        >
          <RiEditCircleFill className="fs-4" />
        </button>
      </td>

      <td>
        <button
          onClick={handleEliminar}
          className="btn btn-danger rounded-circle"
          style={{ width: "3rem", height: "3rem" }}
        >
          <MdDeleteForever className="fs-4" />
        </button>
      </td>

      {modal &&
        createPortal(
          <>
            <div className="modal-backdrop-blur"></div>
            <div className="modal fade show d-block" tabIndex="-1">
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <h1 className="modal-title fs-5">Editar "{propNombre}"</h1>
                    <button
                      type="button"
                      className="btn-close"
                      onClick={() => setModal(false)}
                    />
                  </div>
                  <form
                    className="p-4 text-start"
                    onSubmit={handleSubmitEditar}
                  >
                    <div className="row mb-4">
                      <div className="col">
                        <label className="form-label">Nombre de la ruta</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Escriba aquí..."
                          value={nombre}
                          onChange={(e) => setNombre(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="row mb-4">
                      <div className="col">
                        <label className="form-label">
                          Latitud (Ubicación)
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Escriba aquí..."
                          value={latitud}
                          onChange={(e) => setLatitud(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="row mb-4">
                      <div className="col">
                        <label className="form-label">
                          Longitud (Ubicación)
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Escriba aquí..."
                          value={longitud}
                          onChange={(e) => setLongitud(e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="modal-footer d-flex flex-row gap-3 justify-content-center">
                      <button
                        type="button"
                        className="btn-cancelar"
                        onClick={() => setModal(false)}
                      >
                        Cerrar
                      </button>
                      <button type="submit" className="btn-guardar">
                        Guardar
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </>,
          document.getElementById("modal-root")
        )}
    </>
  );
}
