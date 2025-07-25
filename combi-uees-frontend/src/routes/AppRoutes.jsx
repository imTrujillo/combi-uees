import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import Login from "../pages/session/Login";

import BusRoutes from "../pages/passengers/bus_routes/Index";
import Adds from "../pages/passengers/adds/Index";
import Trips from "../pages/motorists/Index";
import Administrator from "../pages/administrator/Index";

import Sidebar from "../assets/Sidebar";
import AuthProvider from "../pages/session/AuthProvider";
import PrivateRoute from "../pages/session/PrivateRoute";

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
    <AuthProvider>
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
            {/* RUTAS PARA EL PASAJERO */}
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<BusRoutes />} />
            <Route path="/anuncios" element={<Adds />} />

            {/* RUTAS PROTEGIDAS */}
            <Route
              element={
                <PrivateRoute allowedRoles={["motorista", "administrador"]} />
              }
            >
              <Route path="/viajes" element={<Trips />} />
            </Route>
            <Route element={<PrivateRoute allowedRoles={["administrador"]} />}>
              <Route path="/administrador" element={<Administrator />} />
            </Route>
          </Routes>
        </section>
      </main>
    </AuthProvider>
  );
}
