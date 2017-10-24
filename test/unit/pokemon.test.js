const Pokemon = require('../../lib/models/pokemon');
const { assert } = require('chai');

describe('Pokemon Schema Tests', () => {

    it('validates a pokemon', () => {

        const pokemon = new Pokemon({
            name: 'Flaffy',
            type: 'Electric',
            dateHatched: new Date(),

            trainer: [
                {
                    name: 'Zac',
                    badges: 14,
                    numberOfCaught: 15
                }
            ]
        });
        assert.equal(pokemon.validateSync(), undefined);
    });

    it('required fields', () => {
        const pokemon = new Pokemon({});
        const { errors } = pokemon.validateSync();
        assert.equal(errors.name.kind, 'required');
    });
});