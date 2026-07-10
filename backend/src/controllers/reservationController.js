const Reservation = require("../models/Reservation");
const Offer = require("../models/Offer");

const generarCodigoRetiro = () => {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let codigo = "";
  for (let i = 0; i < 6; i++) {
    codigo += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return `FR-${codigo}`;
};

const crearReserva = async (req, res) => {
  try {
    const { oferta: ofertaId, cantidad } = req.body;
    const cantidadReservada = Number(cantidad) || 1;

    const oferta = await Offer.findById(ofertaId);
    if (!oferta) {
      return res.status(404).json({ mensaje: "Oferta no encontrada" });
    }

    if (
      oferta.estado === "agotado" ||
      oferta.cantidadDisponible < cantidadReservada
    ) {
      return res
        .status(400)
        .json({ mensaje: "No hay stock suficiente para esta oferta" });
    }

    oferta.cantidadDisponible -= cantidadReservada;
    if (oferta.cantidadDisponible === 0) oferta.estado = "agotado";
    await oferta.save();

    const reserva = await Reservation.create({
      oferta: oferta._id,
      consumidor: req.usuario._id,
      cantidad: cantidadReservada,
      codigoRetiro: generarCodigoRetiro(),
    });

    res.status(201).json(reserva);
  } catch (error) {
    res
      .status(400)
      .json({ mensaje: "Error al crear la reserva", error: error.message });
  }
};

const misReservas = async (req, res) => {
  try {
    const reservas = await Reservation.find({ consumidor: req.usuario._id })
      .populate({
        path: "oferta",
        select: "titulo categoria precioDescuento horarioRetiro local",
        populate: { path: "local", select: "nombreNegocio direccion" },
      })
      .sort({ createdAt: -1 });
    res.json(reservas);
  } catch (error) {
    res
      .status(500)
      .json({ mensaje: "Error al obtener tus reservas", error: error.message });
  }
};

const reservasDeMiLocal = async (req, res) => {
  try {
    const misOfertas = await Offer.find({ local: req.usuario._id }).select("_id");
    const ids = misOfertas.map((o) => o._id);

    const reservas = await Reservation.find({ oferta: { $in: ids } })
      .populate("oferta", "titulo categoria")
      .populate("consumidor", "nombre email")
      .sort({ createdAt: -1 });
    res.json(reservas);
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al obtener las reservas de tu local",
      error: error.message,
    });
  }
};

const cancelarReserva = async (req, res) => {
  try {
    const reserva = await Reservation.findById(req.params.id);
    if (!reserva) {
      return res.status(404).json({ mensaje: "Reserva no encontrada" });
    }

    if (reserva.consumidor.toString() !== req.usuario._id.toString()) {
      return res
        .status(403)
        .json({ mensaje: "No puedes cancelar una reserva que no es tuya" });
    }
    if (reserva.estado !== "pendiente") {
      return res
        .status(400)
        .json({ mensaje: "Solo se pueden cancelar reservas pendientes" });
    }

    reserva.estado = "cancelada";
    await reserva.save();

    const oferta = await Offer.findById(reserva.oferta);
    if (oferta) {
      oferta.cantidadDisponible += reserva.cantidad;
      if (oferta.estado === "agotado" && oferta.cantidadDisponible > 0) {
        oferta.estado = "disponible";
      }
      await oferta.save();
    }

    res.json({ mensaje: "Reserva cancelada correctamente", reserva });
  } catch (error) {
    res
      .status(500)
      .json({ mensaje: "Error al cancelar la reserva", error: error.message });
  }
};

const completarReserva = async (req, res) => {
  try {
    const reserva = await Reservation.findById(req.params.id).populate("oferta");
    if (!reserva) {
      return res.status(404).json({ mensaje: "Reserva no encontrada" });
    }

    if (
      !reserva.oferta ||
      reserva.oferta.local.toString() !== req.usuario._id.toString()
    ) {
      return res
        .status(403)
        .json({ mensaje: "No puedes completar esta reserva" });
    }
    if (reserva.estado !== "pendiente") {
      return res
        .status(400)
        .json({ mensaje: "Solo se pueden completar reservas pendientes" });
    }

    reserva.estado = "completada";
    await reserva.save();
    res.json({ mensaje: "Reserva marcada como completada", reserva });
  } catch (error) {
    res
      .status(500)
      .json({ mensaje: "Error al completar la reserva", error: error.message });
  }
};

module.exports = {
  crearReserva,
  misReservas,
  reservasDeMiLocal,
  cancelarReserva,
  completarReserva,
};
