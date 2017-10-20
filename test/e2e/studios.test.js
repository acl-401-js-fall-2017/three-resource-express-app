const request = require('./request');
const mongoose = require('mongoose');
const assert = require('chai').assert;

describe('Studios api', () => {
    
    beforeEach(() => mongoose.connection.dropDatabase());
    const studio1 = { name: 'Universal', numberOfMovies: 333, address:{state:'CA'}};

    it('saves studio with id', () => {
        return request.post('/api/studios')
            .send(studio1)
            .then(res => {
                assert.ok(res.body._id);
                assert.equal(res.body.name, studio1.name);
            });
    });

    it('gets studio with id', () => {
        let savedStudio = null;
        return request.post('/api/studios')
            .send(studio1)
            .then(res => {
                savedStudio = res.body;
                return request.get(`/api/studios/${savedStudio._id}`);
            })
            .then(res => {
                assert.equal(res.body.title, studio1.title);
            });
    });

    it('get by id return 404 for bad id', () => {
        return request.get('/api/studios/59dfeaeb083bf9beecc97ce8')
            .then(
                () => {throw new Error();},
                err => {
                    assert.equal(err.status, 404);
                });
    });

    it('get all studios', () => {
        const studio2 = { name:'Paramount', numberOfMovies:876, address:{state:'CA'}};
        let studioCollection = [studio1, studio2].map(studio=> {
            return request.post('/api/studios')
                .send(studio)
                .then(res => res.body);
        });

        let saved = null;
        return Promise.all(studioCollection)
            .then(_saved => {
                saved =_saved;
                return request.get('/api/studios/');
            })
            .then(res => {
                assert.deepEqual(res.body, saved);
            });
    });

    it('deletes with id',() => {
        return request.post('/api/studios')
            .send(studio1)
            .then(res => {
                return request.delete(`/api/studios/${res.body._id}`);
            })
            .then(res => {
                assert.deepEqual(res.body, {removed: true});
            });
    });

    it('return false delete with bad id', () => {
        return request.delete('/api/studios/59dfeaeb083bf9beecc97ce8')
            .then(res => {
                assert.deepEqual(res.body, {removed: false});
            });
    });

    it('changes saved studio with id', () => {
        let update = { name: 'Disney'};
        return request.post('/api/studios')
            .send(studio1)
            .then(res => {
                return request.put(`/api/studios/${res.body._id}`).send(update);
            })
            .then(res => {
                assert.equal(res.body.name, update.name);
            });
    });

});