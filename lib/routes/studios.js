const Router = require('express').Router;
const router = Router();
const Studio = require('../models/studio');

router
    .post('/', (req, res) => {
        new Studio(req.body).save()
            .then(savedStudio => res.json(savedStudio))
            .catch(err => {
                res.statusCode = 400;
                res.json({
                    errors: err.errors
                });
            });
    })

    .get('/', (req,res) => {
        Studio.find()
            .then(savedStudios => res.json(savedStudios));
    })

    .get('/:id', (req,res) => {
        Studio.findOne(req.param.id)
            .then(savedStudio =>{
                if(!savedStudio) {
                    res.statusCode = 404;
                    res.send(`id ${req.params.id} does not exist`);
                }else{
                    res.json(savedStudio);
                }
            });
    })

    .delete('/:id', (req,res) => {
        Studio.deleteOne(req.params.id)
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