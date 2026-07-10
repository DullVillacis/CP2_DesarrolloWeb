const mongoose = require("mongoose");

const offerSchema = new mongoose.Schema(
  {
    titulo: {
      type: String,
      required: [true, "El título es obligatorio"],
      trim: true,
    },
    descripcion: {
      type: String,
      required: [true, "La descripción es obligatoria"],
      trim: true,
    },
    categoria: {
      type: String,
      enum: [
        "panaderia",
        "comida_preparada",
        "frutas_verduras",
        "lacteos",
        "bebidas",
        "otros",
      ],
      required: [true, "La categoría es obligatoria"],
    },
    precioOriginal: {
      type: Number,
      required: [true, "El precio original es obligatorio"],
      min: [0, "El precio no puede ser negativo"],
    },
    precioDescuento: {
      type: Number,
      required: [true, "El precio con descuento es obligatorio"],
      min: [0, "El precio no puede ser negativo"],
    },
    cantidadDisponible: {
      type: Number,
      required: [true, "La cantidad es obligatoria"],
      min: [0, "La cantidad no puede ser negativa"],
    },
    horarioRetiro: {
      type: String,
      required: [true, "El horario de retiro es obligatorio"],
    },
    disponibleHasta: {
      type: Date,
      required: [true, "La fecha de disponibilidad es obligatoria"],
    },
    imagen: {
      type: String,
      default: "",
    },
    estado: {
      type: String,
      enum: ["disponible", "agotado"],
      default: "disponible",
    },
    // Relación: qué local (usuario) publicó esta oferta
    local: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Offer", offerSchema);
