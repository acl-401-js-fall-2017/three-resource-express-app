const Realitytv = require('../../lib/model/realitytv');
const chai = require('chai');
const assert = chai.assert; 


describe('Realitytv Model', ()=> {

    it('good model', () => {
        const realitytv = new Realitytv({
            name: 'The Real World',
            releaseYear: 1992,
            cast:[
                {name: 'Julie Gentry', season: 1},
                {name: 'Norman Korpi', season: 1},
                {name: 'Andre Comeau', season: 1}
            ]
        });
        assert.equal(realitytv.validateSync(), undefined);
    });

    it('bad model', () => {
        const realitytv = new Realitytv({
            name: 'The Real World',
            releaseYear: 'The Real World',
            cast:[
                {name: 'Julie Gentry', season: 1},
                {name: 'Norman Korpi', season: 1},
                {name: 'Andre Comeau', season: 1}
            ]
        });
        assert.deepEqual(realitytv.validateSync().errors.releaseYear.kind, 'Number'); 
    });



});