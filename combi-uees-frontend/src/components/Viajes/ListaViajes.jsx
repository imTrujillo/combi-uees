import React, { useEffect, useState } from "react";
import axios from "axios";
import Viaje from "./Viaje";
import AgregarViaje from "./AgregarViaje";
import boxphoto from "../../assets/caja-vacia.png";

export default function ListaViajes({
  listaViajes,
  setListaViajes,
  listaRutas,
  setListaRutas,
}) {
  const [loading, setLoading] = useState(true);
  const tokenMotorista = sessionStorage.getItem("tokenMotorista");

  useEffect(() => {
    const apiService = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/v1/viajes`,
          {
            headers: {
              Authorization: `Bearer ${tokenMotorista}`,
            },
          }
        );

        setListaViajes(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Ocurrió un error:", error);
        setLoading(false);
      }
    };
    apiService();
  }, [listaViajes]);

  if (loading) {
    return <div>Cargando...</div>;
  }
  return (
    <div>
      <div className="d-flex border-bottom border-2 w-75 mb-4">
        <h2 className="text-start px-4 mb-3 w-75">Viajes</h2>
        <AgregarViaje
          tokenMotorista={tokenMotorista}
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
                      propViajeID={viaje.viajeID}
                      tokenMotorista={tokenMotorista}
                    />
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
