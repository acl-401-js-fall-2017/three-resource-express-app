const Router = require('express').Router;
const router = Router();
const Cartoon = require('../model/cartoon');

router
    .post('/', (req, res, next) => {
        new Cartoon(req.body).save()
            .then(cartoon => res.json(cartoon))
            .catch(next);
    }) 
    .get('/', (req, res, next) => {
        Cartoon.find()
            .then(cartoons => res.json(cartoons))
            .catch(next);
    })
    .get('/:id', (req, res, next) => {
        Cartoon.findById(req.params.id)
            .then(cartoon => {
                if(!cartoon) {
                    next({code: 404, error:`id ${req.params.id} does not exist`});
                }
                else res.json(cartoon);
            });
    })
    .delete('/:id', (req, res) => {
        Cartoon.findByIdAndRemove(req.params.id)
            .then(result => {
                const exists = result != null;
                res.json({ removed: exists });
            });
    });


module.exports = router; 

