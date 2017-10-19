const request = require('./request');
const mongoose = require('mongoose');
const assert = require('chai').assert;

describe ('movies API', () => {
    beforeEach(() => mongoose.connection.dropDatabase());

    const movie1 = {title: 'Popeye', length: 114};

    it('saves with id', () => {
        return request.post('/api/movies')
            .send(movie1)
            .then(res => {
                const savedMovie = res.body;
                assert.ok(savedMovie ._id);
                assert.equal(savedMovie.title, movie1.title);
            });
    });

    it('does not save if there is validation error', () =>{
        return request.post('/api/movies')
            .send({})
            .then(() => { throw new Error();},
                err => {
                    assert.equal(err.status, 400);
                });
    });

    it('gets by id', () => {
        let savedMovie = null;
        return request.post('/api/movies')
            .send(movie1)
            .then(res => {
                savedMovie = res.body;
                return request.get(`/api/movies/${savedMovie._id}`);
            });
    });

    it('get by id return 404 for bad id', () => {
        return request.get('/api/movies/59dfeaeb083bf9beecc97ce8')
            .then(
                ()=> {throw new Error();},
                err => {
                    assert.equal(err.status, 404);
                }
            );
    });

    it('get all the movies', () => {
        const movie2 = { title: 'Tom & Jerry', length: 100};
        
        const movieCollection = [movie1, movie2].map(movie => {
            return request.post('/api/movies')
                .send(movie)
                .then(res => res.body);
        });
        
        let saved = null;
        return Promise.all(movieCollection) 
            .then(_saved => {
                saved = _saved;
                return request.get('/api/movies');
            })
            .then(res => {
                assert.deepEqual(res.body, saved);
            });
    });

    it('deletes with id', () => {
        let savedMovie =null;
        return request.post('/api/movies')
            .send(movie1)
            .then(res => {
                savedMovie = res.body;
                return request.delete(`/api/movies/${savedMovie._id}`);
            })
            .then(res => {
                assert.deepEqual(res.body, { removed: true });
            });

    });

    it('returns false when deletes with bad id', () => {
        return request.delete('/api/movies/59dfeaeb083bf9beecc97ce6')
            .then(res => {
                assert.deepEqual(res.body, { removed: false });
            });

    });

    it('changes a saved movie with id', () => {
        let update = { title: 'Flintstones' };
        let savedMovie =null;
        return request.post('/api/movies')
            .send(movie1)
            .then(res => {
                savedMovie = res.body;
                return request.put(`/api/movies/${savedMovie._id}`).send(update);
            })
            .then(res => {
                assert.equal(res.body.title, update.title); 
                    
            });

    });
});
