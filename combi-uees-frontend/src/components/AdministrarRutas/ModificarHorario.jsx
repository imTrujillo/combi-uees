import React, { useEffect, useState } from "react";
import axios from "axios";
import Hora from "./Hora";
import AgregarHora from "./AgregarHora";
import SwalFireLoading from "../../assets/SwalFireLoading";
import Swal from "sweetalert2";
import "../../../css/modal.css";
import boxphoto from "../../assets/caja-vacia.png";
import { createPortal } from "react-dom";
import { IoEye } from "react-icons/io5";

export default function ModificarHorario({
  propIDRuta,
  propNombre,
  tokenAdministrador,
}) {
  const [modal, setModal] = useState(false);
  const [horasHorario, setHorasHorario] = useState([]);

  const handleButton = async () => {
    setModal(true);
    SwalFireLoading();
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/v1/horarios/horas/${propIDRuta}`
      );
      const horasOrdenadas = response.data.sort((a, b) =>
        a.horaSalida.localeCompare(b.horaSalida)
      );
      Swal.close();
      setHorasHorario(horasOrdenadas);
    } catch (error) {
      Swal.close();
      console.error("Ocurrió un error:", error);
    }
  };

  return (
    <td>
      <>
        <td>
          <button className="btn btn-guardar rounded-2" onClick={handleButton}>
            <IoEye className="mx-2" />
            Mostrar
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
                      <h1 className="modal-title fs-5">
                        Editar Horario de ruta {propNombre}
                      </h1>
                      <button
                        type="button"
                        className="btn-close"
                        onClick={() => setModal(false)}
                      />
                    </div>
                    <div>
                      <AgregarHora
                        propIDRuta={propIDRuta}
                        tokenAdministrador={tokenAdministrador}
                        setHorasHorario={setHorasHorario}
                        horasHorario={horasHorario}
                      />
                      <div className="table-responsive p-3">
                        <table className="table table-striped table-hover">
                          {horasHorario.length <= 0 ? (
                            <div className="d-flex flex-column justify-content-center align-items-center">
                              Aquí aparecerán los horarios :)
                              <br />
                              <img
                                src={boxphoto}
                                alt=""
                                style={{ width: "20rem" }}
                              />
                            </div>
                          ) : (
                            <>
                              <thead>
                                <th>Horario de Salida</th>
                              </thead>
                              <tbody>
                                {horasHorario.map((horario) => {
                                  return (
                                    <Hora
                                      key={horario.id}
                                      propHoraID={horario.id}
                                      propHora={horario.horaSalida}
                                      tokenAdministrador={tokenAdministrador}
                                      setHorasHorario={setHorasHorario}
                                    />
                                  );
                                })}
                              </tbody>
                            </>
                          )}
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>,
            document.getElementById("modal-root")
          )}
      </>
    </td>
  );
}
