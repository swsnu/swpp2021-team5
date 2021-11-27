import { mount, shallow } from 'enzyme';
import Statistics from './Statistics';

describe('Statistics', () => {
  let statistics;
  statistics = <Statistics />;

  xit('should render Statistics', () => {
    const component = mount(statistics);
    const wrapper = component.find('.Statistics');
    expect(wrapper.length).toBe(1);
  });
});
