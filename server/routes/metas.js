const express = require("express");
const router = express.Router();
const Meta = require("../models/Meta");
const authenticateJWT = require("../middleware/authenticateJWT"); // importe o middleware

// Criar nova meta (associada ao usuário autenticado)
router.post("/", authenticateJWT, async (req, res) => {
  try {
    const novaMeta = await Meta.create({
      ...req.body,
      usuario_id: req.user.id,  // associa àquele usuário
    });
    res.status(201).json(novaMeta);
  } catch (error) {
    res.status(400).json({ erro: "Erro ao criar meta", detalhes: error.message });
  }
});

// Listar todas as metas do usuário autenticado
router.get("/", authenticateJWT, async (req, res) => {
  try {
    const metas = await Meta.findAll({
      where: { usuario_id: req.user.id }
    });
    res.json(metas);
  } catch (error) {
    res.status(500).json({ erro: "Erro ao buscar metas" });
  }
});

// Buscar meta por ID (verificando que pertence ao usuário)
router.get("/:id", authenticateJWT, async (req, res) => {
  try {
    const meta = await Meta.findOne({
      where: { id: req.params.id, usuario_id: req.user.id }
    });
    if (!meta) return res.status(404).json({ erro: "Meta não encontrada" });
    res.json(meta);
  } catch (error) {
    res.status(500).json({ erro: "Erro ao buscar meta" });
  }
});

// Deletar meta (só se pertencer ao usuário)
router.delete("/:id", authenticateJWT, async (req, res) => {
  try {
    const meta = await Meta.findOne({
      where: { id: req.params.id, usuario_id: req.user.id }
    });
    if (!meta) return res.status(404).json({ erro: "Meta não encontrada" });

    await meta.destroy();
    res.json({ mensagem: "Meta deletada com sucesso" });
  } catch (error) {
    res.status(500).json({ erro: "Erro ao deletar meta" });
  }
});

module.exports = router;
