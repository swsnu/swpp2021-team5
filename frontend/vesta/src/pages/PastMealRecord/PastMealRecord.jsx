/* eslint-disable */
import React, { Component } from 'react';
// import styled from 'styled-components';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
// import { Button } from 'semantic-ui-react';
// import MealList from '../../component/Meal/MealList';
// import Background from '../../styles/Nutritional_Info_and_Recipe/Background';
import * as actionCreators from '../../store/actions/index';
import Records from '../../component/Record/Records/Records';

// const RecommendationHeader = styled.div`
// font-family:'verveine';
// font-size:65px;
// color:#F28095;
// background-color:#B3D962;
// `;

class PastMealRecord extends Component {
  componentDidMount() {
    this.props.getRecords();
  }

  render() {
    return (
      <div className="PastMealRecord">
        <Records />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  userRecords: state.record.userRecords,
});

const mapDispatchToProps = (dispatch) => ({
  getRecords: () => dispatch(actionCreators.getRecords()),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(PastMealRecord));
