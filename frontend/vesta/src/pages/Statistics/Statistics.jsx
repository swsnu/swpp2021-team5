/* eslint-disable */

import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  Header, Table, Input, Button, Grid
} from 'semantic-ui-react';
import styled from 'styled-components';

import * as actionCreators from '../../store/actions/index';
import StatsDaily from '../../component/Statistics/StatsDaily';
import StatsWeekly from '../../component/Statistics/StatsWeekly';
import StatsMonthly from '../../component/Statistics/StatsMonthly';
import * as Calculator from '../Setting/Calculator';

import { dummyUserNutritions } from './util';

const StatisticsHeader = styled.div`
font-family:'verveine';
font-size:65px;
color:#F28095;
text-align: center;
vertical-align: middle;
line-height: 80px;
`;

const Div = styled.div`
display: block;
color:#F28095;
align-items:center;
vertical-align: middle;
line-height: 10px;
margin:8;
`;

const TODAY = 'TODAY';
const WEEKLY = 'WEEKLY';
const MONTHLY = 'MONTHLY';

class Statistics extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: TODAY,
      userNutritions: [],
    };
  }

  componentDidMount() {
    /*axios.get('/api/nutrition/').then((res) => {
      this.setState({...this.state, userNutritions: res.data})
      // res.data : list of objects ?
    })
    */
   this.setState({...this.state, userNutritions: dummyUserNutritions});
  }

  onClickedTodayButton = () => {
    const thisState = this.state;
    if (!(this.state.selected === TODAY))
      this.setState({...thisState, selected: TODAY})
  }

  onClickedWeeklyButton = () => {
    const thisState = this.state;
    if (!(this.state.selected === WEEKLY))
      this.setState({...thisState, selected: WEEKLY})
  }

  onClickedMonthlyButton = () => {
    const thisState = this.state;
    if (!(this.state.selected === MONTHLY))
      this.setState({...thisState, selected: MONTHLY})
  }
  

  render() {
    let todayNutritionIntake = {
      calories: this.props.currUserNutrition.calories,
      carbs: this.props.currUserNutrition.carbs,
      protein: this.props.currUserNutrition.protein,
      fat: this.props.currUserNutrition.fat,
    }
    let age = this.props.currUser.age;
    let sex = this.props.currUser.sex;
    let height = this.props.currUser.height;
    let weight = this.props.currUser.weight;
    let recommendedCarbs = Calculator.recommendedCarbs(age, sex, height, weight);
    let recommendedProtein = Calculator.recommendedProtein(age, sex, height, weight);
    let recommendedFat = Calculator.recommendedFat(age, sex, height, weight);
    let recommendedCalorie = this.props.currUser.targetCalories;
    let recommendedIntake = {
      calories: recommendedCalorie,
      carbs: recommendedCarbs,
      protein: recommendedProtein,
      fat: recommendedFat,
    }

    let processedUserNutritions = this.state.userNutritions.map((nutrition) => {
      return {...nutrition, date: new Date(nutrition.date)}
    });
    const today = new Date(); // must be today

    let selectedComponent;
    switch (this.state.selected) {
      case TODAY:
        selectedComponent = <StatsDaily intake={todayNutritionIntake} recommendedIntake={recommendedIntake} />;
        break;
      case WEEKLY:
        selectedComponent = <StatsWeekly today={today} userNutritions={processedUserNutritions} recommendedIntake={recommendedIntake} />
        break;
      case MONTHLY:
        selectedComponent = <StatsMonthly today={today} userNutritions={processedUserNutritions} recommendedIntake={recommendedIntake}/>
        break;
    }
    
    return (
      <div className="Statistics">

        <div className="Header">
          <StatisticsHeader>Your Nutritional Statistics</StatisticsHeader>
        </div>

        <Div className="body">
            {selectedComponent}
            <br/>
            <br/>
            <Button.Group>
              <Button size='large' onClick={() => this.onClickedTodayButton()}>Today</Button>
              <Button size='large' onClick={() => this.onClickedWeeklyButton()}>Weekly</Button>
              <Button size='large' onClick={() => this.onClickedMonthlyButton()}>Monthly</Button>
            </Button.Group>
        </Div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    currUser: state.user.currentUser,
    currUserNutrition: state.user.userNutrition,
  }
};

const mapDispatchToProps = dispatch => {
  return {
    onGetUserNutrition: (userID) => dispatch(actionCreators.getUserNutrition(userID)) 
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Statistics);
