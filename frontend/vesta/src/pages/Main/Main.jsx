import React, { Component } from 'react';
import styled from 'styled-components';
import {
  Grid, Image, Button, Container,
} from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';

const NextMealHeader = styled.div`
background-color:#F28095;
border-radius: 10px;
font-family:'verveine';
font-size:20px;
`;

const TextArea = styled.div`
background-color:#F2BB16;
border-radius: 20px;
font-family:'verveine';
font-size:25px;
`;

const ButtonArea = styled.div`
background-color:#B3D962;
border-radius: 1px;
font-family:'verveine';
font-size:30px;
`;

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menu: 'Sushi',
    };
  }

  onClickedFollowedRecButton = () => {
    this.props.history.push('/record');
  }

  onClickedNotFollowedButton = () => {
    this.props.history.push('/record');
  }

  onClickedRecordSnackButton = () => {
    this.props.history.push('/record');
  }

  render() {
    return (
      <div>
        <Container>
          <NextMealHeader>
            <h1>Next Meal</h1>
          </NextMealHeader>
          <Grid>
            <Grid.Column width={9}>
              <TextArea>
                <p>{this.state.menu}</p>
              </TextArea>
              <Image
                src="/sushi_example_image.jpeg"
                alt="menu"
                size="centered large"
              />
            </Grid.Column>
            <Grid.Column width={7}>
              <ButtonArea>
                <p>
                  If you want to record a meal,
                  please tell us if you followed our recommendation.
                </p>
                <Button onClick={this.onClickedFollowedRecButton}>Followed Recommendation</Button>
                <Button onClick={this.onClickedNotFollowedButton}>
                  Didnt Follow Recommendation
                </Button>
                <p>
                  Or if you just want to record a snack, press Record Snack.
                </p>
                <Button onClick={this.onClickedRecordSnackButton}>Record Snack</Button>
              </ButtonArea>
            </Grid.Column>
          </Grid>
        </Container>
      </div>
    );
  }
}
export default withRouter(Main);
