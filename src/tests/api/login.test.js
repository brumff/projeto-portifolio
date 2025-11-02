const request = require('supertest');
const { expect } = require('chai')
require('dotenv').config()
const postLogin = require('../../fixtures/postLogin.json');

describe('Teste de Login de Usuário', () => {
    describe('POST /api/usuarios/login', () => {
        it('Deve retornar sucesso com 200 quando informando e-mail e senha válidos', async () => {
            const bodyLogin = { ...postLogin }
            bodyLogin.email = 'joao@email.com';
            bodyLogin.senha = '123456';

            const resposta = await request(process.env.BASE_URL)
                .post('/api/usuarios/login')
                .send(bodyLogin)

            expect(resposta.status).to.equal(200);
            expect(resposta.body.token).to.be.a('string');
        });

        it('Deve retornar erro com 401 quando e-mail e senha não estão cadastrados no sistema', async () => {
            const bodyLogin = { ...postLogin }
            bodyLogin.email = 'maria@email.com';
            bodyLogin.senha = '123456';
            const resposta = await request(process.env.BASE_URL)
                .post('/api/usuarios/login')
                .send(bodyLogin)

            expect(resposta.status).to.equal(401);
            expect(resposta.body).to.have.property('message', 'E-mail ou senha inválidos');
        });

        it('Deve retornar erro com 400 quando campos e-mail e senha estão vazios', async () => {
            const bodyLogin = { ...postLogin }
            const resposta = await request(process.env.BASE_URL)
                .post('/api/usuarios/login')
                .send(bodyLogin)

            expect(resposta.status).to.equal(400);

        });
    });
});


