import React, { useEffect, useState, useLayoutEffect } from "react";
import Ruta from "./Ruta";
import axios from "axios";
import Footer from "../Footer";
import Loader from "../Loader/Loader";
import { GrPrevious, GrNext } from "react-icons/gr";
import boxphoto from "../../assets/caja-vacia.png";

export default function ListaRutas() {
  const [loading, setLoading] = useState(true);
  const [listaRutas, setListaRutas] = useState([]);
  const [paginaActual, setPaginaActual] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/v1/rutas");
        const rutasConBusesDisponibles = response.data.filter(
          (ruta) => ruta.rutaBusesDisponibles > 0
        );
        setListaRutas(rutasConBusesDisponibles);
      } catch (error) {
        console.error("Error al obtener rutas:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Loader />;
  }

  const totalRutas = listaRutas.length;
  const rutaActual = listaRutas[paginaActual];

  return (
    <>
      <div className="w-screen  p-4">
        <h2 className="text-start fs-1 px-4 border-bottom border-2 mb-3 w-75">
          Rutas
        </h2>
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
            <div>
              Aquí aparecerán las rutas :)
              <br />
              <img src={boxphoto} alt="" style={{ width: "20rem" }} />
            </div>
          )}
        </section>
        {totalRutas == 1 ? (
          ""
        ) : (
          <div className="d-flex w-screen flex-sm-column flex-md-row flex-column justify-content-center align-items-center m-3 gap-2 ">
            <button
              onClick={() => setPaginaActual(paginaActual - 1)}
              disabled={paginaActual === 0}
              className="relative btn btn-rounded btn-outline-primary mx-4 "
            >
              <GrPrevious />
              Anterior
            </button>
            <span className="">
              | página {paginaActual + 1} de {totalRutas} |
            </span>
            <button
              onClick={() => setPaginaActual(paginaActual + 1)}
              disabled={paginaActual >= totalRutas - 1}
              className="relative btn btn-rounded btn-outline-primary mx-4"
            >
              Siguiente
              <GrNext />
            </button>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}
