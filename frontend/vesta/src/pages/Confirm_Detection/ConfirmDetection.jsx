/* eslint-disable */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Divider, Container, TextArea, Form, Icon, Grid, Segment, Dimmer, Loader,
} from 'semantic-ui-react';
import { withRouter } from 'react-router';
import styled from 'styled-components';
import axios from 'axios';
import Nutrient from '../../component/Nutrient/Nutrient';
import * as actionCreators from '../../store/actions/index';
import { Redirect } from 'react-router-dom';

const Background = styled.div`
background-color:#F2F2F2;
border-radius: 20px;
font-family:'verveine';
font-size:20px;
margin: 15x;
padding: 10px;
`;

const EditArea = styled.div`
background-color:#FFDFBA;
border-radius: 20px;
font-family:'verveine';
font-size:25px;
margin: 15px;
padding: 10px;
`;

const ReviewArea = styled.div`
background-color:#AA7B6F;
color:#F2F2F2;
border-radius: 20px;
font-family:'verveine';
font-size:25px;
margin: 15px;
padding: 10px;
`;

class ConfirmDetection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menuName: 'Burger',
      review: '',
      image: null,
      type: null,
      editMenu: null,
    };
  }

  componentDidMount() {
    const today = (new Date()).toISOString().split('T')[0];
    this.props.getUserNutrition(today);
    this.setType();
  }

  setType = () => {
    this.setState({
      type: this.props.location.state.type
    })
  }

  onClickedEditResultButton = () => {
    // console.log('here');
    let correctName = null;
    let calories = null;
    let carbs = null;
    let protein = null;
    let ingredient = null;
    // let recipe = null;
    let fat = null;
    const form = new FormData();
    correctName = prompt('Please enter correct meal name (only string)');
    if (correctName !== null) {
      console.log('not null');
      calories = prompt('Please enter calories(kcal) of your menu (only number)');
      if (calories !== null) {
        carbs = prompt('Please enter carbohydrate (grams) of your menu (only number)');
        if (carbs !== null) {
          protein = prompt('Please enter protein (grams) of your menu (only number)');
          if (protein !== null) {
            fat = prompt('Please enter fat (grams) of your menu (only number)');
            if (fat) {
              ingredient = prompt('Please enter ingredient of your menu (parse by comma)');
            }
          }
        }
      }
    }
    form.append('menu_name', correctName);  //string
    form.append('calories', parseFloat(calories));
    form.append('carbs', parseFloat(carbs));
    form.append('protein', parseFloat(protein));
    form.append('fat', parseFloat(fat));
    form.append('ingredient', ingredient);  //string
    // form.append('recipe', recipe);
    console.log(correctName, calories, carbs, protein, fat, ingredient);
    if (correctName && calories && carbs && protein && fat && ingredient) {
      // this.props.onAddRecord(form);
      this.setState({ editMenu: form });
    }
    this.setState({ menuName: correctName });
    // this.props.onGetMenu(correctName);
  }

  onChangedReviewInput = (event) => {
    this.setState({ review: event.target.value });
    console.log(this.state.review);
  }

  onClickedCancelButton = () => {
    this.props.history.push('/main');
  }

  calculateCarbAndProtein = (percent) => {
    return ((1800 * (percent/100))/4).toFixed(2)
  }

  calculateFat = (percent) => {
    return ((1800 * (percent/100))/9).toFixed(2)
  }

  parseIngredient = (ingredients) => {
    let result = [];
    for (let rec of ingredients) {
      result.push(rec['name']);
    }
    console.log(result);
    return (result);
  }

  onClickedConfirmButton = () => {
    const today = (new Date()).toISOString().split('T')[0];
    const countInput = (this.state.type === 'meal') ? 1 : 0;
    let form = new FormData();
    let menuCal = 0;
    let menuCarb = 0;
    let menuProtein = 0;
    let menuFat = 0;
    let ingredient = '';

    if (!this.state.editMenu) {  // when the detection is correct, editMenu == null
      menuCal = this.props.nutrition.calories;
      menuCarb = this.calculateCarbAndProtein(this.props.nutrition.dailyIntakeReference.CHOCDF.percent)
      menuProtein = this.calculateCarbAndProtein(this.props.nutrition.dailyIntakeReference.PROCNT.percent)
      menuFat = this.calculateFat(this.props.nutrition.dailyIntakeReference.FAT.percent)
      
      form.append('menu_name', this.props.detectedMenu[0].name);
      form.append('calories', menuCal);
      form.append('carbs', menuCarb)
      form.append('protein', menuProtein)
      form.append('fat', menuFat)
      form.append('ingredient', this.parseIngredient(this.props.ingredients));
    } else {  // when the detection is wrong, editMneu !== null
      form = this.state.editMenu;
      menuCal = this.state.editMenu.get('calories');
      menuCarb = this.state.editMenu.get('carbs');
      menuProtein = this.state.editMenu.get('protein');
      menuFat = this.state.editMenu.get('fat');
      ingredient = this.state.editMenu.get('ingredient');
      console.log('menuCal: ', menuCal);
      console.log('ingredient:', ingredient);
    }
    form.append('review', this.state.review);
    form.append('liked', 'False');
    form.append('image', this.props.location.state.image);
    this.props.onAddRecord(form);  // add record (includes creating a new menu in backend)

    console.log(this.props.userNutrition.calories);
    console.log('countInput:',countInput);
    this.props.onEditUserNutrition(
      today,
      (this.props.userNutrition.calories + menuCal),
      (this.props.userNutrition.carbs + menuCarb),
      (this.props.userNutrition.protein + menuProtein),
      (this.props.userNutrition.fat + menuFat),
      (this.props.userNutrition.count_all + countInput)
    );
    this.props.history.push('/history');
  }

  render() {
    const menuCarb = this.calculateCarbAndProtein(this.props.nutrition.dailyIntakeReference.CHOCDF.percent)
    const menuProtein = this.calculateCarbAndProtein(this.props.nutrition.dailyIntakeReference.PROCNT.percent)
    const menuFat = this.calculateFat(this.props.nutrition.dailyIntakeReference.FAT.percent)
    const form = new FormData();
    form.append('menu_name', this.props.detectedMenu[0].name);
    form.append('calories', this.props.nutrition.calories);
    form.append('carbs', menuCarb)
    form.append('protein', menuProtein)
    form.append('fat', menuFat)
    form.append('ingredient', this.props.ingredients);
    form.append('review', this.state.review);
    form.append('liked', 'False');
    form.append('image', this.props.location.state.image);
    console.log(form.get('menu_name'));
    console.log(form.get('calories'));
    console.log(form.get('carbs'));
    console.log(form.get('protein'));
    console.log(form.get('fat'));
    console.log(form.get('ingredient'));
    console.log(form.get('review'));
    console.log(form.get('liked'));
    // console.log(form.get('image'));
    console.log(this.props.userNutrition);
    let result = [];
    for (let rec of this.props.ingredients) {
      result.push(rec['name']);
    }
    console.log(result);
    // console.log(str(result));

    if (this.props.storedRecords) {
      return (
        <Redirect to={{
          pathname: '/history',
        }} />
      )
    }

    return (
      <div>
        <Container className="Confirm">
          <Background>
            <Nutrient
              menu_name={`${this.props.detectedMenu[0].name}`}
              calories={this.props.nutrition.calories}
              carbs={this.calculateCarbAndProtein(this.props.nutrition.dailyIntakeReference.CHOCDF.percent)}
              protein={this.calculateCarbAndProtein(this.props.nutrition.dailyIntakeReference.PROCNT.percent)}
              fat={this.calculateFat(this.props.nutrition.dailyIntakeReference.FAT.percent)}
              src={this.props.location.state.image}
            />
          </Background>
          <Divider />
          <EditArea>
            <p>
              Is the detection result wrong?
              Tell us what you ate
            </p>
            <Icon circular name="edit icon" onClick={this.onClickedEditResultButton} />
          </EditArea>
          <ReviewArea>
            <h1>
              Create a review for your meal
            </h1>
            <p>
              If you dont want to write a review now,
              you can leave it blank and write it later.
            </p>
            <Form>
              <TextArea id="review-text" placeholder="write review here" onChange={this.onChangedReviewInput} />
            </Form>
            <p>
              Press Confirm / Cancel to Create a record or Cancel.
            </p>
            <Grid columns={2}>
              <Grid.Column>
                <p> Confirm </p>
                <Icon circular name="check icon" onClick={this.onClickedConfirmButton} />
              </Grid.Column>
              <Grid.Column>
                <p> Cancel </p>
                <Icon circular name="x icon" onClick={this.onClickedCancelButton} />
              </Grid.Column>
            </Grid>
          </ReviewArea>
        </Container>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  selectedMenu: state.menu.selectedMenu,
  detectedMenu: state.ml.detectedMenu,
  nutrition: state.ml.nutrition,
  ingredients: state.ml.ingredients,
  userNutrition: state.user.userNutrition,
  storedRecords: state.record.userRecords,
});

const mapDispatchToProps = (dispatch) => ({
  // onGetMenu: (menuName) => dispatch(actionCreators.getMenu(menuName)),
  onCreateUserNutrition: (date, calories, carbs, protein, fat,
    countAll) => dispatch(actionCreators.createUserNutrition(date, calories, carbs, protein, fat, countAll)),
  onEditUserNutrition: (date, calories, carbs, protein, fat,
    countAll) => dispatch(actionCreators.editUserNutrition(date, calories, carbs, protein, fat, countAll)),
  onGetDetection: (formData) => dispatch(actionCreators.detect(formData)),
  onAddRecord: (formData) => dispatch(actionCreators.addRecord(formData)),
  getUserSetting: () => dispatch(actionCreators.getUserSetting()),
  getUserNutrition: (date) => dispatch(actionCreators.getUserNutrition(date)), 
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ConfirmDetection));
