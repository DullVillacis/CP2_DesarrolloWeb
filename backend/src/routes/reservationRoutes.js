const express = require("express");
const { body } = require("express-validator");
const {
  crearReserva,
  misReservas,
  reservasDeMiLocal,
  cancelarReserva,
  completarReserva,
} = require("../controllers/reservationController");
const validarCampos = require("../middleware/validar");
const { proteger, permitirRoles } = require("../middleware/authMiddleware");

const router = express.Router();

router.use(proteger);

router.post(
  "/",
  permitirRoles("consumidor"),
  [
    body("oferta").notEmpty().withMessage("La oferta es obligatoria"),
    body("cantidad")
      .optional()
      .isInt({ min: 1 })
      .withMessage("La cantidad debe ser al menos 1"),
  ],
  validarCampos,
  crearReserva
);
router.get("/mias", permitirRoles("consumidor"), misReservas);
router.put("/:id/cancelar", permitirRoles("consumidor"), cancelarReserva);

router.get("/local", permitirRoles("local"), reservasDeMiLocal);
router.put("/:id/completar", permitirRoles("local"), completarReserva);

module.exports = router;
