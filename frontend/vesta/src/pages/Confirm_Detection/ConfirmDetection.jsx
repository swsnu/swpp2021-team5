import React, { Component } from 'react';
import {
  Button, Divider, Container, TextArea, Form,
} from 'semantic-ui-react';
import { withRouter } from 'react-router';
import styled from 'styled-components';
import Nutrient from '../../component/Nutrient/Nutrient';
import Background from '../../styles/Nutritional_Info_and_Recipe/Background';

const TextBox = styled.div`
background-color:#F2F2F2;
border-radius: 10%;
font-family:'verveine';
font-size:25px;
`;

class ConfirmDetection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menuName: 'Burger',
      review: null,
    };
  }

  onClickedEditResultButton = () => {
    const correctName = prompt('Please enter correct meal name');
    this.setState({ menuName: correctName });
  }

  onChangedReviewInput = (event) => {
    this.setState({ review: event.target.value });
    console.log(this.state.review);
  }

  onClickedCancelButton = () => {
    this.props.history.push('/main');
  }

  render() {
    let calories = 2;
    let carbs = 2;
    let protein = 2;
    let fat = 2;
    if (this.state.menuName.toLocaleLowerCase() === 'sushi') {
      calories = 1;
      carbs = 1;
      protein = 1;
      fat = 1;
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
              src="/sushi_example_image.jpeg"
            />
            <Divider />
            <TextBox>
              <p>
                Is the detection result wrong?
                Press Edit Detection Result and tell us what you ate
              </p>
            </TextBox>
            <Button id="edit-result-button" onClick={this.onClickedEditResultButton}>Edit Detection Result</Button>
            <TextBox>
              <h1>
                Create a review for your meal
              </h1>
              <p>
                If you dont want to write a review now,
                you can leave it blank and write it later.
              </p>
            </TextBox>
            <Form>
              <TextArea id="review-text" placeholder="write review here" onChange={this.onChangedReviewInput} />
            </Form>
            <TextBox>
              <p>
                Press Confirm / Cancel to Create a record or Cancel.
              </p>
            </TextBox>
            <Button id="confirm-button" onClick={this.onClickedConfirmButton}>Confirm</Button>
            <Button id="cancel-button" onClick={this.onClickedCancelButton} tabindex="0">Cancel</Button>
          </Background>
        </Container>
      </div>
    );
  }
}
export default withRouter(ConfirmDetection);
