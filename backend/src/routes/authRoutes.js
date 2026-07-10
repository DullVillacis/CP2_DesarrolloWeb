const express = require("express");
const { body } = require("express-validator");
const { registrar, login, perfil } = require("../controllers/authController");
const validarCampos = require("../middleware/validar");
const { proteger } = require("../middleware/authMiddleware");

const router = express.Router();

router.post(
  "/register",
  [
    body("nombre").notEmpty().withMessage("El nombre es obligatorio"),
    body("email").isEmail().withMessage("El email no es válido"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("La contraseña debe tener al menos 6 caracteres"),
    body("rol")
      .isIn(["local", "consumidor"])
      .withMessage("El rol debe ser 'local' o 'consumidor'"),
  ],
  validarCampos,
  registrar
);

router.post(
  "/login",
  [
    body("email").isEmail().withMessage("El email no es válido"),
    body("password").notEmpty().withMessage("La contraseña es obligatoria"),
  ],
  validarCampos,
  login
);

router.get("/perfil", proteger, perfil);

module.exports = router;
