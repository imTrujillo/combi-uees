import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { Switch, Space } from "antd";
import GuardarPerfil from "./GuardarPerfil";
import photo from "../../assets/photo.jpg";
import SwalFireLoading from "../../assets/SwalFireLoading";

export default function Perfil({ listaRutas, setListaRutas }) {
  const [user, setUser] = useState({});
  const [nombre, setNombre] = useState(user.name);
  const [contraseña, setContraseña] = useState("");
  const [fotoPerfil, setFotoPerfil] = useState("");
  const [estado, setEstado] = useState(user.motoristaEstado);
  const [ubicación, setUbicación] = useState(user.motoristaUbicación);
  const [loading, setLoading] = useState(true);
  const id = sessionStorage.getItem("id");
  const tokenMotorista = sessionStorage.getItem("tokenMotorista");
  const tokenAdministrador = sessionStorage.getItem("tokenAdministrador");
  const token = tokenMotorista ? tokenMotorista : tokenAdministrador;

  const handleFotoPerfil = async (e) => {
    const file = e.target.files[0];

    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "Presets_combi-uees");

    const response = await axios.post(
      "https://api.cloudinary.com/v1_1/dkgfdrkzb/image/upload",
      data
    );

    setFotoPerfil(response.data.secure_url);
  };

  useEffect(() => {
    const apiService = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/v1/user/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setUser(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Ocurrió un error:", error);
        setLoading(false);
      }
    };
    if (id && token) apiService();
  }, [id, token]);

  useEffect(() => {
    if (user.name) setNombre(user.name);
    if (user.motoristaEstado != null) setEstado(user.motoristaEstado);
    if (user.motoristaUbicación) setUbicación(user.motoristaUbicación);
  }, [user]);

  const rutaEncontrada = listaRutas.find((ruta) => ruta.rutaID == user.IDRuta);
  const nombreRuta = rutaEncontrada ? rutaEncontrada.rutaNombre : "Desconocida";
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleEstado = async (checked) => {
    SwalFireLoading();
    try {
      axios.patch(
        `http://127.0.0.1:8000/api/v1/user/status/${id}`,
        { motoristaEstado: checked },
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

  if (loading) return <p>Cargando...</p>;

  return (
    <div className="text-lg-start text-sm-center text-center my-4">
      <div className="d-flex flex-sm-column flex-lg-row flex-column align-items-center gap-sm-1 gap-lg-5 gap-1 m-3">
        <h1>Motorista: {user.name}</h1>
        <Space direction="vertical">
          <Switch
            className="custom-toggle"
            checked={!estado}
            checkedChildren="Activo"
            unCheckedChildren="Inactivo"
            onChange={(checked) => handleEstado(!checked)}
          />
        </Space>
      </div>
      <h2 className="px-4">Ruta: {nombreRuta}</h2>
      <div className="mt-5">
        <h2 className="text-center">Editar Perfil</h2>
      </div>

      <form action="" onSubmit={handleSubmit} className="text-start p-3">
        <div className="row mb-4">
          <div className="col-sm-12 col-lg-4 col-12">
            <div
              data-mdb-input-init
              className="form-outline  d-flex flex-column justify-content-center align-items-center gap-2"
            >
              <img
                src={user.motoristaURLFotoDePerfil}
                className="border border-3 object-fit-cover"
                alt=""
                style={{ width: "15rem", height: "15rem" }}
                onError={(e) => (e.target.src = photo)}
              />
              <input
                type="file"
                className="form-control w-50"
                accept="image/*"
                onChange={handleFotoPerfil}
              />
            </div>
          </div>

          <div className="col">
            <div data-mdb-input-init className="form-outline">
              <label className="form-label" htmlFor="form6Example1">
                Nombre de usuario
              </label>
              <input
                type="text"
                id="form6Example1"
                value={nombre}
                className="form-control"
                placeholder="Type here..."
                onChange={(e) => setNombre(e.target.value)}
              />
            </div>
            <div data-mdb-input-init className="form-outline">
              <label className="form-label" htmlFor="form6Example2">
                Contraseña
              </label>
              <input
                type="password"
                id="form6Example2"
                value={contraseña}
                className="form-control"
                placeholder="Type here..."
                onChange={(e) => setContraseña(e.target.value)}
              />
            </div>
            <br />
            <div className="col">
              <div className="form-outline">
                <label className="form-label">Ubicación del motorista</label>
                <select
                  className="form-control"
                  value={ubicación}
                  onChange={(e) => setUbicación(e.target.value)}
                >
                  <option value="UEES">UEES</option>
                  <option value={nombreRuta}>{nombreRuta}</option>
                </select>
              </div>
            </div>
            <br />
            <GuardarPerfil
              id={id}
              nombre={nombre}
              contraseña={contraseña}
              fotoPerfil={fotoPerfil}
              estado={estado}
              ubicación={ubicación}
              ruta={rutaEncontrada.rutaID}
              token={token}
            />
          </div>
        </div>
      </form>
    </div>
  );
}
