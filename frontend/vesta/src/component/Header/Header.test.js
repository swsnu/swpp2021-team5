import React from "react";
import { shallow, mount } from "enzyme";
import Header from './Header';

describe('<Header />', () => {
    it('should be rendered properly', () => {
        const component = mount(<Header />);
        const wrapper = component.find('.logo-image');
        expect(wrapper.length).toBe(1);
    })
})