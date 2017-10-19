const {assert} = require('chai');
const Studio = require('../../lib/models/studio');

describe('Studio Model', () => {
    it('valid model', () => {
        const studio = new Studio({
            name: 'New Line Cinema',
            yearFounded: 1967,
            location: {
                country: 'United States',
                state: 'California',
                city: 'Burbank'
            }
        });
        assert.equal(studio.validateSync(), undefined);
    });
    it('required fields', () => {
        const studio = new Studio({});
        const {errors} = studio.validateSync();
        assert.equal(errors['name'].kind, 'required');
    });
    it('year founded is above min', () => {
        const studio = new Studio({
            yearFounded: 1899
        });
        const {errors} = studio.validateSync();
        assert.equal(errors['yearFounded'].kind, 'min');
    });
});