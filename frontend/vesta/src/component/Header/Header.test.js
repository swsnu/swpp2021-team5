import React from 'react';
import { shallow, mount } from 'enzyme';
import Header from './Header';

describe('<Header />', () => {
<<<<<<< HEAD
  xit('should be rendered properly', () => {
=======
  it('should be rendered properly', () => {
>>>>>>> develop
    const component = mount(<Header />);
    const wrapper = component.find('.logo-image');
    expect(wrapper.length).toBe(1);
  });
});
