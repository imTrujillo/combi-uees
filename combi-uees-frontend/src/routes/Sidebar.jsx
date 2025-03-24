import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Logout from "../pages/session/Logout";
import logo from "../assets/combi-uees-logo.png";
import { GrAnnounce } from "react-icons/gr";
import { FaRoute } from "react-icons/fa6";
import { FaUser } from "react-icons/fa";
import { MdOutlineShareLocation } from "react-icons/md";
import { MdManageAccounts } from "react-icons/md";
import "../../css/sidebar.css";

export default function Sidebar() {
  const tokenAdministrador = sessionStorage.getItem("tokenAdministrador");
  const tokenMotorista = sessionStorage.getItem("tokenMotorista");

  return (
    <>
      <nav
        className={`d-flex flex-column justify-content-between h-100 p-0 ${
          tokenMotorista
            ? "nav-motorista"
            : tokenAdministrador
            ? "nav-administrador"
            : "nav-pasajero"
        }`}
      >
        <div className="py-3">
          <img src={logo} className="logo" alt="" />
          <p
            className={`${
              tokenAdministrador || tokenMotorista ? "text-white" : ""
            } text-color-nav logo-text d-none d-sm-block`}
          >
            COMBI-UEES
          </p>
        </div>
        <div className="p-0 p-sm-2 p-lg-3 d-flex flex-column gap-3 fs-5">
          <div className={tokenAdministrador || tokenMotorista ? "d-none" : ""}>
            <Link
              to="/"
              className="text-color-nav-link fw-bold text-decoration-none d-flex flex-row justify-content-center align-items-center gap-1 "
            >
              <FaRoute className="icono " />
              <p className="d-none d-lg-block my-auto">Rutas</p>
            </Link>
          </div>
          <div className={tokenAdministrador || tokenMotorista ? "d-none" : ""}>
            <Link
              to="/anuncios"
              className="text-color-nav-link fw-bold text-decoration-none d-flex flex-row align-items-center justify-content-center gap-1"
            >
              <GrAnnounce className="icono" />
              <p className="d-none d-lg-block my-auto">Anuncios</p>
            </Link>
          </div>
          <div className={tokenAdministrador ? "" : "d-none"}>
            <Link
              to="/administrador"
              className="text-color-nav-link text-white fw-bold text-decoration-none d-flex flex-row align-items-center justify-content-center gap-1"
            >
              <MdManageAccounts className="icono " />
              <p className="d-none d-lg-block my-auto">Administrador</p>
            </Link>
          </div>
          <div className={tokenMotorista ? "" : "d-none"}>
            <Link
              to="/viajes"
              className="text-color-nav-link text-white fw-bold text-decoration-none d-flex flex-row align-items-center justify-content-center gap-1"
            >
              <MdOutlineShareLocation className="icono " />
              <p className="d-none d-lg-block my-auto">Viajes</p>
            </Link>
          </div>
        </div>
        <div>
          {tokenAdministrador || tokenMotorista ? (
            <Logout />
          ) : (
            <>
              <h6 className="text-color-nav d-none d-lg-block">
                ¿Ya eres motorista?
              </h6>
              <Link
                to="/login"
                className=" fw-bold text-decoration-none d-flex flex-row justify-content-center align-items-center gap-1 p-2 w-75 w-sm-100 mx-auto  mb-3 rounded-4 login-button"
              >
                <FaUser />
                <p className="d-none d-lg-block my-auto">Iniciar Sesion</p>
              </Link>
            </>
          )}
        </div>
      </nav>
    </>
  );
}
