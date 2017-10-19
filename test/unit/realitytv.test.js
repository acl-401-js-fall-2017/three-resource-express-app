const Realitytv = require('../../lib/model/realitytv');
const chai = require('chai');
const assert = chai.assert; 


describe('Cartoon Model', ()=> {

    it('good model', () => {
        const realitytv = new Realitytv({
            name: 'Cops',
            releaseYear: 1989,
            leadingCharacters:[
                {name: 'Tommy', description: 'Tommy is part Christian and part Jewish, and the former born head leader of the babies.'},
                {name: 'Chuckie', description: 'Despite his cuteness, Chuckie is pessimistic and scares easily'},
                {name: 'Angelica', description: 'Angelica is the bratty daughter of Drew and Charlotte Pickles'}
            ]
        });
        assert.equal(realitytv.validateSync(), undefined);
    });

    it('bad model', () => {
        const realitytv = new Realitytv({
            name: 1991,
            releaseYear: 'Rugrats'
        });
        assert.deepEqual(realitytv.validateSync().errors.releaseYear.kind, 'Number'); 
    });



});