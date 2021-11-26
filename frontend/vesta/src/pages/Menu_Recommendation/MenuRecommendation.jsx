import React, { Component } from 'react';
// import styled from 'styled-components';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
// import { Button } from 'semantic-ui-react';
import MealList from '../../component/Meal/MealList';
import Background from '../../styles/Nutritional_Info_and_Recipe/Background';
import * as actionCreators from '../../store/actions/index';

class MenuRecommendation extends Component {
  componentDidMount() {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDay();
    this.props.getRecommendedMenus(String(`${year}-${month}-${day}`));
  }

  render() {
    // console.log(this.props.recommendedMenus);
    return (
      <div className="MenuRecommendation">
        <MealList
          title="Today's Recommendation"
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  recommendedMenus: state.menu.recommendedMenus,
});

const mapDispatchToProps = (dispatch) => ({
  getRecommendedMenus: (date) => dispatch(actionCreators.getRecommendedMenus(date)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(MenuRecommendation));
