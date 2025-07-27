import { useEffect, useState } from "react";
import axios from "axios";
import ActualizarAnuncios from "../../components/passengers/adds/ActualizarAnuncio";
import MotoristsIndex from "./motorists/Index";
import BusRoutesIndex from "./bus_routes/Index";
import { FaRegHandPeace } from "react-icons/fa";
import "../../../css/administrador.css";
import Loader from "../../components/Loader/Loader";
import { useAuth } from "../session/AuthProvider";

export default function Index() {
  const [listaMotoristas, setListaMotoristas] = useState([]);
  const [listaRutas, setListaRutas] = useState([]);
  const [loading, setLoading] = useState(true);
  const { token } = useAuth();

  useEffect(() => {
    const apiService = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/v1/rutas");

        setListaRutas(response.data);
        setListaMotoristas(response.data.flatMap((ruta) => ruta.users));
      } catch (error) {
        console.error("Ocurrió un error:", error);
      }
    };
    apiService();
  }, [listaMotoristas, listaRutas]);

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
      <h1 className="text-start logo-text fs-1 mt-2 mx-5 border-2 border-bottom pb-2 mb-4">
        BIENVENIDO ADMIN!
        <FaRegHandPeace className="mx-3" />
      </h1>

      <MotoristsIndex
        setListaMotoristas={setListaMotoristas}
        listaMotoristas={listaMotoristas}
        listaRutas={listaRutas}
        token={token}
      />
      <BusRoutesIndex
        setListaRutas={setListaRutas}
        listaRutas={listaRutas}
        token={token}
      />
      <ActualizarAnuncios token={token} />
    </div>
  );
}
