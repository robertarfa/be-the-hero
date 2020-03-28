const generateUniqueId = require('../../src/utils/generateUniqueId');

describe('Generate Unique ID', () => {
    it('só pode gerar uma unico ID', () => {
        const id = generateUniqueId();
        expect(id).toHaveLength(8);
    });
});