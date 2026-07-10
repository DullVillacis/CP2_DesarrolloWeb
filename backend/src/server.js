require("dotenv").config();
const express = require("express");
const cors = require("cors");
const conectarDB = require("./config/db");
const { noEncontrado, manejadorErrores } = require("./middleware/errorHandler");

// 1) Conectamos a la base de datos
conectarDB();

// 2) Creamos la aplicación de Express
const app = express();

// 3) Middlewares globales
app.use(cors()); // permite que el frontend (React) consuma la API
app.use(express.json()); // permite leer JSON en el body de las peticiones

// 4) Ruta de prueba para verificar que la API está viva
app.get("/api/health", (req, res) => {
  res.json({ mensaje: "API de FoodRescue funcionando 🍴" });
});

// 5) Rutas de la API
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/offers", require("./routes/offerRoutes"));
app.use("/api/reservations", require("./routes/reservationRoutes"));

// 6) Manejo de errores (SIEMPRE al final, después de las rutas)
app.use(noEncontrado);
app.use(manejadorErrores);

// 7) Levantamos el servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
