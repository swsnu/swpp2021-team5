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
    console.log('here');
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDay();
    this.props.getCountAll(String(`${year}-${month}-${day}`));
    if (this.props.countAll === 0) {
      this.props.changeCount(0);
      this.props.getRecommendedMenus(String(`${year}-${month}-${day}`));
    } else if (this.props.countAll > this.props.count) {
      this.props.changeCount(this.props.countAll + 1);
      this.props.getRecommendedMenus(String(`${year}-${month}-${day}`));
    }
  }

  // componentDidUpdate() {
  //   console.log('HERE');
  //   const date = new Date();
  //   const year = date.getFullYear();
  //   const month = date.getMonth();
  //   const day = date.getDay();
  //   if (this.props.countAll === 0) {
  //     this.props.changeCount(0);
  //     this.props.getRecommendedMenus(String(`${year}-${month}-${day}`));
  //   } else if (this.props.countAll > this.props.count) {
  //     this.props.changeCount(this.props.countAll + 1);
  //     this.props.getRecommendedMenus(String(`${year}-${month}-${day}`));
  //   }
  // }

  render() {
    if (this.props.recommendedMenus) {
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
  countAll: state.menu.countAll,
  count: state.menu.count,
});

const mapDispatchToProps = (dispatch) => ({
  getCountAll: (date) => dispatch(actionCreators.getCountAll(date)),
  getRecommendedMenus: (date) => dispatch(actionCreators.getRecommendedMenus(date)),
  changeCount: (cnt) => dispatch(actionCreators.changeCount_(cnt)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(MenuRecommendation));
