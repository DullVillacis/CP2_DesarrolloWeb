export const CATEGORIAS = [
  { valor: "panaderia", etiqueta: "Panadería" },
  { valor: "comida_preparada", etiqueta: "Comida preparada" },
  { valor: "frutas_verduras", etiqueta: "Frutas y verduras" },
  { valor: "lacteos", etiqueta: "Lácteos" },
  { valor: "bebidas", etiqueta: "Bebidas" },
  { valor: "otros", etiqueta: "Otros" },
];

export const etiquetaCategoria = (valor) => {
  const categoria = CATEGORIAS.find((c) => c.valor === valor);
  return categoria ? categoria.etiqueta : valor;
};

export const ETIQUETA_ESTADO = {
  pendiente: "Pendiente",
  completada: "Completada",
  cancelada: "Cancelada",
};
