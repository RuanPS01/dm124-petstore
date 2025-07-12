const express = require('express');
const routes = require('./routes');
require('dotenv').config();

const app = express();

app.use(express.json());

app.use(routes);

const porta = process.env.PORTA || 3001;

app.listen(porta, function() {
    console.log(`Auth rodando na porta ${porta}`);
});