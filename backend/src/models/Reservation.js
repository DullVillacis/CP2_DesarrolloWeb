const mongoose = require("mongoose");

const reservationSchema = new mongoose.Schema(
  {
    // Relación: qué oferta se reservó
    oferta: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Offer",
      required: true,
    },
    // Relación: qué consumidor hizo la reserva
    consumidor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    cantidad: {
      type: Number,
      required: true,
      min: [1, "Debe reservar al menos 1 pack"],
      default: 1,
    },
    codigoRetiro: {
      type: String,
      required: true,
    },
    estado: {
      type: String,
      enum: ["pendiente", "completada", "cancelada"],
      default: "pendiente",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Reservation", reservationSchema);
