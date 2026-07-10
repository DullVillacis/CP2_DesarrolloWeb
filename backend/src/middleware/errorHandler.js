const noEncontrado = (req, res, next) => {
  res.status(404).json({ mensaje: `Ruta no encontrada: ${req.originalUrl}` });
};

const manejadorErrores = (err, req, res, next) => {
  console.error("Error:", err.message);
  const status = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(status).json({
    mensaje: err.message || "Error interno del servidor",
  });
};

module.exports = { noEncontrado, manejadorErrores };
