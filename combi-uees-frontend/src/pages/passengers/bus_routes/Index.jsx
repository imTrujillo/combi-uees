import React, { useEffect, useState } from "react";
import Ruta from "./Show";
import axios from "axios";
import Footer from "../../../assets/Footer";
import Loader from "../../../components/Loader/Loader";
import boxphoto from "../../../assets/images/caja-vacia.png";
import Pagination from "../../../components/ui/Pagination";

export default function Index() {
  const [loading, setLoading] = useState(true);
  const [listaRutas, setListaRutas] = useState([]);
  const [links, setLinks] = useState([]);

  const fetchData = async (url = `${import.meta.env.VITE_API_URL}rutas`) => {
    try {
      const response = await axios.get(url);
      setLinks(response.data.links);
      setListaRutas(response.data.data);
    } catch (error) {
      console.error("Error al obtener rutas:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <div className="w-screen p-4">
        <h2 className="text-start logo-text fs-1 mx-5 border-bottom border-2 mb-3">
          RUTAS
        </h2>
        <section>
          {listaRutas.length >= 1 ? (
            listaRutas.map((ruta) => (
              <Ruta
                key={ruta.rutaID}
                propRutaNombre={ruta.rutaNombre}
                propRutaBusesDisponibles={ruta.rutaBusesDisponibles}
                propRutaBusesTotales={ruta.rutaBusesTotales}
                propLatitud={ruta.rutaLatitud}
                propLongitud={ruta.rutaLongitud}
                propViajeFecha={ruta.viajeFecha}
                propRutaID={ruta.rutaID}
                propViajeDestino={ruta.viajeDestino}
                propMotoristasRuta={ruta.motoristasRuta}
                propMotoristasUEES={ruta.motoristasUEES}
              />
            ))
          ) : (
            <div>
              Aquí aparecerán las rutas :)
              <br />
              <img src={boxphoto} alt="" style={{ width: "20rem" }} />
            </div>
          )}
        </section>
        {links && <Pagination links={links} onPageChange={fetchData} />}
      </div>
      <Footer />
    </>
  );
}
