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
    const today = (new Date()).toISOString().split('T')[0];
    this.props.getRecommendedMenus(today);
    this.props.getCountAll(today);
  }

  onClickedSkipButton = () => {
    const today = (new Date()).toISOString().split('T')[0];
    (async () => {
      let apiRes = null;
      try {
        apiRes = await axios.get(`/api/nutrition/${today}/`);
      } catch (err) {
        if (err.response.status === 404) {
          this.props.onCreateUserNutrition(today, 0, 0, 0, 0, 1);
        }
      } finally {
        const currentCalories = apiRes.data.calories;
        const currentCarbs = apiRes.data.carbs;
        const currentProtein = apiRes.data.protein;
        const currentFat = apiRes.data.fat;
        const currentCount = apiRes.data.count_all;

        this.props.onEditUserNutrition(today, currentCalories, currentCarbs, currentProtein,
          currentFat, currentCount + 1);
      }
    })();
    this.setState((prevState) => ({ idx: prevState.idx + 1 }));
  }

  onClickedFollowedRecButton = () => {
    this.props.history.push({
      pathname: '/record',
      state: { type: 'meal' },
    });
    this.setState((prevState) => ({ idx: prevState.idx + 1 }));
  }

  onClickedNotFollowedButton = () => {
    this.props.history.push({
      pathname: '/record',
      state: { type: 'meal' },
    });
    this.setState((prevState) => ({ idx: prevState.idx + 1 }));
  }

  onClickedRecordSnackButton = () => {
    this.props.history.push({
      pathname: '/record',
      state: { type: 'snack' },
    });
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
                    <Grid columns={4}>
                      <Grid.Column>
                        <Icon circular name="x icon" onClick={this.onClickedSkipButton} />
                        skip
                      </Grid.Column>
                      <Grid.Column>
                        <Icon circular name="check icon" onClick={this.onClickedFollowedRecButton} />
                        followed
                      </Grid.Column>
                      <Grid.Column>
                        <Icon circular name="edit icon" onClick={this.onClickedNotFollowedButton} />
                        alternative
                      </Grid.Column>
                      <Grid.Column>
                        <Icon circular name="camera icon" onClick={this.onClickedRecordSnackButton} />
                        record
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
});

const mapDispatchToProps = (dispatch) => ({
  onCreateUserNutrition: (date, calories, carbs, protein, fat,
    countAll) => dispatch(actionCreators.createUserNutrition(date, calories, carbs, protein, fat, countAll)),
  onEditUserNutrition: (date, calories, carbs, protein, fat,
    countAll) => dispatch(actionCreators.editUserNutrition(date, calories, carbs, protein, fat, countAll)),
  getRecommendedMenus: (date) => dispatch(actionCreators.getRecommendedMenus(date)),
  getCountAll: (date) => dispatch(actionCreators.getCountAll(date)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Main));
