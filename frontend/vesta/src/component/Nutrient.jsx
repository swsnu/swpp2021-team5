import React from 'react';

const Nutrient = (props) => (
  <div>
    <h1>{props.menu_name}</h1>
    <img alt="menu" src="/sushi_example_image.jpeg" />
    <text>
      {props.calories}
      {props.carbs}
      {props.protein}
      {props.fat}
    </text>
  </div>
);

export default Nutrient;
