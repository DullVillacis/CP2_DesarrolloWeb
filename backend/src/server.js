require("dotenv").config();
const express = require("express");
const cors = require("cors");
const conectarDB = require("./config/db");
const { noEncontrado, manejadorErrores } = require("./middleware/errorHandler");

conectarDB();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/health", (req, res) => {
  res.json({ mensaje: "API de FoodRescue funcionando" });
});

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/offers", require("./routes/offerRoutes"));
app.use("/api/reservations", require("./routes/reservationRoutes"));

app.use(noEncontrado);
app.use(manejadorErrores);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
