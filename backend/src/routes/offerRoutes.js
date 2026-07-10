const express = require("express");
const { body } = require("express-validator");
const {
  crearOferta,
  obtenerOfertas,
  obtenerMisOfertas,
  obtenerOfertaPorId,
  actualizarOferta,
  eliminarOferta,
} = require("../controllers/offerController");
const validarCampos = require("../middleware/validar");
const { proteger, permitirRoles } = require("../middleware/authMiddleware");

const router = express.Router();

// Validaciones para crear una oferta
const validarOferta = [
  body("titulo").notEmpty().withMessage("El título es obligatorio"),
  body("descripcion").notEmpty().withMessage("La descripción es obligatoria"),
  body("categoria")
    .isIn([
      "panaderia",
      "comida_preparada",
      "frutas_verduras",
      "lacteos",
      "bebidas",
      "otros",
    ])
    .withMessage("Categoría inválida"),
  body("precioOriginal")
    .isFloat({ min: 0 })
    .withMessage("El precio original debe ser un número positivo"),
  body("precioDescuento")
    .isFloat({ min: 0 })
    .withMessage("El precio con descuento debe ser un número positivo"),
  body("cantidadDisponible")
    .isInt({ min: 0 })
    .withMessage("La cantidad debe ser un número entero positivo"),
  body("horarioRetiro")
    .notEmpty()
    .withMessage("El horario de retiro es obligatorio"),
  body("disponibleHasta")
    .isISO8601()
    .withMessage("La fecha de disponibilidad no es válida"),
];

// Todas las rutas de ofertas requieren estar autenticado
router.use(proteger);

// Consultas (cualquier usuario autenticado)
router.get("/", obtenerOfertas);
router.get("/mias", permitirRoles("local"), obtenerMisOfertas); // antes de "/:id"
router.get("/:id", obtenerOfertaPorId);

// Escritura (solo locales)
router.post("/", permitirRoles("local"), validarOferta, validarCampos, crearOferta);
router.put("/:id", permitirRoles("local"), actualizarOferta);
router.delete("/:id", permitirRoles("local"), eliminarOferta);

module.exports = router;
