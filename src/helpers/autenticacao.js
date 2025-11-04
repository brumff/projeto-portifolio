const request = require('supertest');
const postLogin = require('../fixtures/postLogin.json');

const obterToken = async (usuario, senha) => {
    const bodyLogin = { ...postLogin }
    bodyLogin.email = usuario;
    bodyLogin.senha = senha;

    const respostaLogin = await request(process.env.BASE_URL)
        .post('/api/usuarios/login')
        .set('Content-Type', 'application/json')
        .send(bodyLogin)

    return respostaLogin.body.token
}

module.exports = {
    obterToken
}