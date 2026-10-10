require("dotenv").config();
const express = require("express");
const cors = require("cors");
const conectarDB = require("./config/db.js");
const authRoutes = require("./routes/authRoutes.js");
const productoRoutes = require("./routes/productoRoutes.js");

const app = express();

app.use(cors());
app.use(express.json());

conectarDB();

app.get("/", (req, res) => {
  res.json({ mensaje: "API de Ferretería El Tornillo funcionando correctamente." });
});

app.use("/api/auth", authRoutes);
app.use("/api/recursos", productoRoutes);

const PUERTO = process.env.PORT || 5000;

app.listen(PUERTO, () => {
  console.log(`Servidor corriendo en el puerto ${PUERTO}`);
});
