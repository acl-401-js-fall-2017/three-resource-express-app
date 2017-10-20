const assert = require('assert');

const Studio = require('../../lib/models/studio');

describe('Studio model', () => {
    it('check the model works', () => {
        const studio1 = new Studio({
            name:'Universal',
            address: {
                street: '101 main st',
                city: 'Hollywood',
                state: 'CA',
                zip: 92122
            },
            founded: 9/9/1900,
            numberOfMovies: 987
        });
        assert.equal(studio1.validateSync(), undefined);
    });

    it('state is required', () => {
        const studio1 = new Studio({
            name:'Paramount',
            address: {
                street: '101 main st',
                city: 'Hollywood',
            },
            founded: 9/9/1910,
            numberOfMovies: 433
        });
        const { errors } = studio1.validateSync();
        assert.equal(errors['address.state'].kind, 'required');
    });

    it('founded must be in date format', () => {
        const studio1 = new Studio({
            name:'Disney',
            address: {
                street: '201 main st',
                city: 'Hollywood',
                state: 'CA',
                zip: 92122
            },
            founded: true,
            numberOfMovies: 1092
        });
        const { errors } = studio1.validateSync();
        assert.equal(errors.founded.kind, 'Date');
    });
});