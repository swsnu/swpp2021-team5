/* eslint-disable */
import React, { Component } from 'react';
import styled from 'styled-components';
import {
  Grid, Image, Button, Container, Icon
} from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';
import PastNutritionInfo from '../../component/PastNutritionInfo/PastNutritionInfo';

const NextMealHeader = styled.div`
background-color:#F28095;
border-radius: 10px;
font-family:'verveine';
font-size:20px;
margin: 15px;
padding: 10px;
`;

const MealRecordArea = styled.div`
background-color:#FFDFBA;
border-radius: 20px;
font-family:'verveine';
font-size:25px;
margin: 15px;
padding: 10px;
`;

const StatsHeader = styled.div`
background-color:#F2BB16;
border-radius: 10px;
font-family:'verveine';
font-size:20px;
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
  constructor(props) {
    super(props);
    this.state = {
      menu: 'Oatmeal',
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

  onClickedNutritionAnalysisButton = () => {
    this.props.history.push('/statistics');
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
              <MealRecordArea style={{backgroundColor: "#F2F2F2"}}>
              <MealRecordArea style={{"font-size":"40px", padding: "15px"}}>
                <p style={{"marginBottom": "0px"}}>{this.state.menu}</p>
                <a href='/recommendation/0/0'>
                <Image
                  src="/DummyImages/breakfast1_.jpeg"
                  alt="menu"
                  size="centered large"
                  style={{objectFit: "cover", height:"400px", width:"400px", "border-radius": "15px"}}
                />
                </a>
                <Button id="menu-recommendation-button" onClick={this.onClickedMenuRecButton} style={{margin: "10px", "background-color": "#FFFFFF"}}>
                  <i n/>+ More Recommendations
                </Button>
              </MealRecordArea>
              <MealRecordArea style={{backgroundColor: "#AA7B6F", color:"#F2F2F2"}}>
                <p>
                  If you want to record a meal,
                  please tell us if you followed our recommendation.
                  Or you can record a snack.
                </p>
                <Grid columns={4}>
                  <Grid.Column>
                    <p>skip</p>
                    <Icon circular name="x icon" onClick={this.onClickedSkipButton}></Icon>
                  </Grid.Column>
                  <Grid.Column>
                    <p>followed</p>
                    <Icon circular name="check icon" onClick={this.onClickedFollowedRecButton}></Icon>
                  </Grid.Column>
                  <Grid.Column>
                    <p>alternative</p>
                    <Icon circular name="edit icon" onClick={this.onClickedNotFollowedButton}></Icon>
                  </Grid.Column>
                  <Grid.Column>
                    <p>record</p>
                    <Icon circular name="camera icon" onClick={this.onClickedRecordSnackButton}></Icon>
                  </Grid.Column>
                </Grid>
              </MealRecordArea>
              <MealRecordArea style={{backgroundColor: "#E17E76", color:"#F2F2F2"}}>
                <p>
                  Click here to view your previous records.
                </p>
                <Grid columns={1}>
                  <Grid.Column>
                    <p>list</p>
                    <Icon circular name="list icon" onClick={this.onClickedPastMealRecordButton}></Icon>
                  </Grid.Column>
                </Grid>
              </MealRecordArea>
            </MealRecordArea>
            </Grid.Column>
            <Grid.Column width={8}>
              <StatsHeader>
                <h1>My Stats</h1>
              </StatsHeader>
              <StatsBody>
                <PastNutritionInfo />
                <Button id="nutrition-analysis-button" onClick={this.onClickedNutritionAnalysisButton} style={{"background-color": "#D5B6D5"}}>
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
