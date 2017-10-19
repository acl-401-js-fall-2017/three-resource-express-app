const { assert } = require('chai');
const Actor = require('../../lib/models/actor');
const Movie = require('../../lib/models/movie');
// const Studio = require('../../lib/models/studio');

describe('Actor Model', () => {
    
    it('good model', () => {
        const actor = new Actor({
            name: 'Ryan Gosling',
            movies: ['La La Land', 'Notebook', 'Crazy, Stupid Love'],
        });

        assert.equal(actor.validateSync(), undefined);
    });

    it('required field', () => {
        const actor = new Actor({});
        const { errors } = actor.validateSync();
        assert.equal(errors['name'].kind, 'required');
    });
    
});

describe('Movie Model', () => {

    it('good model', () => {
        const movie = new Movie({
            title: 'Shawshank Redemption',
            releaseYear: 1994,
        });

        assert.equal(movie.validateSync(), undefined);
    });

    it('required field', () => {
        const movie = new Movie({});
        const { errors } = movie.validateSync();
        assert.equal(errors['title'].kind, 'required');
    });
});