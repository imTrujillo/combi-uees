import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

export default function AgregarMotorista({
  tokenAdministrador,
  listaRutas,
  setListaMotoristas,
  listaMotoristas,
}) {
  const [modal, setModal] = useState(false);
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [fotoDePerfil, setFotoDePerfil] = useState("");
  const [estado, setEstado] = useState(true);
  const [ubicación, setUbicación] = useState("");
  const [ruta, setRuta] = useState("");

  const changeUploadImage = async (e) => {
    const file = e.target.files[0];

    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "Presets_combi-uees");

    const response = await axios.post(
      "https://api.cloudinary.com/v1_1/dkgfdrkzb/image/upload",
      data
    );
    setFotoDePerfil(response.data.secure_url);
  };

  function handleSubmitAgregar(e) {
    e.preventDefault();
    if (
      !nombre ||
      !email ||
      !contraseña ||
      !fotoDePerfil ||
      !ubicación ||
      !ruta
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
      name: nombre,
      email: email,
      password: contraseña,
      motoristaURLFotoDePerfil: fotoDePerfil,
      motoristaEstado: estado,
      motoristaUbicación: ubicación,
      IDRuta: parseInt(ruta),
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
  }

  return (
    <>
      <td>
        <button className="btn btn-warning" onClick={() => setModal(true)}>
          Agregar Motorista
        </button>
      </td>
      {modal && (
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
                      placeholder="Nombre completo..."
                      value={nombre}
                      onChange={(e) => setNombre(e.target.value)}
                    />
                  </div>
                </div>
                <div className="col">
                  <label className="form-label">Foto de Perfil</label>
                  <br />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={changeUploadImage}
                  />
                  {fotoDePerfil && (
                    <img src={fotoDePerfil} alt="" style={{ width: "5rem" }} />
                  )}
                </div>
                <div className="row mb-4">
                  <div className="col">
                    <label className="form-label">Correo: </label>
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Crea un correo..."
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="col">
                    <label className="form-label">Contraseña: </label>
                    <input
                      type="password"
                      className="form-control"
                      placeholder="min: 6 caracteres"
                      value={contraseña}
                      onChange={(e) => setContraseña(e.target.value)}
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
                      value={ruta}
                      onChange={(e) => setRuta(e.target.value)}
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
                      value={ubicación}
                      onChange={(e) => setUbicación(e.target.value)}
                    >
                      <option value="" disabled>
                        Ubicación actual del motorista
                      </option>
                      <option value="UEES">UEES</option>
                      {ruta && (
                        <option value={ruta.rutaNombre}>
                          {listaRutas.find((r) => r.rutaID == ruta)
                            ?.rutaNombre || "Ruta no encontrada"}
                        </option>
                      )}
                    </select>
                  </div>
                </div>

                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => setModal(false)}
                  >
                    Cerrar
                  </button>
                  <button type="submit" className="btn btn-success">
                    Guardar
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
