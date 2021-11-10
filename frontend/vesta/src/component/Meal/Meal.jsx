/* eslint-disable */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Image } from 'semantic-ui-react';
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
            <a href="/recommendation/detail">
              <img
                src="/DummyImages/breakfast5_.jpeg"
                height={180}
                width={270}
                alt="meal_one"
              />
            </a>
            <MealName>Breakfast</MealName>
          </Breakfast>
        </div>
      );
    } if (this.props.time === 'lunch') {
      return (
        <div>
          <Lunch>
            <a href="/recommendation/detail">
              <img
                src="/DummyImages/lunch5_.jpeg"
                height={180}
                width={270}
                alt="meal_one"
                href="/recommendation/detail"
              />
            </a>
            <MealName>Lunch</MealName>
          </Lunch>
        </div>
      );
    }
    return (
      <div>
        <Dinner>
          <a href="/recommendation/detail">
            <img
              src="/DummyImages/dinner5_.jpeg"
              height={180}
              width={270}
              alt="meal_one"
              href="/recommendation/detail"
            />
          </a>
          <MealName>Dinner</MealName>
        </Dinner>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  recommendedMenus: state.menu.recommendedMenus,
});

export default connect(mapStateToProps, null)(withRouter(Meal));
