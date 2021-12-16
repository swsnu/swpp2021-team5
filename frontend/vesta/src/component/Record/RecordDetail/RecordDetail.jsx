/* eslint-disable */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import {
  Button, Grid, Image, Segment, Dimmer, Loader
} from 'semantic-ui-react';
import styled from 'styled-components';
import * as actionCreators from '../../../store/actions/index'
import Nutrient from '../../Nutrient/Nutrient';
import Review from '../Review/Review';

const Div = styled.div`
background-color:#f2f2f2;
border-radius: 10px;
margin: 10px;
padding: 15px;
`;

const DateHeader = styled.div`
background-color:#77ACF2;
font-size:40px;
color:'black';
text-align: center;
vertical-align:bottom;
font-family:'verveine';
border-radius: 10px;
padding:20px;
margin-bottom: 20pxpx;
`;

const MenuNameHeader = styled.div`
background-color:#B3D962;
font-size:40px;
color:#F28095;
text-align: center;
vertical-align:bottom;
font-family:'verveine';
border-radius: 10px;
padding:20px;
margin-bottom: 30px;
`;

const TextArea = styled.div`
background-color:#F2BB16;
border-radius: 10px;
font-family:'verveine';
font-size:25px;
margin-bottom:30px;
`;

class RecordDetail extends Component {
  constructor() {
    super();
    this.state = {
      liked: false
    };
  }

  componentDidMount() {
    // console.log(this.state.liked);
    // console.log(this.props.id);
    this.props.onGetRecord(this.props.id);
    this.updateInitial();
  }

  updateInitial = () => {
    this.setState({
      liked: this.props.location.state.liked
    });
  }

  toggleLiked = () => {
    if(this.state.liked == true) this.setState({ liked: false });
    else this.setState({ liked: true });
    this.props.onToggleRecord(this.props.id);
  }

  render() {
    let menuName = '';  // initialization
    let calories = 0;
    let carbs = 0;
    let protein = 0;
    let fat = 0;
    let date = "";
    let review = "";
    let color = 'black';

    if (this.props.record !== null) {
      menuName = this.props.record.menu_name;
      calories = this.props.record.menu_calories;
      carbs = this.props.record.menu_carbs;
      protein = this.props.record.menu_protein;
      fat = this.props.record.menu_fat;
      review = this.props.record.review;
      date = this.props.record.date;
      // console.log(this.props.record.liked);
      // console.log(this.state.liked);
      if (this.state.liked === true) color = 'red';
      else color = 'black';

      return (
        <div className="RecordDetail">
          <Grid textAlign="center">
            <Grid.Column width={10} style={{alignItems:"center"}}>
              <Div style={{alignItems:"center"}}>
                <div>
                  <DateHeader>
                    {date}
                  </DateHeader>
                </div>
                <div style={{"alignItems": "center"}}>
                  <Image
                    id="meal-image"
                    src={this.props.record.image}
                    className="ui centered fluid image"
                    style={{borderRadius: "20px", align:"center", alignItems:"center"}}
                  />
                </div>
                <div>
                  <MenuNameHeader className="menuName">{menuName}</MenuNameHeader>
                  <TextArea>
                    <Grid>
                      <Grid.Column width={8}>
                        <p>
                          Calories:&nbsp;
                          {calories}
                          &nbsp;
                          kCal
                        </p>
                        <p>
                          Carbohydrate:&nbsp;
                          {carbs}
                          &nbsp;
                          g
                        </p>
                      </Grid.Column>
                      <Grid.Column width={8}>
                        <p>
                          Protein:&nbsp;
                          {protein}
                          &nbsp;
                          g
                        </p>
                        <p>
                          Fat:&nbsp;
                          {fat}
                          &nbsp;
                          g
                        </p>
                      </Grid.Column>
                    </Grid>
                  </TextArea>
                </div>
                <Review />
                <div>
                  <Button id="back-to-history"
                    onClick={() => this.props.history.push('/history')}
                    >Back</Button>
                  <Button onClick={() => { this.toggleLiked() }}>
                    <h4 className="liked" style={{color:color}}>&#9829;</h4>
                  </Button>
                </div>
              </Div>
            </Grid.Column>
          </Grid>
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

const mapStateToProps = state => {
  return {
    record: state.record.selectedRecord,
    selectedMenu: state.menu.selectedMenu,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onGetRecord: (recordID) =>
      dispatch(
        actionCreators.getRecord(
          recordID)),
    onToggleRecord: (recordID) =>
      dispatch(actionCreators.toggleRecord(recordID)),
    onGetMenu: (menuName) => 
      dispatch(actionCreators.getMenu(menuName)),
    onGetRecords: (userID) => dispatch(actionCreators.getRecords(userID)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(RecordDetail))
