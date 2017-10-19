const {assert} = require('chai');
const Bone = require('../../lib/models/Bone');

describe('Bone model: ', () => {

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

    it('creates a valid Bone object', () => {
        const humerus = new Bone(humerusInput);
        assert.ok(humerus instanceof Bone);
        assert.ok(!humerus.validateSync());
    });
    
    it('invalidates input without a name field', () => {
        delete humerusInput.name;
        const humerus = new Bone(humerusInput);
        assert.equal(humerus.validateSync().errors.name.kind, 'required');    
    });
    
    it('invalidates input with an invalid type enum value', () => {
        humerusInput.type = 'squishy';
        const humerus = new Bone(humerusInput);
        assert.equal(humerus.validateSync().errors.type.kind, 'enum');    
    });
});