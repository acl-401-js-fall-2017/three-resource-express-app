const Router = require('express').Router;
const router = Router();
const Movie = require('../models/movie');

router
    .post('/', (req,res,next) => {
        new Movie(req.body).save()
            .then(result => res.json(result))
            .catch(next);
    })

    .get('/:id', (req,res,next) => {
        Movie.findOne(req.param.id)
            .then(result => {
                if(!result){
                    next({ code: 404, error: `id ${req.param.id} does not exist`});
                }else{
                    res.json(result);
                }
            })
            .catch(next);
    })

    .get('/', (req,res,next) => {
        Movie.find()
            .then(result => res.json(result))
            .catch(next);
    })

    .delete('/:id', (req,res,next) => {
        Movie.deleteOne(req.params.id)
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
        Movie.findOneAndUpdate((req.params.id), req.body, {new: true})
            .then(result => res.json(result))
            .catch(next);
    });


module.exports = router;