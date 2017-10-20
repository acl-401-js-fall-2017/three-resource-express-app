const request = require('./request');
const mongoose = require('mongoose');
const assert = require('chai').assert;

describe('Movies api', () => {
    
    beforeEach(() => mongoose.connection.dropDatabase());
    const movie1 = { title:'Popeye', genre:'Comedy'};

    it('saves movie with id', () => {
        return request.post('/api/movies')
            .send(movie1)
            .then(res => {
                assert.ok(res.body._id);
                assert.equal(res.body.title, movie1.title);
            });
    });

    it('gets movie with id', () => {
        let savedMovie = null;
        return request.post('/api/movies')
            .send(movie1)
            .then(res => {
                savedMovie = res.body;
                return request.get(`/api/movies/${savedMovie._id}`);
            })
            .then(res => {
                assert.equal(res.body.title, movie1.title);
            });
    });

    it('get by id return 404 for bad id', () => {
        return request.get('/api/movies/59dfeaeb083bf9beecc97ce8')
            .then(
                () => {throw new Error();},
                err => {
                    assert.equal(err.status, 404);
                });
    });

    it('get all movies', () => {
        const movie2 = { title:'Tom & Jerry', genre:'Horror'};
        let movieCollection = [movie1, movie2].map(movie => {
            return request.post('/api/movies')
                .send(movie)
                .then(res => res.body);
        });

        let saved = null;
        return Promise.all(movieCollection)
            .then(_saved => {
                saved =_saved;
                return request.get('/api/movies/');
            })
            .then(res => {
                assert.deepEqual(res.body, saved);
            });
    });

    it('deletes with id',() => {
        return request.post('/api/movies')
            .send(movie1)
            .then(res => {
                return request.delete(`/api/movies/${res.body._id}`);
            })
            .then(res => {
                assert.deepEqual(res.body, {removed: true});
            });
    });

    it('return false delete with bad id', () => {
        return request.delete('/api/movies/59dfeaeb083bf9beecc97ce8')
            .then(res => {
                assert.deepEqual(res.body, {removed: false});
            });
    });

    it('changes saved movie with id', () => {
        let update = { title: 'Rambo'};
        return request.post('/api/movies')
            .send(movie1)
            .then(res => {
                return request.put(`/api/movies/${res.body._id}`).send(update);
            })
            .then(res => {
                assert.equal(res.body.title, update.title);
            });
    });

});