import React, { useEffect, useState } from "react";
import Reservar from "./Reservar";
import Gráficas from "./Gráficas";
import Horarios from "./Horarios";
import Mapas from "./Mapas";
import axios from "axios";

export default function Ruta({
  propRutaNombre,
  propRutaBusesDisponibles,
  propRutaBusesTotales,
  propLatitud,
  propLongitud,
  propViajeFecha,
  propRutaID,
  propViajeDestino,
}) {
  const [listaBusesUbicación, setListaBusesUbicación] = useState([]);
  const [horasHorario, setHorasHorario] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const apiService = async () => {
      try {
        const listaBusesResponse = await axios.get(
          `http://127.0.0.1:8000/api/v1/rutas/ubicacion/${propRutaID}`
        );
        const listaHorariosResponse = await axios.get(
          `http://127.0.0.1:8000/api/v1/horarios/horas/${propRutaID}`
        );
        setListaBusesUbicación(listaBusesResponse.data);
        const horasOrdenadas = listaHorariosResponse.data.sort((a, b) =>
          a.horaSalida.localeCompare(b.horaSalida)
        );
        setHorasHorario(horasOrdenadas);
        setLoading(false);
      } catch (error) {
        console.error("Ocurrió un error:", error);
        setLoading(false);
      }
    };
    apiService();
  }, []);

  if (loading) {
    return <div>Cargando...</div>;
  }

  return (
    <section
      className={
        propRutaBusesDisponibles > 0
          ? "d-flex flex-column flex-lg-row gap-5 px-0 "
          : "d-none"
      }
    >
      <div className="col">
        <h2 className="text-sm-center text-lg-start">{propRutaNombre}</h2>
        <Mapas
          propRutaNombre={propRutaNombre}
          propLatitud={propLatitud}
          propLongitud={propLongitud}
        />
        <Reservar
          propRutaNombre={propRutaNombre}
          propViajeDestino={propViajeDestino}
          propViajeFecha={propViajeFecha}
          propRutaID={propRutaID}
          horasHorario={horasHorario}
        />
      </div>
      <div className="col">
        {horasHorario.length > 0 ? (
          <div>
            <h2>Horarios</h2>
            <div className="table-responsive">
              <table className="table table-striped table-hover">
                <thead>
                  <tr>
                    <th className="table-warning">Hora</th>
                  </tr>
                </thead>
                <tbody>
                  {horasHorario.map((hora) => (
                    <Horarios key={hora.id} propHora={hora.horaSalida} />
                  ))}
                </tbody>
              </table>
            </div>{" "}
          </div>
        ) : (
          ""
        )}

        <h2 className="mt-sm-5 mt-lg-0 mt-5">Disponibilidad de buses</h2>
        <Gráficas
          propBusesDisponibles={propRutaBusesDisponibles}
          propBusesTotales={propRutaBusesTotales}
          listaBusesUbicación={listaBusesUbicación}
          propRutaNombre={propRutaNombre}
        />
      </div>
    </section>
  );
}
