import React, { Component } from 'react';
import {
  Image, Input, Container, Divider, Button,
} from 'semantic-ui-react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as actionCreators from '../../store/actions/index';

/* eslint no-restricted-globals: ["off"] */

class FoodRecord extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: null,
    };
  }

  componentDidMount() {
    this.props.getUserSetting();
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
      window.confirm('Your menu image is being detected :) Please wait for about 10 seconds!');
      setTimeout(() => this.props.history.push({
        pathname: '/confirm',
        state: { image: this.state.image, menuName: this.props.detectedMenus[0].name },
      }), 10000);
      /*
      this.props.history.push({
        pathname: '/confirm',
        state: { image: this.state.image, menuName: this.props.detectedMenus[0].name },
      });
      */
    }
  }

  render() {
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
}

const mapStateToProps = (state) => ({
  selectedMenu: state.menu.selectedMenu,
  detectedMenus: state.ml.detectedMenu,
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
