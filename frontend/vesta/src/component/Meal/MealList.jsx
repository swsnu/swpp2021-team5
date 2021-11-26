/* eslint-disable */
import React, { Component } from 'react';
import {
  Button, Image, Icon,
} from 'semantic-ui-react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import Meal from './Meal';
import {
  RecommendationBody, RecommendationHeader, OtherBreakfastBox, OtherLunchBox, OtherDinnerBox, OtherMealName,
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

  onMealDetail = (menuName) => {
    this.props.history.push(`/recommendation/${menuName}`);
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
    const otherBreakfast = (
      <div class="container_other_breakfast">
        <div class="item_other_breakfast">
          <a onClick={() => this.onMealDetail(this.props.recommendedMenus[3].name)}>
            <img
              id="otherBreakfast"
              src={this.props.recommendedMenus[3].image}
              alt="meal_one"
              height={160}
              width={210}
            />
          </a>
          <OtherMealName>{this.props.recommendedMenus[3].name}</OtherMealName>
        </div>
        <div class="item_other_breakfast">
          <a onClick={() => this.onMealDetail(this.props.recommendedMenus[4].name)}>
            <img
              src={this.props.recommendedMenus[4].image}
              alt="meal_one"
              height={160}
              width={210}
            />
          </a>
          <OtherMealName>{this.props.recommendedMenus[4].name}</OtherMealName>
        </div>
        <div class="item_other_breakfast">
          <a onClick={() => this.onMealDetail(this.props.recommendedMenus[5])}>
            <img
              src={this.props.recommendedMenus[5].image}
              alt="meal_one"
              height={160}
              width={210}
            />
          </a>
          <OtherMealName>{this.props.recommendedMenus[5].name}</OtherMealName>
        </div>
        <div class="item_other_breakfast">
          <a onClick={() => this.onMealDetail(this.props.recommendedMenus[6].name)}>
            <img
              src={this.props.recommendedMenus[6].image}
              alt="meal_one"
              height={160}
              width={210}
            />
          </a>
          <OtherMealName>{this.props.recommendedMenus[6].name}</OtherMealName>
        </div>
      </div>
    );
    const otherLunch = (
      <div class="container_other_lunch">
      <div class="item_other_lunch">
        <a onClick={() => this.onMealDetail(this.props.recommendedMenus[7].name)}>
          <img
            src={this.props.recommendedMenus[7].image}
            alt="meal_one"
            height={160}
            width={210}
          />
        </a>
        <OtherMealName>{this.props.recommendedMenus[7].name}</OtherMealName>
        </div>
        <div class="item_other_lunch">
        <a onClick={() => this.onMealDetail(this.props.recommendedMenus[8].name)}>
          <img
            src={this.props.recommendedMenus[8].image}
            alt="meal_one"
            height={160}
            width={210}
          />
        </a>
        <OtherMealName>{this.props.recommendedMenus[8].name}</OtherMealName>
        </div>
        <div class="item_other_lunch">
        <a onClick={() => this.onMealDetail(this.props.recommendedMenus[9].name)}>
          <img
            src={this.props.recommendedMenus[9].image}
            alt="meal_one"
            height={160}
            width={210}
          />
        </a>
        <OtherMealName>{this.props.recommendedMenus[9].name}</OtherMealName>
        </div>
        <div class="item_other_lunch">
        <a onClick={() => this.onMealDetail(this.props.recommendedMenus[10].name)}>
          <img
            src={this.props.recommendedMenus[10].image}
            alt="meal_one"
            height={160}
            width={210}
          />
        </a>
        <OtherMealName>{this.props.recommendedMenus[10].name}</OtherMealName>
        </div>
      </div>
    );
    const otherDinner = (
      <div class="container_other_dinner">
        <div class="item_other_dinner">
        <a onClick={() => this.onMealDetail(this.props.recommendedMenus[11].name)}>
          <img
            src={this.props.recommendedMenus[11].image}
            height={160}
            width={210}
            alt="meal_one"
          />
        </a>
        <OtherMealName>{this.props.recommendedMenus[11].name}</OtherMealName>
        </div>
        <div class="item_other_dinner">
        <a onClick={() => this.onMealDetail(this.props.recommendedMenus[12].name)}>
          <img
            src={this.props.recommendedMenus[12].image}
            height={160}
            width={210}
            alt="meal_one"
          />
        </a>
        <OtherMealName>{this.props.recommendedMenus[12].name}</OtherMealName>
        </div>
        <div class="item_other_dinner">
        <a onClick={() => this.onMealDetail(this.props.recommendedMenus[13].name)}>
          <img
            src={this.props.recommendedMenus[13].image}
            height={160}
            width={210}
            alt="meal_one"
          />
        </a>
        <OtherMealName>{this.props.recommendedMenus[13].name}</OtherMealName>
        </div>
        <div class="item_other_dinner">
        <a onClick={() => this.onMealDetail(this.props.recommendedMenus[14].name)}>
          <img
            src={this.props.recommendedMenus[14].image}
            height={160}
            width={210}
            alt="meal_one"
          />
        </a>
        <OtherMealName>{this.props.recommendedMenus[14].name}</OtherMealName>
        </div>
      </div>
    );
    let recommendationBody = "Here, we recommend you the best meal for today according to your nutriture data for today.\n By clicking Plus icon, you can see other recommended menus, as well. Enjoy!";
    let breakfast_ = "Breakfast  ";
    let lunch_ = "Lunch  ";
    let dinner_ = "Dinner  ";
    // console.log(this.props.recommendedMenus[0].image);
    // let src = this.props.recommendedMenus[0].image;
    // import * as url from src;
    return (
      <div className="MenuRecommendation">
        <RecommendationHeader>{this.props.title}</RecommendationHeader>
        <RecommendationBody>{recommendationBody}</RecommendationBody>
        <div class="container">
          <div class="item">
            <Breakfast>
              <a onClick={() => this.onMealDetail(0, 0)}>
                <img
                  id="breakfast"
                  src={this.props.recommendedMenus[0].image}
                  height={240}
                  width={400}
                  alt="meal_one"
                />
              </a>
              <MealName>
                {breakfast_}
                <Icon name="search plus" size="large" onClick={() => this.onClickedOtherBreakfast()}/>
              </MealName>
            </Breakfast>
          </div>
          <div class="item">
            <Lunch>
              <a onClick={() => this.onMealDetail(1, 0)}>
                <img
                  id="lunch"
                  src={this.props.recommendedMenus[1].image}
                  height={240}
                  width={400}
                  alt="meal_one"
                />
              </a>
              <MealName>
                {lunch_}
                <Icon name="search plus" size="large" onClick={() => this.onClickedOtherLunch()}/>
              </MealName>
            </Lunch>
          </div>
          <div class="item">
            <Dinner>
              <a onClick={() => this.onMealDetail(2, 0)}>
                <img
                  id="dinner"
                  src={this.props.recommendedMenus[2].image}
                  height={240}
                  width={400}
                  alt="meal_one"
                />
              </a>
              <MealName>
                {dinner_}
                <Icon name="search plus" size="large" onClick={() => this.onClickedOtherDinner()}/>
              </MealName>
            </Dinner>
          </div>
        </div>
        {this.state.otherBreakfast ? otherBreakfast : null}
        {this.state.otherLunch ? otherLunch : null}
        {this.state.otherDinner ? otherDinner : null}
        <Button className="main-button" onClick={() => this.props.history.push('/main')}>Back</Button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  recommendedMenus: state.menu.recommendedMenus,
});

export default connect(mapStateToProps, null)(withRouter(MealList));
