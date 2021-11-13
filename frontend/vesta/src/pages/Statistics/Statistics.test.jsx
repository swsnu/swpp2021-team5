import Statistics from './Statistics';

import { mount, shallow } from 'enzyme';

describe('Statistics', () => {
    let statistics;
    statistics = <Statistics />

    it('should render Statistics', () => {
        const component = mount(statistics);
        const wrapper = component.find('.Statistics')
        expect(wrapper.length).toBe(1);
    })
})