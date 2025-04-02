import React, { useEffect, useState } from "react";
import Ruta from "./Ruta";
import axios from "axios";
import Footer from "../Footer";

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
    <>
      <div className="w-screen p-4">
        <h2 className="fs-1 fw-bold text-start mx-5 my-2">Rutas</h2>
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
        <div className="flex w-screen flex-row justify-content-between gap-5">
          <button
            onClick={() => setPaginaActual(paginaActual - 1)}
            disabled={paginaActual === 0}
            className="btn btn-rounded mx-4"
            style={{ backgroundColor: "#71ae33" }}
          >
            Anterior
          </button>
          <span className="">
            {paginaActual + 1} de {totalRutas}
          </span>
          <button
            onClick={() => setPaginaActual(paginaActual + 1)}
            disabled={paginaActual >= totalRutas - 1}
            className="btn btn-rounded mx-4"
            style={{ backgroundColor: "#71ae33" }}
          >
            Siguiente
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
}
