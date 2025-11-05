const request = require('supertest');
const { expect } = require('chai')
require('dotenv').config()
const postAvaliacao = require('../../fixtures/postAvaliacao.json');
const { obterToken } = require('../../helpers/autenticacao')

describe('Teste de Avaliação', () => {
    let token

    beforeEach(async () => {
        token = await obterToken('maria@email.com', '123456')
    })

    describe('POST /api/avaliacao', () => {
        it('Deve retornar sucesso com 201 quando livroId, nota, comentario e token do usuário são informados corretamente', async () => {
            const bodyAvaliacao = { ...postAvaliacao }
            bodyAvaliacao.livroId = 1;
            bodyAvaliacao.nota = 5;
            bodyAvaliacao.comentario = "Ótimo livro!";
            const resposta = await request(process.env.BASE_URL)
                .post('/api/avaliacao')
                .set('Authorization', 'Bearer ' + token)
                .set('Content-Type', 'application/json')
                .send(bodyAvaliacao)
            expect(resposta.status).to.equal(201);
        });

        it('Deve retornar erro com 401 quando não for informado o token do usuário corretamente e informado livroId, nota e comentario corretamente', async () => {
            const bodyAvaliacao = { ...postAvaliacao }
            bodyAvaliacao.livroId = 1;
            bodyAvaliacao.nota = 5;
            bodyAvaliacao.comentario = "Ótimo livro!";
            const resposta = await request(process.env.BASE_URL)
                .post('/api/avaliacao')
                .set('Content-Type', 'application/json')
                .send(bodyAvaliacao)
            expect(resposta.status).to.equal(401);
            expect(resposta.body).to.have.property('message', 'Token não fornecido');
        });

        it('Deve retornar erro com 400 quando for informado o token do usuário corretamente e informado livroId, nota e comentario vazios', async () => {
            const bodyAvaliacao = { ...postAvaliacao }
            bodyAvaliacao.livroId = '';
            bodyAvaliacao.nota = '';
            bodyAvaliacao.comentario = '';
            const resposta = await request(process.env.BASE_URL)
                .post('/api/avaliacao')
                .set('Authorization', 'Bearer ' + token)
                .set('Content-Type', 'application/json')
                .send(bodyAvaliacao)
            expect(resposta.status).to.equal(400);
            expect(resposta.body).to.have.property('message', 'Campos obrigatórios não preenchidos');
        });

        describe('GET /api/avaliacao', () => {
            it('Deve retornar sucesso com 200 quando token do usuário informado e apresentar avaliação do livro', async () => {
                const livroId = 1;
                const resposta = await request(process.env.BASE_URL)
                    .get(`/api/avaliacao/${livroId}`)
                    .set('Authorization', 'Bearer ' + token)
                expect(resposta.status).to.equal(200);
            });

        })

    });
});


