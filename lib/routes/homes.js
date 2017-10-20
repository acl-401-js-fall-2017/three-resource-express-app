const Router = require('express').Router;
const router = Router();
const Home = require('../models/homes');

router
    .get('/', (req, res)=> {
        Home.find()
            .then(homes => res.send(homes));
    })

    .get('/:id', (req, res, next)=> {
        Home.findById(req.params.id)
            .then(home => {
                if(!home){
                    res.statusCode = 404;
                    res.send(`id ${req.params.id} does not exist`);
                }
                else res.send(home);
                
            })
            .catch(next);            
    })

    .post('/', (req, res) => {
        new Home(req.body).save()
            .then(home => res.send(home))
            .catch(err=> {
                res.statusCode = 400;
                res.send({errors: err.errors});
            });
    })

    .delete('/:id', (req, res) => {
        Home.findByIdAndRemove(req.params.id)
            .then(result => {
                const exists = result != null;
                res.send({removed: exists});
            })
            .catch(err => {
                res.statusCode = 400;
                res.send({errors: err.errors});
            });
    })

    .put('/:id', (req, res) => {
        Home.findByIdAndUpdate( req.params.id, req.body, { 'new' : true, runValidators: true})
            .then(updated => res.send(updated))
            .catch(err => {
                res.statusCode = 400;
                res.send({errors: err.errors});
            });
    });

module.exports = router;