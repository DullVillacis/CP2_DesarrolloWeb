const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Verifica el token JWT. Si es válido, adjunta el usuario a req.usuario
const proteger = async (req, res, next) => {
  let token;
  const authHeader = req.headers.authorization;

  // El token viaja como: "Authorization: Bearer <token>"
  if (authHeader && authHeader.startsWith("Bearer ")) {
    token = authHeader.split(" ")[1];
  }

  if (!token) {
    return res.status(401).json({ mensaje: "No autorizado, falta el token" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // Adjuntamos el usuario (sin la contraseña) para usarlo en los controladores
    req.usuario = await User.findById(decoded.id).select("-password");
    if (!req.usuario) {
      return res.status(401).json({ mensaje: "El usuario ya no existe" });
    }
    next();
  } catch (error) {
    return res.status(401).json({ mensaje: "Token inválido o expirado" });
  }
};

// Restringe una ruta a ciertos roles. Ej: permitirRoles("local")
const permitirRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.usuario.rol)) {
      return res
        .status(403)
        .json({ mensaje: "No tienes permiso para realizar esta acción" });
    }
    next();
  };
};

module.exports = { proteger, permitirRoles };
