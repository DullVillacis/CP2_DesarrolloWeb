import api from "../api/axios";

export const crearReserva = (datos) => api.post("/reservations", datos);

export const listarMisReservas = () => api.get("/reservations/mias");

export const listarReservasDeMiLocal = () => api.get("/reservations/local");

export const completarReserva = (id) => api.put(`/reservations/${id}/completar`);

export const cancelarReserva = (id) => api.put(`/reservations/${id}/cancelar`);
