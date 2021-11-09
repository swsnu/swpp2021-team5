/* eslint-disable */
import React, { Component } from 'react';
// import styled from 'styled-components';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Button, Image } from 'semantic-ui-react';
// import MealList from '../../component/Meal/MealList';
// import Background from '../../styles/Nutritional_Info_and_Recipe/Background';
import * as actionCreators from '../../../store/actions/index'

class Review extends Component {
  componentDidMount() {
    this.props.onGetRecord(this.props.id);
  }
  clickRecordsHandler = () => {
    this.props.history.push('/history/');
  }
  render() {
    return (
      <div className="RecordDetail">
        <Image
          src="/sushi_example_image.jpeg"
          size="medium"
        />

        
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    record: state.record.selectedRecord
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onGetRecord: (recordID) =>
      dispatch(actionCreators.getRecord(recordID)),
    onToggleRecord: (recordID) =>
      dispatch(actionCreators.toggleRecord(recordID)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Review))