import React from "react";
import "../../../../css/comentarios.css";
import userAvatar from "../../../assets/images/user-avatar.png";

export default function Show({
  propNombreUsuario,
  propComentarioTitulo,
  propComentarioDescripción,
}) {
  return (
    <div className="d-flex gap-3">
      <img
        src={userAvatar}
        alt="user-avatar"
        className="mt-3"
        style={{ height: "30px", width: "30px" }}
      />
      <div className="d-flex flex-column text-start gap-0 m-2 message last position-relative bg-light border">
        <h6 className="p-0 m-0 fw-bold">{propNombreUsuario}</h6>
        <p className="p-0 m-0 ms-2 fst-italic fw-bold">
          {propComentarioTitulo}
        </p>
        <p className="p-0 m-0 ms-2">{propComentarioDescripción}</p>
      </div>
    </div>
  );
}
