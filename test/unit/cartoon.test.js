const Cartoon = require('../../lib/model/cartoon');
const chai = require('chai');
const assert = chai.assert; 


describe('Cartoon Model', ()=> {

    it('good model', () => {
        const cartoon = new Cartoon({
            name: 'Rugrats',
            releaseYear: 1991,
            leadingCharacters:[
                {name: 'Tommy', description: 'Tommy is part Christian and part Jewish, and the former born head leader of the babies.'},
                {name: 'Chuckie', description: 'Despite his cuteness, Chuckie is pessimistic and scares easily'},
                {name: 'Angelica', description: 'Angelica is the bratty daughter of Drew and Charlotte Pickles'}
            ]
        });
        assert.equal(cartoon.validateSync(), undefined);
    });

    it('bad model', () => {
        const cartoon = new Cartoon({
            name: 1991,
            releaseYear: 'Rugrats'
        });
        assert.deepEqual(cartoon.validateSync().errors.releaseYear.kind, 'Number'); 
    });



});