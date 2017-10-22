const assert = require('chai').assert;
const mongoose = require('mongoose');
const request = require('./request');

describe('Realitytv API', () => {

    beforeEach(() => mongoose.connection.dropDatabase());

    const realWorld = {
        name: 'The Real World',
        releaseYear: 1992,
        cast: [
            { name: 'Julie Gentry', season: 1 },
            { name: 'Norman Korpi', season: 1 },
            { name: 'Andre Comeau', season: 1 }
        ]
    }

    it('Saves a reality show with id', ()=>{
        return request.post('/api/realitytvs')
            .send(realWorld)
            .then(res => {
                const realityShow = res.body;
                assert.ok(realityShow._id);
                assert.equal(realityShow.name, realWorld.name);
            });
    });

});