const { assert } = require('chai');
const Driver = require('../../lib/models/driver');

describe('Driver model', () => {

    it('Validates a  good model', () => {
        const driver = new Driver({
            name: 'Michel Schumacker',
            age: 23,
            wins: 45
        });
        assert.equal(driver.validateSync(), undefined);
    });

    it('required fields', () => {
        const driver = new Driver();
        const { errors } = driver.validateSync();
        assert.equal(errors['name'].kind, 'required');
        assert.equal(errors['age'].kind, 'required');
        assert.equal(errors['wins'].kind, 'required');
    });

    it('Age must be 17 or more', () => {
        const driver = new Driver({ age: 0 });
        const { errors } = driver.validateSync();
        assert.equal(errors['age'].kind, 'min');
    });

    it('wins must be 0 or above', () => {
        const driver = new Driver({ wins: -10 });
        const { errors } = driver.validateSync();
        assert.equal(errors['wins'].kind, 'min');
    });

});