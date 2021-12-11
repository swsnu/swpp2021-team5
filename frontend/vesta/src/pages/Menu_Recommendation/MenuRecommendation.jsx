import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import {
  Dimmer, Loader, Image, Segment
} from 'semantic-ui-react';
import MealList from '../../component/Meal/MealList';
import * as actionCreators from '../../store/actions/index';

class MenuRecommendation extends Component {
  componentDidMount() {
    console.log('componentdidmount');
    this.props.getUserSetting();
    const today = (new Date()).toISOString().split('T')[0];
    console.log(today);
    this.props.getRecommendedMenus(today);
  }

  render() {
    if (this.props.recommendedMenus) {
      console.log(this.props.recommendedMenus);
      return (
        <div className="MenuRecommendation">
          <MealList
            title="Today's Recommendation"
          />
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

const mapStateToProps = (state) => ({
  recommendedMenus: state.menu.recommendedMenus,
});

const mapDispatchToProps = (dispatch) => ({
  getRecommendedMenus: (date) => dispatch(actionCreators.getRecommendedMenus(date)),
  getUserSetting: () => dispatch(actionCreators.getUserSetting()),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(MenuRecommendation));
