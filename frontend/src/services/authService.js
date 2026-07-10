import api from "../api/axios";

export const registrarUsuario = (datos) => api.post("/auth/register", datos);
export const iniciarSesion = (credenciales) => api.post("/auth/login", credenciales);
export const obtenerPerfil = () => api.get("/auth/perfil");
