/* eslint-disable */
import React, { Component } from 'react';
import {
  Button, Icon,
} from 'semantic-ui-react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import {
  RecommendationBody, RecommendationHeader, OtherMealName,
} from '../../styles/Menu_Recommendation/Meals';
import '../../styles/Menu_Recommendation/MealList.css';
import {
  Breakfast, Lunch, Dinner, MealName,
} from '../../styles/Menu_Recommendation/Meals';

class MealList extends Component {
  constructor() {
    super();
    this.state = {
      otherBreakfast: false,
      otherLunch: false,
      otherDinner: false,
    };
  }

  onMealDetail = (menuName, idx) => {
    menuName = String(menuName).replace(/\s/gi, '-');
    console.log(menuName);
    this.props.history.push(`/recommendation/${menuName}/${idx}`);
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

  render() {
    let otherBreakfast = [];
    let otherLunch = [];
    let otherDinner = [];
    let meals = [];
    let recommendationBody = "Here, we recommend you the best meal for today according to your nutriture data for today.\n By clicking Plus icon, you can see other recommended menus, as well. Enjoy!";
    let breakfast_ = "Breakfast  ";
    let lunch_ = "Lunch  ";
    let dinner_ = "Dinner  ";
    if (this.props.recommendedMenus) {
      if (this.props.recommendedMenus[0] !== null) {
        meals.push(
          <div class="item">
            <Breakfast>
              <a onClick={() => this.onMealDetail(this.props.recommendedMenus[0].name, 0)}>
                <img
                  id="breakfast"
                  src={this.props.recommendedMenus[0].image}
                  alt="meal_one"
                />
              </a>
              <MealName>
                {breakfast_}
                <Icon name="search plus" size="large" onClick={() => this.onClickedOtherBreakfast()}/>
              </MealName>
            </Breakfast>
          </div>
        );
      }
      if (this.props.recommendedMenus[1] !== null) {
        meals.push(
          <div class="item">
            <Lunch>
              <a onClick={() => this.onMealDetail(this.props.recommendedMenus[1].name, 1)}>
                <img
                  id="lunch"
                  src={this.props.recommendedMenus[1].image}
                  alt="meal_one"
                />
              </a>
              <MealName>
                {lunch_}
                <Icon name="search plus" size="large" onClick={() => this.onClickedOtherLunch()}/>
              </MealName>
            </Lunch>
          </div>
        );
      }
      if (this.props.recommendedMenus[2] !== null) {
        meals.push(
          <div class="item">
            <Dinner>
              <a onClick={() => this.onMealDetail(this.props.recommendedMenus[2].name, 2)}>
                <img
                  id="dinner"
                  src={this.props.recommendedMenus[2].image}
                  alt="meal_one"
                />
              </a>
              <MealName>
                {dinner_}
                <Icon name="search plus" size="large" onClick={() => this.onClickedOtherDinner()}/>
              </MealName>
            </Dinner>
          </div>
        );
      }
      for (let idx=3; idx<7; idx++) {  // other breakfast
        if (this.props.recommendedMenus[idx] !== null) {
          otherBreakfast.push(
            <div class="item_other_breakfast">
              <a onClick={() => this.onMealDetail(this.props.recommendedMenus[idx].name, idx)}>
                <img
                  id="otherBreakfast"
                  src={this.props.recommendedMenus[idx].image}
                  alt="meal_one"
                />
              </a>
              <OtherMealName>{this.props.recommendedMenus[idx].name}</OtherMealName>
            </div>
          )     
        }
      }
      for (let idx=7; idx<11; idx++) {  // other lunch
        if (this.props.recommendedMenus[idx] !== null){
          otherLunch.push(
            <div class="item_other_lunch">
              <a onClick={() => this.onMealDetail(this.props.recommendedMenus[idx].name, idx)}>
                <img
                  src={this.props.recommendedMenus[idx].image}
                  alt="meal_one"
                />
              </a>
              <OtherMealName>{this.props.recommendedMenus[idx].name}</OtherMealName>
            </div>
          )
        }
      }
      for (let idx=11; idx<15; idx++) {  // other dinner
        if (this.props.recommendedMenus[idx] !==  null) {
          otherDinner.push(
            <div class="item_other_dinner">
              <a onClick={() => this.onMealDetail(this.props.recommendedMenus[idx].name, idx)}>
                <img
                  src={this.props.recommendedMenus[idx].image}
                  alt="meal_one"
                />
              </a>
              <OtherMealName>{this.props.recommendedMenus[idx].name}</OtherMealName>
            </div>
          )
        }
      }
    }
    return (
      <div className="MenuRecommendation">
        <RecommendationHeader>{this.props.title}</RecommendationHeader>
        <RecommendationBody>{recommendationBody}</RecommendationBody>
        <div class="container">
          {meals}
        </div>
        {this.state.otherBreakfast ? <div class="container_other_breakfast"> {otherBreakfast} </div>: null}
        {this.state.otherLunch ? <div class="container_other_lunch"> {otherLunch} </div>: null}
        {this.state.otherDinner ? <div class="container_other_dinner"> {otherDinner} </div>: null}
        <Button className="main-button" onClick={() => this.props.history.push('/main')}>Back</Button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  recommendedMenus: state.menu.recommendedMenus,
});

export default connect(mapStateToProps, null)(withRouter(MealList));
