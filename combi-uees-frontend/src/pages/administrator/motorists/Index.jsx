import React, { useEffect, useState } from "react";
import AgregarMotorista from "./../../../components/modals/motoristModal";
import Motorista from "./Show";
import boxphoto from "../../../assets/images/caja-vacia.png";
import axios from "axios";
import { useAuth } from "../../session/AuthProvider";
import Pagination from "../../../components/ui/Pagination";
import Loader from "../../../components/Loader/Loader";

export default function Index() {
  const [listaMotoristas, setListaMotoristas] = useState([]);
  const [listaRutas, setListaRutas] = useState([]);
  const [linksMotoristas, setLinksMotoristas] = useState([]);
  const [loading, setLoading] = useState(true);
  const { token } = useAuth();

  const fetchData = async (url = `${import.meta.env.VITE_API_URL}users`) => {
    try {
      const config = { headers: { Authorization: `Bearer ${token}` } };

      const [rutasResponse, motoristasResponse] = await Promise.all([
        axios.get(`${import.meta.env.VITE_API_URL}rutas?paginated=0`, config),
        axios.get(url, config),
      ]);
      setListaRutas(rutasResponse.data);
      setListaMotoristas(motoristasResponse.data.data);
      setLinksMotoristas(motoristasResponse.data.links);
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
    <div>
      <div className="w-100 d-flex flex-sm-column flex-lg-row flex-column justify-content-center align-items-center border-bottom border-2 w-75 mb-4 pb-2">
        <h2 className="text-start logo-text fs-1 mx-5 border-2 ">MOTORISTAS</h2>
        <AgregarMotorista
          token={token}
          listaRutas={listaRutas}
          fetchData={fetchData}
        />
      </div>

      {listaMotoristas.length <= 0 ? (
        <div>
          Aquí aparecerán los motoristas :)
          <br />
          <img src={boxphoto} alt="" style={{ width: "20rem" }} />
        </div>
      ) : (
        <div>
          <div className="table-responsive px-3">
            <table className="table table-striped table-hover">
              <thead className="texto-verde">
                <th>Foto de Perfil</th>
                <th>Nombre</th>
                <th>Email</th>
                <th>Ruta</th>
                <th>Ubicación actual</th>
                <th>Estado</th>
              </thead>
              <tbody>
                {listaMotoristas.map((motorista) => {
                  return (
                    <Motorista
                      key={motorista.id}
                      propIDMotorista={motorista.id}
                      propNombre={motorista.name}
                      propEmail={motorista.email}
                      propFotoDePerfil={motorista.motoristaURLFotoDePerfil}
                      propEstado={motorista.motoristaEstado}
                      propUbicación={motorista.motoristaUbicación}
                      propIDRuta={motorista.IDRuta}
                      propNombreRuta={
                        motorista?.ruta?.rutaNombre ?? "Desconocida"
                      }
                      token={token}
                      listaRutas={listaRutas}
                      fetchData={fetchData}
                    />
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
      {linksMotoristas && (
        <Pagination links={linksMotoristas} onPageChange={fetchData} />
      )}
    </div>
  );
}
