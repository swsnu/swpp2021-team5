/* eslint-disable */
import React, { Component } from 'react';
// import styled from 'styled-components';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Button, Image, Divider, Grid, Segment } from 'semantic-ui-react';
// import MealList from '../../component/Meal/MealList';
// import Background from '../../styles/Nutritional_Info_and_Recipe/Background';
import Record from '../Record';
import * as actionCreators from '../../../store/actions/index'

class Records extends Component {
  componentDidMount() {
    this.props.onGetRecords();
  }
  clickRecordHandler = (rec) => {
    this.props.history.push('/history/' + rec.id);
  }
  render() {
    const records = this.props.storedRecords.map(rec => {
      return (
        <Record
          key={rec.id}
          image={rec.image}
          liked={rec.liked}
          clickDetail={() => this.clickRecordHandler(rec)}
          toggleRecord={() => this.props.onToggleRecord(rec.id)}
        />
      )
    });
    return (
      <div className="Records">
        <Segment>
          <Grid columns={1} textAlign="center" relaxed='very'>
            <Grid.Column width={10}>
              {records}
            </Grid.Column>
          </Grid>
        </Segment>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    storedRecords: state.record.userRecords
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onGetRecords: (userID) =>
      dispatch(actionCreators.getRecords(userID)),
    onToggleRecord: (recordID) =>
      dispatch(actionCreators.toggleRecord(recordID)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Records))