const request = require('./request');
const mongoose = require('mongoose');
const assert = require('chai').assert;

describe('Homes API', ()=> {
    beforeEach(()=> mongoose.connection.dropDatabase());

    const home = {
        type: 'house',
        address:{ 
            street:'10nw 5th ave',
            unit: '322',
            state: 'OR',
            zip: 97209,
        }
    };

    it('saves with id', ()=> {
        return request.post('/api/homes')
            .send(home)
            .then(res => {
                assert.ok(res.body._id);
                assert.equal(res.body.type, home.type);
            });
    });

    it('gets  by id', ()=> {
        return request.post('/api/homes')
            .send(home)
            .then( (res) => {
                const id = res.body._id;
                return request.get(`/api/homes/${id}`);
            })
            .then( res=> assert.deepEqual(res.body.type, home.type));

    });

    it('gets all', () => {
        return request.post('/api/homes')
            .send(home)
            .then( () => {
                return request.get('/api/homes/');
            })
            .then( res=> assert.deepEqual(res.body[0].type,home.type));
    });

    it('deletes by id', () => {
        return request.post('/api/homes')
            .send(home)
            .then( (res) => {
                let id = res.body._id;
                return request.delete(`/api/homes/${id}`);
            })
            .then(() => {
                return request.get('/api/homes');
            })
            .then((res) => assert.deepEqual(res.body,[]));
    });

    it.only('updates the resource', () => {
        let id = null;
        return request.post('/api/homes')
            .send(home)
            .then( (res) => {
                id = res.body._id;
                const update = {type:'trailer'};
                return request.put(`/api/homes/${id}`)
                    .send(update);
            })
            .then(() => {
                return request.get('/api/homes/${id}');
            })
            .then((res) => {
                assert.equal(res.body.type, 'trailer');
            });
    });

});
