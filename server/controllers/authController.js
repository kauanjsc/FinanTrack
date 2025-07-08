const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");


const JWT_SECRET = process.env.JWT_SECRET;

exports.register = async (req, res) => {
  const { nome, email, senha } = req.body;

  try {
    // Verifica se o email já existe
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "Email já cadastrado." });
    }

    // Criptografa a senha
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(senha, salt);

    // Cria o usuário
    const user = await User.create({
      nome,
      email,
      senha: hashedPassword,
    });

    res.status(201).json({ message: "Usuário criado com sucesso." });
  } catch (error) {
    res.status(500).json({ message: "Erro ao criar usuário.", error });
  }
};

exports.login = async (req, res) => {
  const { email, senha } = req.body;

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(400).json({ message: "Credenciais inválidas." });
    }

    // Compara senha
    const isMatch = await bcrypt.compare(senha, user.senha);
    if (!isMatch) {
      return res.status(400).json({ message: "Credenciais inválidas." });
    }

    // Gera token JWT
    const token = jwt.sign({ id: user.id, nome: user.nome }, JWT_SECRET, {
      expiresIn: "1d",
    });

    res.json({ token, user: { id: user.id, nome: user.nome, email: user.email } });
  } catch (error) {
    res.status(500).json({ message: "Erro ao fazer login.", error });
  }
};
