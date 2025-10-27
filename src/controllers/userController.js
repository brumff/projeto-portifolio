const userService = require('../service/userService');
const jwt = require('jsonwebtoken');
const { SECRET } = require('../middleware/auth');

async function register(req, res) {
  try {
    const user = userService.registerUser(req.body);
    res.status(201).json({ id: user.id, nome: user.nome, email: user.email });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

async function login(req, res) {
  const { email, senha } = req.body;
  const user = userService.getUserByEmail(email);
  if (!user || user.senha !== senha) {
    return res.status(401).json({ message: 'E-mail ou senha inválidos' });
  }
  const token = jwt.sign({ id: user.id, email: user.email }, SECRET, { expiresIn: '1h' });
  res.json({ token });
}

module.exports = { register, login };
