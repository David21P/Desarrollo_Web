const express = require("express");
const { registrar, iniciarSesion } = require("../controllers/authController.js");

const router = express.Router();

router.post("/register", registrar);
router.post("/login", iniciarSesion);

module.exports = router;
