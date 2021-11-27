import React, { Component } from 'react';
import {
  Image, Input, Container, Divider, Button,
} from 'semantic-ui-react';
// import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

/* eslint no-restricted-globals: ["off"] */

class FoodRecord extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: null,
    };
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
      this.props.history.push({
        pathname: '/confirm',
        state: { image: this.state.image, type: this.props.location.state.type },
      });
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
export default withRouter(FoodRecord);
