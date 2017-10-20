const assert = require('chai').assert;
const mongoose = require('mongoose');
const request = require('./request');

describe('Sitcom API', () => {

    beforeEach(()=> mongoose.connection.dropDatabase());

    const freshPrince = {
        name: 'The Fresh Prince of Bel-Air',
        releaseYear: 1990,
        cast: [{actor: 'Will Smith', role: 'Will Smith'},
            {actor: 'James Avery ', role: 'Philip Banks'}]
    };

    it('Saves a sitcom with id', ()=>{
        return request.post('/api/sitcom')
            .send(freshPrince)
            .then(res => {
                const sitcom = res.body;
                assert.ok(sitcom._id);
                assert.equal(sitcom.name, freshPrince.name);
            });
    });

});