import React from "react";
import AgregarMotorista from "./AgregarMotorista";
import Motorista from "./Motorista";

export default function ListaMotoristas({
  listaMotoristas,
  listaRutas,
  setListaMotoristas,
  tokenAdministrador,
}) {
  return (
    <div>
      <h2>Motoristas</h2>
      <AgregarMotorista
        tokenAdministrador={tokenAdministrador}
        listaRutas={listaRutas}
        listaMotoristas={listaMotoristas}
        setListaMotoristas={setListaMotoristas}
      />
      <div>
        <div className="table-responsive">
          <table className="table table-striped table-hover">
            <thead>
              <th>Foto de Perfil</th>
              <th>Nombre</th>
              <th>Email</th>
              <th>Ruta</th>
              <th>Ubicación actual</th>
              <th>Estado</th>
            </thead>
            <tbody>
              {listaMotoristas.map((motorista) => {
                const rutaEncontrada = listaRutas.find(
                  (ruta) => ruta.rutaID == motorista.IDRuta
                );
                const nombreRuta = rutaEncontrada
                  ? rutaEncontrada.rutaNombre
                  : "Desconocida";

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
                    propNombreRuta={nombreRuta}
                    tokenAdministrador={tokenAdministrador}
                    listaRutas={listaRutas}
                  />
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
