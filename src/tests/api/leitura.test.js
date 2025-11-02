const request = require('supertest');
const { expect } = require('chai')
require('dotenv').config()
const postLeitura = require('../../fixtures/postLeitura.json');
const { obterToken } = require('../../helpers/autenticacao')

describe('Teste de Leitura', () => {
    let token

    beforeEach(async () => {
        token = await obterToken('joao@email.com', '123456')
    })

    describe('POST /api/leitura', () => {
        it('Deve retornar sucesso com 200 quando livroId, paginaAtual e token do usuário são informados corretamente', async () => {
            const bodyLeitura = { ...postLeitura }
            bodyLeitura.livroId = 2;
            bodyLeitura.paginaAtual = 10;
            const resposta = await request(process.env.BASE_URL)
                .post('/api/leitura')
                .set('Authorization', 'Bearer ' + token)
                .set('Content-Type', 'application/json')
                .send(bodyLeitura)
            expect(resposta.status).to.equal(200);
        });

        it('Deve retornar erro com 401 quando não for informado o token do usuário corretamente e informado livroId e paginaAtual corretamente', async () => {
            const bodyLeitura = { ...postLeitura }
            bodyLeitura.livroId = 2;
            bodyLeitura.paginaAtual = 10;
            const resposta = await request(process.env.BASE_URL)
                .post('/api/leitura')
                .set('Content-Type', 'application/json')
                .send(bodyLeitura)
            expect(resposta.status).to.equal(401);
            expect(resposta.body).to.have.property('message', 'Token não fornecido');
        });

        it('Deve retornar erro com 400 quando for informado o token do usuário corretamente e informado livroId e paginaAtual vazios', async () => {
            const bodyLeitura = { ...postLeitura }
            bodyLeitura.livroId = '';
            bodyLeitura.paginaAtual = ''
            const resposta = await request(process.env.BASE_URL)
                .post('/api/leitura')
                .set('Authorization', 'Bearer ' + token)
                .set('Content-Type', 'application/json')
                .send(bodyLeitura)
            expect(resposta.status).to.equal(400);
        });

        describe('GET /api/leitura', () => {
            it('Deve retornar sucesso com 200 quando token do usuário informado e apresentar status da leitura', async () => {
                const livroId = 2;
                const resposta = await request(process.env.BASE_URL)
                    .get(`/api/leitura/${livroId}`)
                    .set('Authorization', 'Bearer ' + token)
                expect(resposta.status).to.equal(200);
                expect(resposta.body.livroId).to.be.a('number');
                expect(resposta.body.paginaAtual).to.be.a('number');

            });

            it('Deve retornar erro com 401 quando não for informado o token do usuário corretamente e não apresentar status da leitura', async () => {
                const livroId = 2;
                const resposta = await request(process.env.BASE_URL)
                    .get(`/api/leitura/${livroId}`)
                expect(resposta.status).to.equal(401);
                expect(resposta.body).to.have.property('message', 'Token não fornecido');

            });

        })

    });
});


