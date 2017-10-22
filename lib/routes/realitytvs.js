const Router = require('express').Router;
const router = Router();
const Realitytv = require('../model/realitytv');


router
    .post('/', (req, res, next) => {
        new Realitytv(req.body).save()
            .then(realityShow => res.json(realityShow))
            .catch(next);
    })
    .get('/:id', (req, res, next) => {
        Realitytv.findById(req.params.id)
            .then(realityShow => {
                if(!realityShow) {
                    next({code: 404, error:`id ${req.params.id} does not exist`});
                }
                else res.json(realityShow);
            });
    })

module.exports = router; 