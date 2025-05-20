import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import SwalFireLoading from "../../assets/SwalFireLoading";
import { MdAddCircle } from "react-icons/md";
import "../../../css/modal.css";
import "../../../css/colores.css";

export default function AgregarRuta({
  tokenAdministrador,
  listaRutas,
  setListaRutas,
}) {
  const [modal, setModal] = useState(false);
  const [nombre, setNombre] = useState("");
  const [latitud, setLatitud] = useState("");
  const [longitud, setLongitud] = useState("");

  function handleSubmitAgregar(e) {
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
    const rutaNueva = {
      rutaNombre: nombre,
      rutaLatitud: latitud,
      rutaLongitud: longitud,
    };
    console.log(rutaNueva);
    axios
      .post("http://127.0.0.1:8000/api/v1/rutas", rutaNueva, {
        headers: { Authorization: `Bearer ${tokenAdministrador}` },
      })
      .then(() => {
        Swal.fire("Éxito", "La ruta se ha guardado.", "success");

        setModal(false);
      })
      .catch(() => {
        Swal.fire("Error", "No se pudo guardar la ruta.", "error");
      });

    setNombre("");
    setLatitud("");
    setLongitud("");
  }
  return (
    <>
      <td>
        <button
          className="btn-verde d-flex align-items-center px-5 gap-2 text-white btn-light-shadow"
          onClick={() => setModal(true)}
        >
          <MdAddCircle className="fs-3" /> Ruta
        </button>
      </td>
      {modal && (
        <>
          <div className="modal-backdrop-blur"></div>
          <div className="modal fade show d-block" tabIndex="-1">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h1 className="modal-title fs-5">Agregar ruta</h1>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setModal(false)}
                  />
                </div>
                <form className="p-4 text-start" onSubmit={handleSubmitAgregar}>
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
                        Latitud (Ubicación de la ruta)
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
                        Longitud (Ubicación de la ruta)
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
        </>
      )}
    </>
  );
}
