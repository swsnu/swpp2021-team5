/* eslint-disable */
import React, { Component } from 'react';
import {
  Image, Input, Container, Divider, Button, Segment, Dimmer, Loader,
} from 'semantic-ui-react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as actionCreators from '../../store/actions/index';
import { Redirect } from 'react-router-dom';

/* eslint no-restricted-globals: ["off"] */

class FoodRecord extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: null,
      detecting: false,
      type: '',
    };
  }

  componentDidMount() {
    window.confirm('Please refresh your page before uploading image.');
    this.props.getUserSetting();
  }

  setType = () => {
    console.log(this.props.location.state.type);
    this.setState({
      type: this.props.location.state.type  // 1 of followed, unfollowed, meal
    });
    // console.log(this.state.type);
  }

  onChangedImageInput = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      this.setState({
        image: reader.result,
      });
    };
    reader.readAsDataURL(file);
  }

  onClickedUploadButton = () => {
    if (this.state.image != null) {
      const form = new FormData();
      form.append('image', this.state.image);
      this.props.onGetDetection(form);
      this.setState({ detecting: true });
    }
  }

  render() {
    console.log(this.state.detecting);
    console.log(this.props.detectedMenu);
    console.log(this.state.type);
    if (!this.state.detecting) {
      return (
        <div>
          <Container text className="Record">
            <Input id="meal-photo" type="file" onChange={this.onChangedImageInput} />
            <Divider />
            <Image
              id="meal-photo-preview"
              src={this.state.image}
              alt=""
              size="centered large"
              bordered="true"
            />
            <Divider />
            <Button id="upload-photo-button" onClick={this.onClickedUploadButton}>Upload</Button>
          </Container>
        </div>
      );
    }
    if (this.state.detecting && !this.props.detectedMenu && !this.props.nutrition && !this.props.ingredients) {
      return (
        <Segment>
          <Dimmer active inverted>
            <Loader inverted content="Your menu is being detected" />
          </Dimmer>
          <Image src="https://react.semantic-ui.com/images/wireframe/short-paragraph.png" />
        </Segment>
      );
    }
    return (
      <Redirect to={{
        pathname: '/confirm',
        state: {
          image: this.state.image,
          type: this.props.location.state.type
        }
      }} />
    );
  }
}

const mapStateToProps = (state) => ({
  selectedMenu: state.menu.selectedMenu,
  detectedMenu: state.ml.detectedMenu,
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
  getUserSetting: () => dispatch(actionCreators.getUserSetting()),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(FoodRecord));
