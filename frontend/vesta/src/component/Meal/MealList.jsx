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

  onMealDetail = (when, idx) => {
    this.props.history.push(`/recommendation/${when}/${idx}`);
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
      {/* <OtherBreakfastBox> */}
        <div class="item_other_breakfast">
          <a onClick={() => this.onMealDetail(0, 1)}>
            <img
              id="otherBreakfast"
              src="/DummyImages/breakfast2_.jpeg"
              alt="meal_one"
              height={160}
              width={210}
            />
          </a>
          <OtherMealName>Chicken Sandwich</OtherMealName>
        </div>
        <div class="item_other_breakfast">
          <a onClick={() => this.onMealDetail(0, 2)}>
            <img
              src="/DummyImages/breakfast3_.jpeg"
              alt="meal_one"
              height={160}
              width={210}
            />
          </a>
          <OtherMealName>Salad</OtherMealName>
        </div>
        <div class="item_other_breakfast">
          <a onClick={() => this.onMealDetail(0, 3)}>
            <Image
              src="/DummyImages/breakfast4_.jpeg"
              alt="meal_one"
              height={160}
              width={210}
            />
          </a>
          <OtherMealName>Baked Salmon</OtherMealName>
        </div>
        <div class="item_other_breakfast">
          <a onClick={() => this.onMealDetail(0, 4)}>
            <img
              src="/DummyImages/breakfast5_.jpeg"
              alt="meal_one"
              height={160}
              width={210}
            />
          </a>
          <OtherMealName>Tomato Pasta</OtherMealName>
        </div>
      </div>
    );
    const otherLunch = (
      <div class="container_other_lunch">
      <div class="item_other_lunch">
        <a onClick={() => this.onMealDetail(1, 1)}>
          <img
            src="/DummyImages/lunch2_.jpeg"
            alt="meal_one"
            height={160}
            width={210}
          />
        </a>
        <OtherMealName>Pasta</OtherMealName>
        </div>
        <div class="item_other_lunch">
        <a onClick={() => this.onMealDetail(1, 2)}>
          <img
            src="/DummyImages/lunch3_.jpeg"
            alt="meal_one"
            height={160}
            width={210}
          />
        </a>
        <OtherMealName>Steak</OtherMealName>
        </div>
        <div class="item_other_lunch">
        <a onClick={() => this.onMealDetail(1, 3)}>
          <img
            src="/DummyImages/lunch4_.jpeg"
            alt="meal_one"
            height={160}
            width={210}
          />
        </a>
        <OtherMealName>Tomato Spaghetti</OtherMealName>
        </div>
        <div class="item_other_lunch">
        <a onClick={() => this.onMealDetail(1, 4)}>
          <img
            src="/DummyImages/lunch5_.jpeg"
            alt="meal_one"
            height={160}
            width={210}
          />
        </a>
        <OtherMealName>Vietnamese Pho</OtherMealName>
        </div>
      </div>
    );
    const otherDinner = (
      <div class="container_other_dinner">
        <div class="item_other_dinner">
        <a onClick={() => this.onMealDetail(2, 1)}>
          <img
            src="/DummyImages/dinner2_.jpeg"
            height={160}
            width={210}
            alt="meal_one"
          />
        </a>
        <OtherMealName>Chinese Noodle</OtherMealName>
        </div>
        <div class="item_other_dinner">
        <a onClick={() => this.onMealDetail(2, 2)}>
          <img
            src="/DummyImages/dinner3_.jpg"
            height={160}
            width={210}
            alt="meal_one"
          />
        </a>
        <OtherMealName>Kimbap</OtherMealName>
        </div>
        <div class="item_other_dinner">
        <a onClick={() => this.onMealDetail(2, 3)}>
          <img
            src="/DummyImages/dinner4_.jpeg"
            height={160}
            width={210}
            alt="meal_one"
          />
        </a>
        <OtherMealName>Aglio e Olio</OtherMealName>
        </div>
        <div class="item_other_dinner">
        <a onClick={() => this.onMealDetail(2, 4)}>
          <img
            src="/DummyImages/dinner5_.jpeg"
            height={160}
            width={210}
            alt="meal_one"
          />
        </a>
        <OtherMealName>Vegetable Rice</OtherMealName>
        </div>
      </div>
    );
    let recommendationBody = "Here, we recommend you the best meal for today according to your nutriture data for today.\n By clicking Plus icon, you can see other recommended menus, as well. Enjoy!";
    let breakfast_ = "Breakfast  ";
    let lunch_ = "Lunch  ";
    let dinner_ = "Dinner  ";
    return (
      <div className="MenuRecommendation">
        <RecommendationHeader>{this.props.title}</RecommendationHeader>
        <RecommendationBody>{recommendationBody}</RecommendationBody>
        <div class="container">
          <div class="item">
            {/* <Meal
              time="breakfast"
            /> */}
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
          </div>
          <div class="item">
            {/* <Meal
              time="lunch"
            /> */}
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
          </div>
          <div class="item">
            {/* <Meal
              time="dinner"
            /> */}
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
