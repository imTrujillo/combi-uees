import ModificarViaje from "../../../components/motorists/trips/ModificarViaje";

export default function Show({
  propNombrePasajero,
  propViajeFecha,
  propViajeDestino,
  propIDRuta,
  propViajeEstado,
  propHorario,
  propNombreRuta,
  token,
  propViajeID,
}) {
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
        propHorario={propHorario}
      />
    </tr>
  );
}
