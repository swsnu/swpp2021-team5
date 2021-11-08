import React, { PureComponent } from 'react';
import { Image, Button } from 'semantic-ui-react';
import styled from 'styled-components';

const Breakfast = styled.div`
background-color:#77ACF2;
border-radius: 10px;
padding:4%;
`;

const Lunch = styled.div`
background-color:#D95407;
border-radius: 10px;
padding:4%;
`;

const Dinner = styled.div`
background-color:#BF7960;
border-radius: 10px;
padding:4%;
`;

const MealName = styled.div`
font-family:'verveine';
font-size:25px;
padding-top:10px;
padding-bottom:10px;
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
          <Button className="other-meal-breakfast-button">Other</Button>
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
          <Button className="other-meal-lunch-button">Other</Button>
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
        <Button className="other-meal-dinner-button">Other</Button>
      </Dinner>
    );
  }
}

export default Meal;
