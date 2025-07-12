const Pet = require('../models/Pet');

module.exports = {
    /**
    POST http://localhost:3000/pet
    {
        "nome": "Rex",
        "raca": "Boxer",
        "idade": 22
    }
    */
    async inserir(req, res) {
        const { nome, raca, idade } = req.body;

        const petExistente = await Pet.findOne({ nome });

        if (petExistente) {
            return res.status(200).json(petExistente);
        }

        const petCriado = await Pet.create({
            nome: nome,
            raca: raca,
            idade, idade
        });

        return res.status(201).json(petCriado);
    },

    /**
    GET http://localhost:3000/pet
    */
    async buscar(req, res) {
        const { nome, raca } = req.query;

        // Spread operator
        let petList = [];
        if (nome && raca) {
            petList = await Pet.find({ nome, raca });
        } else if (nome) {
            petList = await Pet.find({ nome });
        } else if (raca) {
            petList = await Pet.find({ raca });
        } else {
            petList = await Pet.find();
        }

        return res.status(200).json(petList);
    },

    validaPet(req, res, next) {
        const { idade } = req.body;

        if (idade < 0 || idade > 100) {
            return res.status(400).json({
                codigo: 'PET0001',
                msg: 'Idade do pet inválida.'
            });
        } else {
            next();
        }
    }
}