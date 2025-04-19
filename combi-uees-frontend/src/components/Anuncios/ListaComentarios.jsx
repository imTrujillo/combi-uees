import React, { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import Comentario from "./Comentario";
import GuardarComentario from "./GuardarComentario";
import Footer from "../Footer";
import Loader from "../Loader/Loader";
import "../../../css/comentarios.css";
import boxphoto from "../../assets/caja-vacia.png";

export default function ListaComentarios() {
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
      <h1 className="text-start fs-1 px-4 border-bottom border-2 m-3 w-75">
        Noticias
      </h1>
      <div className="d-flex flex-sm-column flex-lg-row flex-column justify-content-end align-items-center mb-5 mx-sm-2 me-lg-5 mx-2">
        <section className="position-relative mb-3">
          <img
            src={anuncio.anuncioURLFoto}
            alt="img_noticia"
            className="position-relative shadow-lg rounded-5 seccion-imagen"
            style={{
              width: "100%",
              maxWidth: "30rem",
              height: "auto",
            }}
          />
        </section>
        <section
          className="d-sm-none d-lg-flex d-none"
          style={{ width: "12%" }}
        ></section>
        <section className="rounded-5 d-flex flex-column justify-content-between shadow-lg seccion-comentarios">
          <div
            className="m-sm-3 m-auto m-3"
            style={{
              overflowY: "auto",
              height: "calc(60vh - 60px)",
              marginTop: "10px",
            }}
          >
            {listaComentarios.length > 0 ? (
              listaComentarios.map((comentario) => {
                return (
                  <Comentario
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
