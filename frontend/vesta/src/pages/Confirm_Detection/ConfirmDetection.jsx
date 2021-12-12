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
    window.confirm('Your menu image is being detected :) Please wait for about 10 seconds!');
  //   this.props.getUserSetting();
  //   const uploadedImage = this.props.location.state.image;
  //   console.log(uploadedImage);
  //   // console.log(this.props.location.state.type);

  //   this.setState({ image: uploadedImage });
  //   this.setState({ type: 'meal' });
  //   // this.props.onGetMenu(this.state.menuName);

  //   // const form = new FormData();
  //   // form.append('files', uploadedImage);
  //   // form.append('image', uploadedImage);
  //   // for (const value of form.keys()) {
  //   //   console.log(value);
  //   // }
  //   // for (const value of form.values()) {
  //   //   console.log(value);
  //   // }
  //   // this.props.onGetDetection(form);
  //   // console.log('detection', this.props.detectedMenus);
  //   // this.setState({ menuName: this.props.location.state.menuName });
  //   this.setState({ menuName: this.props.detectedMenus[0].name });
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

  onClickedConfirmButton = () => {
    const form = new FormData();
    form.append('menu_name', this.state.menuName);
    form.append('review', this.state.review);
    form.append('liked', 'False');
    form.append('image', this.state.image.image);
    this.props.onAddRecord(form);

    const today = (new Date()).toISOString().split('T')[0];
    (async () => {
      let apiRes = null;
      try {
        apiRes = await axios.get(`/api/nutrition/${today}/`);
      } finally {
        const countInput = (this.state.type === 'meal') ? 1 : 0;
        const currentCalories = apiRes.data.calories;
        const currentCarbs = apiRes.data.carbs;
        const currentProtein = apiRes.data.protein;
        const currentFat = apiRes.data.fat;
        const currentCount = apiRes.data.count_all;

        this.props.onEditUserNutrition(today,
          currentCalories + this.props.selectedMenu.calories,
          currentCarbs + this.props.selectedMenu.carbs,
          currentProtein + this.props.selectedMenu.protein,
          currentFat + this.props.selectedMenu.fat,
          currentCount + countInput);
      }
    })();
    this.props.history.push('/history');
  }

  render() {
    console.log('here');
    let calories = 560;
    let carbs = 132.12;
    let protein = 12.1;
    let fat = 28.2;
    // if (this.props.selectedMenu) {
    //   calories = this.props.selectedMenu.calories;
    //   carbs = this.props.selectedMenu.carbs;
    //   protein = this.props.selectedMenu.protein;
    //   fat = this.props.selectedMenu.fat;
    // }
    // console.log(this.state.image);
    if (this.props.detectedMenu && this.props.nutrition) {

      const uploadedImage = this.props.location.state.image;
      console.log(uploadedImage);
      this.setState({ image: uploadedImage });
      this.setState({ type: 'meal' });
      this.setState({ menuName: this.props.detectedMenus[0].name });

      // calories = this.props.nutrition;
      console.log(this.props.nutrition);

      return (
        <div>
          <Container className="Confirm">
            <Background>
              <Nutrient
                menu_name={`You Ate : ${this.state.menuName}`}
                calories={calories}
                carbs={carbs}
                protein={protein}
                fat={fat}
                src={this.state.image}
              />
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
            </Background>
          </Container>
        </div>
      );
    }
    return (
      <Segment>
        <Dimmer active inverted>
          <Loader inverted content="Your menu is being detected" />
        </Dimmer>
        <Image src="https://react.semantic-ui.com/images/wireframe/short-paragraph.png" />
      </Segment>
    );
  }
}

const mapStateToProps = (state) => ({
  selectedMenu: state.menu.selectedMenu,
  detectedMenus: state.ml.detectedMenu,
  nutrition: state.ml.nutrition,
  ingredients: state.ml.ingredients,
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
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ConfirmDetection));
