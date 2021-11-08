import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import MealList from '../../component/Meal/MealList';
import Background from '../../styles/Nutritional_Info_and_Recipe/Background';

const RecommendationHeader = styled.div`
font-family:'verveine';
font-size:65px;
color:#F28095;
background-color:#B3D962;
border-radius: 10px;
`;

class MenuRecommendation extends PureComponent {
  render() {
    return (
      <Background className="MenuRecommendation">
        <RecommendationHeader>Today&apos;s Recommendation</RecommendationHeader>
        <MealList />
      </Background>
    );
  }
}

export default connect(null, null)(withRouter(MenuRecommendation));
