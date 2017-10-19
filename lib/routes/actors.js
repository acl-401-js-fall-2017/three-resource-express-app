const Router = require('express').Router;
const router = Router();
const Actor = require('../models/actor');

router
    .post('/', (req, res) => {
        new Actor(req.body).save()
            .then(savedActor => res.json(savedActor))
            .catch(err => {
                res.statusCode = 400;
                res.json({
                    errors: err.errors
                });
            });
    })

    .get('/', (req,res) => {
        Actor.find()
            .then(savedActors => res.json(savedActors));
    })

    .get('/:id', (req,res) => {
        Actor.findOne(req.param.id)
            .then(savedActor =>{
                if(!savedActor) {
                    res.statusCode = 404;
                    res.send(`id ${req.params.id} does not exist`);
                }else{
                    res.json(savedActor);
                }
            });
    })

    .delete('/:id', (req,res) => {
        Actor.deleteOne(req.params.id)
            .then(result =>{
                if(result.deletedCount ===1 ){
                    res.json({ removed: true });
                }else if (result.deletedCount ===0){
                    res.json({removed: false});
                }
            });
    });

// .put('/:id',(req,res) => { 
//     Book.findOneAndUpdate(req.params.id, {$set: req.body} function(err,one))
//         .then((result) => {
//             console.log('here!!!!!!!',result);
//             res.send( {updated: result.modifiedCount === 1  });
//         });
        
// });

module.exports = router;