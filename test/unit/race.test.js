const { assert } = require('chai');
const Race = require('../../lib/models/race');

describe('Race model', () => {

    it('Validates a  good model', () => {
        const race = new Race({
            name: 'Sunrise Cup',
            class: ['Formula', 'Turbo 6'],
            course: [{
                name: 'Laguna Seca',
                location: 'California',
            }],
            raceDate: new Date
        });
        assert.equal(race.validateSync(), undefined);
    });

    it('required fields', () => {
        const race = new Race();
        const { errors } = race.validateSync();
        assert.equal(errors['name'].kind, 'required');
        assert.equal(errors['raceDate'].kind, 'required');
    });


});