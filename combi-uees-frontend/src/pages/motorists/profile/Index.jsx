import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { Switch, Space } from "antd";
import photo from "../../../assets/images/photo.jpg";
import SwalFireLoading from "../../../assets/SwalFireLoading";
import { useAuth } from "../../session/AuthProvider";
import GuardarPerfil from "../../../components/administrator/motorists/GuardarPerfil";

export default function Index() {
  const { user, token } = useAuth();
  const [nombre, setNombre] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [fotoPerfil, setFotoPerfil] = useState("");
  const [estado, setEstado] = useState(false);
  const [ubicación, setUbicación] = useState("");
  const [rutaNombre, setRutaNombre] = useState("");
  const [loading, setLoading] = useState(true);

  const handleFotoPerfil = async (e) => {
    setLoading(true);
    const file = e.target.files[0];

    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "Presets_combi-uees");

    const response = await axios.post(
      "https://api.cloudinary.com/v1_1/dkgfdrkzb/image/upload",
      data
    );

    setFotoPerfil(response.data.secure_url);
    setLoading(false);
  };

  const apiService = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}users/${user.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setNombre(response.data.name);
      setEstado(response.data.motoristaEstado);
      setUbicación(response.data.motoristaUbicación);
      setFotoPerfil(response.data.motoristaURLFotoDePerfil);
      setRutaNombre(response.data.ruta.rutaNombre);
      setLoading(false);
    } catch (error) {
      console.error("Ocurrió un error:", error);
      setLoading(false);
    }
  };
  useEffect(() => {
    apiService();
  }, []);

  const handleEstado = async (checked) => {
    SwalFireLoading();
    try {
      axios.put(
        `${import.meta.env.VITE_API_URL}users/${user.id}`,
        { motoristaEstado: checked, IDRuta: user.IDRuta },
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

  if (loading)
    return (
      <div
        class="spinner-border text-success m-5"
        style={{ width: "120px", height: "120px" }}
        role="status"
      ></div>
    );

  return (
    <div className="text-lg-start text-sm-center text-center my-4">
      <div className="d-flex flex-sm-column flex-lg-row flex-column align-items-center justify-content-lg-between border-bottom border-2 pb-5">
        <div className=" mx-5 text-center text-lg-start">
          <h2 className="logo-text fs-1 ">MOTORISTA: {nombre}</h2>
          <h2 className="px-4">Ruta: {rutaNombre}</h2>
        </div>

        <Space direction="vertical px-5 py-3">
          <Switch
            className="custom-toggle btn-light-shadow"
            checked={!estado}
            checkedChildren="Activo"
            unCheckedChildren="Inactivo"
            onChange={(checked) => handleEstado(!checked)}
          />
        </Space>
      </div>

      <div className="mt-4">
        <h2 className="text-center">Editar Perfil</h2>
      </div>

      <form action="" className="text-start p-3">
        <div className="row mb-4">
          <div className="col-sm-12 col-lg-4 col-12 mb-4">
            <div
              data-mdb-input-init
              className="form-outline  d-flex flex-column justify-content-center align-items-center gap-2"
            >
              <img
                src={fotoPerfil}
                className="border border-3 object-fit-cover"
                alt=""
                style={{ width: "15rem", height: "15rem" }}
                onError={(e) => (e.target.src = photo)}
              />
              <input
                type="file"
                className="form-control w-75 btn-light-shadow"
                accept="image/*"
                onChange={handleFotoPerfil}
              />
            </div>
          </div>

          <div className="col">
            <div data-mdb-input-init className="form-outline">
              <label className="form-label" htmlFor="form6Example1">
                Nombre
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
                  <option value={rutaNombre ?? "Ruta desconocida"}>
                    {rutaNombre ?? "Ruta desconocida"}
                  </option>
                </select>
              </div>
            </div>
            <br />
            <GuardarPerfil
              id={user.id}
              nombre={nombre}
              contraseña={contraseña}
              fotoPerfil={fotoPerfil}
              estado={estado}
              ubicación={ubicación}
              ruta={user.IDRuta}
              token={token}
            />
          </div>
        </div>
      </form>
    </div>
  );
}
