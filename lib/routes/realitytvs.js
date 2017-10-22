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
    .get('/', (req, res, next) => {
        Realitytv.find()
            .then(realityShows => res.json(realityShows))
            .catch(next);
    })
    .delete('/:id', (req, res) => {
        Realitytv.findByIdAndRemove(req.params.id)
            .then(result => {
                const exists = result != null;
                res.json({ removed: exists });
            });
    })
    .put('/:id', (req, res, next)=>{
        const id = req.params.id;
        if (!id) {
            next({ code: 404, error: `id ${req.params.id} does not exist` });
        } else {
            Realitytv.update({ _id: id }, req.body, function (err, data) {
                res.send(data);
            });
        }
    });

module.exports = router; 