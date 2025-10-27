const readingService = require('../service/readingService');

async function updateStatus(req, res) {
  const usuarioId = req.user.id;
  const { livroId, paginaAtual } = req.body;
  if (!livroId || typeof paginaAtual !== 'number') {
    return res.status(400).json({ message: 'Campos obrigatórios não preenchidos' });
  }
  const status = readingService.updateStatus({ usuarioId, livroId, paginaAtual });
  res.json(status);
}

async function getStatus(req, res) {
  const usuarioId = req.user.id;
  const { livroId } = req.params;
  const status = readingService.getStatus(usuarioId, parseInt(livroId));
  if (!status) return res.status(404).json({ message: 'Status não encontrado' });
  res.json(status);
}

module.exports = { updateStatus, getStatus };
