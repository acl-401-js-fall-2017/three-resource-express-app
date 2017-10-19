const Insect = require('../../lib/models/insects');
const assert = require('assert');

describe('Insect Model', () => {

    it('is a good model', () => {
        const insect = new Insect({
            name: 'Grasshopper',
            body: {
                numOfLegs: 6,
                wings: true
            }
        });
        assert.equal(insect.validateSync(), undefined);
    });


    it.skip('wings must be a boolean', () => {
        const insect = new Insect({
            body: {
                wings: 'banana'
            }
        });
        const{errors} = insect.validateSync();
        assert.equal(errors['body.wings'].kind, 'boolean');
    });

});