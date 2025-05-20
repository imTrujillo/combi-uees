import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import "../../../css/modal.css";
import { createPortal } from "react-dom";
import SwalFireLoading from "../../assets/SwalFireLoading";
import { MdAddCircle } from "react-icons/md";
import "../../../css/colores.css";

export default function AgregarViaje({
  listaRutas,
  setListaRutas,
  tokenMotorista,
}) {
  const [modal, setModal] = useState(false);
  const [nombre, setNombre] = useState("");
  const [fecha, setFecha] = useState("");
  const [hora, setHora] = useState("");
  const [destino, setDestino] = useState("");
  const [ruta, setRuta] = useState("");
  const [horasHorario, setHorasHorario] = useState([]);

  const handleRuta = async (e) => {
    setRuta(e.target.value);
    try {
      SwalFireLoading();
      const response = await axios.get(
        `http://127.0.0.1:8000/api/v1/horarios/horas/${e.target.value}`
      );

      const horasOrdenadas = response.data.sort((a, b) =>
        a.horaSalida.localeCompare(b.horaSalida)
      );
      setHorasHorario(horasOrdenadas);
      Swal.close();
    } catch (error) {
      console.error("Ocurrió un error:", error);
    }
  };

  function handleSubmitAgregar(e) {
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
    const nuevoViaje = {
      nombrePasajero: nombre,
      viajeFecha: `${fecha} ${hora}`,
      viajeDestino: destino,
      IDRuta: ruta,
    };

    axios
      .post("http://127.0.0.1:8000/api/v1/viajes", nuevoViaje, {
        headers: { Authorization: `Bearer ${tokenMotorista}` },
      })
      .then(() => {
        Swal.fire("Éxito", "El viaje se ha guardado.", "success");

        setModal(false);
      })
      .catch(() => {
        Swal.fire("Error", "Ocurrió un error.", "error");
      });
  }
  return (
    <>
      <td>
        <button
          className="d-flex align-items-center  gap-2 text-white btn-verde btn-light-shadow"
          onClick={() => setModal(true)}
        >
          <MdAddCircle className="fs-3" />
          Viaje
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
                    <h1 className="modal-title fs-5">Agregar Viaje</h1>
                    <button
                      type="button"
                      className="btn-close"
                      onClick={() => setModal(false)}
                    />
                  </div>
                  <form
                    className="p-4 text-start"
                    onSubmit={handleSubmitAgregar}
                  >
                    <div className="row mb-4">
                      <div className="col">
                        <label className="form-label">
                          Nombre del pasajero
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Ingrese su nombre..."
                          value={nombre}
                          onChange={(e) => setNombre(e.target.value)}
                        />
                      </div>
                      <div className="col">
                        <label className="form-label">Ruta</label>
                        <select
                          className="form-control"
                          value={ruta}
                          onChange={(e) => handleRuta(e)}
                        >
                          <option value="" disabled>
                            Seleccione una ruta
                          </option>
                          {listaRutas.map((ruta) => (
                            <option key={ruta.rutaID} value={ruta.rutaID}>
                              {ruta.rutaNombre}
                            </option>
                          ))}
                        </select>
                      </div>
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
                        <option value="" disabled>
                          Seleccione el punto de llegada
                        </option>
                        <option value="UEES">UEES</option>
                        {ruta && (
                          <option value={ruta.rutaNombre}>
                            {listaRutas.find((r) => r.rutaID == ruta)
                              ?.rutaNombre || "Ruta no encontrada"}
                          </option>
                        )}
                      </select>
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
                          onChange={(e) => setHora(e.target.value)}
                        />
                      ) : (
                        <select
                          className="form-control"
                          value={hora}
                          onChange={(e) => setHora(e.target.value)}
                        >
                          <option value="" disabled>
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
