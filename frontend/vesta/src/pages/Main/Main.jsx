import React, { Component } from 'react';
import styled from 'styled-components';
import {
  Grid, Image, Button, Container,
} from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';
import PastNutritionInfo from '../../component/PastNutritionInfo/PastNutritionInfo';

const NextMealHeader = styled.div`
background-color:#F28095;
border-radius: 10px;
font-family:'verveine';
font-size:20px;
`;

const MealRecordArea = styled.div`
background-color:#B3D962;
border-radius: 20px;
font-family:'verveine';
font-size:30px;
`;

const StatsHeader = styled.div`
background-color:#F2BB16;
border-radius: 10px;
font-family:'verveine';
font-size:20px;
`;

const StatsBody = styled.div`
background-color:#BDD9A0;
border-radius: 20px;
font-family:'verveine';
font-size:30px;
`;

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menu: 'Sushi',
    };
  }

  onClickedFollowedRecButton = () => {
    this.props.history.push('/record');
  }

  onClickedNotFollowedButton = () => {
    this.props.history.push('/record');
  }

  onClickedRecordSnackButton = () => {
    this.props.history.push('/record');
  }

  onClickedMenuRecButton = () => {
    this.props.history.push('/recommendation');
  }

  onClickedPastMealRecordButton = () => {
    this.props.history.push('/history');
  }

  render() {
    return (
      <div>
        <Container>
          <Grid>
            <Grid.Column width={8}>
              <NextMealHeader>
                <h1>Next Meal</h1>
              </NextMealHeader>
              <MealRecordArea>
                <p>{this.state.menu}</p>
                <Image
                  src="/sushi_example_image.jpeg"
                  alt="menu"
                  size="centered large"
                />
                <Button id="menu-recommendation-button" onClick={this.onClickedMenuRecButton}>
                  More Recommendations
                </Button>
                <p>
                  Did you skip a meal? Press Skipped Meal.
                </p>
                <Button id="skip-meal-button" onClick={this.onClickedSkipButton}>
                  Skipped Meal
                </Button>
                <p>
                  If you want to record a meal,
                  please tell us if you followed our recommendation.
                </p>
                <Button id="followed-recommendation-button" onClick={this.onClickedFollowedRecButton}>
                  Followed Recommendation
                </Button>
                <Button id="not-followed-recommendation-button" onClick={this.onClickedNotFollowedButton}>
                  Didnt Follow Recommendation
                </Button>
                <p>
                  Or if you just want to record a snack, press Record Snack.
                </p>
                <Button id="record-snack-button" onClick={this.onClickedRecordSnackButton}>
                  Record Snack
                </Button>
                <p />
                <Button id="past-meal-record-button" onClick={this.onClickedPastMealRecordButton}>
                  My Records
                </Button>
              </MealRecordArea>
            </Grid.Column>
            <Grid.Column width={8}>
              <StatsHeader>
                <h1>My Stats</h1>
              </StatsHeader>
              <StatsBody>
                <PastNutritionInfo />
                <Button id="nutrition-analysis-button" onClick={this.onClickedNutritionAnalysisButton}>
                  More Stats
                </Button>
              </StatsBody>
            </Grid.Column>
          </Grid>
        </Container>
      </div>
    );
  }
}
export default withRouter(Main);
