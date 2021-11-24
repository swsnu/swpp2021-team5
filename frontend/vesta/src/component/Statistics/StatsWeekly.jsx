/* eslint-disable */
import React, { Component } from 'react';

import { Button } from 'semantic-ui-react';

import StatsWeeklyChart from './StatsWeeklyChart';

class StatsWeekly extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selected: props.today,
    }
  }

  onClickedPrevButton = () => {
    console.log('hi');
    const thisState = this.state;
    const newSelected = new Date(this.state.selected);
    newSelected.setDate(newSelected.getDate() - 7);
    this.setState({...thisState, selected: newSelected});
  }

  onClickedNextButton = () => {
    console.log('hi');
    const thisState = this.state;
    const newSelected = new Date(this.state.selected);
    newSelected.setDate(newSelected.getDate() + 7);
    this.setState({...thisState, selected: newSelected});
  }

  render() {
    const selectedWeekSun = new Date(this.state.selected.getTime());
    selectedWeekSun.setDate(selectedWeekSun.getDate() - selectedWeekSun.getDay());
    const selectedWeekSat = new Date(this.state.selected.getTime());
    selectedWeekSat.setDate(selectedWeekSat.getDate() + (6 - selectedWeekSat.getDay()));
    const userNutritions = this.props.userNutritions;
    const recommendedIntake = this.props.recommendedIntake;

    console.log(userNutritions);
    let selectedWeekNutritions = userNutritions.filter((nutrition) => {
      return +nutrition.date >= +selectedWeekSun && +nutrition.date <= +selectedWeekSat;
    });
    console.log(selectedWeekNutritions);
    
    return (
      <div className="StatsWeekly">
        <div className="prev-next-buttons">
          <Button id="prev-button" onclick={() => this.onClickedPrevButton()}>Prev</Button>
          <Button id="next-button" onclick={() => this.onClickedNextButton()}>Next</Button>
        </div>
        <StatsWeeklyChart selectedWeekNutritions={selectedWeekNutritions} recommendedIntake={recommendedIntake}/>
      </div>
    )
  }
}

export default StatsWeekly;