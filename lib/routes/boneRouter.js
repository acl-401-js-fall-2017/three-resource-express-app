const {Router} = require('express');
const router = Router();
const Bone = require('../models/Bone');

router
    .post('/', (req, res, next) => {
        new Bone(req.body)
            .save()
            .then(monRes => res.send(monRes))
            .catch(err => {
                res.status(404).send(err.errors);
            });
    });

module.exports = router;