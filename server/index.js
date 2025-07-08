const express = require("express");
const cors = require("cors");
require("dotenv").config();
const sequelize = require("./config/db");

const authRoutes = require("./routes/auth");

const app = express();

app.use(cors());
app.use(express.json());

// Rotas da API
app.use("/api/auth", authRoutes);

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
