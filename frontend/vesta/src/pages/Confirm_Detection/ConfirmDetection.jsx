import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Button, Divider, Container, TextArea, Form, Icon, Grid,
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
    const uploadedImage = this.props.location.state.image;
    console.log(uploadedImage);
    console.log(this.props.location.state.type);
    this.setState({ image: uploadedImage });
    this.setState({ type: this.props.location.state.type });
    this.props.onGetMenu(this.state.menuName);
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
    const record = new FormData();
    record.append('menu', this.state.menuName);
    record.append('review', this.state.review);
    record.append('liked', 'False');
    record.append('image', this.state.image);
    this.props.onAddRecord(record);

    const today = (new Date()).toISOString().split('T')[0];
    (async () => {
      let apiRes = null;
      try {
        apiRes = await axios.get(`/api/nutrition/${today}/`);
      } catch (err) {
        if (err.response.status === 404) {
          const countInput = (this.state.type === 'meal') ? 1 : 0;
          this.props.onCreateUserNutrition(today, this.props.selectedMenu.calories,
            this.props.selectedMenu.carbs, this.props.selectedMenu.protein, this.props.selectedMenu.fat, countInput);
        }
      } finally {
        const currentCalories = apiRes.data.calories;
        const currentCarbs = apiRes.data.carbs;
        const currentProtein = apiRes.data.protein;
        const currentFat = apiRes.data.fat;
        const currentCount = apiRes.data.count_all;
        const countInput = (this.state.type === 'meal') ? 1 : 0;

        this.props.onEditUserNutrition(today,
          currentCalories + this.props.selectedMenu.calories,
          currentCarbs + this.props.selectedMenu.carbs,
          currentProtein + this.props.selectedMenu.protein,
          currentFat + this.props.selectedMenu.fat,
          currentCount + countInput);
      }
    })();
    if (this.state.type === 'meal') {
      const a = 1;
    }
  }

  render() {
    let calories = 560;
    let carbs = 132.12;
    let protein = 12.1;
    let fat = 28.2;
    if (this.props.selectedMenu) {
      calories = this.props.selectedMenu.calories;
      carbs = this.props.selectedMenu.carbs;
      protein = this.props.selectedMenu.protein;
      fat = this.props.selectedMenu.fat;
    }

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
}

const mapStateToProps = (state) => ({
  selectedMenu: state.menu.selectedMenu,
});

const mapDispatchToProps = (dispatch) => ({
  onGetMenu: (menuName) => dispatch(actionCreators.getMenu(menuName)),
  onAddRecord: (review) => dispatch(actionCreators.addRecord(review)),
  onCreateUserNutrition: (date, calories, carbs, protein, fat,
    countAll) => dispatch(actionCreators.createUserNutrition(date, calories, carbs, protein, fat, countAll)),
  onEditUserNutrition: (date, calories, carbs, protein, fat,
    countAll) => dispatch(actionCreators.editUserNutrition(date, calories, carbs, protein, fat, countAll)),
  onGetDetection: (formData) => dispatch(actionCreators.detect(formData)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ConfirmDetection));
