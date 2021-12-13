/* eslint-disable */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import * as actionCreators from '../../store/actions/index';
import * as Calculator from '../../pages/Setting/Calculator';
import { dummyUserNutritions } from '../../pages/Statistics/util';
import StatsDaily from '../Statistics/StatsDaily';
import StatsWeeklySummedChart from '../Statistics/StatsWeeklySummedChart';
import {
  Image, Dimmer, Loader, Segment
} from 'semantic-ui-react';

const StatsBody = styled.div`
background-color:#CCEECC;
border-radius: 20px;
font-family:'verveine';
font-size:30px;
margin: 15px;
padding: 10px;
`;

class PastNutritionInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedWeek: new Date(),
      userNutritions: [],
    };
  }

  componentDidMount() {
    const today = (new Date()).toISOString().split('T')[0];
    this.setState({ ...this.state, userNutritions: dummyUserNutritions });
    this.props.onGetUserNutrition(today);
    this.props.onGetUserSetting();
  }

  render() {
    let todayNutritionIntake, recommendedCalorie;
    console.log(this.props.currUserNutrition);
    console.log(this.props.currUser);
    if (this.props.currUserNutrition && this.props.currUser) {
      todayNutritionIntake = {
        calories: this.props.currUserNutrition.calories,
        carbs: this.props.currUserNutrition.carbs,
        protein: this.props.currUserNutrition.protein,
        fat: this.props.currUserNutrition.fat,
      };
      recommendedCalorie = this.props.currUser.targetCalories;
      let recommendedCarbs = Calculator.recommendedCarbs(recommendedCalorie);
      let recommendedProtein = Calculator.recommendedProtein(recommendedCalorie);
      let recommendedFat = Calculator.recommendedFat(recommendedCalorie);
      const recommendedIntake = {
        calories: recommendedCalorie,
        carbs: recommendedCarbs,
        protein: recommendedProtein,
        fat: recommendedFat,
      };

      const processedUserNutritions = this.state.userNutritions.map((nutrition) => {
        const dateObject = new Date(nutrition.date);
        dateObject.setHours(0, 0, 0, 0);
        return { ...nutrition, date: dateObject };
      });
      const selectedWeek = this.state.selectedWeek; // must be today
      selectedWeek.setHours(0, 0, 0, 0);

      const selectedWeekSun = new Date(this.state.selectedWeek.getTime());
      selectedWeekSun.setDate(selectedWeekSun.getDate() - selectedWeekSun.getDay());
      const selectedWeekSat = new Date(this.state.selectedWeek.getTime());
      selectedWeekSat.setDate(selectedWeekSat.getDate() + (6 - selectedWeekSat.getDay()));
      const selectedWeekNutritions = processedUserNutritions.filter((nutrition) => {
        return +nutrition.date >= +selectedWeekSun && +nutrition.date <= +selectedWeekSat;
      });

      return (
        <div>
          <StatsBody>
            <StatsDaily intake={todayNutritionIntake} recommendedIntake={recommendedIntake} />
          </StatsBody>
          <StatsBody style={{ backgroundColor: '#CCEEFF' }}>
            <StatsWeeklySummedChart selectedWeekNutritions={selectedWeekNutritions} recommendedIntake={recommendedIntake} />
          </StatsBody>
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
const mapStateToProps = (state) => {
  return {
    currUser: state.user.currentUser,
    currUserNutrition: state.user.userNutrition,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onGetUserSetting: () => dispatch(actionCreators.getUserSetting()),
    onGetUserNutrition: (date) => dispatch(actionCreators.getUserNutrition(date))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(PastNutritionInfo);
