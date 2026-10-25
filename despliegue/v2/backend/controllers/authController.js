const bcrypt = require("bcryptjs");
const User = require("../models/User.js");
const jwt = require("jsonwebtoken");

// POST /api/auth/register
async function registrar(req, res) {
  try {
    const { nombre, correo, contrasena, rol } = req.body;

    if (!nombre || !correo || !contrasena) {
      return res.status(400).json({ mensaje: "Nombre, correo y contraseña son obligatorios." });
    }

    const existeUsuario = await User.findOne({ correo });
    if (existeUsuario) {
      return res.status(400).json({ mensaje: "Ya existe un usuario con ese correo." });
    }

    const salt = await bcrypt.genSalt(10);
    const contrasenaEncriptada = await bcrypt.hash(contrasena, salt);

    const nuevoUsuario = await User.create({
      nombre,
      correo,
      contrasena: contrasenaEncriptada,
      rol: rol || "cliente",
    });

    // Nunca se devuelve la contraseña en la respuesta
    res.status(201).json({
      _id: nuevoUsuario._id,
      nombre: nuevoUsuario.nombre,
      correo: nuevoUsuario.correo,
      rol: nuevoUsuario.rol,
      createdAt: nuevoUsuario.createdAt,
    });
  } catch (error) {
    res.status(500).json({ mensaje: "Error al registrar el usuario.", error: error.message });
  }
}

// POST /api/auth/login
async function iniciarSesion(req, res) {
  try {
    const { correo, contrasena } = req.body;

    if (!correo || !contrasena) {
      return res.status(400).json({ mensaje: "Correo y contraseña son obligatorios." });
    }

    const usuario = await User.findOne({ correo });
    if (!usuario) {
      return res.status(401).json({ mensaje: "Credenciales inválidas." });
    }

    const coincide = await bcrypt.compare(contrasena, usuario.contrasena);
    if (!coincide) {
      return res.status(401).json({ mensaje: "Credenciales inválidas." });
    }

    const token = jwt.sign(
      { id: usuario._id, email: usuario.correo, role: usuario.rol },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    res.status(200).json({
      token,
      _id: usuario._id,
      nombre: usuario.nombre,
      correo: usuario.correo,
      rol: usuario.rol,
      createdAt: usuario.createdAt,
    });
  } catch (error) {
    res.status(500).json({ mensaje: "Error al iniciar sesión.", error: error.message });
  }
}

module.exports = { registrar, iniciarSesion };
