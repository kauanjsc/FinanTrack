const express = require("express");
const cors = require("cors");
require("dotenv").config();
const sequelize = require("./config/database");

const authRoutes = require("./routes/auth");
const transactionRoutes = require("./routes/transactionRoutes"); // ✅ NOVO

const app = express();

app.use(cors());
app.use(express.json());

// Rotas públicas
app.use("/api/auth", authRoutes);

// Rotas protegidas (JWT)
app.use("/api/transactions", transactionRoutes); // ✅ NOVO

// Rota de teste
app.get("/", (req, res) => {
  res.send("API do FinanTrack rodando!");
});

// Sincroniza banco e inicia servidor
sequelize
  .sync()
  .then(() => {
    app.listen(process.env.PORT, () =>
      console.log(`Servidor rodando na porta ${process.env.PORT}`)
    );
  })
  .catch((err) => console.error("Erro ao conectar no banco:", err));
