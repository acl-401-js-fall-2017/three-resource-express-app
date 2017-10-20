const assert = require('chai').assert; 
const mongoose = require('mongoose');
const request = require('./request');

describe('Cartoon API', ()=>{

    beforeEach(()=> mongoose.connection.dropDatabase());

    const pokemon = {
        name: 'Pokemon',
        releaseYear: 1997
    };

    it('Saves a cartoon with id', ()=>{
        return request.post('/api/cartoons')
            .send(pokemon)
            .then(res => {
                const cartoon = res.body;
                assert.ok(cartoon._id);
                assert.equal(cartoon.name, pokemon.name);
            });
    });

    it('Shoud get a cartoon by id', ()=>{
        let cartoon;
        let id;

        return request.post('/api/cartoons')
            .send(pokemon)
            .then(res => {
                cartoon = res.body;
                id = cartoon._id;
            })
            .then(()=>{
                return request.get(`/api/cartoons/${id}`)
                    .then(res =>{
                        assert.deepEqual(res.body, cartoon);
                    });
            });

    });

});