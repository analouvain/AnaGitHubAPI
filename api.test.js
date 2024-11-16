//Teste unitário com o Jest

const request = require('supertest');
const app = require('./index'); // Importa seu arquivo app.js onde a aplicação Express é configurada

describe('Github API', () => {
  
    describe('GET /api/users/:username', () => {
        it('Deve retornar informações de um usuário existente', async () => {
            const response = await request(app).get('/api/users/analouvain');
            expect(response.statusCode).toBe(200);
            expect(response.body).toHaveProperty('login', 'analouvain'); // Verifica a propriedade 'login'
        });

        it('Deve retornar 404 para um usuário inexistente', async () => {
            const response = await request(app).get('/api/users/usuarionaoexiste');
            expect(response.statusCode).toBe(404);
        });
    });

    describe('GET /api/users/:username/repos', () => {
        it('Deve retornar repositórios de um usuário existente', async () => {
            const response = await request(app).get('/api/users/analouvain/repos');
            expect(response.statusCode).toBe(200);
            expect(Array.isArray(response.body)).toBe(true); // Espera que a resposta seja um array
        });

        it('Deve retornar 404 para um usuário sem repositórios', async () => {
            const response = await request(app).get('/api/users/usuario-sem-repos');
            expect(response.statusCode).toBe(404);
        });
    });
});