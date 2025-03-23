import React, { useEffect, useState } from "react";
import Ruta from "./Ruta";
import axios from "axios";

export default function ListaRutas() {
  const [loading, setLoading] = useState(true);
  const [listaRutas, setListaRutas] = useState([]);
  const [paginaActual, setPaginaActual] = useState(0);

  useEffect(() => {
    const apiService = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/v1/rutas");
        const rutasConBusesDisponibles = response.data.filter(
          (ruta) => ruta.rutaBusesDisponibles > 0
        );
        setListaRutas(rutasConBusesDisponibles);
        setLoading(false);
      } catch (error) {
        console.error("Error al obtener rutas:", error);
        setLoading(false);
      }
    };
    apiService();
  }, []);

  if (loading) {
    return <div>Cargando...</div>;
  }

  const totalRutas = listaRutas.length;
  const rutaActual = listaRutas[paginaActual];

  return (
    <div>
      <h2>Rutas</h2>
      <section>
        {rutaActual ? (
          <Ruta
            key={rutaActual.rutaID}
            propRutaNombre={rutaActual.rutaNombre}
            propRutaBusesDisponibles={rutaActual.rutaBusesDisponibles}
            propRutaBusesTotales={rutaActual.rutaBusesTotales}
            propLatitud={rutaActual.rutaLatitud}
            propLongitud={rutaActual.rutaLongitud}
            propViajeFecha={rutaActual.viajeFecha}
            propRutaID={rutaActual.rutaID}
            propViajeDestino={rutaActual.viajeDestino}
          />
        ) : (
          <div>No hay rutas disponibles</div>
        )}
      </section>
      <div>
        <button
          onClick={() => setPaginaActual(paginaActual - 1)}
          disabled={paginaActual === 0}
        >
          Anterior
        </button>
        <span>
          {paginaActual + 1} de {totalRutas}
        </span>
        <button
          onClick={() => setPaginaActual(paginaActual + 1)}
          disabled={paginaActual >= totalRutas - 1}
        >
          Siguiente
        </button>
      </div>
    </div>
  );
}
