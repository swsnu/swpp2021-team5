import React, { Component } from 'react';
// import styled from 'styled-components';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
// import { Button } from 'semantic-ui-react';
// import MealList from '../../component/Meal/MealList';
// import Background from '../../styles/Nutritional_Info_and_Recipe/Background';
import * as actionCreators from '../../store/actions/index';
import RecordDetail from '../../component/Record/RecordDetail/RecordDetail';

const PreviousMeal = ({ id }) => (
  <div className="PreviousMeal">
    <RecordDetail id={id} />
  </div>
);

// class PreviousMeal extends Component {
//   render() {
//     return (
//       <div className="PastMealRecord">
//         <RecordDetail id={this.props.match.params.id} />
//       </div>
//     );
//   }
// }

export default withRouter(PreviousMeal);
