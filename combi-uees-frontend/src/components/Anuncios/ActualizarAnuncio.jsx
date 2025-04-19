import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import SwalFireLoading from "../../assets/SwalFireLoading";

import photo from "../../assets/default.jpg";

export default function ActualizarAnuncio({ tokenAdministrador }) {
  const [url, setUrl] = useState(undefined);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!url) {
      Swal.fire({
        title: "Anuncio incompleto",
        text: "Por favor, agrega una URL válida",
        icon: "warning",
      });
      return;
    }
    Swal.fire({
      title: "Actualizar anuncio",
      text: "¿Deseas actualizar este anuncio? Se borrarán todos los comentarios",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, actualízalo",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        SwalFireLoading();
        axios
          .patch(
            "http://127.0.0.1:8000/api/v1/anuncios/1",
            { anuncioURLFoto: url },
            {
              headers: { Authorization: `Bearer ${tokenAdministrador}` },
            }
          )
          .then(() => {
            Swal.fire({
              title: "!Operación exitosa!",
              text: "Se actualizó el anuncio",
              icon: "success",
            }).then(() => location.reload());
          })
          .catch(() => {
            Swal.fire({
              title: "!Operación fallida!",
              text: "Ocurrió un error al actualizar el anuncio",
              icon: "error",
            });
          });
      }
    });
  };

  const changeUploadImage = async (e) => {
    const file = e.target.files[0];

    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "Presets_combi-uees");

    const response = await axios.post(
      "https://api.cloudinary.com/v1_1/dkgfdrkzb/image/upload",
      data
    );

    setUrl(response.data.secure_url);
  };

  return (
    <section className="w-100 d-flex flex-column justify-content-center align-items-center w-100 my-4 pb-2">
      <h2 className="text-lg-start text-center text-start px-4 border-bottom border-2 mb-3 w-75">
        Anuncios
      </h2>
      <form
        action=""
        className="d-flex flex-sm-column flex-lg-row flex-column justify-content-between align-items-sm-center align-items-lg-start align-items-center w-75"
        onSubmit={(e) => handleSubmit(e)}
      >
        <div className="d-flex flex-column align-items-center justify-content-center">
          <div
            className="border border-3 m-2"
            style={{ width: "7rem", height: "7rem" }}
          >
            <img
              src={url ? url : photo}
              onError={(e) => (e.target.src = photo)}
              alt="foto noticia"
              style={{ width: "7rem", height: "7rem" }}
              className="shadow-lg object-fit-cover"
            />
          </div>
          <input
            type="submit"
            value="Actualizar Anuncio"
            className="btn-guardar border-0 rounded-4 py-2 px-4 m-2"
          />
        </div>
        <input
          type="file"
          accept="image/*"
          onChange={changeUploadImage}
          className="form-control"
        />
      </form>
    </section>
  );
}
