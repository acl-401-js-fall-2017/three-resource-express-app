const assert = require('assert');

const Studio = require('../../lib/models/studio');

describe('Studio model', () => {
    it('check the model works', ()=> {
        const studio1 = new Studio({
            name: 'Paramount',
            address: {
                street: '101 main st',
                city: 'Hollywood',
                state: 'CA',
                zip: 97111
            },
            dateOfBirth: 1900 ,
            founded: 9/18/1901,
            numberOfMovies: 333
        }); 

        assert.equal(studio1.validateSync(), undefined);
    });

    it('address/state is required', ()=> {
        const studio1 = new Studio({}); 
        const { errors } = studio1.validateSync();
        assert.equal(errors['address.state'].kind, 'required');
    
    });

    it('dateOfBirth must be a date', ()=> {
        const studio1 = new Studio( { founded: true } ); 
        const { errors } =studio1.validateSync();
        assert.equal(errors.founded.kind, 'Date');
    
    });

});