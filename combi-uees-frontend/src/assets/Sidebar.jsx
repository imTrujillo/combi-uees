import { Link } from "react-router-dom";
import "../../css/sidebar.css";

import logo from "../assets/images/combi-uees-logo.png";
import { GrAnnounce } from "react-icons/gr";
import { FaRegHandPeace, FaRoute } from "react-icons/fa6";
import { FaUser } from "react-icons/fa";
import { MdBusAlert, MdLogout, MdOutlineShareLocation } from "react-icons/md";
import { useAuth } from "../pages/session/AuthProvider";

export default function Sidebar() {
  const { logout, rol } = useAuth();

  return (
    <>
      <nav
        className={`d-flex flex-column justify-content-between h-100 p-0 ${
          rol === "motorista"
            ? "nav-motorista"
            : rol === "administrador"
            ? "nav-administrador"
            : "nav-pasajero"
        }`}
      >
        <div className="pt-3">
          <img src={logo} className="logo" alt="" />
          <p
            className={`${
              rol === "administrador" || rol === "motorista" ? "text-white" : ""
            } text-color-nav logo-text d-none d-sm-block`}
          >
            LA COMBI
          </p>
        </div>

        <div className="p-0 p-sm-2 p-lg-5 d-flex flex-column align-items-lg-start gap-3 fs-5">
          {rol === "administrador" && (
            <h1 className=" d-none d-lg-block text-center logo-text text-white fs-5   border-2 border-bottom pb-1 ">
              BIENVENIDO ADMIN!
              <FaRegHandPeace className="mx-2" />
            </h1>
          )}

          <div className={rol === "motorista" ? "" : "d-none"}>
            <Link
              to="/perfil"
              className="text-color-nav-link text-white fw-bold text-decoration-none d-flex flex-row align-items-center justify-content-center gap-1"
            >
              <FaUser className="icono " />
              <p className="d-none d-lg-block my-auto">Perfil</p>
            </Link>
          </div>
          <div className={!rol ? "" : "d-none"}>
            <Link
              to="/"
              className="text-color-nav-link fw-bold text-decoration-none d-flex flex-row justify-content-center align-items-center gap-1 "
            >
              <FaRoute className="icono " />
              <p className="d-none d-lg-block my-auto">Rutas</p>
            </Link>
          </div>
          <div className={rol === "administrador" ? "" : "d-none"}>
            <Link
              to="/editar-rutas"
              className="text-color-nav-link text-white fw-bold text-decoration-none d-flex flex-row align-items-center justify-content-center gap-1"
            >
              <FaRoute className="icono " />
              <p className="d-none d-lg-block my-auto">Rutas</p>
            </Link>
          </div>
          <div className={rol === "administrador" ? "" : "d-none"}>
            <Link
              to="/motoristas"
              className="text-color-nav-link text-white fw-bold text-decoration-none d-flex flex-row align-items-center justify-content-center gap-1"
            >
              <MdBusAlert className="icono " />
              <p className="d-none d-lg-block my-auto">Motoristas</p>
            </Link>
          </div>
          <div className={rol !== "administrador" ? "" : "d-none"}>
            <Link
              to="/anuncios"
              className={`text-color-nav-link fw-bold text-decoration-none d-flex flex-row justify-content-center align-items-center gap-1 ${
                rol && "text-white"
              } `}
            >
              <GrAnnounce className="icono" />
              <p className="d-none d-lg-block my-auto">Anuncios</p>
            </Link>
          </div>
          <div
            className={
              rol === "administrador" || rol === "motorista" ? "" : "d-none"
            }
          >
            <Link
              to="/viajes"
              className="text-color-nav-link text-white fw-bold text-decoration-none d-flex flex-row align-items-center justify-content-center gap-1"
            >
              <MdOutlineShareLocation className="icono " />
              <p className="d-none d-lg-block my-auto">Viajes</p>
            </Link>
          </div>
          <div className={rol === "administrador" ? "" : "d-none"}>
            <Link
              to="/actualizar-anuncio"
              className="text-color-nav-link text-white fw-bold text-decoration-none d-flex flex-row align-items-center justify-content-center gap-1"
            >
              <GrAnnounce className="icono" />
              <p className="d-none d-lg-block my-auto">Anuncios</p>
            </Link>
          </div>
        </div>
        <div>
          {rol === "administrador" || rol === "motorista" ? (
            <button
              className="fw-bold text-decoration-none d-flex flex-row justify-content-center align-items-center gap-1 p-2 w-75 w-sm-100 mx-auto  mb-3 rounded-4 logout-button"
              onClick={() => logout()}
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
