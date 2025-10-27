const { updateReadingStatus, getReadingStatus } = require('../model/readingStatus');

function updateStatus(data) {
  return updateReadingStatus(data);
}

function getStatus(usuarioId, livroId) {
  return getReadingStatus(usuarioId, livroId);
}

module.exports = { updateStatus, getStatus };
