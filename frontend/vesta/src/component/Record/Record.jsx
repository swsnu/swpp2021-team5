/* eslint-disable */
import React, { Component } from 'react';
import { Button, Image } from 'semantic-ui-react';
import styled from 'styled-components';

const Div = styled.div`
background-color:#B3D962;
border-radius: 10px;
padding:4%;
`;

class Record extends Component {
  render() {
    const liked = this.props.liked;
    var color='black';
    if (liked===true) {
      color='red'
    }
    return (
      <Div className="Record">
        <Image
          src={this.props.image}
          class="ui centered medium rounded image"
          verticalAlign="bottom"
        />
        <Button onClick={this.props.clickDetail}>
          Detail
        </Button>
        <Button onClick={this.props.toggleLiked}>
        <div className="liked" style={{color:color}}>&#9829;</div>
        </Button>
      </Div>
    );
  }
}

export default Record;
