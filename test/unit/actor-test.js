const {assert} = require('chai');
const Actor = require('../../lib/models/actor.js');

describe.only('Actor Model', () => {
    it('valid model', () => {
        const actor = new Actor({
            name: 'Edward Norton',
            dob: '1969-08-18',
            oscarNoms: 3
        });
        assert.equal(actor.validateSync(), undefined);
    });
    it('required fields', () => {
        const actor = new Actor({});
        const {errors} = actor.validateSync();
        assert.equal(errors['name'].kind, 'required');
    });
    it('oscar noms cannot exceed max',() => {
        const actor = new Actor({
            oscarNoms: 21
        });
        const {errors} = actor.validateSync();
        assert.equal(errors['oscarNoms'].kind, 'max');
    });
});