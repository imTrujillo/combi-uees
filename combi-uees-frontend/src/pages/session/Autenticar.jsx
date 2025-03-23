import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Autenticar({ rol, children }) {
  const navigate = useNavigate();

  useEffect(() => {
    const tokenAdministrador = sessionStorage.getItem("tokenAdministrador");
    const tokenMotorista = sessionStorage.getItem("tokenMotorista");

    if (rol === "administrador" && !tokenAdministrador) {
      navigate("/login");
    } else if (rol === "motorista" && !tokenMotorista) {
      navigate("/login");
    }
  }, [navigate, rol]);
  return children;
}
