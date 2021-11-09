/* eslint-disable */
import React, { Component } from 'react';
// import styled from 'styled-components';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
// import { Button } from 'semantic-ui-react';
// import MealList from '../../component/Meal/MealList';
// import Background from '../../styles/Nutritional_Info_and_Recipe/Background';
import * as actionCreators from '../../store/actions/index';
import RecordDetail from '../../component/Record/RecordDetail/RecordDetail';

// const RecommendationHeader = styled.div`
// font-family:'verveine';
// font-size:65px;
// color:#F28095;
// background-color:#B3D962;
// `;

class PreviousMeal extends Component {
  render() {
    return (
      <div className="PastMealRecord">
        <RecordDetail id={this.props.match.params.id} />
      </div>
    );
  }
}

export default connect(null, null)(withRouter(PreviousMeal));