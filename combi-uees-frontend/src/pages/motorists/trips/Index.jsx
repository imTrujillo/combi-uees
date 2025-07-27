import React, { useEffect, useState } from "react";
import axios from "axios";
import Viaje from "./Show";
import AgregarViaje from "../../../components/motorists/trips/AgregarViaje";
import boxphoto from "../../../assets/images/caja-vacia.png";

export default function Index({
  listaViajes,
  setListaViajes,
  listaRutas,
  setListaRutas,
  token,
}) {
  return (
    <div>
      <div className="d-flex border-bottom border-2 mx-5 mb-4">
        <h2 className="text-start logo-text fs-1 me-5 mb-3 ">VIAJES</h2>
        <AgregarViaje
          token={token}
          listaRutas={listaRutas}
          setListaRutas={setListaRutas}
        />
      </div>

      {listaViajes.length <= 0 ? (
        <div>
          Aquí aparecerán las reservas :)
          <br />
          <img src={boxphoto} alt="" style={{ width: "20rem" }} />
        </div>
      ) : (
        <div>
          <div className="table-responsive px-3">
            <table className="table table-striped table-hover">
              <thead>
                <th>Pasajero</th>
                <th>Fecha del Viaje</th>
                <th>Ruta</th>
                <th>Destino del Viaje</th>
                <th>Estado</th>
              </thead>
              <tbody>
                {listaViajes.map((viaje) => {
                  const rutaEncontrada = listaRutas.find(
                    (ruta) => ruta.rutaID == viaje.IDRuta
                  );
                  const nombreRuta = rutaEncontrada.rutaNombre
                    ? rutaEncontrada.rutaNombre
                    : "Desconocida";

                  return (
                    <Viaje
                      key={viaje.viajeID}
                      propNombrePasajero={viaje.nombrePasajero}
                      propViajeFecha={viaje.viajeFecha}
                      propViajeDestino={viaje.viajeDestino}
                      propViajeEstado={viaje.viajeEstado}
                      propIDRuta={viaje.IDRuta}
                      propNombreRuta={nombreRuta}
                      propHorario={rutaEncontrada.horarios}
                      propViajeID={viaje.viajeID}
                      token={token}
                    />
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
