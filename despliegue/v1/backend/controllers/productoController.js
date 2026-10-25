const Producto = require("../models/Producto.js");

// GET /api/recursos  (con filtrado opcional por categoria o nombre)
async function listarProductos(req, res) {
  try {
    const filtro = {};

    if (req.query.categoria) {
      filtro.categoria = req.query.categoria;
    }

    if (req.query.nombre) {
      // búsqueda parcial, sin distinguir mayúsculas/minúsculas
      filtro.nombre = { $regex: req.query.nombre, $options: "i" };
    }

    const productos = await Producto.find(filtro);
    res.status(200).json(productos);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al listar los productos.", error: error.message });
  }
}

// GET /api/recursos/:id
async function obtenerProducto(req, res) {
  try {
    const producto = await Producto.findById(req.params.id);

    if (!producto) {
      return res.status(404).json({ mensaje: "Producto no encontrado." });
    }

    res.status(200).json(producto);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al obtener el producto.", error: error.message });
  }
}

// POST /api/recursos
async function crearProducto(req, res) {
  try {
    const { nombre, categoria, precio, disponible } = req.body;

    if (!nombre || !categoria || precio === undefined) {
      return res.status(400).json({ mensaje: "Nombre, categoría y precio son obligatorios." });
    }

    const nuevoProducto = await Producto.create({ nombre, categoria, precio, disponible });
    res.status(201).json(nuevoProducto);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al crear el producto.", error: error.message });
  }
}

// PUT /api/recursos/:id
async function actualizarProducto(req, res) {
  try {
    const productoActualizado = await Producto.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!productoActualizado) {
      return res.status(404).json({ mensaje: "Producto no encontrado." });
    }

    res.status(200).json(productoActualizado);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al actualizar el producto.", error: error.message });
  }
}

// DELETE /api/recursos/:id
async function eliminarProducto(req, res) {
  try {
    const productoEliminado = await Producto.findByIdAndDelete(req.params.id);

    if (!productoEliminado) {
      return res.status(404).json({ mensaje: "Producto no encontrado." });
    }

    res.status(200).json({ mensaje: "Producto eliminado correctamente." });
  } catch (error) {
    res.status(500).json({ mensaje: "Error al eliminar el producto.", error: error.message });
  }
}

module.exports = {
  listarProductos,
  obtenerProducto,
  crearProducto,
  actualizarProducto,
  eliminarProducto,
};
