/* eslint-disable */
import React from 'react';
import { shallow } from 'enzyme';
import Record from './Record';

describe('<Record />', () => {
  it('should be rendered properly', () => {
    const component = shallow(<Record />);
    const wrapper = component.find('.Record');
    expect(wrapper.length).toBe(1);
  });
});
