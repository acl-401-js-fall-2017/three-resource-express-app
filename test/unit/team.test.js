const { assert } = require('chai');
const Team = require('../../lib/models/team');

describe('Team model', () => {

    it('Validates a  good model', () => {
        const team = new Team({
            make: 'Ferrari',
            drivers: [ { name: 'Michel Schumacker'} ],
            class: [{ name: 'Formula'}],
            trophies: 45
        });
        assert.equal(team.validateSync(), undefined);
    });

    it('required fields', () => {
        const team = new Team({});
        const { errors } = team.validateSync();
        assert.equal(errors['make'].kind, 'required');
        // assert.equal(errors['drivers.name'].kind, 'required');
        // assert.equal(errors['class.name'].kind, 'required');
    });


});