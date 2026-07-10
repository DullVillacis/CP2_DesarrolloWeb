const { validationResult } = require("express-validator");

// Revisa los resultados de express-validator. Si hay errores, corta y responde 400
const validarCampos = (req, res, next) => {
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(400).json({
      errores: errores.array().map((e) => e.msg),
    });
  }
  next();
};

module.exports = validarCampos;
