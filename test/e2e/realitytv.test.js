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
    };

    it('Saves a reality show with id', ()=>{
        return request.post('/api/realitytvs')
            .send(realWorld)
            .then(res => {
                const realityShow = res.body;
                assert.ok(realityShow._id);
                assert.equal(realityShow.name, realWorld.name);
            });
    });

    it('Shoud get a reality show by id', ()=>{
        let realityShow;
        let id;

        return request.post('/api/realitytvs')
            .send(realWorld)
            .then(res => {
                realityShow = res.body;
                id = realityShow._id;
            })
            .then(()=>{
                return request.get(`/api/realitytvs/${id}`)
                    .then(res =>{
                        assert.deepEqual(res.body, realityShow);
                    });
            });

    });

    it('get by id returns 404 for bad id', () => {
        return request.get('/api/realitytvs/59dfeaeb083bf9beecc97ce8')
            .then(
                () => { throw new Error('Unexpected successful response'); },
                err => {
                    assert.equal(err.status, 404);    
                }
            );
    });

    it('gets all cartoons', () => {
        const cops = {
            name: 'COPS',
            releaseYear: 1990,
            cast: [
                { name: 'Harry Newman', season: 1 }
            ]
        };

        const posts = [realWorld, cops].map(realityShow => {
            return request.post('/api/realitytvs')
                .send(realityShow)
                .then(res => res.body);
        });

        let saved = null;
        return Promise.all(posts)
            .then(_saved => {
                saved = _saved;
                return request.get('/api/realitytvs');
            })
            .then(res => {
                assert.deepEqual(res.body, saved);
            });
    });



});