const express = require("express");
const {
  listarProductos,
  obtenerProducto,
  crearProducto,
  actualizarProducto,
  eliminarProducto,
} = require("../controllers/productoController.js");
const verificarToken = require("../middleware/authMiddleware.js");

const router = express.Router();

router.get("/", listarProductos);
router.get("/:id", obtenerProducto);
router.post("/", verificarToken, crearProducto);
router.put("/:id", verificarToken, actualizarProducto);
router.delete("/:id", verificarToken, eliminarProducto);

module.exports = router;