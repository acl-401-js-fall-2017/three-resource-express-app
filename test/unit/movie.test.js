const assert = require('assert');
const Movie = require('../../lib/models/movie');

describe('Movie model' ,() => {

    it('test if it is a valid model', () => {
        const movie1 = new Movie({
            title: 'Popeye',
            genre: 'Comedy',
            releaseDate: 1950,
            length: 120,
            director: 'Robin Williams'
        });
        assert.equal(movie1.validateSync(), undefined);
    });

    it('title is required', () => {
        const movie1 = new Movie({genre: 'horror'});
        const { errors } = movie1.validateSync();
        assert.deepEqual(errors.title.kind, 'required');
    });

    it('length must be a number', () => {
        const movie1 = new Movie({
            title: 'Rambo',
            length: 'oneHundredTwenty',  
        });
        const { errors } = movie1.validateSync();
        assert.deepEqual(errors.length.kind, 'Number');
    });   
});