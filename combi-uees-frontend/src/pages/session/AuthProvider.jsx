import { useContext, createContext, children, useState } from "react";
import { useNavigate } from "react-router-dom";
import SwalFireLoading from "../../assets/SwalFireLoading";
import Swal from "sweetalert2";
import axios from "axios";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
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
      .post("http://localhost:8000/api/v1/login", data)
      .then((response) => {
        setUser(response.data.correo);

        if (response.data.rol == "motorista") {
          setToken(response.data.token);
          setRol("motorista");
          sessionStorage.setItem("rol", "motorista");
          sessionStorage.setItem("tokenMotorista", response.data.token);
          sessionStorage.setItem("id", response.data.id);
          Swal.close();
          navigate("/viajes");
          return;
        } else if (response.data.rol == "administrador") {
          setToken(response.data.token);
          setRol("administrador");
          sessionStorage.setItem("rol", "administrador");
          sessionStorage.setItem("tokenAdministrador", response.data.token);
          sessionStorage.setItem("id", response.data.id);
          Swal.close();
          navigate("/administrador");
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
      .post("http://localhost:8000/api/v1/logout", null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        setUser(null);
        setToken("");
        sessionStorage.removeItem("tokenMotorista");
        sessionStorage.removeItem("tokenAdministrador");
        sessionStorage.removeItem("id");
        sessionStorage.removeItem("rol");
        navigate("/");
        Swal.close();
      })
      .catch(() => {
        Swal.fire({
          title: "Error de sesión",
          text: "Verifica tus credenciales",
          icon: "error",
        });
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
