const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Genera un token JWT firmado con el id del usuario
const generarToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

// POST /api/auth/register -> Registro de un nuevo usuario
const registrar = async (req, res) => {
  try {
    const { nombre, email, password, rol, nombreNegocio, direccion, telefono } =
      req.body;

    // Evitamos emails duplicados
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

    // Devolvemos los datos públicos + el token (nunca la contraseña)
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

// POST /api/auth/login -> Inicio de sesión
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const usuario = await User.findOne({ email });
    // Mismo mensaje para email o password incorrectos (buena práctica de seguridad)
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

// GET /api/auth/perfil -> Datos del usuario autenticado (ruta protegida)
const perfil = async (req, res) => {
  res.json(req.usuario);
};

module.exports = { registrar, login, perfil };
