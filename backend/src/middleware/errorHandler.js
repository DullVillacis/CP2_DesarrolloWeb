// Middleware para rutas que no existen (404)
const noEncontrado = (req, res, next) => {
  res.status(404).json({ mensaje: `Ruta no encontrada: ${req.originalUrl}` });
};

// Middleware central de manejo de errores (captura cualquier error de la app)
const manejadorErrores = (err, req, res, next) => {
  console.error("❌ Error:", err.message);
  const status = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(status).json({
    mensaje: err.message || "Error interno del servidor",
  });
};

module.exports = { noEncontrado, manejadorErrores };
