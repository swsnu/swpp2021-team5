import React, { Component } from 'react';
import {
  Divider, Grid, Button, Image,
} from 'semantic-ui-react';
// import styled from 'styled-components';
// import { StyledContainer } from '../../styles/Menu_Recommendation/StyledContainer';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import Meal from './Meal';
import {
  Box, RecommendationHeader, OtherBreakfastBox, OtherLunchBox, OtherDinnerBox, OtherMealName,
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
      <OtherBreakfastBox>
        <Grid>
          <Grid.Row columns={4}>
            <Grid.Column>
              <a href="/recommendation/detail">
                <img
                  src="/DummyImages/breakfast1_.jpeg"
                  alt="meal_one"
                  height={160}
                  width={210}
                />
              </a>
              <OtherMealName>Oatmeal</OtherMealName>
            </Grid.Column>
            <Grid.Column>
              <a href="/recommendation/detail">
                <img
                  src="/DummyImages/breakfast2_.jpeg"
                  alt="meal_one"
                  height={160}
                  width={210}
                />
              </a>
              <OtherMealName>Chicken Sandwich</OtherMealName>
            </Grid.Column>
            <Grid.Column>
              <a href="/recommendation/detail">
                <Image
                  src="/DummyImages/breakfast3_.jpeg"
                  alt="meal_one"
                  height={160}
                  width={210}
                />
              </a>
              <OtherMealName>Salad</OtherMealName>
            </Grid.Column>
            <Grid.Column>
              <a href="/recommendation/detail">
                <img
                  src="/DummyImages/breakfast4_.jpeg"
                  alt="meal_one"
                  height={160}
                  width={210}
                />
              </a>
              <OtherMealName>Baked Salmon</OtherMealName>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </OtherBreakfastBox>
    );
    const otherLunch = (
      <OtherLunchBox>
        <Grid>
          <Grid.Row columns={4}>
            <Grid.Column>
              <a href="/recommendation/detail">
                <img
                  src="/DummyImages/lunch1_.jpeg"
                  alt="meal_one"
                  height={160}
                  width={210}
                />
              </a>
              <OtherMealName>Chicken Teriyaki</OtherMealName>
            </Grid.Column>
            <Grid.Column>
              <a href="/recommendation/detail">
                <img
                  src="/DummyImages/lunch2_.jpeg"
                  alt="meal_one"
                  height={160}
                  width={210}
                />
              </a>
              <OtherMealName>Pasta</OtherMealName>
            </Grid.Column>
            <Grid.Column>
              <a href="/recommendation/detail">
                <img
                  src="/DummyImages/lunch3_.jpeg"
                  alt="meal_one"
                  height={160}
                  width={210}
                />
              </a>
              <OtherMealName>Steak</OtherMealName>
            </Grid.Column>
            <Grid.Column>
              <a href="/recommendation/detail">
                <img
                  src="/DummyImages/lunch4_.jpeg"
                  alt="meal_one"
                  height={160}
                  width={210}
                />
              </a>
              <OtherMealName>Tomato Spaghetti</OtherMealName>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </OtherLunchBox>
    );
    const otherDinner = (
      <OtherDinnerBox>
        <Grid>
          <Grid.Row columns={4}>
            <Grid.Column>
              <a href="/recommendation/detail">
                <img
                  src="/DummyImages/dinner1_.jpeg"
                  height={160}
                  width={210}
                  alt="meal_one"
                />
              </a>
              <OtherMealName>Bibimbap</OtherMealName>
            </Grid.Column>
            <Grid.Column>
              <a href="/recommendation/detail">
                <img
                  src="/DummyImages/dinner2_.jpeg"
                  height={160}
                  width={210}
                  alt="meal_one"
                />
              </a>
              <OtherMealName>Chinese Noodle</OtherMealName>
            </Grid.Column>
            <Grid.Column>
              <a href="/recommendation/detail">
                <img
                  src="/DummyImages/dinner3_.jpg"
                  height={160}
                  width={210}
                  alt="meal_one"
                />
              </a>
              <OtherMealName>Kimbap</OtherMealName>
            </Grid.Column>
            <Grid.Column>
              <a href="/recommendation/detail">
                <img
                  src="/DummyImages/dinner4_.jpeg"
                  height={160}
                  width={210}
                  alt="meal_one"
                />
              </a>
              <OtherMealName>Aglio e Olio</OtherMealName>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </OtherDinnerBox>
    );
    return (
      <div>
        <Box className="MenuRecommendation">
          <RecommendationHeader>{this.props.title}</RecommendationHeader>
          <Divider />
          <Grid>
            <Grid.Row columns={3}>
              <Grid.Column>
                <Meal
                  time="breakfast"
                />
                <Button size="mini" className="other-meal-breakfast-button" onClick={() => this.onClickedOtherBreakfast()}>
                  Other
                </Button>
              </Grid.Column>
              <Grid.Column>
                <Meal
                  time="lunch"
                />
                <Button size="mini" className="other-meal-lunch-button" onClick={() => this.onClickedOtherLunch()}>
                  Other
                </Button>
              </Grid.Column>
              <Grid.Column>
                <Meal
                  time="dinner"
                />
                <Button size="mini" className="other-meal-dinner-button" onClick={() => this.onClickedOtherDinner()}>
                  Other
                </Button>
              </Grid.Column>
            </Grid.Row>
          </Grid>
          {this.state.otherBreakfast ? otherBreakfast : null}
          {this.state.otherLunch ? otherLunch : null}
          {this.state.otherDinner ? otherDinner : null}
          <Button className="main-button">Back</Button>
        </Box>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  recommendedMenus: state.menu.recommendedMenus,
});

export default connect(mapStateToProps, null)(withRouter(MealList));
