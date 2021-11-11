/* eslint-disable */
import React, { Component } from 'react';
import { Button, Divider, Grid, Image } from 'semantic-ui-react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import '../Record/Record.css';

const Div = styled.div`
background-color:#f2f2f2;
border-radius: 10px;
padding:10px;
`;
const ImgWrapper = styled.div`
// position: relative;
// overflow: hidden;
// width: 700px;
// height: 700px;
`;
// const Img = styled.img`
// object-fit: 'cover';
// padding: 5px;
// `;

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
      <ImgWrapper>
        <Link className="imgwrapper" to={detailLink}>
          <img
            src={this.props.image}
            class="ui centered rounded image"
            verticalAlign="bottom"
            style={{height:"600px", width:"600px", objectFit: "cover", padding: "20px"}}
          />
        </Link>
          </ImgWrapper>
        {/*
        <Button onClick={this.props.clickDetail}>
          Detail
        </Button>
        */}
        <Divider/>
        <Grid>
          <Grid.Column width={4}textAlign="right">
            <h3>{this.props.date}</h3>
          </Grid.Column>
          <Grid.Column width={11} textAlign="right">
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
