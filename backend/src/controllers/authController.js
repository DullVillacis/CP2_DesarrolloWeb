const jwt = require("jsonwebtoken");
const User = require("../models/User");

const generarToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const registrar = async (req, res) => {
  try {
    const { nombre, email, password, rol, nombreNegocio, direccion, telefono } =
      req.body;

    const existe = await User.findOne({ email });
    if (existe) {
      return res
        .status(400)
        .json({ mensaje: "Ya existe un usuario con ese email" });
    }

    const usuario = await User.create({
      nombre,
      email,
      password,
      rol,
      nombreNegocio,
      direccion,
      telefono,
    });

    res.status(201).json({
      _id: usuario._id,
      nombre: usuario.nombre,
      email: usuario.email,
      rol: usuario.rol,
      token: generarToken(usuario._id),
    });
  } catch (error) {
    res
      .status(500)
      .json({ mensaje: "Error al registrar usuario", error: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const usuario = await User.findOne({ email });
    if (!usuario || !(await usuario.compararPassword(password))) {
      return res.status(401).json({ mensaje: "Credenciales inválidas" });
    }

    res.json({
      _id: usuario._id,
      nombre: usuario.nombre,
      email: usuario.email,
      rol: usuario.rol,
      token: generarToken(usuario._id),
    });
  } catch (error) {
    res
      .status(500)
      .json({ mensaje: "Error al iniciar sesión", error: error.message });
  }
};

const perfil = async (req, res) => {
  res.json(req.usuario);
};

module.exports = { registrar, login, perfil };
