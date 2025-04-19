import React, { useEffect, useState } from "react";
import axios from "axios";
import ActualizarAnuncios from "../components/Anuncios/ActualizarAnuncio";
import ListaMotoristas from "../components/Motoristas/ListaMotoristas";
import ListaRutas from "../components/AdministrarRutas/ListaRutas";
import { FaRegHandPeace } from "react-icons/fa";
import "../../css/administrador.css";
import Loader from "../components/Loader/Loader";

export default function Administrador() {
  const tokenAdministrador = sessionStorage.getItem("tokenAdministrador");
  const [listaMotoristas, setListaMotoristas] = useState([]);
  const [listaRutas, setListaRutas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const apiService = async () => {
      try {
        const responseMotoristas = await axios.get(
          "http://127.0.0.1:8000/api/v1/user",
          {
            headers: { Authorization: `Bearer ${tokenAdministrador}` },
          }
        );
        const responseRutas = await axios.get(
          "http://127.0.0.1:8000/api/v1/rutas",
          {
            headers: { Authorization: `Bearer ${tokenAdministrador}` },
          }
        );
        setListaMotoristas(responseMotoristas.data);
        setListaRutas(responseRutas.data);
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
      <h1 className="mb-5 border-bottom border-3 p-5">
        Bienvenido lord admin
        <FaRegHandPeace className="mx-3" />
      </h1>
      <ListaMotoristas
        setListaMotoristas={setListaMotoristas}
        listaMotoristas={listaMotoristas}
        listaRutas={listaRutas}
        tokenAdministrador={tokenAdministrador}
      />
      <ListaRutas
        setListaRutas={setListaRutas}
        listaRutas={listaRutas}
        tokenAdministrador={tokenAdministrador}
      />
      <ActualizarAnuncios tokenAdministrador={tokenAdministrador} />
    </div>
  );
}
