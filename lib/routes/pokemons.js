const Router = require('express').Router;
const router = Router();
const Pokemon = require('../models/pokemon');

router
    .post('/', (req, res) => {
        new Pokemon(req.body).save()
            .then(pokemon => res.json(pokemon))
            .catch( err => {
                res.statusCode = 400;
                res.json({
                    errors: err.errors
                });
            });
    })

    .get('/', (req, res) => {
        Pokemon.find()
            .then(pokemons => res.json(pokemons));
    })

    .get('/:id', (req, res) => {
        Pokemon.findById(req.params.id)
            .then(pokemon => {
                if(!pokemon) {
                    res.statusCode = 404;
                    res.send(`id: ${req.params.id} does not exist`);
                }
                else res.json(pokemon);
            });
    });

module.exports = router;