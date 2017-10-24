const Router = require('express').Router;
const router = Router();
const Pokemon = require('../models/pokemon');

router
    .post('/', (req, res, next) => {
        new Pokemon(req.body).save()
            .then(pokemon => res.json(pokemon))
            .catch(next);
    })

    .get('/', (req, res, next) => {
        Pokemon.find()
            .then(pokemons => res.json(pokemons))
            .catch(next);
    })

    .get('/:id', (req, res, next) => {
        Pokemon.findById(req.params.id)
            .then(pokemon => {
                if(!pokemon) {
                    res.statusCode = 404;
                    res.send(`id: ${req.params.id} does not exist`);
                }
                else res.json(pokemon);
            })
            .catch(next);
    })

    .delete('/:id', (req, res, next) => {
        Pokemon.findByIdAndRemove(req.params.id)
            .then(results => {
                const exits = results != null;
                res.json({ removed: exits });
            })
            .catch(next);
    });

module.exports = router;