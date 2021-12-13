/* eslint-disable */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import * as actionCreators from '../../store/actions/index';
import Records from '../../component/Record/Records/Records';
import {
  Image, Segment, Dimmer, Loader
} from 'semantic-ui-react';

class PastMealRecord extends Component {
  componentDidMount() {
    this.props.getUserSetting();
  }

  render() {
    if (this.props.user) {
      console.log(this.props.user.userID);
      return (
        <div className="PastMealRecord">
          <Records userID={this.props.user.userID}/>
        </div>
      );
    }
    return (
      <Segment>
        <Dimmer active inverted>
          <Loader inverted content="Loading your records!" />
        </Dimmer>
        <Image src="https://react.semantic-ui.com/images/wireframe/short-paragraph.png" />
      </Segment>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user.currentUser,
});

const mapDispatchToProps = (dispatch) => ({
  getUserSetting: () => dispatch(actionCreators.getUserSetting()),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(PastMealRecord));
