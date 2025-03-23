import React from "react";
import ModificarRuta from "./ModificarRuta";
import ModificarHorario from "./ModificarHorario";

export default function Ruta({
  propIDRuta,
  propNombre,
  propBusesDisponibles,
  propBusesTotales,
  propLatitud,
  propLongitud,
  tokenAdministrador,
  listaRutas,
}) {
  return (
    <tr>
      <td>{propNombre}</td>
      <ModificarHorario
        propIDRuta={propIDRuta}
        propNombre={propNombre}
        tokenAdministrador={tokenAdministrador}
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
        tokenAdministrador={tokenAdministrador}
        listaRutas={listaRutas}
      />
    </tr>
  );
}
