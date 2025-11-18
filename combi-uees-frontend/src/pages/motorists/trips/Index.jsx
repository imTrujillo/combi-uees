import Viaje from "./Show";
import AgregarViaje from "../../../components/motorists/trips/AgregarViaje";
import boxphoto from "../../../assets/images/caja-vacia.png";
import { useEffect, useState } from "react";
import { useAuth } from "../../session/AuthProvider";
import axios from "axios";
import Loader from "../../../components/Loader/Loader";
import Pagination from "../../../components/ui/Pagination";

export default function Index() {
  const [listaViajes, setListaViajes] = useState([]);
  const [listaRutas, setListaRutas] = useState([]);
  const [linksViajes, setLinksViajes] = useState([]);
  const [loading, setLoading] = useState(true);
  const { token } = useAuth();

  const fetchData = async (url = "http://127.0.0.1:8000/api/viajes") => {
    const config = { headers: { Authorization: `Bearer ${token}` } };
    try {
      const [viajesResponse, rutasResponse] = await Promise.all([
        axios.get(url, config),
        axios.get("http://127.0.0.1:8000/api/rutas?paginated=0", config),
      ]);
      setListaViajes(viajesResponse.data.data);
      setListaRutas(rutasResponse.data);
      setLinksViajes(viajesResponse.data.links);
    } catch (error) {
      console.error("Ocurrió un error:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [listaRutas, listaViajes]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <div>
      <div className="d-flex justify-content-center border-bottom border-2 mx-5 mb-4">
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

      <Pagination links={linksViajes} onPageChange={fetchData} />
    </div>
  );
}
