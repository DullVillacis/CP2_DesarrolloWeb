import { createContext, useContext, useState, useEffect } from "react";
import { iniciarSesion, registrarUsuario } from "../services/authService";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const datos = localStorage.getItem("usuario");
    if (token && datos) {
      setUsuario(JSON.parse(datos));
    }
    setCargando(false);
  }, []);

  const guardarSesion = (data) => {
    const { token, ...datosUsuario } = data;
    localStorage.setItem("token", token);
    localStorage.setItem("usuario", JSON.stringify(datosUsuario));
    setUsuario(datosUsuario);
  };

  const login = async (credenciales) => {
    const { data } = await iniciarSesion(credenciales);
    guardarSesion(data);
    return data;
  };

  const register = async (datos) => {
    const { data } = await registrarUsuario(datos);
    guardarSesion(data);
    return data;
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");
    setUsuario(null);
  };

  return (
    <AuthContext.Provider value={{ usuario, cargando, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
