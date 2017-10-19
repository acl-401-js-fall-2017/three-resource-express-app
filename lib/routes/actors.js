const Router = require('express').Router;
const router = Router();
const Actor = require('../models/actor');

router
    .get('/', (req, res) => {
        Actor.find()
            .then(actors => res.join(actors));
    })

    .get('/:id', (req, res) => {
        Actor.findById(req.params.id)
            .then(actor => {
                if (!actor) {
                    res.statusCode = 404;
                    res.send(`id ${req.params.id} does not exist`);
                }
                else res.json(actor);
            });
    })

    .post('/', (req, res) => {
        new Actor(req.body).save()
            .then(actor => res.json(actor))
            .catch(err => {
                res.statusCode = 400;
                res.json({
                    errors: err.errors
                });
            });
    })

    .delete('/:id', (req, res) => {
        Actor.findByIdAndRemove(req.params.id)
            .then(result => {
                const exists = result != null;
                res.json({ removed: exists });
            });
    });

module.exports = router;
