/* eslint-disable */
import React, { Component } from 'react';
// import styled from 'styled-components';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Button, Grid, Image, Segment, Divider } from 'semantic-ui-react';
import styled from 'styled-components';
// import MealList from '../../component/Meal/MealList';
// import Background from '../../styles/Nutritional_Info_and_Recipe/Background';
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
  componentDidMount() {
    console.log(this.props.id);
    this.props.onGetRecord(this.props.id)
    if (this.props.record) {
      console.log("liked");
      console.log(this.props.record);
      console.log(this.props.record.menu);
      this.props.onGetMenu(this.props.record.menu);
      this.setState({ liked: this.props.record.liked });
    }
  }
  // clickRecordsHandler = () => {
  //   this.props.history.push('/history/');
  // }
  state = { liked: true }

  render() {
    var liked = false;
    liked = this.state.liked;
    var color='black';
    if (liked===true) {
      color='red'
    }
    console.log(this.state.liked)
    let menuName = 'Sushi';
    let calories = 446;
    let carbs = 93.29;
    let protein = 13.42;
    let fat = 1.31;
    let recipe = 'Ways to make good sushi';
    let date = "2021/11/11";
    if (this.props.selectedMenu !== null && this.props.record !== null) {
      menuName = this.props.selectedMenu.name;
      calories = this.props.selectedMenu.calories;
      carbs = this.props.selectedMenu.carbs;
      protein = this.props.selectedMenu.protein;
      fat = this.props.selectedMenu.fat;
      recipe = this.props.selectedMenu.recipe;
      date = this.props.record.date
    }

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
                  src="/sushi_example_image.jpeg"
                  className="ui centered fluid image"
                  style={{borderRadius: "20px", align:"center", alignItems:"center"}}
                />
              </div>
              <div>
                <MenuNameHeader className="menuName">{menuName}</MenuNameHeader>
                <TextArea>
                  <Grid>
                    <Grid.Column width={8}>
                      <div>
                        Calories:&nbsp;
                        {calories}
                        &nbsp;
                        kCal
                      </div>
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
              {/* <Review /> */}
              <div>
                <Button id="back-to-recommendations"
                  onClick={() => this.props.history.push('/history')}
                  >Back</Button>
                <Button onClick={() => { this.setState({liked: !liked});this.props.onToggleRecord(this.props.id)}}>
                  <h4 className="liked" style={{color:color}}>&#9829;</h4>
                </Button>
              </div>
            </Div>
          </Grid.Column>
        </Grid>
      </div>
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
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(RecordDetail))