const Offer = require("../models/Offer");

const crearOferta = async (req, res) => {
  try {
    const oferta = await Offer.create({
      ...req.body,
      local: req.usuario._id,
    });
    res.status(201).json(oferta);
  } catch (error) {
    res
      .status(400)
      .json({ mensaje: "Error al crear la oferta", error: error.message });
  }
};

const obtenerOfertas = async (req, res) => {
  try {
    const { categoria, precioMax, estado } = req.query;
    const filtro = {};

    if (categoria) filtro.categoria = categoria;
    if (estado) filtro.estado = estado;
    if (precioMax) filtro.precioDescuento = { $lte: Number(precioMax) };

    const ofertas = await Offer.find(filtro)
      .populate("local", "nombreNegocio direccion telefono")
      .sort({ createdAt: -1 });

    res.json(ofertas);
  } catch (error) {
    res
      .status(500)
      .json({ mensaje: "Error al obtener las ofertas", error: error.message });
  }
};

const obtenerMisOfertas = async (req, res) => {
  try {
    const ofertas = await Offer.find({ local: req.usuario._id }).sort({
      createdAt: -1,
    });
    res.json(ofertas);
  } catch (error) {
    res
      .status(500)
      .json({ mensaje: "Error al obtener tus ofertas", error: error.message });
  }
};

const obtenerOfertaPorId = async (req, res) => {
  try {
    const oferta = await Offer.findById(req.params.id).populate(
      "local",
      "nombreNegocio direccion telefono"
    );
    if (!oferta) {
      return res.status(404).json({ mensaje: "Oferta no encontrada" });
    }
    res.json(oferta);
  } catch (error) {
    res
      .status(500)
      .json({ mensaje: "Error al obtener la oferta", error: error.message });
  }
};

const actualizarOferta = async (req, res) => {
  try {
    const oferta = await Offer.findById(req.params.id);
    if (!oferta) {
      return res.status(404).json({ mensaje: "Oferta no encontrada" });
    }

    if (oferta.local.toString() !== req.usuario._id.toString()) {
      return res
        .status(403)
        .json({ mensaje: "No puedes modificar una oferta que no es tuya" });
    }

    const actualizada = await Offer.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.json(actualizada);
  } catch (error) {
    res
      .status(400)
      .json({ mensaje: "Error al actualizar la oferta", error: error.message });
  }
};

const eliminarOferta = async (req, res) => {
  try {
    const oferta = await Offer.findById(req.params.id);
    if (!oferta) {
      return res.status(404).json({ mensaje: "Oferta no encontrada" });
    }

    if (oferta.local.toString() !== req.usuario._id.toString()) {
      return res
        .status(403)
        .json({ mensaje: "No puedes eliminar una oferta que no es tuya" });
    }

    await oferta.deleteOne();
    res.json({ mensaje: "Oferta eliminada correctamente" });
  } catch (error) {
    res
      .status(500)
      .json({ mensaje: "Error al eliminar la oferta", error: error.message });
  }
};

module.exports = {
  crearOferta,
  obtenerOfertas,
  obtenerMisOfertas,
  obtenerOfertaPorId,
  actualizarOferta,
  eliminarOferta,
};
