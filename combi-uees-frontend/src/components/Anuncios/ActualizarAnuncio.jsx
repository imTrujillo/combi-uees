import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import SwalFireLoading from "../../assets/SwalFireLoading";

export default function ActualizarAnuncio({ tokenAdministrador }) {
  const [url, setUrl] = useState("");

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
    <section className="m-5">
      <form
        action=""
        className="d-flex flex-row w-75"
        onSubmit={(e) => handleSubmit(e)}
      >
        <input
          type="file"
          accept="image/*"
          onChange={changeUploadImage}
          className="form-control"
        />
        {url && <img src={url} alt="" style={{ width: "5rem" }} />}
        <input
          type="submit"
          value="Actualizar Anuncio"
          className="form-control"
        />
      </form>
    </section>
  );
}
