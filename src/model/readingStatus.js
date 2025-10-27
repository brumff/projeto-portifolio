const db = require('./database');

function updateReadingStatus({ usuarioId, livroId, paginaAtual }) {
  let status = db.readingStatus.find(s => s.usuarioId === usuarioId && s.livroId === livroId);
  if (!status) {
    status = { usuarioId, livroId, paginaAtual };
    db.readingStatus.push(status);
  } else {
    status.paginaAtual = paginaAtual;
  }
  return status;
}

function getReadingStatus(usuarioId, livroId) {
  return db.readingStatus.find(s => s.usuarioId === usuarioId && s.livroId === livroId);
}

module.exports = { updateReadingStatus, getReadingStatus };
