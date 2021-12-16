import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import {
  Grid, Image, Button, Container, Icon, Dimmer, Loader, Segment
} from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import PastNutritionInfo from '../../component/PastNutritionInfo/PastNutritionInfo';
import * as actionCreators from '../../store/actions/index';

const NextMealHeader = styled.div`
background-color:#F28095;
border-radius: 10px;
font-family:'arciform';
font-size:25px;
margin: 15px;
padding: 10px;
`;

const MealRecordArea = styled.div`
background-color:#FFDFBA;
border-radius: 20px;
font-family:'arciform';
font-size:25px;
margin: 15px;
padding: 10px;
white-space: pre-wrap;
`;

const StatsHeader = styled.div`
background-color:#F2BB16;
border-radius: 10px;
font-family:'arciform';
font-size:25px;
margin: 15px;
padding: 10px;
`;

const StatsBody = styled.div`
background-color:#F2F2F2;
border-radius: 20px;
font-family:'verveine';
font-size:30px;
margin: 15px;
padding: 10px;
`;

class Main extends Component {
  componentDidMount() {
    this.props.getUserSetting();
    const today = (new Date()).toISOString().split('T')[0];
    this.props.getRecommendedMenus(today);
    this.props.getCountAll(today);
    this.props.getUserNutrition(today);
  }

  onClickedSkipButton = () => {
    const today = (new Date()).toISOString().split('T')[0];
    console.log(this.props.userNutrition);
    const bool = window.confirm('Did you skip your meal? If you confirm, we will edit your nutrition information as skipped.');
    if (bool) {
      this.props.onEditUserNutrition(
        today,
        this.props.userNutrition.calories,
        this.props.userNutrition.carbs,
        this.props.userNutrition.protein,
        this.props.userNutrition.fat,
        this.props.userNutrition.count_all + 1,
      );
    }
    window.confirm('Please refresh your page!');
    this.props.getCountAll(today);
    this.props.getRecommendedMenus(today);
  }

  onClickedRecordMealButton = () => {
    const bool = window.confirm('Did you have a meal(NOT snack)? If you confirm, you can record your meal details.');
    if (bool) {
      this.props.history.push({
        pathname: '/record',
        state: { type: 'meal' },
      });
      this.setState((prevState) => ({ idx: prevState.idx + 1 }));
    }
  }

  onClickedRecordSnackButton = () => {
    const bool = window.confirm('Did you have a snack? If you confirm, you can record your snack details.');
    if (bool) {
      this.props.history.push({
        pathname: '/record',
        state: { type: 'snack' },
      });
    }
  }

  onClickedMenuRecButton = () => {
    this.props.history.push('/recommendation');
  }

  onClickedPastMealRecordButton = () => {
    this.props.history.push('/history');
  }

  onClickedNutritionAnalysisButton = () => {
    this.props.history.push('/statistics');
  }

  render() {
    const meal = 'Please tell us how you ate your meal.\nOr you can record a snack.\n\n';
    if (this.props.recommendedMenus && this.props.countAll !== -1) {
      console.log(this.props.countAll);
      console.log(this.props.recommendedMenus);
      let nextMeal = 'Nothing to recommend';
      if (this.props.recommendedMenus[this.props.countAll] !== null) {
        nextMeal = (
          <div>
            <p style={{ marginBottom: '0px' }}>{ this.props.recommendedMenus[this.props.countAll].name }</p>
            <a href={`/recommendation/${this.props.recommendedMenus[this.props.countAll].name}/${this.props.countAll}`}>
              <Image
                src={this.props.recommendedMenus[this.props.countAll].image}
                alt="menu"
                size="centered large"
                style={{
                  objectFit: 'cover', height: '400px', width: '400px', 'border-radius': '15px'
                }}
              />
            </a>
          </div>
        );
      }
      return (
        <div>
          <Container>
            <Grid>
              <Grid.Column width={8}>
                <NextMealHeader>
                  Next Meal
                </NextMealHeader>
                <MealRecordArea style={{ backgroundColor: '#F2F2F2' }}>
                  {(this.props.countAll < 3)
                    ? (
                      <MealRecordArea style={{ 'font-size': '30px', padding: '15px' }}>
                        {nextMeal}
                      </MealRecordArea>
                    )
                    : (
                      <h1>You Had Enough For Today!</h1>
                    )}
                  <MealRecordArea style={{ 'font-size': '40px', padding: '15px' }}>
                    <Button
                      id="menu-recommendation-button"
                      onClick={this.onClickedMenuRecButton}
                      style={{ margin: '10px', 'background-color': '#FFFFFF' }}
                    >
                      <i n />
                      + More Recommendations
                    </Button>
                  </MealRecordArea>
                  <MealRecordArea style={{ backgroundColor: '#AA7B6F', color: '#F2F2F2' }}>
                    {meal}
                    <Grid columns={3}>
                      <Grid.Column>
                        <Icon circular name="x icon" onClick={this.onClickedSkipButton} />
                        skip
                      </Grid.Column>
                      <Grid.Column>
                        <Icon circular name="food" onClick={this.onClickedRecordMealButton} />
                        meal
                      </Grid.Column>
                      <Grid.Column>
                        <Icon circular name="camera icon" onClick={this.onClickedRecordSnackButton} />
                        snack
                      </Grid.Column>
                    </Grid>
                  </MealRecordArea>
                  <MealRecordArea style={{ backgroundColor: '#E17E76', color: '#F2F2F2' }}>
                    <p>
                      Click here to view your previous records.
                    </p>
                    <Grid columns={1}>
                      <Grid.Column>
                        <Icon circular name="list icon" onClick={this.onClickedPastMealRecordButton} />
                      </Grid.Column>
                    </Grid>
                  </MealRecordArea>
                </MealRecordArea>
              </Grid.Column>
              <Grid.Column width={8}>
                <StatsHeader>
                  My Stats
                </StatsHeader>
                <StatsBody>
                  <PastNutritionInfo />
                  <Button
                    id="nutrition-analysis-button"
                    onClick={this.onClickedNutritionAnalysisButton}
                    style={{ 'background-color': '#D5B6D5' }}
                  >
                    More Stats
                  </Button>
                </StatsBody>
              </Grid.Column>
            </Grid>
          </Container>
        </div>
      );
    }
    return (
      <Segment>
        <Dimmer active inverted>
          <Loader inverted content="Loading" />
        </Dimmer>
        <Image src="https://react.semantic-ui.com/images/wireframe/short-paragraph.png" />
      </Segment>
    );
  }
}

const mapStateToProps = (state) => ({
  recommendedMenus: state.menu.recommendedMenus,
  countAll: state.menu.count,
  userNutrition: state.user.userNutrition,
});

const mapDispatchToProps = (dispatch) => ({
  onEditUserNutrition: (date, calories, carbs, protein, fat,
    countAll) => dispatch(actionCreators.editUserNutrition(date, calories, carbs, protein, fat, countAll)),
  getRecommendedMenus: (date) => dispatch(actionCreators.getRecommendedMenus(date)),
  getCountAll: (date) => dispatch(actionCreators.getCountAll(date)),
  getUserSetting: () => dispatch(actionCreators.getUserSetting()),
  getUserNutrition: (date) => dispatch(actionCreators.getUserNutrition(date)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Main));
