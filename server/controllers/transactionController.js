const Transaction = require("../models/Transaction");

exports.getAllTransactions = async (req, res) => {
  try {
    const usuarioId = req.user.id;
    const transactions = await Transaction.findAll({ where: { usuarioId }, order: [["data", "DESC"]] });
    res.json(transactions);
  } catch {
    res.status(500).json({ message: "Erro ao buscar transações" });
  }
};

exports.getTransactionById = async (req, res) => {
  try {
    const { id } = req.params;
    const usuarioId = req.user.id;
    const transaction = await Transaction.findOne({ where: { id, usuarioId } });
    if (!transaction) return res.status(404).json({ message: "Transação não encontrada" });
    res.json(transaction);
  } catch {
    res.status(500).json({ message: "Erro ao buscar transação" });
  }
};

exports.createTransaction = async (req, res) => {
  try {
    const usuarioId = req.user.id;
    const { tipo, categoria, descricao, valor, data } = req.body;

    const newTransaction = await Transaction.create({ tipo, categoria, descricao, valor, data, usuarioId });
    res.status(201).json(newTransaction);
  } catch {
    res.status(500).json({ message: "Erro ao criar transação" });
  }
};

exports.updateTransaction = async (req, res) => {
  try {
    const { id } = req.params;
    const usuarioId = req.user.id;
    const { tipo, categoria, descricao, valor, data } = req.body;

    const transaction = await Transaction.findOne({ where: { id, usuarioId } });
    if (!transaction) return res.status(404).json({ message: "Transação não encontrada" });

    transaction.tipo = tipo;
    transaction.categoria = categoria;
    transaction.descricao = descricao;
    transaction.valor = valor;
    transaction.data = data;

    await transaction.save();
    res.json(transaction);
  } catch {
    res.status(500).json({ message: "Erro ao atualizar transação" });
  }
};

exports.deleteTransaction = async (req, res) => {
  try {
    const { id } = req.params;
    const usuarioId = req.user.id;

    const transaction = await Transaction.findOne({ where: { id, usuarioId } });
    if (!transaction) return res.status(404).json({ message: "Transação não encontrada" });

    await transaction.destroy();
    res.json({ message: "Transação deletada com sucesso" });
  } catch {
    res.status(500).json({ message: "Erro ao deletar transação" });
  }
};
