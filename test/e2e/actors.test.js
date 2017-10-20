const request = require('./request');
const mongoose = require('mongoose');
const assert = require('chai').assert;

describe('Actors Api', () => {
    
    beforeEach(() => mongoose.connection.dropDatabase());
    const actor1 = {name: 'Popeye', gender: 'male'};

    it('saves actor with id', () => {
        return request.post('/api/actors')
            .send(actor1)
            .then(res => {
                assert.ok(res.body._id);
                assert.equal(res.body.name, actor1.name);
            });
    });

    it('gets actor with an id', () => {
        let savedActor =null;
        return  request.post('/api/actors')
            .send(actor1)
            .then(res => {
                savedActor = res.body;
                return request.get(`/api/actors/${savedActor._id}`);
            })
            .then(res => {
                assert.equal(res.body.name, actor1.name);
            }); 
    });

    it('get by id return 404 for bad id', () => {
        return request.get('/api/actors/59dfeaeb083bf9beecc97ce8')
            .then(
                () => {throw new Error();},
                err => {
                    assert.equal(err.status, 404);
                });
    });

    it('get all actors', () => {
        const actor2 = { name: 'Olive Oyl', gender: 'female'};
        const actorCollection =[actor1, actor2].map(actor => {
            return request.post('/api/actors')
                .send(actor)
                .then(res => res.body);
        });

        let saved = null;
        return Promise.all(actorCollection)
            .then(_saved => {
                saved = _saved;
                return request.get('/api/actors');
            })
            .then(res => {
                assert.deepEqual(res.body, saved);
            });

    });

    it('deletes with id',() => {
        return request.post('/api/actors')
            .send(actor1)
            .then(res => {
                return request.delete(`/api/actors/${res.body._id}`);
            })
            .then(res => {
                assert.deepEqual(res.body, {removed: true});
            });
    });

    it('returns false when deletes with bad id', () => {
        return request.delete('/api/actors/59dfeaeb083bf9beecc97ce4')
            .then(res => {
                assert.deepEqual(res.body, {removed:false});
            });
    });

    it('changes saved actor with id', () => {
        let update = { name: 'Bluto'};
        return request.post('/api/actors')
            .send(actor1)
            .then(res => {
                return request.put(`/api/actors/${res.body._id}`).send(update);
            })
            .then(res => {
                assert.equal(res.body.name, update.name);
            });
    });
    
});
