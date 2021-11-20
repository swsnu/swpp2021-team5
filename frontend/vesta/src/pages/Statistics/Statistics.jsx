/* eslint-disable */

import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  Header, Table, Input, Button, Grid
} from 'semantic-ui-react';
import styled from 'styled-components';

import * as actionCreators from '../../store/actions/index';
import StatsDaily from '../../component/Statistics/StatsDaily';
import * as Calculator from '../Setting/Calculator';

const StatisticsHeader = styled.div`
font-family:'verveine';
font-size:65px;
color:#F28095;
text-align: center;
vertical-align: middle;
line-height: 80px;
`;

const Box = styled.div`
background-color:#B3D962;
border-radius: 10px;
width: 950px;
height: 80px;
margin:0 auto;
`;

const Div = styled.div`
background-color:#B3D962;
color:#F28095;
align-items:center;
vertical-align: middle;
line-height: 80px;
margin:8;
`;

class Statistics extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
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
    
    return (
      <div className="Statistics">

        <div className="Header">
          <StatisticsHeader>Your Nutritional Statistics</StatisticsHeader>
        </div>

        <Div className="body" class="ui one column stackable center aligned page grid">
            <StatsDaily intake={todayNutritionIntake} recommendedIntake={recommendedIntake} />
            <br/>
            <br/>
            <Button size='large'>Today</Button>
            <Button size='large'>Weekly</Button>
            <Button size='large'>Monthly</Button>
          
        </Div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  currUser: state.user.currentUser,
  currUserNutrition: state.user.userNutrition,
});

export default connect(mapStateToProps, null)(Statistics);
