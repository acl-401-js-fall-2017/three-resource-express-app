const { assert } = require('chai');
const request = require('../e2e/request');
const mongoose = require('mongoose').connection;

describe('Pokemon API', () => {
    
    beforeEach(() => mongoose.dropDatabase() );

    const Flaaffy = {
        name: 'Flaaffy',
        type: 'Electric'
    };

    it('saves with id', () => {

        return request.post('/api/pokemons')
            .send(Flaaffy)
            .then(res => {
                const pokemon = res.body;
                assert.ok(pokemon._id);
                assert.equal(pokemon.name, Flaaffy.name);
            });
    });

    it('gets by id', () => {
        let pokemon = null;

        return request.post('/api/pokemons')
            .send(Flaaffy)
            .then(res => {
                pokemon = res.body;
                return request.get(`/api/pokemons/${pokemon._id}`);
            })
            .then( res => {
                assert.deepEqual(res.body, pokemon);
            });
    });
});