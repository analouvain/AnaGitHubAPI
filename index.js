// index.js
// Importando o framework Express
const express = require('express'); 
// Importando o controlador da API
const ApiController = require('./apiController'); 
// Importando o logger
const logger = require('./logger'); 

//Criando a instância do app e configurando a porta
const app = express(); 
const PORT = process.env.PORT || 3000; 

// Middleware para logar informações sobre cada requisição
app.use((req, res, next) => {
    logger.info(`Received request: ${req.method} ${req.originalUrl}`); // Loga informação da requisição
    next(); // Passa para o próximo middleware
});

// Definindo rotas: users e repos 
app.get('/api/users/:username', ApiController.handleGetUser); // Rota para obter informações do usuário
app.get('/api/users/:username/repos', ApiController.handleGetUserRepos); // Rota para obter repositórios do usuário

// Middleware para tratamento de erros
// Retorna erro 500 para qualquer erro interno
app.use((err, req, res, next) => {
    logger.error(`Server error: ${err.message}`); 
    res.status(500).json({ error: 'Internal Server Error' }); 
});

// Inicia o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`); 
});

// Exportar o app para uso em testes
module.exports = app;