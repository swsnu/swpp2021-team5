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
  Box, RecommendationHeader, OtherBreakfastBox, OtherLunchBox, OtherDinnerBox,
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
        // otherLunch: false,
        // otherDinner: false,
      });
    } else {
      this.setState({
        otherBreakfast: true,
        // otherLunch: false,
        // otherDinner: false,
      });
    }
  };

  onClickedOtherLunch = () => {
    if (this.state.otherLunch) {
      this.setState({
        // otherBreakfast: false,
        otherLunch: false,
        // otherDinner: false,
      });
    } else {
      this.setState({
        // otherBreakfast: false,
        otherLunch: true,
        // otherDinner: false,
      });
    }
  };

  onClickedOtherDinner = () => {
    if (this.state.otherDinner) {
      this.setState({
        // otherBreakfast: false,
        // otherLunch: false,
        otherDinner: false,
      });
    } else {
      this.setState({
        // otherBreakfast: false,
        // otherLunch: false,
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
              <Image
                src="/sushi_example_image.jpeg"
                size="medium"
                alt="meal_one"
                href="/recommendation/detail"
              />
            </Grid.Column>
            <Grid.Column>
              <Image
                src="/sushi_example_image.jpeg"
                size="medium"
                alt="meal_one"
                href="/recommendation/detail"
              />
            </Grid.Column>
            <Grid.Column>
              <Image
                src="/sushi_example_image.jpeg"
                size="medium"
                alt="meal_one"
                href="/recommendation/detail"
              />
            </Grid.Column>
            <Grid.Column>
              <Image
                src="/sushi_example_image.jpeg"
                size="medium"
                alt="meal_one"
                href="/recommendation/detail"
              />
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
              <Image
                src="/sushi_example_image.jpeg"
                size="medium"
                alt="meal_one"
                href="/recommendation/detail"
              />
            </Grid.Column>
            <Grid.Column>
              <Image
                src="/sushi_example_image.jpeg"
                size="medium"
                alt="meal_one"
                href="/recommendation/detail"
              />
            </Grid.Column>
            <Grid.Column>
              <Image
                src="/sushi_example_image.jpeg"
                size="medium"
                alt="meal_one"
                href="/recommendation/detail"
              />
            </Grid.Column>
            <Grid.Column>
              <Image
                src="/sushi_example_image.jpeg"
                size="medium"
                alt="meal_one"
                href="/recommendation/detail"
              />
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
              <Image
                src="/sushi_example_image.jpeg"
                size="medium"
                alt="meal_one"
                href="/recommendation/detail"
              />
            </Grid.Column>
            <Grid.Column>
              <Image
                src="/sushi_example_image.jpeg"
                size="medium"
                alt="meal_one"
                href="/recommendation/detail"
              />
            </Grid.Column>
            <Grid.Column>
              <Image
                src="/sushi_example_image.jpeg"
                size="medium"
                alt="meal_one"
                href="/recommendation/detail"
              />
            </Grid.Column>
            <Grid.Column>
              <Image
                src="/sushi_example_image.jpeg"
                size="medium"
                alt="meal_one"
                href="/recommendation/detail"
              />
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
