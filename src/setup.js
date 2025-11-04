const request = require('supertest');
require('dotenv').config();

before(async function () {
  this.timeout(10000); // aumenta timeout para chamadas de rede

  // import dinâmico do chai (ESM) dentro do hook para evitar ERR_REQUIRE_ESM
  const { expect } = await import('chai');

  console.log('🚀 Iniciando setup de testes...');

  if (!process.env.BASE_URL) {
    throw new Error('BASE_URL não está definida. Verifique o .env');
  }

  try {
    const res = await request(process.env.BASE_URL)
      .post('/api/usuarios/register')
      .send({
        name: 'Maria',
        email: 'maria@email.com',
        senha: '123456'
      });

    expect(res.status).to.be.oneOf([200, 201]);
    console.log('✅ Usuário de teste criado com sucesso!');
  } catch (err) {
    console.error('❌ Erro no setup de testes:', err.message || err);
    throw err;
  }
});
