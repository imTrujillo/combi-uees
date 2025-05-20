import React from "react";
import AgregarMotorista from "./AgregarMotorista";
import Motorista from "./Motorista";
import boxphoto from "../../assets/caja-vacia.png";

export default function ListaMotoristas({
  listaMotoristas,
  listaRutas,
  setListaMotoristas,
  tokenAdministrador,
}) {
  return (
    <div>
      <div className="w-100 d-flex flex-sm-column flex-lg-row flex-column justify-content-center align-items-center border-bottom border-2 w-75 mb-4 pb-2">
        <h2 className="text-start logo-text fs-1 mx-5 border-2 ">MOTORISTAS</h2>
        <AgregarMotorista
          tokenAdministrador={tokenAdministrador}
          listaRutas={listaRutas}
          listaMotoristas={listaMotoristas}
          setListaMotoristas={setListaMotoristas}
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
      )}
    </div>
  );
}
