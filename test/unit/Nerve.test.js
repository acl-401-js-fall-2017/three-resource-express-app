const {assert} = require('chai');
const Nerve = require('../../lib/models/Nerve');

describe('Nerve model: ', () => {

    let nerveData = [
        {
            name: 'trigeminal',
            alias: ['fifth cranial nerve', 'CN V'],
            sensory: true,
            motor: true,
            branches: ['opthalmic', 'maxillary', 'mandibular'],
            innervates: ['masseter', 'temporal pterygoid', 'medial pterygoid', 'lateral pterygoid', 'tensor veli palatini', 'mylohyoid', 'digastric', 'tensor tympani']
        },
        {
            name: 'ulnar',
            alias: ['funny bone', 'nervus ulnaris'],
            sensory: true,
            motor: true,
            branchOf: 'medial',
            innervates: ['flexor carpi ulnaris', 'flexor digitorum profundus', 'lumbricals', 'opponens digiti minimi', 'flexor digiti minimi', 'abductor digiti minimi', 'interossei', 'adductor pollicis']
        },
        {
            name: 'tibial',
            alias: 'nervus tibialis',
            sensory: true,
            motor: true,
            branchOf: 'sciatic',
            branches: ['medial plantar', 'lateral plantar', 'sural', 'medial calcaneal'],
            innervates: ['flexor digitorum longus', 'flexor hallucis longus', 'abductor hallucis', 'flexor digitorum brevis', 'flexor hallucis brevis', 'lumbricals', 'quadratus plantae', 'flexor digiti minimi', 'adductor hallucis', 'interossei', 'abductor digiti minimi']
        }
    ];

    it('creates valid nerve objects from model', () => {
        const trigem = new Nerve(nerveData[0]);
        const ulnar = new Nerve(nerveData[1]);
        const tibial = new Nerve(nerveData[2]);

        assert.ok(
            !trigem.validateSync() &&
            !ulnar.validateSync() &&
            !tibial.validateSync()
        );
    });
});