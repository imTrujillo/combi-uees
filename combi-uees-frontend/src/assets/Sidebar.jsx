import { Link } from "react-router-dom";
import "../../css/sidebar.css";

import logo from "../assets/images/combi-uees-logo.png";
import { GrAnnounce } from "react-icons/gr";
import { FaRoute } from "react-icons/fa6";
import { FaUser } from "react-icons/fa";
import { MdLogout, MdOutlineShareLocation } from "react-icons/md";
import { MdManageAccounts } from "react-icons/md";
import { useAuth } from "../pages/session/AuthProvider";

export default function Sidebar() {
  const auth = useAuth();
  const tokenMotorista = sessionStorage.getItem("tokenMotorista");
  const tokenAdministrador = sessionStorage.getItem("tokenAdministrador");

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
        <div className="p-0 p-sm-2 p-lg-3 d-flex flex-column justify-content-center align-items-center gap-3 fs-5">
          <div>
            <Link
              to="/"
              className={`${
                tokenAdministrador || tokenMotorista
                  ? "text-color-nav-link text-white fw-bold text-decoration-none d-flex flex-row align-items-center justify-content-center gap-1"
                  : "text-color-nav-link fw-bold text-decoration-none d-flex flex-row justify-content-center align-items-center gap-1 "
              }`}
            >
              <FaRoute className="icono " />
              <p className="d-none d-lg-block my-auto">Rutas</p>
            </Link>
          </div>
          <div>
            <Link
              to="/anuncios"
              className={`${
                tokenAdministrador || tokenMotorista
                  ? "text-color-nav-link text-white fw-bold text-decoration-none d-flex flex-row align-items-center justify-content-center gap-1"
                  : "text-color-nav-link fw-bold text-decoration-none d-flex flex-row justify-content-center align-items-center gap-1 "
              }`}
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
          <div className={tokenMotorista || tokenAdministrador ? "" : "d-none"}>
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
            <button
              className="fw-bold text-decoration-none d-flex flex-row justify-content-center align-items-center gap-1 p-2 w-75 w-sm-100 mx-auto  mb-3 rounded-4 logout-button"
              onClick={() => auth.logout()}
            >
              <MdLogout />
              <p className="d-none d-lg-block my-auto">Cerrar Sesion</p>
            </button>
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
                <p className="d-none d-lg-block my-auto">Iniciar Sesión</p>
              </Link>
            </>
          )}
        </div>
      </nav>
    </>
  );
}
