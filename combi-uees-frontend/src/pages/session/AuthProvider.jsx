import { useContext, createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import SwalFireLoading from "../../assets/SwalFireLoading";
import Swal from "sweetalert2";
import axios from "axios";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(
    JSON.parse(sessionStorage.getItem("user") || "null")
  );
  const [rol, setRol] = useState(sessionStorage.getItem("rol") || "");
  const [token, setToken] = useState(
    sessionStorage.getItem("tokenMotorista") ||
      sessionStorage.getItem("tokenAdministrador") ||
      ""
  );
  const navigate = useNavigate();

  const login = async (data) => {
    SwalFireLoading();
    axios
      .post(`${import.meta.env.VITE_API_URL}auth/login`, data)
      .then((response) => {
        setUser(response.data.user);
        setToken(response.data.token);
        sessionStorage.setItem("user", JSON.stringify(response.data.user));

        if (response.data.rol == "motorista") {
          setRol("motorista");
          sessionStorage.setItem("rol", "motorista");
          sessionStorage.setItem("tokenMotorista", response.data.token);
          Swal.close();
          navigate("/perfil");
          return;
        } else if (response.data.rol == "administrador") {
          setRol("administrador");
          sessionStorage.setItem("rol", "administrador");
          sessionStorage.setItem("tokenAdministrador", response.data.token);
          Swal.close();
          navigate("/editar-rutas");
          return;
        }
      })
      .catch(() => {
        Swal.fire({
          title: "Error de sesión",
          text: "Verifica tus credenciales",
          icon: "error",
        });
      });
  };

  const logout = () => {
    SwalFireLoading();
    axios
      .post(`${import.meta.env.VITE_API_URL}auth/logout`, null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        setUser(null);
        setToken("");
        setRol("");
        sessionStorage.removeItem("tokenMotorista");
        sessionStorage.removeItem("tokenAdministrador");
        sessionStorage.removeItem("id");
        sessionStorage.removeItem("rol");
        sessionStorage.removeItem("user");
        navigate("/");
        Swal.close();
      })
      .catch(() => {
        Swal.fire({
          title: "Error de sesión",
          text: "Verifica tus credenciales",
          icon: "error",
        });
        setUser(null);
        setToken("");
        setRol("");
        sessionStorage.removeItem("tokenMotorista");
        sessionStorage.removeItem("tokenAdministrador");
        sessionStorage.removeItem("id");
        sessionStorage.removeItem("rol");
        sessionStorage.removeItem("user");
        navigate("/");
        Swal.close();
      });
  };

  return (
    <AuthContext.Provider value={{ user, token, rol, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};
