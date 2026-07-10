export const formatoPrecio = (valor) => `$${Number(valor).toFixed(2)}`;

export const formatoFecha = (fecha) =>
  new Date(fecha).toLocaleDateString("es-EC", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
