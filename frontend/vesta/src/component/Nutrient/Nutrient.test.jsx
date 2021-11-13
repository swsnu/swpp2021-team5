import { shallow } from 'enzyme';
import React from 'react';
import Nutrient from './Nutrient';

describe('<Nutrient />', () => {
  it('should render without errors', () => {
    const component = shallow(<Nutrient />);
    const wrapper = component.find('.Nutrient');
    expect(wrapper.length).toBe(1);
  });
});
