import { todayOptions, weeklyOptions } from './GraphConfig';

const testContext = {
  dataIndex: 0,
  chart: {
    data: {
      datasets: [
        {},
        {
          data: [0, 1, 2, 3]
        },
        {
          data: [0, 1, 2, 3]
        }
      ]
    }
  }
};

describe('GraphConfig', () => {
  it('should return correct value: today', () => {
    const result = todayOptions.scales.y.ticks.callback(100);
    expect(result).toBe('100%');
    const result2 = todayOptions.plugins.datalabels.formatter(1);
    expect(result2).toEqual('1 %');
  });

  it('should return correct value: weekly', () => {
    const result = weeklyOptions.scales.y.ticks.callback(100);
    expect(result).toBe('100%');
  })

  it('should configure tooltips', () => {
    const func = todayOptions.plugins.tooltip.callbacks.label;
    let result = func(testContext);
    expect(result).toEqual('Intake: 0 Kcal\nRecommended: 0 Kcal');
    const testContext2 = {...testContext, dataIndex: 1};
    expect(func(testContext2)).toEqual('Intake: 1 grams\nRecommended: 1 grams');
    const testContext3 = {...testContext, dataIndex: 2};
    expect(func(testContext3)).toEqual('Intake: 2 grams\nRecommended: 2 grams');
    const testContext4 = {...testContext, dataIndex: 3};
    expect(func(testContext4)).toEqual('Intake: 3 grams\nRecommended: 3 grams');
    const testContext5 = {...testContext, dataIndex: 4};
    expect(func(testContext5)).toEqual('');
  })
});
