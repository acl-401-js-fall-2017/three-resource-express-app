const {assert} = require('chai');
const Film = require('../../lib/models/film');

describe.only('Film Model', () => {
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
});