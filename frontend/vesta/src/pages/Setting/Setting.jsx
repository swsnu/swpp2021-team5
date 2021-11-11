/* eslint-disable */

import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  Header, Table, Input, Button, Grid, GridColumn, GridRow
} from 'semantic-ui-react';
import styled from 'styled-components';

import * as actionCreators from '../../store/actions/index';
import * as Calculator from './Calculator';

const SettingHeader = styled.div`
font-family:'verveine';
font-size:65px;
color:#F28095;
text-align: center;
vertical-align: middle;
line-height: 80px;
`;

class Setting extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userID: null,
      username: null,
      age: null,
      sex: null,
      height: null,
      weight: null,
      preference: [],
    };
  }

  componentDidMount() {
    const currentUserID = this.props.currUser.userID;
    this.props.onGetUserSetting(currentUserID);
  }

  onChangedUserAgeInput = (e) => {
    const thisState = this.state;
    this.setState({ ...thisState, age: e.target.value });
  }

  onChangedUserSexInput = (e) => {
    const thisState = this.state;
    this.setState({ ...thisState, sex: e.target.value });
  }

  onChangedUserHeightInput = (e) => {
    const thisState = this.state;
    this.setState({ ...thisState, height: e.target.value });
  }

  onChangedUserWeightInput = (e) => {
    const thisState = this.state;
    this.setState({ ...thisState, weight: e.target.value });
  }

  onClickedSaveButton = () => {
    this.props.onSaveUserSetting(
      this.state.userID,
      this.state.username,
      this.state.age,
      this.state.sex,
      this.state.height,
      this.state.weight,
      this.state.preference,
    );
  }

  onClickedDeleteAccountButton = () => {
    const currentUserID = this.props.currUser.userID;
    this.props.onDeleteUserAccount(currentUserID);
  }

  render() {
    /* User setting information from redux from backend */
    const age = 25;
    // this.props.currUser.age
    //   ? this.props.currUser.age : 'not set';
    const sex = 'M';
    // this.props.currUser.sex
    //   ? this.props.currUser.sex : 'not set';
    const height = 176;
    // this.props.currUser.height
    //   ? this.props.currUser.height : 'not set';
    const weight = 67;
    // this.props.currUser.weight
    //   ? this.props.currUser.weight : 'not set';
    const preference = [
      'peach',
      'fish'
    ]
    //const { preference } = this.props.currUser;

    const recommendedCalorie = Calculator.recommendedCalorie(age, sex, height, weight);
    const recommendedCarbs = Calculator.recommendedCarbs(age, sex, height, weight);
    const recommendedProtein = Calculator.recommendedProtein(age, sex, height, weight);
    const recommendedFat = Calculator.recommendedFat(age, sex, height, weight);

    return (
      <div className="Setting">

        <div className="header">
          <br />
          <SettingHeader>Setting Page</SettingHeader>
          <br />
        </div>

        <Grid column={2}  textAlign='center' className="current-setting-info">
          <GridRow>
            <GridColumn width={5}>
              <Table setting>
                <Table.Header>
                  <Table.Row textAlign='center'>
                    <Table.HeaderCell>Category</Table.HeaderCell>
                    <Table.HeaderCell>Value</Table.HeaderCell>
                    <Table.HeaderCell>Edit</Table.HeaderCell>
                  </Table.Row>
                </Table.Header>

                <Table.Body>
                  <Table.Row textAlign='center'>
                    <Table.HeaderCell>Age</Table.HeaderCell>
                    <Table.Cell>{age}</Table.Cell>
                    <Table.Cell>
                      <Input onChange={(e) => this.onChangedUserAgeInput(e)} placeholder={age} />
                    </Table.Cell>
                  </Table.Row>
                  <Table.Row textAlign='center'>
                    <Table.HeaderCell>Sex</Table.HeaderCell>
                    <Table.Cell>{sex}</Table.Cell>
                    <Table.Cell>
                      <Input onChange={(e) => this.onChangedUserSexInput(e)} placeholder={sex} />
                    </Table.Cell>
                  </Table.Row>
                  <Table.Row textAlign='center'>
                    <Table.HeaderCell>height</Table.HeaderCell>
                    <Table.Cell>{height}</Table.Cell>
                    <Table.Cell>
                      <Input
                        onChange={(e) => { this.onChangedUserHeightInput(e); }}
                        placeholder={height}
                      />
                    </Table.Cell>
                  </Table.Row>
                  <Table.Row textAlign='center'>
                    <Table.HeaderCell>weight</Table.HeaderCell>
                    <Table.Cell>{weight}</Table.Cell>
                    <Table.Cell>
                      <Input
                        onChange={(e) => { this.onChangedUserWeightInput(e); }}
                        placeholder={weight}
                      />
                    </Table.Cell>
                  </Table.Row>
                  <Table.Row textAlign='center'>
                    <Table.HeaderCell>Foods you don&apos;t eat</Table.HeaderCell>
                    <Table.Cell>
                      {"peach,\nfish"}
                    </Table.Cell>
                    <Table.Cell>
                      <Input placeholder="Add.." />
                    </Table.Cell>
                  </Table.Row>
                </Table.Body>

                <Table.Footer>
                  <Table.Row>
                    <Table.HeaderCell colSpan="3">
                      <Button primary floated="right">Save</Button>
                    </Table.HeaderCell>
                  </Table.Row>
                </Table.Footer>
              </Table>
            </GridColumn>

            <GridColumn width={2} className="recommended-intake">
              <Table recommended-intake>
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell colSpan="2" textAlign='center'>
                      <Header as='h3'>Recommended Intake</Header>
                    </Table.HeaderCell>
                    <Table.HeaderCell></Table.HeaderCell>
                  </Table.Row>
                </Table.Header>

                <Table.Body>
                  <Table.Row textAlign='center'>
                    <Table.HeaderCell fontSize="15">Calorie</Table.HeaderCell>
                    <Table.Cell>{`${recommendedCalorie} Kcal`}</Table.Cell>
                  </Table.Row>
                  <Table.Row textAlign='center'>
                    <Table.HeaderCell>Carbs</Table.HeaderCell>
                    <Table.Cell>{`${recommendedCarbs} grams`}</Table.Cell>
                  </Table.Row>
                  <Table.Row textAlign='center'>
                    <Table.HeaderCell>Protein</Table.HeaderCell>
                    <Table.Cell>{`${recommendedProtein} grams`}</Table.Cell>
                  </Table.Row>
                  <Table.Row textAlign='center'>
                    <Table.HeaderCell>Fat</Table.HeaderCell>
                    <Table.Cell>{`${recommendedFat} grams`}</Table.Cell>
                  </Table.Row>
                </Table.Body>
              </Table>
            </GridColumn>
          </GridRow>

          <GridRow>
            <div text-align='left' className="resign">
              <br />
              <br />
              <Button onClick={() => this.onClickedDeleteAccountButton()} floated="right">Delete Account</Button>
            </div>
          </GridRow>
        </Grid>

        

      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currUser: state.user.currentUser,
});

const mapDispatchToProps = (dispatch) => ({
  onSaveUserSetting: (
    userID,
    username,
    age,
    sex,
    height,
    weight,
    preference,
  ) => dispatch(actionCreators.saveUserSetting({
    userID, username, age, sex, height, weight, preference,
  })),
  onGetUserSetting: (userID) => dispatch(actionCreators.getUserSetting(userID)),
  onDeleteUserAccount: (userID) => dispatch(actionCreators.deleteUserAccount(userID)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Setting);
