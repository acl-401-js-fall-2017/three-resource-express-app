const assert = require('chai').assert;
const mongoose = require('mongoose');
const request = require('./request');

describe('Sitcom API', () => {

    beforeEach(()=> mongoose.connection.dropDatabase());

    const freshPrince = {
        title: 'The Fresh Prince of Bel-Air',
        releaseYear: 1990,
        cast: [{actor: 'Will Smith', role: 'Will Smith'},
            {actor: 'James Avery ', role: 'Philip Banks'}]
    };

    it('Saves a sitcom with id', ()=>{
        return request.post('/api/sitcoms')
            .send(freshPrince)
            .then(res => {
                const sitcom = res.body;
                assert.ok(sitcom._id);
                assert.equal(sitcom.name, freshPrince.name);
            });
    });

    it('Shoud get a sitcom by id', ()=>{
        let sitcom;
        let id;

        return request.post('/api/sitcoms')
            .send(freshPrince)
            .then(res => {
                sitcom = res.body;
                id = sitcom._id;
            })
            .then(()=>{
                return request.get(`/api/sitcoms/${id}`)
                    .then(res =>{
                        assert.deepEqual(res.body, sitcom);
                    });
            });

    });

    it('get by id returns 404 for bad id', () => {
        return request.get('/api/sitcoms/59dfeaeb083bf9beecc97ce8')
            .then(
                () => { throw new Error('Unexpected successful response'); },
                err => {
                    assert.equal(err.status, 404);    
                }
            );
    });

    it('gets all sitcoms', () => {
        const familyMatters = {
            title: 'Family Matters',
            releaseYear: 1989,
            cast: [{actor: 'Reginald VelJohnson', role: 'Carl Otis Winslow'},
                {actor: 'Jo Marie Payton ', role: 'Harriette Baines-Winslow'}]
        };

        const posts = [familyMatters, freshPrince].map(sitcom => {
            return request.post('/api/sitcoms')
                .send(sitcom)
                .then(res => res.body);
        });

        let saved = null;
        return Promise.all(posts)
            .then(_saved => {
                saved = _saved;
                return request.get('/api/sitcoms');
            })
            .then(res => {
                assert.deepEqual(res.body, saved);
            });
    });

    it('delete by id', () => {
        let sitcom = null;
        return request.post('/api/sitcoms')
            .send(freshPrince)
            .then(res => {
                sitcom = res.body;
                return request.delete(`/api/sitcoms/${sitcom._id}`);
            })
            .then(res => {
                assert.deepEqual(res.body, { removed: true });
                return request.get(`/api/sitcoms/${sitcom._id}`);                
            })
            .then(
                () => { throw new Error('Unexpected successful response'); },
                err => {
                    assert.equal(err.status, 404);    
                }
            );
    });

    it('updates an item', () => {
        const familyMatters = {
            title: 'Family Matterssssssssssssssssssssss',
            releaseYear: 1989,
            cast: [{actor: 'Reginald VelJohnson', role: 'Carl Otis Winslow'},
                {actor: 'Jo Marie Payton ', role: 'Harriette Baines-Winslow'}]
        };

        let savedSitcom = null;

        return request.post('/api/sitcoms')
            .send(familyMatters)
            .then(res => savedSitcom = res.body)
            .then(() => {
                familyMatters.name = 'Family Matters';
                return request
                    .put(`/api/sitcoms/${savedSitcom._id}`)
                    .send( familyMatters );
            })
            .then( res => {
                assert.deepEqual(res.body.nModified === 1, true);
            });

    });


});