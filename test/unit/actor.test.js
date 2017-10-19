const assert = require('assert');

const Book = require('../../lib/models/actor');

describe('Actor model', () => {
    it('check the model works', ()=> {
        const actor1 = new Book({
            name: 'Popeye',
            gender: 'male',
            dateOfBirth: 1900 ,
            movies: ['Out to Punch', 'Cops is Tops']
        }); 

        assert.equal(actor1.validateSync(), undefined);
    });

    it('name is required', ()=> {
        const actor1 = new Book({}); 
        const { errors } =actor1.validateSync();
        assert.equal(errors.name.kind, 'required');
    
    });

    it('dateOfBirth must be a date', ()=> {
        const actor1 = new Book( { dateOfBirth: true } ); 
        const { errors } =actor1.validateSync();
        assert.equal(errors.dateOfBirth.kind, 'Date');
    
    });

});