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
  // clickRecordHandler = (rec) => {
  //   this.props.history.push('/history/' + rec.id);
  // }
  render() {
    let storedRecords = this.props.storedRecords;
    if (this.state.showLiked) {
      storedRecords = storedRecords.filter(rec => rec.liked === true);
    }
    // const records = storedRecords.map(rec => {
    //   return (
    //     <Record
    //       key={rec.id}
    //       id={rec.id}
    //       image={rec.image}
    //       liked={rec.liked}
    //       date={rec.date}
    //       clickDetail={() => this.clickRecordHandler(rec)}
    //       toggleRecord={() => this.props.onToggleRecord(rec.id)}
    //     />
    //   )
    // });
    const demoRecords_ = storedRecords.map(rec => {
      return (
        <a href={`/history/{rec.id}`} key={rec.id}>
          <img
            src={rec.image}
            style={{
              width:"200px",
              height:"200px",
              objectFit: "cover", padding: "10px", borderRadius: "20px"
            }}
          ></img>
        </a>
      )
    });
    const demoRecords = [[],[],[]];
    for (var i=0; i<demoRecords_.length; i++) {
      demoRecords[i%3].push(demoRecords_[i])
    };
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
        {/*
        <Segment>
          <Grid centered columns={3} textAlign="center" relaxed='very'>
            <Grid.Column width={9}>
              {records}
            </Grid.Column>
          </Grid>
        </Segment>
        */}
        <Segment>
          <Grid centered columns={3} textAlign="center" relaxed='very'>
            <Grid.Column width={2}>
              {demoRecords[0]}
            </Grid.Column>
            <Grid.Column width={2}>
              {demoRecords[1]}
            </Grid.Column>
            <Grid.Column width={2}>
              {demoRecords[2]}
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
    // onToggleRecord: (recordID) =>
    //   dispatch(actionCreators.toggleRecord(recordID)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Records))

export {Image, Grid}