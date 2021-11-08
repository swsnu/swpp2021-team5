import React, { PureComponent } from 'react';
import { Image } from 'semantic-ui-react';
import styled from 'styled-components';

const Breakfast = styled.div`
background-color:#BDD9A0;
border-radius: 10px;
`;

const Lunch = styled.div`
background-color:#D95407;
border-radius: 10px;
`;

const Dinner = styled.div`
background-color:#BF7960;
border-radius: 10px;
`;

const MealName = styled.div`
font-family:'verveine';
font-size:25px;
`;

class Meal extends PureComponent {
  render() {
    if (this.props.time === 'breakfast') {
      return (
        <Breakfast>
          <Image
            src="/sushi_example_image.jpeg"
            size="medium"
            alt="meal_one"
          />
          <MealName>Breakfast</MealName>
        </Breakfast>
      );
    } if (this.props.time === 'lunch') {
      return (
        <Lunch>
          <Image
            src="/sushi_example_image.jpeg"
            size="medium"
            alt="meal_one"
          />
          <MealName>Lunch</MealName>
        </Lunch>
      );
    }
    return (
      <Dinner>
        <Image
          src="/sushi_example_image.jpeg"
          size="medium"
          alt="meal_one"
        />
        <MealName>Dinner</MealName>
      </Dinner>
    );
  }
}

export default Meal;
