const Router = require('express').Router;
const router = Router();
const Realitytv = require('../model/realitytv');


router
    .post('/', (req, res, next) => {
        new Realitytv(req.body).save()
            .then(realityShow => res.json(realityShow))
            .catch(next);
    })

module.exports = router; 