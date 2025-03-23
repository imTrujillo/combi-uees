import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { createPortal } from "react-dom";
import SwalFireLoading from "../../assets/SwalFireLoading";

export default function ModificarViaje({
  propNombrePasajero,
  propViajeFecha,
  propViajeDestino,
  propViajeEstado,
  tokenMotorista,
  propNombreRuta,
  propIDRuta,
  propViajeID,
  horasHorario,
}) {
  const [modal, setModal] = useState(false);
  const [nombre, setNombre] = useState(propNombrePasajero);
  const [destino, setDestino] = useState(propViajeDestino);
  const [ruta, setRuta] = useState(propIDRuta);
  const [fecha, setFecha] = useState();
  const [hora, setHora] = useState();
  const [viajeCompletado, setViajeCompletado] = useState(
    propViajeEstado === false
  );

  const handleHoraInput = (e) => {
    const hora = e.target.value + ":00";
    setHora(hora);
  };

  function handleSubmitEditar(e) {
    e.preventDefault();
    if (!nombre || !fecha || !hora || !destino || !ruta) {
      Swal.fire(
        "Error",
        "Debes ingresar todos los campos del formulario.",
        "error"
      );
      return;
    }
    SwalFireLoading();

    const viajeEditado = {
      nombrePasajero: nombre,
      viajeFecha: `${fecha} ${hora}`,
      viajeDestino: destino,
      IDRuta: ruta,
    };
    axios
      .patch(
        `http://127.0.0.1:8000/api/v1/viajes/${propViajeID}`,
        viajeEditado,
        {
          headers: { Authorization: `Bearer ${tokenMotorista}` },
        }
      )
      .then(() => {
        Swal.fire("Éxito", "El viaje se ha actualizado.", "success");

        setModal(false);
      })
      .catch(() => {
        console.log(viajeEditado);
        Swal.fire("Error", "Ocurrió un error.", "error");
      });
  }

  function handleCompletar() {
    Swal.fire({
      title: "Completar viaje",
      text: "¿Deseas completar este viaje?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        SwalFireLoading();
        axios
          .patch(
            `http://127.0.0.1:8000/api/v1/viajes/status/${propViajeID}`,
            { viajeEstado: false },
            {
              headers: { Authorization: `Bearer ${tokenMotorista}` },
            }
          )
          .then(() => {
            setViajeCompletado(true);
            Swal.fire("Éxito", "El viaje se ha completado.", "success");
          })
          .catch(() => {
            Swal.fire("Error", "No se pudo completar el viaje.", "error");
          });
      }
    });
  }

  function handleEliminar() {
    Swal.fire({
      title: "Eliminar viaje",
      text: "¿Deseas eliminar este viaje?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, bórralo",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        SwalFireLoading();
        axios
          .delete(`http://127.0.0.1:8000/api/v1/viajes/${propViajeID}`, {
            headers: { Authorization: `Bearer ${tokenMotorista}` },
          })
          .then(() => {
            Swal.fire("Eliminado", "El viaje ha sido borrado.", "success");
          })
          .catch(() => {
            Swal.fire(
              "¡Error!",
              "Ocurrió un problema al eliminar el viaje.",
              "error"
            );
          });
      }
    });
  }

  return (
    <>
      {!viajeCompletado && (
        <td>
          <button className="btn btn-warning" onClick={() => setModal(true)}>
            Editar
          </button>
        </td>
      )}
      {!viajeCompletado && (
        <td>
          <button onClick={handleCompletar} className="btn btn-success">
            Completar
          </button>
        </td>
      )}
      <td>
        <button onClick={handleEliminar} className="btn btn-danger">
          Eliminar
        </button>
      </td>

      {modal &&
        createPortal(
          <div className="modal fade show d-block" tabIndex="-1">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h1 className="modal-title fs-5">
                    Editar "{propNombrePasajero}"
                  </h1>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setModal(false)}
                  />
                </div>
                <form className="p-4 text-start" onSubmit={handleSubmitEditar}>
                  <div className="row mb-4">
                    <div className="col">
                      <label className="form-label">Nombre del pasajero</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Ingrese su nombre..."
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                      />
                    </div>
                    <div className="col">
                      <label className="form-label">
                        Ubicación del Destino
                      </label>
                      <select
                        className="form-control"
                        value={destino}
                        onChange={(e) => setDestino(e.target.value)}
                      >
                        <option value="UEES">UEES</option>
                        <option value={propNombreRuta}>{propNombreRuta}</option>
                      </select>
                    </div>
                  </div>
                  <div className="form-outline mb-4">
                    <label className="form-label">Fecha del viaje</label>
                    <input
                      type="date"
                      className="form-control"
                      value={fecha}
                      onChange={(e) => setFecha(e.target.value)}
                    />
                  </div>

                  <div className="form-outline mb-4">
                    <label className="form-label">Horario</label>
                    {horasHorario.length == 0 ? (
                      <input
                        type="time"
                        className="form-control"
                        value={hora}
                        onChange={handleHoraInput}
                      />
                    ) : (
                      <select
                        className="form-control"
                        value={hora}
                        onChange={(e) => setHora(e.target.value)}
                      >
                        <option value="" disabled selected>
                          Escoja una hora
                        </option>
                        {horasHorario.map((hora) => (
                          <option key={hora.id} value={hora.horaSalida}>
                            {hora.horaSalida}
                          </option>
                        ))}
                      </select>
                    )}
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={() => setModal(false)}
                    >
                      Cerrar
                    </button>
                    <button type="submit" className="btn btn-success">
                      Guardar
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>,
          document.getElementById("modal-root")
        )}
    </>
  );
}
