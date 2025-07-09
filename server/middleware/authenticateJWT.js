// server/middleware/authenticateJWT.js
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET; // sua chave secreta no .env

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "Token não fornecido" });
  }

  const token = authHeader.split(" ")[1]; // espera 'Bearer <token>'

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Token inválido" });
    }

    req.user = user; // adiciona o payload do token na requisição
    next(); // deixa a requisição seguir para a rota protegida
  });
};
