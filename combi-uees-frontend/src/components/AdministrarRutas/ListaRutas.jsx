import React, { useState } from "react";
import AgregarRuta from "./AgregarRuta";
import Ruta from "./Ruta";

export default function ListaRutas({
  tokenAdministrador,
  listaRutas,
  setListaRutas,
}) {
  return (
    <div>
      <h2>Rutas</h2>
      <AgregarRuta
        tokenAdministrador={tokenAdministrador}
        listaRutas={listaRutas}
        setListaRutas={setListaRutas}
      />
      <div>
        <div className="table-responsive">
          <table className="table table-striped table-hover">
            <thead>
              <th>Nombre</th>
              <th>Horarios</th>
              <th>Buses Disponibles</th>
              <th>Buses Totales</th>
              <th>Latitud (Ubicación de la ruta)</th>
              <th>Longitud (Ubicación de la ruta)</th>
            </thead>
            <tbody>
              {listaRutas.map((ruta) => {
                return (
                  <Ruta
                    key={ruta.id}
                    propIDRuta={ruta.rutaID}
                    propNombre={ruta.rutaNombre}
                    propBusesDisponibles={ruta.rutaBusesDisponibles}
                    propBusesTotales={ruta.rutaBusesTotales}
                    propLatitud={ruta.rutaLatitud}
                    propLongitud={ruta.rutaLongitud}
                    tokenAdministrador={tokenAdministrador}
                    listaRutas={listaRutas}
                  />
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
