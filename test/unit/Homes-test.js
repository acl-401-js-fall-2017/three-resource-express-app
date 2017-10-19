const Home = require('../../lib/models/homes');
const { assert } = require('chai');

describe('addresses test', ()=> {
  
    it('should validate home with valid state', ()=> {
        const home = new Home({
            type: 'house',
            address:{ 
                street:'10nw 5th ave',
                unit: '322',
                state: 'OR',
                zip: 97209,
            }
        });
        assert.equal(home.validateSync(), undefined);
    });

    it('should validate home without valid state', ()=> {
        const home = new Home({
            type: 'house',
            address:{ 
                street:'10nw 5th ave',
                unit: '322',
                state: 'Rus',
                zip: 97209,
            }
        });
        assert.equal(home.validateSync().errors['address.state'].kind, 'enum');
    });

});
