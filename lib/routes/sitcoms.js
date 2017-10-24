const Router = require('express').Router;
const router = Router();
const Sitcom = require('../model/sitcom');


router
    .post('/', (req, res, next) => {
        new Sitcom(req.body).save()
            .then(sitcom => res.json(sitcom))
            .catch(next);
    })
    .get('/', (req, res, next) => {
        Sitcom.find()
            .then(sitcoms => res.json(sitcoms))
            .catch(next);
    })
    .get('/:id', (req, res, next) => {
        Sitcom.findById(req.params.id)
            .then(sitcom => {
                if(!sitcom) {
                    next({code: 404, error:`id ${req.params.id} does not exist`});
                }
                else res.json(sitcom);
            });
    })
    .delete('/:id', (req, res) => {
        Sitcom.findByIdAndRemove(req.params.id)
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
            Sitcom.update({ _id: id }, req.body, function (err, data) {
                res.send(data);
            });
        }
    });







module.exports = router;