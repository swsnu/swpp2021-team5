import React, { Component } from 'react';
// import styled from 'styled-components';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
// import { Button } from 'semantic-ui-react';
import MealList from '../../component/Meal/MealList';
import Background from '../../styles/Nutritional_Info_and_Recipe/Background';
import * as actionCreators from '../../store/actions/index';
// import { AlignMiddle } from '../../styles/Menu_Recommendation/AlignMiddle';

// const RecommendationHeader = styled.div`
// font-family:'verveine';
// font-size:65px;
// color:#F28095;
// background-color:#B3D962;
// `;

class MenuRecommendation extends Component {
  componentDidMount() {
    this.props.getRecommendedMenus();
  }

  render() {
    return (
      <div className="MenuRecommendation">
        <Background>
          {/* <RecommendationHeader>Today&apos;s Recommendation</RecommendationHeader> */}
          <MealList
            title="Today's Recommendation"
          />
          {/* <Button className="main-button">Back</Button> */}
        </Background>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  recommendedMenus: state.menu.recommendedMenus,
});

const mapDispatchToProps = (dispatch) => ({
  getRecommendedMenus: () => dispatch(actionCreators.getRecommendedMenus()),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(MenuRecommendation));
