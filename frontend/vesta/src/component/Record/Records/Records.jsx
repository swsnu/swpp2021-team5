/* eslint-disable */
import React, { Component, createRef } from 'react';
// import styled from 'styled-components';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Button, Image, Divider, Grid, Segment, Sticky, Menu } from 'semantic-ui-react';
// import MealList from '../../component/Meal/MealList';
// import Background from '../../styles/Nutritional_Info_and_Recipe/Background';
import Record from '../Record';
import * as actionCreators from '../../../store/actions/index'

class Records extends Component {
  contextRef = createRef();
  state = {
    showLiked: false,
    acticeItem: 'All',
  }
  componentDidMount() {
    this.props.onGetRecords()
      .then(this.setState({ records: this.props.storedRecords }));
  }
  clickRecordHandler = (rec) => {
    this.props.history.push('/history/' + rec.id);
  }
  render() {
    let storedRecords = this.props.storedRecords;
    if (this.state.showLiked) {
      storedRecords = storedRecords.filter(rec => rec.liked === true);
    }
    const records = storedRecords.map(rec => {
      return (
        <Record
          key={rec.id}
          id={rec.id}
          image={rec.image}
          liked={rec.liked}
          date={rec.date}
          clickDetail={() => this.clickRecordHandler(rec)}
          toggleRecord={() => this.props.onToggleRecord(rec.id)}
        />
      )
    });
    const dd = (
      <h1>no</h1>
    )
    return (
      <div className="Records" ref={this.contextRef}>
        <Sticky context={this.contextRef}>
          <Menu
            attached='top'
            pointing
            style={{ backgroundColor: '#fff', paddingTop: '1em'}}
          >
            <Menu.Item position="right"
              as='a'
              active={this.state.acticeItem==='All'}
              name='All'
              onClick={() => this.setState({ 
                showLiked: false,
                acticeItem: 'All'
              })}
            />
            <Menu.Item position="left"
              as='a'
              active={this.state.acticeItem==='Liked'}
              name='Liked'
              onClick={()=> this.setState({
                showLiked: true,
                acticeItem: 'Liked'
              })}
            />
          </Menu>
        </Sticky>
        <Segment>
          <Grid centered columns={3} textAlign="center" relaxed='very'>
            <Grid.Column width={9}>
              {records}
              {dd}
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