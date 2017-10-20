const Cat = require('../../lib/model/cat');
const assert = require('chai').assert;

describe('CAT TEST', () => {

    it('should pass validation', () => {
        const cat = new Cat({
            name: 'anthony',
            stats: {
                HP: 30,
                MP: 1
            }
        });
        assert.equal(cat.validateSync(), undefined);
    });

    it('should fail validation if Stats are forbidden values', () => {
        const cat = new Cat({
            name: 'buttons',
            stats: {
                HP: 20,
                MP: -1
            }
        });
        const {errors} = cat.validateSync();
        assert.equal(errors.name, 'ValidationError');
    });

});