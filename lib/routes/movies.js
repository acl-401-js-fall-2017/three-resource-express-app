const Router = require('express').Router;
const router = Router();
const Movie = require('../models/movie');

router
    .get('/', (req, res) => {
        Movie.find()
            .then(movies => res.join(movies));
    })

    .get('/:id', (req, res) => {
        Movie.findById(req.params.id)
            .then(movie => {
                if (!movie) {
                    res.statusCode = 404;
                    res.send(`id ${req.params.id} does not exist`);
                }
                else res.json(movie);
            });
    })

    .post('/', (req, res) => {
        new Movie(req.body).save()
            .then(movie => res.json(movie))
            .catch(err => {
                res.statusCode = 400;
                res.json({
                    errors: err.errors
                });
            });
    })

    .delete('/:id', (req, res) => {
        Movie.findByIdAndRemove(req.params.id)
            .then(result => {
                const exists = result != null;
                res.json({ removed: exists });
            });
    });

module.exports = router;
