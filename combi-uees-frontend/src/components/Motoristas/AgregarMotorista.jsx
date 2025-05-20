import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { MdAddCircle } from "react-icons/md";
import "../../../css/modal.css";
import photo from "../../assets/default.jpg";

export default function AgregarMotorista({
  tokenAdministrador,
  listaRutas,
  setListaMotoristas,
  listaMotoristas,
}) {
  const [modal, setModal] = useState(false);
  const [nombreAgregar, setNombreAgregar] = useState("");
  const [emailAgregar, setEmailAgregar] = useState("");
  const [contraseñaAgregar, setContraseñaAgregar] = useState("");
  const [fotoDePerfilAgregar, setFotoDePerfilAgregar] = useState("");
  const [estadoAgregar, setEstadoAgregar] = useState(true);
  const [ubicaciónAgregar, setUbicaciónAgregar] = useState("");
  const [rutaAgregar, setRutaAgregar] = useState("");

  const changeUploadImage = async (e) => {
    const file = e.target.files[0];

    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "Presets_combi-uees");

    const response = await axios.post(
      "https://api.cloudinary.com/v1_1/dkgfdrkzb/image/upload",
      data
    );
    setFotoDePerfilAgregar(response.data.secure_url);
  };

  function handleSubmitAgregar(e) {
    e.preventDefault();
    if (
      !nombreAgregar ||
      !emailAgregar ||
      !contraseñaAgregar ||
      !fotoDePerfilAgregar ||
      !ubicaciónAgregar ||
      !rutaAgregar
    ) {
      Swal.fire(
        "Error",
        "Debes ingresar todos los campos del formulario.",
        "error"
      );
      return;
    }
    Swal.fire({
      title: "Por favor espere...",
      allowOutsideClick: false,
      allowEscapeKey: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });
    const nuevoMotorista = {
      name: nombreAgregar,
      email: emailAgregar,
      password: contraseñaAgregar,
      motoristaURLFotoDePerfil: fotoDePerfilAgregar,
      motoristaEstado: estadoAgregar,
      motoristaUbicación: ubicaciónAgregar,
      IDRuta: parseInt(rutaAgregar),
    };

    axios
      .post("http://127.0.0.1:8000/api/v1/user", nuevoMotorista, {
        headers: { Authorization: `Bearer ${tokenAdministrador}` },
      })
      .then(() => {
        Swal.fire("Éxito", "El motorista se ha guardado.", "success")
          .then(() => {
            setModal(false);
          })
          .catch(() => {
            Swal.fire("Error", "No se pudo guardar el motorista.", "error");
          });
      });

    setNombreAgregar("");
    setEmailAgregar("");
    setContraseñaAgregar("");
    setFotoDePerfilAgregar("");
    setEstadoAgregar(true);
    setUbicaciónAgregar("");
    setRutaAgregar("");
  }

  return (
    <>
      <td>
        <button
          className=" d-flex align-items-center px-5 gap-2 text-white btn-verde btn-light-shadow"
          onClick={() => setModal(true)}
        >
          <MdAddCircle className="fs-3" />
          Motorista
        </button>
      </td>
      {modal && (
        <>
          <div className="modal-backdrop-blur"></div>
          <div className="modal fade show d-block" tabIndex="-1">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h1 className="modal-title fs-5">Agregar Motorista</h1>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setModal(false)}
                  />
                </div>
                <form className="p-4 text-start" onSubmit={handleSubmitAgregar}>
                  <div className="row mb-4">
                    <div className="col">
                      <label className="form-label">Nombre del motorista</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Juan Diego Santi"
                        value={nombreAgregar}
                        onChange={(e) => setNombreAgregar(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="d-flex flex-column align-items-start my-3">
                    <label>Foto de Perfil</label>
                    <div
                      className="border border-3 m-2"
                      style={{ width: "7rem", height: "7rem" }}
                    >
                      <img
                        src={fotoDePerfilAgregar ? fotoDePerfilAgregar : photo}
                        onError={(e) => (e.target.src = photo)}
                        alt="foto motorista"
                        style={{ width: "7rem", height: "7rem" }}
                        className="shadow-lg object-fit-cover"
                      />
                    </div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={changeUploadImage}
                    />
                  </div>

                  <div className="row mb-4">
                    <div className="col">
                      <label className="form-label">Correo: </label>
                      <input
                        type="email"
                        className="form-control"
                        placeholder="juan@example.com"
                        value={emailAgregar}
                        onChange={(e) => setEmailAgregar(e.target.value)}
                      />
                    </div>
                    <div className="col">
                      <label className="form-label">Contraseña: </label>
                      <input
                        type="password"
                        className="form-control"
                        placeholder="min: 6 caracteres"
                        value={contraseñaAgregar}
                        onChange={(e) => setContraseñaAgregar(e.target.value)}
                        minLength="6"
                        required
                      />
                    </div>
                  </div>
                  <div className="row mb-4">
                    <div className="col">
                      <label className="form-label">Ruta</label>
                      <select
                        className="form-control"
                        value={rutaAgregar}
                        onChange={(e) => setRutaAgregar(e.target.value)}
                      >
                        <option value="" disabled>
                          Elige una ruta
                        </option>
                        {listaRutas.map((ruta) => (
                          <option key={ruta.rutaID} value={ruta.rutaID}>
                            {ruta.rutaNombre}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="col">
                      <label className="form-label">
                        Ubicación del Motorista
                      </label>
                      <select
                        className="form-control"
                        value={ubicaciónAgregar}
                        onChange={(e) => setUbicaciónAgregar(e.target.value)}
                      >
                        <option value="" disabled>
                          Ubicación actual
                        </option>
                        <option value="UEES">UEES</option>
                        {rutaAgregar && (
                          <option value={rutaAgregar.rutaNombre}>
                            {listaRutas.find((r) => r.rutaID == rutaAgregar)
                              ?.rutaNombre || "Ruta no encontrada"}
                          </option>
                        )}
                      </select>
                    </div>
                  </div>

                  <div className="modal-footer d-flex flex-row gap-3 justify-content-center">
                    <button
                      type="button"
                      className="btn-cancelar"
                      onClick={() => setModal(false)}
                    >
                      Cerrar
                    </button>
                    <button type="submit" className="btn-guardar">
                      Guardar
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
