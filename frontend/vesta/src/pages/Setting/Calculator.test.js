import { recommendedCalorie } from './Calculator';

describe('Calculator', () => {
  it('should return correct value for female', () => {
    const result = recommendedCalorie(21, false, 170, 180);
    const result2 = recommendedCalorie(21, undefined, 170, 170);
    expect(result).toBeGreaterThan(1000);
  });
});
