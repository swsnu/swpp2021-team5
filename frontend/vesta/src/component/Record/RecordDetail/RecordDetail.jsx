/* eslint-disable */
import React, { Component } from 'react';
// import styled from 'styled-components';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Button, Grid, Image, Segment } from 'semantic-ui-react';
import styled from 'styled-components';
// import MealList from '../../component/Meal/MealList';
// import Background from '../../styles/Nutritional_Info_and_Recipe/Background';
import * as actionCreators from '../../../store/actions/index'
import Nutrient from '../../Nutrient/Nutrient';

const Div = styled.div`
background-color:#B3D962;
border-radius: 10px;
text-align:center;
`;

class RecordDetail extends Component {
  componentDidMount() {
    this.props.onGetRecord(this.props.id);
  }
  clickRecordsHandler = () => {
    this.props.history.push('/history/');
  }
  render() {
    var liked = false;
    if (this.props.record) {
      liked = this.props.record.liked;
    }
    var color='black';
    if (liked===true) {
      color='red'
    }
    let menuName = 'Sushi';
    let calories = 0;
    let carbs = 0;
    let protein = 0;
    let fat = 0;
    let recipe = 'Ways to make good sushi';
    if (this.props.selectedMenu) {
      menuName = this.props.selectedMenu.name;
      calories = this.props.selectedMenu.calories;
      carbs = this.props.selectedMenu.carbs;
      protein = this.props.selectedMenu.protein;
      fat = this.props.selectedMenu.fat;
      recipe = this.props.selectedMenu.recipe;
    }
    return (
      <Div className="RecordDetail">
          <Grid textAlign="center">
            <Grid.Column width={7}>
              <p>
                <Image
                id="meal-image"
                src="/sushi_example_image.jpeg"
                class="ui centered fluid image"
              />
              </p>
              {/*
              <p>
                <div id="nutrition-into">
                nutrion info
              </div>
              </p>
              <p>
                <div id="date">
                date
              </div>
              </p>
              */}
              <p>
                <Nutrient
                  menu_name={menuName}
                  calories={calories}
                  carbs={carbs}
                  protein={protein}
                  fat={fat}
                />
              </p>
              <p>
                <Button id="back-to-recommendations"
                  onClick={() => this.props.history.push('/history')}
                  >Records</Button>
                <Button onClick={this.props.onToggleRecord(this.props.id)}>
                  <div className="liked" style={{color:color}}>&#9829;</div>
                </Button>
              </p>
            </Grid.Column>
          </Grid>
      </Div>
    )
  }
}

const mapStateToProps = state => {
  return {
    record: state.record.selectedRecord,
    menu: state.menu.selectedMenu
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onGetRecord: (recordID) =>
      dispatch(actionCreators.getRecord(recordID)),
    onToggleRecord: (recordID) =>
      dispatch(actionCreators.toggleRecord(recordID)),
    onGetMenu: (menuName) => 
      dispatch(actionCreators.getMenu(menuName)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(RecordDetail))