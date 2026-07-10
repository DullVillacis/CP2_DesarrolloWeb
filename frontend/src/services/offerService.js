import api from "../api/axios";

export const listarOfertas = (filtros = {}) =>
  api.get("/offers", { params: filtros });

export const listarMisOfertas = () => api.get("/offers/mias");

export const obtenerOferta = (id) => api.get(`/offers/${id}`);

export const crearOferta = (datos) => api.post("/offers", datos);

export const actualizarOferta = (id, datos) => api.put(`/offers/${id}`, datos);

export const eliminarOferta = (id) => api.delete(`/offers/${id}`);
