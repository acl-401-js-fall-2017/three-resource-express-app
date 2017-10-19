const request = require('./request');
const mongoose = require('mongoose');
const assert = require('chai').assert;

describe ('actors API', () => {
    beforeEach(() => mongoose.connection.dropDatabase());

    const actor1 = { name: 'Popeye', gender: 'male'};

    it('saves with id', () => {
        return request.post('/api/actors')
            .send(actor1)
            .then(res => {
                const savedActor = res.body;
                assert.ok(savedActor._id);
                assert.equal(savedActor.name, actor1.name);
            });
    });

    it('does not save if there is validation error', () =>{
        return request.post('/api/actors')
            .send({})
            .then(() => { throw new Error();},
                err => {
                    assert.equal(err.status, 400);
                });
    });

    it('gets by id', () => {
        let savedActor = null;
        return request.post('/api/actors')
            .send(actor1)
            .then(res => {
                savedActor = res.body;
                return request.get(`/api/actors/${savedActor._id}`);
            });
    });

    it('get by id return 404 for bad id', () => {
        return request.get('/api/actors/59dfeaeb083bf9beecc97ce8')
            .then(
                ()=> {throw new Error();},
                err => {
                    assert.equal(err.status, 404);
                }
            );
    });

    it('get all the actors', () => {
        const actor2 = { name: 'Olive Oyl', gender: 'female'};
        
        const actorCollection = [actor1, actor2].map(actor => {
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

    it('deletes with id', () => {
        let savedActor =null;
        return request.post('/api/actors')
            .send(actor1)
            .then(res => {
                savedActor = res.body;
                return request.delete(`/api/actors/${savedActor._id}`);
            })
            .then(res => {
                assert.deepEqual(res.body, { removed: true });
            });

    });

    it('returns false when deletes with bad id', () => {
        return request.delete('/api/actors/59dfeaeb083bf9beecc97ce6')
            .then(res => {
                assert.deepEqual(res.body, { removed: false });
            });

    });

    it('changes a saved book with id', () => {
        let update = { name: 'Bluto' };
        let savedActor =null;
        return request.post('/api/actors')
            .send(actor1)
            .then(res => {
                savedActor = res.body;
                return request.put(`/api/actors/${savedActor._id}`).send(update);
            })
            .then(res => {
                assert.equal(res.body.name, update.name); 
                    
            });

    });
});
