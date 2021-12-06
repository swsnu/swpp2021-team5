/* eslint-disable */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import {
  Tab
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
margin: 0 auto;
width: 70%;
text-align: center;
background-color:#F2F2F2;
border-radius: 20px;
padding: 3%;
`;

class Statistics extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedWeek: new Date(),
      selectedMonth: (new Date()).getMonth(),
      userNutritions: [],
    };
  }

  componentDidMount() {
    const today = (new Date()).toISOString().split('T')[0];
    this.props.onGetUserNutrition(today);
    
    this.setState({...this.state, userNutritions: dummyUserNutritions});
    axios.get('/api/nutrition/').then((res) => {
      this.setState({...this.state, userNutritions: res.data})
      // res.data : list of objects ?
    });
  }

  onClickedWeeklyPrevButton = () => {
    const thisState = this.state;
    const newSelected = new Date(this.state.selectedWeek);
    newSelected.setDate(newSelected.getDate() - 7);
    this.setState({...thisState, selectedWeek: newSelected});
  }

  onClickedWeeklyNextButton = () => {
    const thisState = this.state;
    const newSelected = new Date(this.state.selectedWeek);
    newSelected.setDate(newSelected.getDate() + 7);
    this.setState({...thisState, selectedWeek: newSelected});
  }

  onClickedMonthlyPrevButton = () => {
    const thisState = this.state;
    this.setState({...thisState, selectedMonth: (thisState.selectedMonth - 1) % 12});
  }

  onClickedMonthlyNextButton = () => {
    const thisState = this.state;
    this.setState({...thisState, selectedMonth: (thisState.selectedMonth + 1) % 12});
  }

  render() {
    let todayNutritionIntake = {
      calories: this.props.currUserNutrition.calories,
      carbs: this.props.currUserNutrition.carbs,
      protein: this.props.currUserNutrition.protein,
      fat: this.props.currUserNutrition.fat,
    }
    let recommendedCalorie = this.props.currUser.targetCalories;
    let recommendedCarbs = Calculator.recommendedCarbs(recommendedCalorie);
    let recommendedProtein = Calculator.recommendedProtein(recommendedCalorie);
    let recommendedFat = Calculator.recommendedFat(recommendedCalorie);
    let recommendedIntake = {
      calories: recommendedCalorie,
      carbs: recommendedCarbs,
      protein: recommendedProtein,
      fat: recommendedFat,
    }

    let processedUserNutritions = this.state.userNutritions.map((nutrition) => {
      const dateObject = new Date(nutrition.date);
      dateObject.setHours(0,0,0,0);
      return {...nutrition, date: dateObject};
    });
    const selectedWeek = this.state.selectedWeek; // must be today
    selectedWeek.setHours(0,0,0,0);

    let monthlyUserNutritions = processedUserNutritions.filter((nutrition) => {
      return nutrition.date.getMonth() === this.state.selectedMonth;
    })

    const panes=[
       { menuItem: 'Today', render: () => <StatsDaily intake={todayNutritionIntake} recommendedIntake={recommendedIntake} /> },
       { menuItem: 'Weekly', render: () => <StatsWeekly selectedWeek={selectedWeek} userNutritions={processedUserNutritions} recommendedIntake={recommendedIntake} onClickedWeeklyPrevButton={this.onClickedWeeklyPrevButton} onClickedWeeklyNextButton={this.onClickedWeeklyNextButton} /> },
       { menuItem: 'Monthly', render: () => <StatsMonthly selectedMonth={this.state.selectedMonth}monthlyUserNutritions={monthlyUserNutritions} recommendedIntake={recommendedIntake} onClickedMonthlyPrevButton={this.onClickedMonthlyPrevButton} onClickedMonthlyNextButton={this.onClickedMonthlyNextButton} /> }
    ]
    
    return (
      <div className="Statistics">

        <div className="Header">
          <StatisticsHeader>Your Nutritional Statistics</StatisticsHeader>
        </div>

        <Div className="body">
          <Tab id='chart-tab' menu={{ widths: panes.length}} panes={panes} />
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
    onGetUserNutrition: (date) => dispatch(actionCreators.getUserNutrition(date)) 
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Statistics);
