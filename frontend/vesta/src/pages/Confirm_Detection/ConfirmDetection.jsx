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
    const correctName = prompt('Please enter correct meal name');
    this.setState({ menuName: correctName });
    this.props.onGetMenu(correctName);
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

    const menuCal = this.props.nutrition.calories;
    const menuCarb = this.calculateCarbAndProtein(this.props.nutrition.dailyIntakeReference.CHOCDF.percent)
    const menuProtein = this.calculateCarbAndProtein(this.props.nutrition.dailyIntakeReference.PROCNT.percent)
    const menuFat = this.calculateFat(this.props.nutrition.dailyIntakeReference.FAT.percent)
    
    const form = new FormData();
    form.append('menu_name', this.props.detectedMenu[0].name);
    form.append('calories', menuCal);
    form.append('carbs', menuCarb)
    form.append('protein', menuProtein)
    form.append('fat', menuFat)
    form.append('ingredient', this.parseIngredient(this.props.ingredients));
    form.append('review', this.state.review);
    form.append('liked', 'False');
    form.append('image', this.props.location.state.image);
    this.props.onAddRecord(form);

    console.log(this.props.userNutrition.calories);
    console.log(countInput);
    this.props.onEditUserNutrition(
      today,
      (this.props.userNutrition.calories + menuCal),
      (this.props.userNutrition.carbs + menuCarb),
      (this.props.userNutrition.protein + menuProtein),
      (this.props.userNutrition.fat + menuFat),
      (this.props.userNutrition.count_all + countInput)
    );
    this.props.history.push('/history');
    //////////////
    
    // const today = (new Date()).toISOString().split('T')[0];
    // (async () => {
    //   let apiRes = null;
    //   try {
    //     apiRes = await axios.get(`/api/nutrition/${today}/`);
    //   } finally {
    //     const countInput = (this.state.type === 'meal') ? 1 : 0;
    //     const currentCalories = apiRes.data.calories;
    //     const currentCarbs = apiRes.data.carbs;
    //     const currentProtein = apiRes.data.protein;
    //     const currentFat = apiRes.data.fat;
    //     const currentCount = apiRes.data.count_all;

    //     this.props.onEditUserNutrition(today,
    //       currentCalories + this.props.selectedMenu.calories,
    //       currentCarbs + this.props.selectedMenu.carbs,
    //       currentProtein + this.props.selectedMenu.protein,
    //       currentFat + this.props.selectedMenu.fat,
    //       currentCount + countInput);
    //   }
    // })();
    // this.props.history.push('/history');
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
    // console.log('here');
    // let calories = 560;
    // let carbs = 132.12;
    // let protein = 12.1;
    // let fat = 28.2;

    // const uploadedImage = this.props.location.state.image;
    // this.setState({ image: uploadedImage });
    // this.setState({ type: 'meal' });
    // this.setState({ menuName: this.props.detectedMenu[0].name });

    // console.log(this.props.detectedMenu);
    // console.log(this.props.nutrition);
    // console.log(this.props.ingredients);
    // console.log(this.props.nutrition);
    // console.log(this.props.ingredients);

    // return (
    //   <div>
    //     <Container className="Confirm">
    //       <Background>
    //         <Nutrient
    //           menu_name={`You Ate : ${this.state.menuName}`}
    //           calories={calories}
    //           carbs={carbs}
    //           protein={protein}
    //           fat={fat}
    //           src={this.state.image}
    //         />
    //         <Divider />
    //         <EditArea>
    //           <p>
    //             Is the detection result wrong?
    //             Tell us what you ate
    //           </p>
    //           <Icon circular name="edit icon" onClick={this.onClickedEditResultButton} />
    //         </EditArea>
    //         <ReviewArea>
    //           <h1>
    //             Create a review for your meal
    //           </h1>
    //           <p>
    //             If you dont want to write a review now,
    //             you can leave it blank and write it later.
    //           </p>
    //           <Form>
    //             <TextArea id="review-text" placeholder="write review here" onChange={this.onChangedReviewInput} />
    //           </Form>
    //           <p>
    //             Press Confirm / Cancel to Create a record or Cancel.
    //           </p>
    //           <Grid columns={2}>
    //             <Grid.Column>
    //               <p> Confirm </p>
    //               <Icon circular name="check icon" onClick={this.onClickedConfirmButton} />
    //             </Grid.Column>
    //             <Grid.Column>
    //               <p> Cancel </p>
    //               <Icon circular name="x icon" onClick={this.onClickedCancelButton} />
    //             </Grid.Column>
    //           </Grid>
    //         </ReviewArea>
    //       </Background>
    //     </Container>
    //   </div>
    // );
    // }
    // return (
    //   <Segment>
    //     <Dimmer active inverted>
    //       <Loader inverted content="Your menu is being detected" />
    //     </Dimmer>
    //     <Image src="https://react.semantic-ui.com/images/wireframe/short-paragraph.png" />
    //   </Segment>
    // );
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
  onGetMenu: (menuName) => dispatch(actionCreators.getMenu(menuName)),
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
