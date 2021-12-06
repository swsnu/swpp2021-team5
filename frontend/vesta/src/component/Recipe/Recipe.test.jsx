import React from 'react';
import { shallow } from 'enzyme';
import Recipe from './Recipe';

describe('<Recipe/>', () => {
  let recipe = "['1. preheat oven to 350 degrees fahrenheit', '2. sift first 4 ingredients together in bowl', '3. add pb , mix well', '4. add milk , beat well', '5. pour batter into a loaf tin', '6. bake 1 hour or until a toothpick comes out clean']";
  let ingredient = "['flour', 'baking powder', 'salt', 'sugar', 'peanut butter', 'skim milk']";
  it('should render without errors', () => {
    const component = shallow(<Recipe recipe={recipe} ingredient={ingredient}/>);
    const wrapper = component.find('.Recipe');
    expect(wrapper.length).toBe(1);
  });
})