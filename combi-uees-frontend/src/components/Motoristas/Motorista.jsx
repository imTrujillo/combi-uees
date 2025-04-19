import React from "react";
import ModificarMotorista from "./ModificarMotorista";
import photo from "../../assets/photo.jpg";

export default function Motorista({
  propIDMotorista,
  propNombre,
  propEmail,
  propFotoDePerfil,
  propEstado,
  propUbicación,
  propIDRuta,
  propNombreRuta,
  tokenAdministrador,
  listaRutas,
}) {
  return (
    <tr>
      <td>
        <img
          src={propFotoDePerfil}
          className="object-fit-cover"
          style={{ width: "4rem", height: "4rem" }}
          alt=""
          onError={(e) => (e.target.src = photo)}
        />
      </td>
      <td>{propNombre}</td>
      <td>{propEmail}</td>
      <td>{propNombreRuta}</td>
      <td>{propUbicación}</td>
      <ModificarMotorista
        propIDMotorista={propIDMotorista}
        propNombre={propNombre}
        propFotoDePerfil={propFotoDePerfil}
        propEstado={propEstado}
        propUbicación={propUbicación}
        propNombreRuta={propNombreRuta}
        propIDRuta={propIDRuta}
        tokenAdministrador={tokenAdministrador}
        listaRutas={listaRutas}
      />
    </tr>
  );
}
