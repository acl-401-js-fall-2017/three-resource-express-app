const Dog = require('../../lib/model/dog');
const assert = require('chai').assert;

describe('DOG TEST', () => {
    
    it.only('should validate', () => {
        const dog = new Dog ({
            name: 'Rosie',
            stats: {
                HP: 11,
                MP: 25,
                swims: true
            }
        });
        assert.equal( dog.validateSync(), undefined );
    });

    it('should return error if no name', () => {
        const namelessDog = new Dog ({
            name: 999,
            stats: {
                swims: true
            }
        });
        const errors  = namelessDog.validateSync();
        console.log('=======' , errors);
        assert.equal(errors.name.kind, 'required');
    });

    it('should return error if invalid power', () => {
        const invalidDog = new Dog ({
            name: 'Partario',
            stats: {
                HP: 24,
                MP: -5,
                fakeStat: true
            }
        }, {strict: true});

        console.log(invalidDog.validateSync());
        const error = invalidDog.validateSync();
        console.log(error);
        assert.equal(error.errors.powers.kind, 'required');
        
    });

});