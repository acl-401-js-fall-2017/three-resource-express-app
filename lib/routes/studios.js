const Router = require('express').Router;
const router = Router();
const Studio = require('../models/studio');

router
    .post('/', (req, res, next) => {
        new Studio(req.body).save()
            .then(savedStudio => res.json(savedStudio))
            .catch(next);
    })

    .get('/', (req, res, next) => {
        Studio.find()
            .then(savedStudios => res.json(savedStudios))
            .catch(next);
    })

    .get('/:id', (req, res, next) => {
        Studio.findOne(req.param.id)
            .then(savedStudio =>{
                if(!savedStudio) {
                    next({ code: 404, error: `id ${req.params.id} does not exist`});
                }else{
                    res.json(savedStudio);
                }
            })
            .catch(next);
    })

    .delete('/:id', (req, res, next) => {
        Studio.deleteOne(req.params.id)
            .then(result =>{
                if(result.deletedCount ===1 ){
                    res.json({ removed: true });
                }else if (result.deletedCount ===0){
                    res.json({removed: false});
                }
            })
            .catch(next);
    })

    .put('/:id', (req, res, next) => {
        Studio.findByIdAndUpdate(req.params.id, req.body, { new: true })
            .then(studio => res.send(studio))
            .catch(next);
    });


module.exports = router;