import React, { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import Comentario from "./Comentario";
import GuardarComentario from "./GuardarComentario";
import Footer from "../Footer";

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
        setLoading(false);
      } catch (error) {
        console.error("Ocurrió un error:", error);
        setLoading(false);
      }
    };
    apiService();
  }, [listaComentarios]);

  if (loading) {
    return <div>Cargando...</div>;
  }

  return (
    <>
      <div>
        <section>
          <h1>Noticias</h1>
          <img src={anuncio.anuncioURLFoto} alt="" style={{ width: "20rem" }} />
        </section>
        <section>
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
            <div>Aquí aparecerán los comentarios</div>
          )}
          <div>
            <GuardarComentario />
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}
