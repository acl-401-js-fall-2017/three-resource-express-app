const Router = require('express').Router;
const router = Router();
const Actor = require('../models/actor');

router
    .post('/', (req,res,next) => {
        new Actor(req.body).save()
            .then(result => res.json(result))
            .catch(next);
    })

    .get('/:id', (req,res,next) => {
        Actor.findOne(req.param.id)
            .then(result => {
                if(!result) {
                    next({ code: 404, error: `id ${req.params.id} does not exist`});
                }else{
                    res.json(result);
                }
            })
            .catch(next);
    })

    .get('/', (req,res,next) => {
        Actor.find()
            .then(result => res.json(result))
            .catch(next);
            
    })

    .delete('/:id', (req,res,next ) => {
        Actor.deleteOne(req.params.id)
            .then(result => {
                if(result.deletedCount === 1){
                    res.json({removed: true});
                }else if(result.deletedCount === 0){
                    res.json({removed: false});
                }
            })
            .catch(next);
    })

    .put('/:id', (req,res,next) => {
        Actor.findByIdAndUpdate(req.params.id, req.body, {new: true})
            .then(result => {
                res.json(result);
            })
            .catch(next);
    });

module.exports = router;
