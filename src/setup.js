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
    // Tentativa de criação do usuário de teste (pode já existir)
    const resUsuario = await request(process.env.BASE_URL)
      .post('/api/usuarios/register')
      .send({
        nome: 'Maria',
        email: 'maria@email.com',
        senha: '123456'
      });

    if (resUsuario.status === 201) {
      console.log('✅ Usuário de teste criado com sucesso!');
    } else if (resUsuario.status === 400 && resUsuario.body.message === 'E-mail já cadastrado') {
      console.log('ℹ️ Usuário de teste já existe, continuando...');
    } else {
      expect(resUsuario.status).to.be.oneOf([200, 201]);
    }

    // Login para obter o token
    const resLogin = await request(process.env.BASE_URL)
      .post('/api/usuarios/login')
      .send({
        email: 'maria@email.com',
        senha: '123456'
      });

    expect(resLogin.status).to.be.oneOf([200, 201]);
    expect(resLogin.body).to.have.property('token');
    console.log('✅ Login realizado com sucesso!');

    const token = resLogin.body.token;

    // Cadastro de livro vinculado ao usuário
    const resLivro = await request(process.env.BASE_URL)
      .post('/api/livros')
      .set('Authorization', `Bearer ${token}`)
      .set('Content-Type', 'application/json')
      .send({
        titulo: 'Dom Casmurro',
        autor: 'Machado de Assis',
        paginas: 256
      });

    expect(resLivro.status).to.be.oneOf([200, 201]);
    expect(resLivro.body).to.have.property('titulo', 'Dom Casmurro');
    expect(resLivro.body).to.have.property('autor', 'Machado de Assis');
    expect(resLivro.body).to.have.property('paginas', 256);
    console.log('✅ Livro de teste cadastrado com sucesso!');

  } catch (err) {
    console.error('❌ Erro no setup de testes:', err.message || err);
    throw err;
  }
});

after(async function () {
  this.timeout(10000); // aumenta timeout para chamadas de rede

  // import dinâmico do chai (ESM) dentro do hook para evitar ERR_REQUIRE_ESM
  const { expect } = await import('chai');

  console.log('🧹 Iniciando limpeza de dados de teste...');

  if (!process.env.BASE_URL) {
    return;
  }

  try {
    // Login para obter o token
    const resLogin = await request(process.env.BASE_URL)
      .post('/api/usuarios/login')
      .send({
        email: 'maria@email.com',
        senha: '123456'
      });

    if (resLogin.status === 200 || resLogin.status === 201) {
      const token = resLogin.body.token;
      
      // Buscar e deletar livros do usuário de teste
      const resLivros = await request(process.env.BASE_URL)
        .get('/api/livros')
        .set('Authorization', `Bearer ${token}`);

      if (resLivros.status === 200 && Array.isArray(resLivros.body)) {
        for (const livro of resLivros.body) {
          try {
            await request(process.env.BASE_URL)
              .delete(`/api/livros/${livro.id}`)
              .set('Authorization', `Bearer ${token}`);
          } catch (deleteErr) {
            // Continua mesmo se não conseguir deletar um livro específico
            console.log(`⚠️ Não foi possível deletar o livro ${livro.id}`);
          }
        }
        console.log('✅ Livros de teste removidos');
      }

      // Deletar avaliações do usuário de teste (se houver endpoint)
      try {
        await request(process.env.BASE_URL)
          .delete('/api/avaliacao/usuario')
          .set('Authorization', `Bearer ${token}`);
        console.log('✅ Avaliações de teste removidas');
      } catch (deleteErr) {
        // Endpoint pode não existir, continua normalmente
      }

      // Deletar leituras do usuário de teste (se houver endpoint)
      try {
        await request(process.env.BASE_URL)
          .delete('/api/leitura/usuario')
          .set('Authorization', `Bearer ${token}`);
        console.log('✅ Leituras de teste removidas');
      } catch (deleteErr) {
        // Endpoint pode não existir, continua normalmente
      }

      // Deletar o usuário de teste (se houver endpoint)
      try {
        await request(process.env.BASE_URL)
          .delete('/api/usuarios')
          .set('Authorization', `Bearer ${token}`);
        console.log('✅ Usuário de teste removido');
      } catch (deleteErr) {
        // Endpoint pode não existir, continua normalmente
        console.log('ℹ️ Usuário de teste mantido (endpoint de deleção não disponível)');
      }

    } else {
      console.log('ℹ️ Não foi possível fazer login para limpeza - usuário pode já ter sido removido');
    }

    console.log('🧹 Limpeza de dados finalizada');

  } catch (err) {
    console.log('⚠️ Erro durante limpeza de dados:', err.message || err);
    // Não falha o teste por causa de erro na limpeza
  }
});
