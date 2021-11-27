<<<<<<< HEAD
import { options } from './GraphConfig';

describe('GraphConfig', () => {
  it('should return correct value', () => {
    const result = options.scales.y.ticks.callback(100);
=======
import { todayOptions } from './GraphConfig';

describe('GraphConfig', () => {
  it('should return correct value', () => {
    const result = todayOptions.scales.y.ticks.callback(100);
>>>>>>> 83e1fe3a74ff9be70c1cec7f568748db8c401dad
    expect(result).toBe('100%');
  });
});
