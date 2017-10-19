const {assert} = require('chai');
const Film = require('../../lib/models/film');

describe('Film Model', () => {
    it('valid model', () => {
        const film = new Film({
            title: 'American History X',
            releaseYear: 1998,
            runTime: 119,
            genre: 'Crime, Drama',
            director: 'Tony Kaye'
        });
        assert.equal(film.validateSync(), undefined);
    });
    it('required fields', () => {
        const film = new Film({});
        const {errors} = film.validateSync();
        assert.equal(errors['title'].kind, 'required');
        assert.equal(errors['releaseYear'].kind, 'required');        
    });
    it('release year is above min', () => {
        const film = new Film({
            releaseYear: 1889
        });
        const {errors} = film.validateSync();
        assert.equal(errors['releaseYear'].kind, 'min');
    });
    it('run time is above min', () => {
        const film = new Film({
            runTime: -1
        });
        const {errors} = film.validateSync();
        assert.equal(errors['runTime'].kind, 'min');
    });
});