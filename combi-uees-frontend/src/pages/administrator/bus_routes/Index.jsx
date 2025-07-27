import Ruta from "./Show";
import boxphoto from "../../../assets/images/caja-vacia.png";
import AgregarRuta from "../../../components/administrator/bus_routes/AgregarRuta";

export default function Index({ token, listaRutas, setListaRutas }) {
  return (
    <div className="mt-4">
      <div className="w-100 d-flex flex-sm-column flex-lg-row flex-column justify-content-center align-items-center border-bottom border-2 w-75 mb-4 pb-2">
        <h2 className="text-start logo-text fs-1 mx-5 border-2 ">RUTAS</h2>
        <AgregarRuta
          token={token}
          listaRutas={listaRutas}
          setListaRutas={setListaRutas}
        />
      </div>

      <div>
        {listaRutas.length <= 0 ? (
          <div>
            Aquí aparecerán las rutas :)
            <br />
            <img src={boxphoto} alt="" style={{ width: "20rem" }} />
          </div>
        ) : (
          <div className="table-responsive px-3">
            <table className="table table-striped table-hover">
              <thead className="texto-verde">
                <th>Nombre</th>
                <th>Horarios</th>
                <th>Buses Disponibles</th>
                <th>Buses Totales</th>
                <th>Latitud (Ubicación)</th>
                <th>Longitud (Ubicación)</th>
              </thead>
              <tbody>
                {listaRutas.map((ruta) => {
                  return (
                    <Ruta
                      key={ruta.id}
                      propIDRuta={ruta.rutaID}
                      propNombre={ruta.rutaNombre}
                      propBusesDisponibles={ruta.rutaBusesDisponibles}
                      propBusesTotales={ruta.rutaBusesTotales}
                      propLatitud={ruta.rutaLatitud}
                      propLongitud={ruta.rutaLongitud}
                      token={token}
                      listaRutas={listaRutas}
                    />
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
