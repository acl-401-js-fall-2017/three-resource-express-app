const Sitcom = require('../../lib/model/sitcom');
const chai = require('chai');
const assert = chai.assert;


describe('Sitcom model', ()=>{

    it('good model', () => {
        const sitcom = new Sitcom({
            title: 'The Fresh Prince of Bel-Air',
            releaseYear: 1990
        });
        assert.equal(sitcom.validateSync(), undefined);

    });

    it('bad model', () => {
        const sitcom = new Sitcom({
            title: 1990,
            releaseYear: 'The Fresh Prince of Bel-Air'
        });
        assert.deepEqual(sitcom.validateSync().errors.releaseYear.kind, 'Number');

    });



});