const request = require('supertest');
const { expect } = require('chai')
require('dotenv').config()
const postLivros = require('../../fixtures/postLivros.json');
const { obterToken } = require('../../helpers/autenticacao')

describe('Teste de Livros', () => {
    let token

    beforeEach(async () => {
        token = await obterToken('joao@email.com', '123456')
    })

    describe('POST /api/livros', () => {
        it('Deve retornar sucesso com 201 quando titulo, autor, paginas e token do usuário são informados corretamente', async () => {
            const bodyLivros = { ...postLivros }
            bodyLivros.titulo = 'O Alquimista';
            bodyLivros.autor = 'Paulo Coelho';
            bodyLivros.paginas = 197;
            const resposta = await request(process.env.BASE_URL)
                .post('/api/livros')
                .set('Authorization', 'Bearer ' + token)
                .set('Content-Type', 'application/json')
                .send(bodyLivros)
            expect(resposta.status).to.equal(201);
            expect(resposta.body.titulo).to.equal('O Alquimista');
            expect(resposta.body.autor).to.equal('Paulo Coelho');
            expect(resposta.body.paginas).to.equal(197);
        });

        it('Deve retornar erro com 401 não for informado o token do usuário corretamente e informado titulo, autor e paginas corretamente', async () => {
            const bodyLivros = { ...postLivros }
            bodyLivros.titulo = 'O Alquimista';
            bodyLivros.autor = 'Paulo Coelho';
            bodyLivros.paginas = 197;
            const resposta = await request(process.env.BASE_URL)
                .post('/api/livros')
                .set('Content-Type', 'application/json')
                .send(bodyLivros)
            expect(resposta.status).to.equal(401);
            expect(resposta.body).to.have.property('message', 'Token não fornecido');
        });

        it('Deve retornar erro com 400 quando campos titulo, autor, paginas estão vazios e token do usuário informado', async () => {
            const bodyLivros = { ...postLivros }
            bodyLivros.titulo = '';
            bodyLivros.autor = '';
            const resposta = await request(process.env.BASE_URL)
                .post('/api/livros')
                .set('Authorization', 'Bearer ' + token)
                .set('Content-Type', 'application/json')
                .send(bodyLivros)
            expect(resposta.status).to.equal(400);
        });

        describe('GET /api/livros', () => {
            it('Deve retornar sucesso com 200 quando token do usuário informado e listar os livros cadastrados pelo usuário', async () => {
                const resposta = await request(process.env.BASE_URL)
                    .get('/api/livros')
                    .set('Authorization', 'Bearer ' + token)
                expect(resposta.status).to.equal(200);
                console.log('Resposta GET /api/livros:', resposta.body);

            });

            it('Deve retornar erro com 401 quando token do usuário não é informado', async () => {
                const resposta = await request(process.env.BASE_URL)
                    .get('/api/livros')
                expect(resposta.status).to.equal(401);
                expect(resposta.body).to.have.property('message', 'Token não fornecido');
            });
        })

    });
});


