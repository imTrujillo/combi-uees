import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../routes/Sidebar";
import ActualizarAnuncios from "../components/Anuncios/ActualizarAnuncio";
import ListaMotoristas from "../components/Motoristas/ListaMotoristas";
import ListaRutas from "../components/AdministrarRutas/ListaRutas";
import "../../css/administrador.css";

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
        setLoading(false);
      } catch (error) {
        console.error("Ocurrió un error:", error);
        setLoading(false);
      }
    };
    apiService();
  }, [listaMotoristas, listaRutas]);

  if (loading) {
    return <div>Cargando...</div>;
  }

  return (
    <div>
      <h1>¡¡Bienvenido admin!!</h1>
      <ActualizarAnuncios tokenAdministrador={tokenAdministrador} />
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
    </div>
  );
}
