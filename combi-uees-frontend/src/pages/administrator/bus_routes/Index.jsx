import React, { useEffect, useState } from "react";
import Ruta from "./Show";
import boxphoto from "../../../assets/images/caja-vacia.png";
import AgregarRuta from "../../../components/administrator/bus_routes/AgregarRuta";
import axios from "axios";
import { useAuth } from "../../session/AuthProvider";
import Pagination from "../../../components/ui/Pagination";
import Loader from "../../../components/Loader/Loader";

export default function Index() {
  const [listaRutas, setListaRutas] = useState([]);
  const [linksRutas, setLinksRutas] = useState([]);
  const [loading, setLoading] = useState(true);
  const { token } = useAuth();

  const fetchData = async (url = `${import.meta.env.VITE_API_URL}rutas`) => {
    try {
      const response = await axios.get(url + "?isAuth=1");

      setListaRutas(response.data.data);
      setLinksRutas(response.data.links);
    } catch (error) {
      console.error("Ocurrió un error:", error);
    }
  };

  useEffect(() => {
    fetchData();
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Loader />;
  }
  return (
    <div className="mt-4">
      <div className="w-100 d-flex flex-sm-column flex-lg-row flex-column justify-content-center align-items-center border-bottom border-2 w-75 mb-4 pb-2">
        <h2 className="text-start logo-text fs-1 mx-5 border-2 ">RUTAS</h2>
        <AgregarRuta token={token} />
      </div>

      <div>
        {listaRutas.length <= 0 ? (
          <div>
            Aquí aparecerán las rutas :)
            <br />
            <img src={boxphoto} alt="" style={{ width: "20rem" }} />
          </div>
        ) : (
          <div className="table-responsive px-3">
            <table className="table table-striped table-hover">
              <thead className="texto-verde">
                <th>Nombre</th>
                <th>Horarios</th>
                <th>Buses Disponibles</th>
                <th>Buses Totales</th>
                <th>Latitud (Ubicación)</th>
                <th>Longitud (Ubicación)</th>
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
                      token={token}
                    />
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
      {linksRutas && <Pagination links={linksRutas} onPageChange={fetchData} />}
    </div>
  );
}
