/* eslint-disable */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Image } from 'semantic-ui-react';
import * as actionCreators from '../../store/actions/index';
import {
  Breakfast, Lunch, Dinner, MealName,
} from '../../styles/Menu_Recommendation/Meals';

class Meal extends Component {
  onMealDetail = (when, idx) => {
    this.props.history.push('/recommendation/'+when+'/'+idx);
  }

  render() {
    // if (this.props.recommendedMenus) console.log(this.props.recommendedMenus[0]);
    if (this.props.time === 'breakfast') {
      // let url = `/recommendation/${this.props.recommendedMenus[0][1].name}`
      // console.log(url);
      return (
        <div>
          <Breakfast>
            <a onClick={() => this.onMealDetail(0, 0)}>
              <img
                src="/DummyImages/breakfast1_.jpeg"
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
            <a onClick={() => this.onMealDetail(1, 0)}>
              <img
                src="/DummyImages/lunch1_.jpeg"
                height={180}
                width={270}
                alt="meal_one"
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
          <a onClick={() => this.onMealDetail(2, 0)}>
            <img
              src="/DummyImages/dinner1_.jpeg"
              height={180}
              width={270}
              alt="meal_one"
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

// const mapDispatchToProps = (dispatch) => ({
//   onUpdateSelectedMenu: (when, idx) => dispatch(actionCreators.updateSelectedMenu_(when, idx)),
// });

export default connect(mapStateToProps, null)(withRouter(Meal));
