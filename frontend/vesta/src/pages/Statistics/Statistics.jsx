/* eslint-disable */
import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  Header, Table, Input, Button, Grid, Tab
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

const TODAY = 'TODAY';
const WEEKLY = 'WEEKLY';
const MONTHLY = 'MONTHLY';

class Statistics extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedWeek: new Date(),
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

  onClickedWeeklyPrevButton = () => {
    console.log('hi');
    const thisState = this.state;
    const newSelected = new Date(this.state.selectedWeek);
    newSelected.setDate(newSelected.getDate() - 7);
    this.setState({...thisState, selectedWeek: newSelected});
  }

  onClickedWeeklyNextButton = () => {
    console.log('hi');
    const thisState = this.state;
    const newSelected = new Date(this.state.selectedWeek);
    newSelected.setDate(newSelected.getDate() + 7);
    this.setState({...thisState, selectedWeek: newSelected});
  }
  

  render() {
    console.log('Parent rendered');
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
      const dateObject = new Date(nutrition.date);
      dateObject.setHours(0,0,0,0);
      return {...nutrition, date: dateObject};
    });
    const selectedWeek = this.state.selectedWeek; // must be today
    selectedWeek.setHours(0,0,0,0);

    /*
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
    */
    const panes=[
       { menuItem: 'Today', render: () => <StatsDaily intake={todayNutritionIntake} recommendedIntake={recommendedIntake} /> },
       { menuItem: 'Weekly', render: () => <StatsWeekly selectedWeek={selectedWeek} userNutritions={processedUserNutritions} recommendedIntake={recommendedIntake} onClickedWeeklyPrevButton={this.onClickedWeeklyPrevButton} onClickedWeeklyNextButton={this.onClickedWeeklyNextButton}/> },
       { menuItem: 'Monthly', render: () => <StatsMonthly userNutritions={processedUserNutritions} recommendedIntake={recommendedIntake}/> }
    ]
    
    return (
      <div className="Statistics">

        <div className="Header">
          <StatisticsHeader>Your Nutritional Statistics</StatisticsHeader>
        </div>

        <Div className="body">
          <Tab panes={panes} />
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
