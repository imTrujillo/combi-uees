import React from "react";
import ModificarMotorista from "../../../components/administrator/motorists/ModificarMotorista";
import photo from "../../../assets/images/photo.jpg";

export default function Show({
  propIDMotorista,
  propNombre,
  propEmail,
  propFotoDePerfil,
  propEstado,
  propUbicación,
  propIDRuta,
  propNombreRuta,
  token,
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
        token={token}
        listaRutas={listaRutas}
      />
    </tr>
  );
}
