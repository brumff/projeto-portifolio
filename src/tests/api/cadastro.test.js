const request = require('supertest');
const { expect } = require('chai')
require('dotenv').config()
const postCadastro = require('../../fixtures/postCadastro.json');

describe('Teste de Cadastro de Usuário', () => {
    describe('POST /api/usuarios/register', () => {
        it('Deve retornar sucesso com 201 quando informando e-mail, nome e senha válidos', async () => {
            const bodyCadastro = { ...postCadastro }
            bodyCadastro.nome = 'João da Silva';
            bodyCadastro.email = 'joao@email.com';
            bodyCadastro.senha = '123456';

            const resposta = await request(process.env.BASE_URL)
                .post('/api/usuarios/register')
                .send(bodyCadastro)

            expect(resposta.status).to.equal(201);
            expect(resposta.body).to.have.property('id');
            expect(resposta.body).to.have.property('nome', bodyCadastro.nome);
            expect(resposta.body).to.have.property('email', bodyCadastro.email);
        });

        it('Deve retornar erro com 400 quando campos e-mail, nome e senha estão vazios', async () => {
            const bodyCadastro = { ...postCadastro }
            const resposta = await request(process.env.BASE_URL)
                .post('/api/usuarios/register')
                .send(bodyCadastro)

            expect(resposta.status).to.equal(400);

        });

        it.only('Deve retornar erro com 400 quando e-mail informado já está cadastrado no sistema', async () => {
            const bodyCadastro = { ...postCadastro }
            bodyCadastro.nome = 'João da Silva';
            bodyCadastro.email = 'joao@email.com';
            bodyCadastro.senha = '123456';

            const resposta = await request(process.env.BASE_URL)
                .post('/api/usuarios/register')
                .send(bodyCadastro)

            expect(resposta.status).to.equal(400);
           expect(resposta.body).to.have.property('message', 'E-mail já cadastrado');
        });
    });
});


