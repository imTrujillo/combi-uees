import React from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import Login from "../pages/session/Login";
import Rutas from "../pages/Rutas";
import Anuncios from "../pages/Anuncios";
import Viajes from "../pages/Viajes";
import Administrador from "../pages/Administrador";
import Autenticar from "../pages/session/Autenticar";
import Sidebar from "./Sidebar";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <AppRoutesWithLocation />
    </BrowserRouter>
  );
}

function AppRoutesWithLocation() {
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";

  return (
    <main className="d-flex flex-row overflow-x-hidden">
      {!isLoginPage && (
        <>
          <section className=" position-fixed top-0 bottom-0 col-sm-2 col-lg-3 col-2 shadow-lg">
            <Sidebar />
          </section>
          <section className="col-sm-2 col-lg-3 col-2"></section>
        </>
      )}

      <section
        className={
          isLoginPage
            ? "w-100 p-0"
            : "col-sm-10 col-lg-9 col-10 p-sm-0 p-lg-3 p-0 overflow-hidden"
        }
      >
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Rutas />} />
          <Route path="/anuncios" element={<Anuncios />} />
          <Route
            path="/viajes"
            element={
              <Autenticar rol="motorista">
                <Viajes />
              </Autenticar>
            }
          ></Route>
          <Route
            path="/administrador"
            element={
              <Autenticar rol="administrador">
                <Administrador />
              </Autenticar>
            }
          ></Route>
        </Routes>
      </section>
    </main>
  );
}
