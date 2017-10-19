const Bird = require('../../lib/models/birds');
const assert = require('assert');

describe('State Model', () => {

    it('a good model', () => {
        const bird = new Bird({
            name: 'Jay',
            color: 'blue'
        });
        assert.equal(bird.validateSync(), undefined);
    });


    it('name is required', () => {
        const bird = new Bird({name: ''});
        const{errors} = bird.validateSync();
        assert.equal(errors.name.kind, 'required');
    });





});