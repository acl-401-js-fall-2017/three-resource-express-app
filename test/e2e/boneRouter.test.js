const db = require('./db');
const request = require('./request');
const Bone = require('../../lib/models/Bone');

describe('boneRouter: ', () => {

    let humerusInput = null;
    let calcanealInput = null;
    let sphenoidInput = null;
    beforeEach(() => {
        humerusInput = {
            name: 'humerus',
            type: 'long',
            joints: ['glenohumeral', 'ulnohumeral', 'humeroradial'],
            muscles: ['deltoid', 'supraspinatus', 'pectoralis major', 'teres major', 'latissimus dorsi', 'infraspinatus', 'teres minor', 'subscapularis', 'biceps brachii', 'brachialis', 'brachioradialis', 'triceps brachii', 'anconeous'],
            nerves: ['axillary', 'radial', 'ulnar']
        };
        calcanealInput = {
            name: 'calcaneal',
            type: 'short',
            joints: ['talocalcaneal', 'talocalcaneonavicular', 'calcaneocuboid'],
            muscles: ['gastrocnemius', 'soleus', 'plantaris', 'extensor digitorum brevis', 'abductor hallucis', 'extensor hallucis brevis', 'abductor digiti minimi', 'flexor digitorum brevis', 'quadratus plantae'],
            nerves: ['sural', 'tibial']
        };
        sphenoidInput = {
            name: 'sphenoid',
            type: 'irregular',
            joints: ['sphenoemthmoidal', 'sphenosquamosal', 'sphenopetrosal', 'palatomaxillary'],
            muscles: ['lateral pterygoid', 'medial pterygoid', 'levator palpebrae superioris', 'superior rectus', 'inferior rectus', 'medial rectus', 'lateral rectus', 'superior oblique', 'tensor tympani', 'tensor veli palatini'],
            nerves: ['optic', 'opthalmic', 'maxillary', 'mandibular', 'abductent', 'oculomotor', 'trochlear', 'petrosal', 'pharyngeal']
        };
    });

    describe('GET', () => {

    });
    describe('GET:id', () => {

    });
    describe('POST', () => {
        it('returns the posted object with its mongodb _id', () => {
            return request.post('/api/bones')
                .send(humerusInput)
                .then(res => {
                    assert.ok(res.body._id);
                });
        });
    });
    describe('DELETE:id', () => {

    });
    describe('PUT:id', () => {

    });
});