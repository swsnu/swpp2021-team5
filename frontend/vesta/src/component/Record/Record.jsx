/* eslint-disable */
import React, { Component } from 'react';
import { Button, Grid, Image } from 'semantic-ui-react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import '../Record/Record.css';

const Div = styled.div`
background-color:#f2f2f2;
border-radius: 10px;
padding:10px;
`;
const ImgWrapper = styled.div`
position: relative;
width: 400px
height: 400px
`;
const Img = styled.img`
top: 0;
left: 0;
transform: translate(50, 50);
width: 100%;
height: 100%;
object-fit: cover;
padding: 5px;
`;

class Record extends Component {
  render() {
    const liked = this.props.liked;
    const detailLink = "/history/" + this.props.id;
    var color='black';
    if (liked===true) {
      color='red'
    }
    return (
      <Div className="Record">
        <Link to={detailLink}>
          <ImgWrapper>
          <Img
            src={this.props.image}
            class="ui centered rounded image"
            verticalAlign="bottom"
          />
          </ImgWrapper>
        </Link>
        {/*
        <Button onClick={this.props.clickDetail}>
          Detail
        </Button>
        */}
        <Grid>
          <Grid.Column width={3}textAlign="right">
            <h3>{this.props.date}</h3>
          </Grid.Column>
          <Grid.Column width={13} textAlign="right">
            <Button onClick={this.props.toggleLiked}>
            <div className="liked" style={{color:color}}>&#9829;</div>
            </Button>
          </Grid.Column>
        </Grid>
        
      </Div>
    );
  }
}

export default Record;
