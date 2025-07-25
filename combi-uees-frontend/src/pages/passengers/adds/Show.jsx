import React from "react";
import "../../../../css/comentarios.css";

export default function Show({
  propNombreUsuario,
  propComentarioTitulo,
  propComentarioDescripción,
}) {
  return (
    <div className="d-flex flex-column text-start gap-0 m-2 message last position-relative bg-light border">
      <h6 className="p-0 m-0 fw-bold">{propNombreUsuario}</h6>
      <p className="p-0 m-0 ms-2 fst-italic fw-bold">{propComentarioTitulo}</p>
      <p className="p-0 m-0 ms-2">{propComentarioDescripción}</p>
    </div>
  );
}
