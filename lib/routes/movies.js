const Router = require('express').Router;
const router = Router();
const Movie = require('../models/movie');

router
    .post('/', (req, res) => {
        new Movie(req.body).save()
            .then(savedMovie => res.json(savedMovie))
            .catch(err => {
                res.statusCode = 400;
                res.json({
                    errors: err.errors
                });
            });
    })

    .get('/', (req,res) => {
        Movie.find()
            .then(savedMovies => res.json(savedMovies));
    })

    .get('/:id', (req,res) => {
        Movie.findOne(req.param.id)
            .then(savedMovie =>{
                if(!savedMovie) {
                    res.statusCode = 404;
                    res.send(`id ${req.params.id} does not exist`);
                }else{
                    res.json(savedMovie);
                }
            });
    })

    .delete('/:id', (req,res) => {
        Movie.deleteOne(req.params.id)
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