import React, { useState, useEffect } from "react";
import TripsIndex from "./trips/Index";
import Perfil from "../../components/administrator/motorists/Perfil";
import axios from "axios";
import "../../../css/motorista.css";
import Loader from "../../components/Loader/Loader";
import { useAuth } from "../session/AuthProvider";

export default function Index() {
  const [listaViajes, setListaViajes] = useState([]);
  const [listaRutas, setListaRutas] = useState([]);
  const [loading, setLoading] = useState(true);
  const { token, rol } = useAuth();

  useEffect(() => {
    const apiService = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/v1/rutas");
        setListaRutas(response.data);
      } catch (error) {
        console.error("Ocurrió un error:", error);
      }
    };
    apiService();
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

  return (
    <div>
      {rol !== "administrador" && (
        <Perfil listaRutas={listaRutas} setListaRutas={setListaRutas} />
      )}

      <TripsIndex
        listaViajes={listaViajes}
        setListaViajes={setListaViajes}
        listaRutas={listaRutas}
        setListaRutas={setListaRutas}
        token={token}
      />
    </div>
  );
}
