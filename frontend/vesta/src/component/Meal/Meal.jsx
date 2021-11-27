/* eslint-disable */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Icon } from 'semantic-ui-react';
import * as actionCreators from '../../store/actions/index';
import {
  Breakfast, Lunch, Dinner, MealName,
} from '../../styles/Menu_Recommendation/Meals';

class Meal extends Component {
  constructor() {
    super();
    this.state = {
      otherBreakfast: false,
      otherLunch: false,
      otherDinner: false,
    };
  }

  onClickedOtherBreakfast = () => {
    if (this.state.otherBreakfast) {
      this.setState({
        otherBreakfast: false,
      });
    } else {
      this.setState({
        otherBreakfast: true,
      });
    }
  };

  onClickedOtherLunch = () => {
    if (this.state.otherLunch) {
      this.setState({
        otherLunch: false,
      });
    } else {
      this.setState({
        otherLunch: true,
      });
    }
  };

  onClickedOtherDinner = () => {
    if (this.state.otherDinner) {
      this.setState({
        otherDinner: false,
      });
    } else {
      this.setState({
        otherDinner: true,
      });
    }
  };

  onMealDetail = (when, idx) => {
    console.log('here');
    this.props.history.push('/recommendation/'+when+'/'+idx);
  }

  render() {
    let breakfast_ = "Breakfast  ";
    let lunch_ = "Lunch  ";
    let dinner_ = "Dinner  ";
    if (this.props.time === 'breakfast') {
      return (
        <div>
          <Breakfast>
            <a onClick={() => this.onMealDetail(0, 0)}>
              <img
                id="breakfast"
                src="/DummyImages/breakfast1_.jpeg"
                height={240}
                width={360}
                alt="meal_one"
              />
            </a>
            <MealName>
              {breakfast_}
              <Icon name="search plus" size="large" onClick={() => this.onClickedOtherBreakfast()}/>
            </MealName>
          </Breakfast>
          {this.state.otherBreakfast ? "null" : null}
        </div>
      );
    } else if (this.props.time === 'lunch') {
      return (
        <div>
          <Lunch>
            <a onClick={() => this.onMealDetail(1, 0)}>
              <img
                id="lunch"
                src="/DummyImages/lunch1_.jpeg"
                height={240}
                width={360}
                alt="meal_one"
              />
            </a>
            <MealName>
              {lunch_}
              <Icon name="search plus" size="large" onClick={() => this.onClickedOtherLunch()}/>
            </MealName>
          </Lunch>
          {this.state.otherLunch ? "null" : null}
        </div>
      );
    }
    return (
      <div>
        <Dinner>
          <a onClick={() => this.onMealDetail(2, 0)}>
            <img
              id="dinner"
              src="/DummyImages/dinner1_.jpeg"
              height={240}
              width={360}
              alt="meal_one"
            />
          </a>
          <MealName>
              {dinner_}
              <Icon name="search plus" size="large" onClick={() => this.onClickedOtherDinner()}/>
            </MealName>
        </Dinner>
        {this.state.otherDinner ? "dinner" : null}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  recommendedMenus: state.menu.recommendedMenus,
});

// const mapDispatchToProps = (dispatch) => ({
//   onUpdateSelectedMenu: (when, idx) => dispatch(actionCreators.updateSelectedMenu_(when, idx)),
// });

export default connect(mapStateToProps, null)(withRouter(Meal));
