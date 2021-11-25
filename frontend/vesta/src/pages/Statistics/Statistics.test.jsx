import { mount, shallow } from 'enzyme';
import Statistics from './Statistics';

describe('Statistics', () => {
  let statistics;
  statistics = <Statistics />;

<<<<<<< HEAD
  it('should render Statistics', () => {
    const component = mount(statistics);
    const wrapper = component.find('.Statistics');
    expect(wrapper.length).toBe(1);
  });
});
=======
    xit('should render Statistics', () => {
        const component = mount(statistics);
        const wrapper = component.find('.Statistics')
        expect(wrapper.length).toBe(1);
    })
})
>>>>>>> 83e1fe3a74ff9be70c1cec7f568748db8c401dad
