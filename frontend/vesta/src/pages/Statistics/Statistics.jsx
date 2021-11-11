/* eslint-disable */

import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  Header, Table, Input, Button, Grid
} from 'semantic-ui-react';
import styled from 'styled-components';

import * as actionCreators from '../../store/actions/index';
import StatsDaily from '../../component/Statistics/StatsDaily';

const StatisticsHeader = styled.div`
font-family:'verveine';
font-size:65px;
color:#F28095;
text-align: center;
vertical-align: middle;
line-height: 80px;
`;

const Box = styled.div`
background-color:#B3D962;
border-radius: 10px;
width: 950px;
height: 80px;
margin:0 auto;
`;

class Statistics extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <div className="Statistics">

        
        <div className="Header">
          <StatisticsHeader>Your Nutritional Statistics</StatisticsHeader>
        </div>

        <Grid column={1} textAlign="center">
          <Grid.Column width={5}>
            <StatsDaily data={[72, 64, 57, 80]} />
            <br/>
            <br/>
            <Button size='large'>Today</Button>
            <Button size='large'>Weekly</Button>
            <Button size='large'>Monthly</Button>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

export default Statistics;
