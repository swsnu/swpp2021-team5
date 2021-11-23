/* eslint-disable */
import React, { Component } from 'react';

import { Button } from 'semantic-ui-react';

class StatsWeekly extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selected: props.today,
    }
  }

  onClickedPrevButton = () => {
    const thisState = this.state;
    const newSelected = this.state.selected;
    newSelected.setDate(newSelected.getDate() - 7);
    this.setState({...thisState, selected: newSelected});
  }

  onClickedNextButton = () => {
    const thisState = this.state;
    const newSelected = this.state.selected;
    newSelected.setDate(newSelected.getDate() + 7);
    this.setState({...thisState, selected: newSelected});
  }

  render() {
    const selectedWeekSun = this.state.selected;
    selectedWeek.setDate(selectedWeek.getDate() - selectedWeek.getDay());
    const selectedWeekSat = this.state.selected;
    selectedWeek.setDate(selectedWeek.getDate() + (7 - selectedWeek.getDay()));
    const userNutritions = this.props.userNutritions;
    const recommendedIntake = this.props.recommendedIntake;

    let selectedWeekNutritions = userNutritions.filter((nutrition) => {
      return nutrition.date >= selectedWeekSun && nutrition.date <= selectedWeekSat;
    });
    
    return (
      <div className="StatsWeekly">
        <div className="prev-next-buttons">
          <Button id="prev-button" onclick={() => this.onClickedPrevButton()}>Prev</Button>
          <Button id="next-button" onclick={() => this.onClickedNextButton()}>Next</Button>
        </div>
        <StatsWeeklyChart selectedWeekNutritions={selectedWeekNutritions}/>
      </div>
    )
  }
}

export default StatsWeekly;