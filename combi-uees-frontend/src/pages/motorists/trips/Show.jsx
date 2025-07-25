import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import ModificarViaje from "../../../components/motorists/trips/ModificarViaje";

export default function Show({
  propNombrePasajero,
  propViajeFecha,
  propViajeDestino,
  propIDRuta,
  propViajeEstado,
  propNombreRuta,
  token,
  propViajeID,
}) {
  const [horasHorario, setHorasHorario] = useState([]);

  useEffect(() => {
    const apiService = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/v1/horarios/horas/${propIDRuta}`
        );

        const horasOrdenadas = response.data.sort((a, b) =>
          a.horaSalida.localeCompare(b.horaSalida)
        );
        setHorasHorario(horasOrdenadas);
      } catch (error) {
        console.error("Ocurrió un error:", error);
      }
    };
    apiService();
  }, []);

  return (
    <tr>
      <td>{propNombrePasajero}</td>
      <td>{propViajeFecha}</td>
      <td>{propNombreRuta}</td>
      <td>{propViajeDestino}</td>
      <td>{propViajeEstado === 0 ? "Completado" : "Pendiente"}</td>
      <ModificarViaje
        propNombrePasajero={propNombrePasajero}
        propViajeFecha={propViajeFecha}
        propViajeDestino={propViajeDestino}
        propViajeEstado={Boolean(propViajeEstado)}
        propNombreRuta={propNombreRuta}
        propIDRuta={propIDRuta}
        token={token}
        propViajeID={propViajeID}
        horasHorario={horasHorario}
      />
    </tr>
  );
}
