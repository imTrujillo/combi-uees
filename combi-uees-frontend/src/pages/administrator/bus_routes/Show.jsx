import React from "react";
import ModificarRuta from "../../../components/administrator/bus_routes/ModificarRuta";
import ModificarHorario from "../../../components/administrator/bus_routes/ModificarHorario";

export default function Show({
  propIDRuta,
  propNombre,
  propBusesDisponibles,
  propBusesTotales,
  propLatitud,
  propLongitud,
  token,
  listaRutas,
}) {
  return (
    <tr>
      <td>{propNombre}</td>
      <ModificarHorario
        propIDRuta={propIDRuta}
        propNombre={propNombre}
        token={token}
      />
      <td>{propBusesDisponibles}</td>
      <td>{propBusesTotales}</td>
      <td>{propLatitud}</td>
      <td>{propLongitud}</td>
      <ModificarRuta
        propIDRuta={propIDRuta}
        propNombre={propNombre}
        propLatitud={propLatitud}
        propLongitud={propLongitud}
        token={token}
        listaRutas={listaRutas}
      />
    </tr>
  );
}
