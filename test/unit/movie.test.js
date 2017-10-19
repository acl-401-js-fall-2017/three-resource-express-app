const assert = require('assert');

const Movie = require('../../lib/models/movie');

describe('Movie model', () => {
    it('check the model works', ()=> {
        const movie1 = new Movie({
            title: 'Popeye',
            genre: 'comedy',
            releaseDate: 1980 ,
            length: 114,
            director: 'Robert Altman'
        }); 

        assert.equal(movie1.validateSync(), undefined);
    });

    it('title is required', ()=> {
        const movie1 = new Movie({}); 
        const { errors } = movie1.validateSync();
        assert.equal(errors.title.kind, 'required');
    
    });

    it('releaseDate must be a date', ()=> {
        const movie1 = new Movie( { releaseDate: 'true' } ); 
        const { errors } =movie1.validateSync();
        assert.equal(errors.releaseDate.kind, 'Date');
    
    });

});