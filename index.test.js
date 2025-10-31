const request = require('supertest');
const { app, server } = require('./index');

describe('Testes da Aplicação Node.js', () => {

  afterAll((done) => {
    server.close(done);
  });

  it('Deve responder com status 200 na rota GET /', async () => {
    const response = await request(app).get('/');
    expect(response.statusCode).toBe(200);
    expect(response.text).toBe('Olá, Givisiez! Aplicação funcionando');
  });

  it('Deve responder com status 200 e um JSON na rota GET /health', async () => {
    const response = await request(app)
      .get('/health')
      .expect('Content-Type', /json/)
      .expect(200);
      
    expect(response.body).toEqual({ status: 'ok' });
  });

  it('Deve responder com status 404 para uma rota inexistente', async () => {
    await request(app).get('/uma-rota-que-nao-existe').expect(404);
  });

});