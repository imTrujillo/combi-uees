import React, { useState, useMemo } from "react";
import axios from "axios";
import SwalLoading from "../../assets/SwalFireLoading";
import Swal from "sweetalert2";
import { FaCheckCircle } from "react-icons/fa";
import "../../../css/ruta.css";

export default function Reservar({
  propRutaNombre,
  propViajeDestino,
  propViajeFecha,
  propRutaID,
  horasHorario,
}) {
  const [modal, setModal] = useState(false);
  const [nombre, setNombre] = useState("");
  const [viajeDestino, setViajeDestino] = useState("UEES");
  const [viajeFecha, setViajeFecha] = useState(getCurrentDate());
  const [viajeHora, setViajeHora] = useState("");

  function getCurrentDate() {
    return new Date().toISOString().split("T")[0];
  }

  const handleFecha = (e) => {
    setViajeFecha(e.target.value);
  };
  const handleHora = (e) => {
    setViajeHora(e.target.value);
  };
  const handleHoraInput = (e) => {
    const hora = e.target.value + ":00";
    setViajeHora(hora);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!nombre) {
      Swal.fire({
        title: "Error",
        text: "El nombre del pasajero es obligatorio.",
        icon: "error",
      });
      return;
    }

    SwalLoading();

    const nuevoViaje = {
      nombrePasajero: nombre,
      viajeFecha: `${viajeFecha} ${viajeHora}`,
      viajeDestino,
      IDRuta: propRutaID,
    };
    console.log(nuevoViaje);
    await axios
      .post("http://127.0.0.1:8000/api/v1/viajes", nuevoViaje)
      .then(() => {
        Swal.fire({
          title: "Éxito",
          text: "Tu reserva ha sido guardada.",
          icon: "success",
        });
        setModal(false);
      })
      .catch(() => {
        Swal.fire({
          title: "¡Operación fallida!",
          text: "Error al guardar la reserva.",
          icon: "error",
        });
      });

    setNombre("");
    setViajeFecha("");
    setViajeHora("");
    setViajeDestino("UEES");
  };

  return (
    <div>
      <button
        className="m-4 p-3 rounded-5 reservar-button text-white btn-verde"
        onClick={() => setModal(true)}
      >
        <FaCheckCircle size={30} className="me-3 " />
        Reservar
      </button>

      {modal && (
        <>
          <div className="modal-backdrop-blur"></div>
          <div className="modal fade show d-block" tabIndex="-1">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h1 className="modal-title fs-5">
                    Reserva para "{propRutaNombre}"
                  </h1>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setModal(false)}
                  />
                </div>
                <form className="p-4 text-start" onSubmit={handleSubmit}>
                  <div className="row mb-4">
                    <div className="col">
                      <div className="form-outline">
                        <label className="form-label">
                          Nombre del pasajero
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Juan Pérez"
                          value={nombre}
                          onChange={(e) => setNombre(e.target.value)}
                          autoFocus
                        />
                      </div>
                    </div>
                    <div className="col">
                      <div className="form-outline">
                        <label className="form-label">
                          Ubicación del Destino
                        </label>
                        <select
                          className="form-control"
                          value={viajeDestino}
                          onChange={(e) => setViajeDestino(e.target.value)}
                        >
                          <option value="UEES">UEES</option>
                          <option value={propRutaNombre}>
                            {propRutaNombre}
                          </option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="form-outline mb-4">
                    <label className="form-label">Fecha del viaje</label>
                    <input
                      type="date"
                      className="form-control"
                      value={viajeFecha}
                      onChange={handleFecha}
                    />
                  </div>

                  <div className="form-outline mb-4">
                    <label className="form-label">Horario</label>
                    {horasHorario.length == 0 ? (
                      <input
                        type="time"
                        className="form-control"
                        value={viajeHora}
                        onChange={handleHoraInput}
                      />
                    ) : (
                      <select
                        className="form-control"
                        value={viajeHora}
                        onChange={handleHora}
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
        </>
      )}
    </div>
  );
}
