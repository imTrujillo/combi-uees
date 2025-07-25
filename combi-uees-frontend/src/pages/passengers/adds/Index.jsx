import React, { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import Show from "./Show";
import GuardarComentario from "./../../../components/passengers/adds/GuardarComentario";

import Footer from "../../../assets/Footer";
import Loader from "../../../components/Loader/Loader";
import "../../../../css/comentarios.css";
import boxphoto from "../../../assets/images/caja-vacia.png";

export default function Index() {
  const [listaComentarios, setListaComentarios] = useState(null);
  const [loading, setLoading] = useState(true);
  const [anuncio, setAnuncio] = useState(null);

  useEffect(() => {
    const apiService = async () => {
      try {
        const responseAnuncio = await axios.get(
          "http://127.0.0.1:8000/api/v1/anuncio"
        );
        const responseListaComentarios = await axios.get(
          "http://127.0.0.1:8000/api/v1/comentarios"
        );
        const anuncioId1 = responseAnuncio.data.find(
          (anuncio) => anuncio.anuncioID == 1
        );
        setAnuncio(anuncioId1);
        setListaComentarios(responseListaComentarios.data);
      } catch (error) {
        console.error("Ocurrió un error:", error);
      }
    };
    apiService();
  }, [listaComentarios]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <h2 className="text-start logo-text fs-1 mx-5 border-bottom border-2 mb-3 ">
        NOTICIAS
      </h2>
      <div className="d-flex flex-sm-column flex-lg-row flex-column justify-content-end align-items-center mb-5 mx-sm-2 me-lg-5 mx-2">
        <section className="position-relative col-lg-6 mb-3 px-3 px-lg-0">
          <img
            src={anuncio.anuncioURLFoto}
            alt="img_noticia"
            className="position-relative shadow-lg rounded-5 seccion-imagen"
            style={{
              width: "100%",
              height: "auto",
            }}
          />
        </section>

        <section className="rounded-5 d-flex flex-column justify-content-between shadow-lg seccion-comentarios">
          <div
            className="m-sm-3 m-auto m-3"
            style={{
              overflowY: "auto",
              marginTop: "10px",
              minHeight: "10rem",
              maxHeight: "25rem",
            }}
          >
            {listaComentarios.length > 0 ? (
              listaComentarios.map((comentario) => {
                return (
                  <Show
                    key={comentario.comentarioID}
                    propNombreUsuario={comentario.nombreUsuario}
                    propComentarioTitulo={comentario.comentarioTitulo}
                    propComentarioDescripción={comentario.comentarioDescripción}
                  />
                );
              })
            ) : (
              <div className="w-75 mx-auto">
                Aquí aparecerán los comentarios :)
                <br />
                <img src={boxphoto} alt="" style={{ width: "10rem" }} />
              </div>
            )}
          </div>
          <div>
            <GuardarComentario />
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}
