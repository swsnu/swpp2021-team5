/* eslint-disable */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Image, Button } from 'semantic-ui-react';
import {
  Breakfast, Lunch, Dinner, MealName,
} from '../../styles/Menu_Recommendation/Meals';

class Meal extends Component {
  // constructor() {
  //   super();
  //   this.state = {
  //     otherBreakfast: false,
  //     otherLunch: false,
  //     otherDinner: false,
  //   };
  // }

  // onClickedOtherBreakfast = () => {
  //   if (this.state.otherBreakfast) {
  //     this.setState({
  //       otherBreakfast: false,
  //       otherLunch: false,
  //       otherDinner: false,
  //     });
  //   } else {
  //     this.setState({
  //       otherBreakfast: true,
  //       otherLunch: false,
  //       otherDinner: false,
  //     });
  //   }
  // };

  // onClickedOtherLunch = () => {
  //   if (this.state.otherLunch) {
  //     this.setState({
  //       otherBreakfast: false,
  //       otherLunch: false,
  //       otherDinner: false,
  //     });
  //   } else {
  //     this.setState({
  //       otherBreakfast: false,
  //       otherLunch: true,
  //       otherDinner: false,
  //     });
  //   }
  // };

  // onClickedOtherDinner = () => {
  //   if (this.state.otherDinner) {
  //     this.setState({
  //       otherBreakfast: false,
  //       otherLunch: false,
  //       otherDinner: false,
  //     });
  //   } else {
  //     this.setState({
  //       otherBreakfast: false,
  //       otherLunch: false,
  //       otherDinner: true,
  //     });
  //   }
  // };

  render() {
    if (this.props.time === 'breakfast') {
      return (
        <div>
          <Breakfast>
            <Image
              src="/sushi_example_image.jpeg"
              size="medium"
              alt="meal_one"
              href="/recommendation/detail"
            />
            <MealName>Breakfast</MealName>
            {/* <Button className="other-meal-breakfast-button" onClick={() => this.onClickedOtherBreakfast()}>
              Other
            </Button> */}
          </Breakfast>
          {/* {this.state.otherBreakfast ? 'breakfast' : null} */}
        </div>
      );
    } if (this.props.time === 'lunch') {
      return (
        <div>
          <Lunch>
            <Image
              src="/sushi_example_image.jpeg"
              size="medium"
              alt="meal_one"
              href="/recommendation/detail"
            />
            <MealName>Lunch</MealName>
            {/* <Button className="other-meal-lunch-button" onClick={() => this.onClickedOtherLunch()}>
              Other
            </Button> */}
          </Lunch>
          {/* {this.state.otherLunch ? 'lunch' : null} */}
        </div>
      );
    }
    return (
      <div>
        <Dinner>
          <Image
            src="/sushi_example_image.jpeg"
            size="medium"
            alt="meal_one"
            href="/recommendation/detail"
          />
          <MealName>Dinner</MealName>
          {/* <Button className="other-meal-dinner-button" onClick={() => this.onClickedOtherDinner()}>
            Other
          </Button> */}
        </Dinner>
        {/* {this.state.otherDinner ? 'dinner' : null} */}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  recommendedMenus: state.menu.recommendedMenus,
});

export default connect(mapStateToProps, null)(withRouter(Meal));
