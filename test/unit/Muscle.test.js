const {assert} = require('chai');
const Muscle = require('../../lib/models/Muscle');

describe('Muscle model: ', () => {

    let tflData = null;
    let ldData = null;
    let lsData = null;
    beforeEach(() => {
        tflData = {
            name: 'tensor fascia latae',
            origin: 'superioanterior ilial spine',
            insertion: 'lateral tibial condyle',
            action:{
                joint: 'acetabulofemoral',
                movement: ['flexion', 'extension']
            },
            innervation: 'superior gluteal'
        };
        ldData = {
            name: 'latissimus dorsi',
            origin: ['vertebrae T7-L5', 'iliac crest', 'inferior scapula', 'inferior 3/4 ribs'],
            insertion: 'intertubercular groove of humerus',
            action: {
                joint: 'glenohumeral',
                actsOn: 'humerus',
                movement: ['adduction', 'extention', 'internal rotation']
            },
            innervation: 'thoracodorsal'
        };
        lsData = {
            name: 'levator scapulae',
            origin: 'transverse processes C1-C4',
            insertion: 'superior medial scapula',
            action: [
                {
                    joint: 'acromioclavicular',
                    actsOn: 'scapula',
                    movement: 'elevation'
                },
                {
                    joint: ['atlantoaxial', 'atlanto-occipital', 'cervical intervertebral'],
                    movement: ['ipsilateral flexion', 'bilateral flexion', 'bilateral extension']
                }
            ],
            innervation: ['cervical', 'dorsal scapular']
        };
    });

    it('creates a valid muscle object from model', () => {
        const tfl = new Muscle(tflData);
        const ld = new Muscle(ldData);
        const ls = new Muscle(lsData);

        assert.ok(
            !tfl.validateSync() &&
            !ld.validateSync() &&
            !ls.validateSync()
        );
    });

    it('invalidates a muscle with an object for a name', () => {
        lsData.name = {
            scientific: 'latissimus dorsi',
            common: 'lats'
        };
        const ls = new Muscle(lsData);
        assert.equal(ls.validateSync().errors.name.kind, 'String');
    });
});