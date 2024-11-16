//logger.js
//Utilizando winston para Log

const winston = require('winston');

//definindo o formato json para o log 
const logger = winston.createLogger({
    format: winston.format.combine(
        winston.format.errors({ stack: true }),
        winston.format.json()
    ),

    //setando dois arquivos de log: error e info
    transports: [
        new winston.transports.File({ filename: 'error.log', level: 'error' }),
        new winston.transports.File({ filename: 'info.log', level: 'info' }),
    ],
});

//em ambientes que não sejam de produção, logar no console também
if (process.env.NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console({
        format: winston.format.simple()
    }));
}
 
module.exports = logger; //exportando o Logger