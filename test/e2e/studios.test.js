const request = require('./request');
const mongoose = require('mongoose');
const assert = require('chai').assert;

describe ('studios API', () => {
    beforeEach(() => mongoose.connection.dropDatabase());

    const studio1 = {name: 'Paramount', address: { state: 'CA'} };

    it('saves with id', () => {
        return request.post('/api/studios')
            .send(studio1)
            .then(res => {
                const savedMovie = res.body;
                assert.ok(savedMovie._id);
                assert.equal(savedMovie.name, studio1.name);
            });
    });

    it('does not save if there is validation error', () =>{
        return request.post('/api/studios')
            .send({})
            .then(() => { throw new Error();},
                err => {
                    assert.equal(err.status, 400);
                });
    });

    it('gets by id', () => {
        let savedMovie = null;
        return request.post('/api/studios')
            .send(studio1)
            .then(res => {
                savedMovie = res.body;
                return request.get(`/api/studios/${savedMovie._id}`);
            });
    });

    it('get by id return 404 for bad id', () => {
        return request.get('/api/studios/59dfeaeb083bf9beecc97ce8')
            .then(
                ()=> {throw new Error();},
                err => {
                    assert.equal(err.status, 404);
                }
            );
    });

    it('get all the studios', () => {
        const movie2 = { name: 'Universal', address: { state: 'CA'}};
        
        const movieCollection = [studio1, movie2].map(movie => {
            return request.post('/api/studios')
                .send(movie)
                .then(res => res.body);
        });
        
        let saved = null;
        return Promise.all(movieCollection) 
            .then(_saved => {
                saved = _saved;
                return request.get('/api/studios');
            })
            .then(res => {
                assert.deepEqual(res.body, saved);
            });
    });

    it('deletes with id', () => {
        let savedMovie =null;
        return request.post('/api/studios')
            .send(studio1)
            .then(res => {
                savedMovie = res.body;
                return request.delete(`/api/studios/${savedMovie._id}`);
            })
            .then(res => {
                assert.deepEqual(res.body, { removed: true });
            });

    });

    it('returns false when deletes with bad id', () => {
        return request.delete('/api/studios/59dfeaeb083bf9beecc97ce6')
            .then(res => {
                assert.deepEqual(res.body, { removed: false });
            });

    });

    it('changes a saved studio with id', () => {
        let update = { name: 'Disney' };
        let savedMovie =null;
        return request.post('/api/studios')
            .send(studio1)
            .then(res => {
                savedMovie = res.body;
                return request.put(`/api/studios/${savedMovie._id}`).send(update);
            })
            .then(res => {
                assert.equal(res.body.name, update.name); 
            });

    });
});
