const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan')
const routes = require('./routes');
const database = require('./src/database/config');
require('dotenv').config();

const app = express();

app.use(express.json());

if (process.env.NODE_ENV === 'dev') {
    app.use(morgan('common'));
} else {
    app.use(morgan('tiny'));
}

app.use(routes);

const porta = process.env.PORTA || 3000;

mongoose.connect(database.DB_URL, database.DB_SETTINGS)
    .then(() => console.log('Conectado ao MongoDB.'))
    .catch(erro => console.log(`Erro ao conectar ao MongoDB: ${erro}`));

app.listen(porta, function() {
    console.log(`Petstore rodando na porta ${porta}`);
});