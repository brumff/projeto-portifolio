const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');
const bookRoutes = require('./routes/bookRoutes');
const readingRoutes = require('./routes/readingRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const path = require('path');
const cors = require('cors');

const swaggerDocument = YAML.load(path.join(__dirname, '../recursos/swagger.yaml'));

const app = express();

// ⚡ CORS precisa vir antes das rotas
app.use(cors({
  // origin: 'http://192.168.1.103:4000', // use o domínio do frontend em produção
  origin: '*',
  credentials: true
}));

app.use(bodyParser.json());

// Rotas
app.use('/api/usuarios', userRoutes);
app.use('/api/livros', bookRoutes);
app.use('/api/leitura', readingRoutes);
app.use('/api/avaliacao', reviewRoutes);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get('/', (req, res) => {
  res.send('API de Livros - Consulte /api-docs para documentação');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
