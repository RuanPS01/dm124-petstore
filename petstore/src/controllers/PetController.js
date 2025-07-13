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

        const petCriado = await Pet.create({ nome, raca, idade });

        return res.status(201).json(petCriado);
    },

    /**
    GET http://localhost:3000/pet
    */
    async buscar(req, res) {
        let petList = await Pet.find({ ...req.query });

        return res.status(200).json(petList);
    },

    /**
    PUT http://localhost:3000/pet/idade/:nome
    {
        "idade": 5
    }
    */
    async atualizarIdade(req, res) {
        const { nome } = req.params;
        const { idade } = req.body;

        const pet = await Pet.findOne({ nome });

        if (!pet) {
            return res.status(404).json({
                codigo: 'PET0002',
                msg: 'Pet não encontrado.'
            });
        }

        const petAtualizado = await Pet.findOneAndUpdate(
            { nome },
            { idade },
            { new: true }
        );

        return res.status(200).json(petAtualizado);
    },

    /**
    DELETE http://localhost:3000/pet/:nome
    */
    async excluir(req, res) {
        const { nome } = req.params;

        const pet = await Pet.findOne({ nome });

        if (!pet) {
            return res.status(404).json({
                codigo: 'PET0002',
                msg: 'Pet não encontrado.'
            });
        }

        await Pet.findOneAndDelete({ nome });

        return res.status(200).json({
            msg: 'Pet excluído com sucesso.'
        });
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