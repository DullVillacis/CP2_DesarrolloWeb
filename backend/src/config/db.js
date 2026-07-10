const mongoose = require("mongoose");

// Establece la conexión con MongoDB usando la URI del archivo .env
const conectarDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB conectado correctamente");
  } catch (error) {
    console.error("❌ Error al conectar a MongoDB:", error.message);
    // Si no hay base de datos, no tiene sentido seguir: cerramos el proceso
    process.exit(1);
  }
};

module.exports = conectarDB;
