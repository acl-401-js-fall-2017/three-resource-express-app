const Sport = require('../../lib/models/sports');
const { assert } = require('chai');

describe('Sports test', ()=> {

    it('should validate a proper sport', ()=> {
        const basketball = new Sport({
            type: 'team',
            violence: 'yes',
            equipment: ['ball', 'uniform', 'hoop']
        });
        assert.equal(basketball.validateSync(), undefined);
    });

    it('should not validate sport without violence', ()=> {
        const baseball = new Sport({
            type: 'team',
            violence: 'no',
            equipment:['cap', 'bat']
        });
        assert.equal(baseball.validateSync().errors['equipment.0'].kind, 'enum');
    });
    
});
