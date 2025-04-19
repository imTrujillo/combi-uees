import React, { useState, useEffect } from "react";
import ListaViajes from "../components/Viajes/ListaViajes";
import Perfil from "../components/Motoristas/Perfil";
import axios from "axios";
import "../../css/motorista.css";
import Loader from "../components/Loader/Loader";

export default function Viajes() {
  const [listaViajes, setListaViajes] = useState([]);
  const [listaRutas, setListaRutas] = useState([]);
  const [loading, setLoading] = useState(true);

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
      <Perfil listaRutas={listaRutas} setListaRutas={setListaRutas} />

      <ListaViajes
        listaViajes={listaViajes}
        setListaViajes={setListaViajes}
        listaRutas={listaRutas}
        setListaRutas={setListaRutas}
      />
    </div>
  );
}
