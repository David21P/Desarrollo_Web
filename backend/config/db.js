const mongoose = require("mongoose");

// Conecta a MongoDB Atlas usando la cadena de conexión guardada en .env
async function conectarDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB conectado correctamente");
  } catch (error) {
    console.error("Error al conectar a MongoDB:", error.message);
    process.exit(1);
  }
}

module.exports = conectarDB;
