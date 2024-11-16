// apiController.js
//Controlador da API. Aqui que trato as os códigos de erro que serão lançados pela API
const GitHubApi = require('./githubapi'); // Importa a lógica da API do GitHub
const logger = require('./logger'); // Importa o logger

class ApiController {
    // Método para manipular a requisição e retornar informações do usuário
    static async handleGetUser(req, res) {
        const username = req.params.username; // Obtém o nome de usuário da URL
        try {
            const user = await GitHubApi.getUser(username); // Chama a API do GitHub
            res.status(200).json(user); // Retorna os dados do usuário com status 200
        } catch (error) {
            logger.error(`Failed to get user: ${error.message}`); // Loga o erro
            res.status(404).json({ error: error.message }); // Retorna erro 404 se o usuário não for encontrado
        }
    }

    // Método para manipular a requisição e retornar repositórios do usuário
    static async handleGetUserRepos(req, res) {
        const username = req.params.username; // Obtém o nome de usuário da URL
        try {
            const repos = await GitHubApi.getUserRepos(username); // Chama a API do GitHub
            res.status(200).json(repos); // Retorna os repositórios com status 200
        } catch (error) {
            logger.error(`Failed to get repos: ${error.message}`); // Loga o erro
            res.status(404).json({ error: error.message }); // Retorna erro 404 se não encontrar repositórios
        }
    }
}

module.exports = ApiController; // Exporta a classe ApiController
