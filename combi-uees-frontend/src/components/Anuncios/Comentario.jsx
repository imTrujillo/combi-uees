import React from "react";

export default function Comentario({
  propNombreUsuario,
  propComentarioTitulo,
  propComentarioDescripción,
}) {
  return (
    <div>
      <p>{propNombreUsuario}</p>
      <h6>{propComentarioTitulo}</h6>
      <p>{propComentarioDescripción}</p>
    </div>
  );
}
