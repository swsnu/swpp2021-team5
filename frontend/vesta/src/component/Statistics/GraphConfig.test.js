import { options } from './GraphConfig'

describe('GraphConfig', () => {
    
    it('should return correct value', () => {
        const result = options.scales.y.ticks.callback(100);
        expect(result).toBe('100%');
    })
})