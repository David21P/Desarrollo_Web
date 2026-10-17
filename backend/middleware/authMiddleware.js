const jwt = require("jsonwebtoken");

function verificarToken(req, res, next) {
  const encabezado = req.headers.authorization;

  if (!encabezado || !encabezado.startsWith("Bearer ")) {
    return res.status(401).json({
      error: "token_requerido",
      message: "Se requiere un token de autenticación.",
    });
  }

  const token = encabezado.split(" ")[1];

  try {
    req.usuario = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        error: "token_expired",
        message: "La sesión ha expirado o ya no es válida. Por favor, inicie sesión nuevamente.",
      });
    }
    return res.status(401).json({
      error: "token_invalido",
      message: "Token inválido.",
    });
  }
}

module.exports = verificarToken;