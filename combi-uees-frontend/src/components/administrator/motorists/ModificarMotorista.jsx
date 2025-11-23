import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { Switch, Space } from "antd";
import SwalFireLoading from "../../../assets/SwalFireLoading";
import "../../../../css/modal.css";
import { createPortal } from "react-dom";
import { RiEditCircleFill } from "react-icons/ri";
import { MdDeleteForever } from "react-icons/md";

import photo from "../../../assets/images/photo.jpg";

export default function ModificarMotorista({
  propIDMotorista,
  propNombre,
  propFotoDePerfil,
  propEstado,
  propUbicación,
  propIDRuta,
  token,
  listaRutas,
  fetchData,
}) {
  const [modal, setModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [nombre, setNombre] = useState(propNombre);
  const [contraseña, setContraseña] = useState("");
  const [fotoDePerfil, setFotoDePerfil] = useState(propFotoDePerfil);
  const [estado, setEstado] = useState(propEstado);
  const [ubicación, setUbicación] = useState(propUbicación);
  const [ruta, setRuta] = useState(propIDRuta);

  const changeUploadImage = async (e) => {
    setLoading(true);
    const file = e.target.files[0];

    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "Presets_combi-uees");

    const response = await axios.post(
      "https://api.cloudinary.com/v1_1/dkgfdrkzb/image/upload",
      data
    );

    setFotoDePerfil(response.data.secure_url);
    setLoading(false);
  };

  function handleSubmitEditar(e) {
    e.preventDefault();
    SwalFireLoading();

    const data = {
      name: nombre,
      password: contraseña,
      motoristaURLFotoDePerfil: fotoDePerfil,
      motoristaEstado: estado,
      motoristaUbicación: ubicación,
      IDRuta: ruta,
    };

    const motoristaEditado = Object.fromEntries(
      Object.entries(data).filter(
        ([_, value]) => value !== null && value !== "" && value !== undefined
      )
    );

    axios
      .put(
        `${import.meta.env.VITE_API_URL}users/${propIDMotorista}`,
        motoristaEditado,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then(() => {
        Swal.fire("Éxito", "El motorista se ha actualizado.", "success");
        fetchData();
        setModal(false);
      })
      .catch((error) => {
        Swal.fire("Error", "No se pudo actualizar el motorista.", "error");
        console.error("Ocurrió un error:", error);
      });
  }

  const handleEstado = async (checked) => {
    SwalFireLoading();
    try {
      axios.put(
        `${import.meta.env.VITE_API_URL}users/${propIDMotorista}`,
        { motoristaEstado: checked, IDRuta: ruta },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setEstado(checked);
      Swal.close();
    } catch (error) {
      console.error("Ocurrió un error:", error);
      Swal.close();
    }
  };

  function handleEliminar(e) {
    e.preventDefault();
    Swal.fire({
      title: "Eliminar motorista",
      text: "¿Deseas eliminar este motorista?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, bórralo",
      cancelButtonText: "Cancelar",
      buttonsStyling: false,
      customClass: {
        confirmButton: "rojo btn-guardar mx-3 py-2 px-4 rounded",
        cancelButton: "azul btn-guardar mx-3 py-2 px-4 rounded",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        SwalFireLoading();
        axios
          .delete(`${import.meta.env.VITE_API_URL}users/${propIDMotorista}`, {
            headers: { Authorization: `Bearer ${token}` },
          })
          .then(() => {
            Swal.fire("Eliminado", "El motorista ha sido borrado.", "success");
          })
          .catch(() => {
            Swal.fire(
              "¡Error!",
              "Ocurrió un problema al eliminar el motorista.",
              "error"
            );
          });
      }
    });
  }

  return (
    <>
      <td>
        <Space size="200" direction="vertical">
          <Switch
            className="btn-light-shadow"
            checked={!estado}
            checkedChildren="Activo"
            unCheckedChildren="Inactivo"
            onChange={(checked) => handleEstado(!checked)}
          />
        </Space>
      </td>
      <td>
        <button
          className="btn btn-warning rounded-circle amarillo btn-light-shadow"
          style={{ width: "3rem", height: "3rem" }}
          onClick={() => setModal(true)}
        >
          <RiEditCircleFill className="fs-4" />
        </button>
      </td>

      <td>
        <button
          onClick={handleEliminar}
          className="btn btn-danger rounded-circle btn-light-shadow"
          style={{ width: "3rem", height: "3rem" }}
        >
          <MdDeleteForever className="fs-4" />
        </button>
      </td>

      {modal &&
        createPortal(
          <>
            <div className="modal-backdrop-blur"></div>
            <div className="modal fade show d-block" tabIndex="-1">
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <h1 className="modal-title fs-5">Editar "{propNombre}"</h1>
                    <button
                      type="button"
                      className="btn-close"
                      onClick={() => setModal(false)}
                    />
                  </div>
                  <form
                    className="p-4 text-start"
                    onSubmit={handleSubmitEditar}
                  >
                    <div className="row mb-4">
                      <div className="col">
                        <label className="form-label">
                          Nombre del motorista
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Juan Diego Santi"
                          value={nombre}
                          onChange={(e) => setNombre(e.target.value)}
                        />
                      </div>
                      <div className="col">
                        <label className="form-label">Contraseña</label>
                        <input
                          type="password"
                          className="form-control"
                          placeholder="Min: 6 caracteres"
                          value={contraseña}
                          onChange={(e) => setContraseña(e.target.value)}
                          minLength="6"
                        />
                      </div>
                    </div>

                    {loading ? (
                      <div
                        class="spinner-border text-danger m-5"
                        style={{ width: "120px", height: "120px" }}
                        role="status"
                      ></div>
                    ) : (
                      <div className="d-flex flex-column align-items-start my-3">
                        <label>Foto de Perfil</label>
                        <div
                          className="border border-3 m-2"
                          style={{ width: "7rem", height: "7rem" }}
                        >
                          <img
                            src={fotoDePerfil ? fotoDePerfil : photo}
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
                    )}

                    <div className="col">
                      <label className="form-label">Ruta</label>
                      <select
                        className="form-control"
                        value={ruta}
                        onChange={(e) => setRuta(e.target.value)}
                      >
                        {listaRutas.map((ruta) => (
                          <option key={ruta.rutaID} value={ruta.rutaID}>
                            {ruta.rutaNombre}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="col">
                      <label className="form-label">Ubicación</label>
                      <select
                        className="form-control"
                        value={ubicación}
                        onChange={(e) => setUbicación(e.target.value)}
                      >
                        <option value="Universidad">Universidad</option>
                        {ruta && (
                          <option
                            value={
                              listaRutas.find((r) => r.rutaID == ruta)
                                ?.rutaNombre
                            }
                          >
                            {listaRutas.find((r) => r.rutaID == ruta)
                              ?.rutaNombre || "Ruta no encontrada"}
                          </option>
                        )}
                      </select>
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
          </>,
          document.getElementById("modal-root")
        )}
    </>
  );
}
