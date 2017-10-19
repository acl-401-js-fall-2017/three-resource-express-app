const Dog = require('../../lib/models/dogs');
const { assert } = require('chai');

describe('Dogs test', ()=> {
    it('should validate a propper dog', ()=> {
        const dog = new Dog({
            name: 'Fluffy',
            type: 'Golden',
            favoriteToy: 'bone'
        });
        assert.equal(dog.validateSync(), undefined);
    });
    it('should validate home without valid state', ()=> {
        const dog = new Dog({
            type: 'Pug',
            favoriteToy: 'none'
        });
        assert.equal(dog.validateSync().errors['name'].kind, 'required');
    });
});
