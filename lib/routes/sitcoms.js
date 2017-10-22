const Router = require('express').Router;
const router = Router();
const Sitcom = require('../model/sitcom');


router
    .post('/', (req, res, next) => {
        new Sitcom(req.body).save()
            .then(sitcom => res.json(sitcom))
            .catch(next);
    })






module.exports = router;