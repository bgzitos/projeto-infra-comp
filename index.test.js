const request = require('supertest');
const { app, server} = require('./index');

describe('Testes da aplicação Node.js', () => {
    afterAll((done) => {
        server.close(done);
    });

    it('Deve responder com status 200 na rota GET /', async () => {
        const response = await request(app).get('/');
        expect(response.statusCode).toBe(200);
        expect(response.text).toBe('Olá, Givisiez! Aplicação funcionando')
    });
});