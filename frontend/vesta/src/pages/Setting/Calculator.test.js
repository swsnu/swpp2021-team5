import { recommendedCalorie } from './Calculator';

describe('Calculator', () => {
  
  it('should return correct value for female', () => {
    const result = recommendedCalorie(21, false, 170, 180);
    expect(result).toBeGreaterThan(1000);
  })
})