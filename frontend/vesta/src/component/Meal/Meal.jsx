import React, { PureComponent } from 'react';
import { Image, Button } from 'semantic-ui-react';
import {
  Breakfast, Lunch, Dinner, MealName,
} from '../../styles/Menu_Recommendation/Meals';

class Meal extends PureComponent {
  render() {
    if (this.props.time === 'breakfast') {
      return (
        <Breakfast>
          <Image
            src="/sushi_example_image.jpeg"
            size="medium"
            alt="meal_one"
            href="/recommendation/detail"
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
            href="/recommendation/detail"
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
          href="/recommendation/detail"
        />
        <MealName>Dinner</MealName>
        <Button className="other-meal-dinner-button">Other</Button>
      </Dinner>
    );
  }
}

export default Meal;
