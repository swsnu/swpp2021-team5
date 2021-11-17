/* eslint-disable */

import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  Header, Table, Input, Button, Grid, GridColumn, GridRow, Confirm
} from 'semantic-ui-react';
import styled from 'styled-components';

import * as actionCreators from '../../store/actions/index';
import * as Calculator from './Calculator';
import RecommendedIntake from '../../component/Setting/RecommendedIntake';

const SettingHeader = styled.div`
font-family:'verveine';
font-size:65px;
color:#F28095;
text-align: center;
vertical-align: middle;
line-height: 80px;
`;

const sexToggleButtons = (isMale=true, clickedMaleHandler, clickedFemaleHandler) => {
  if (isMale) {
    return (
      <Button.Group >
        <Button primary onClick={() => clickedMaleHandler()}>Male</Button>
        <Button onClick={() => clickedFemaleHandler()}>Female</Button>
      </Button.Group>
    )
  }
  else {
    return (
      <Button.Group>
        <Button onClick={() => clickedMaleHandler()}>Male</Button>
        <Button primary onClick={() => clickedFemaleHandler()}>Female</Button>
      </Button.Group>
    )
  }
}

const preferenceButtonList = (preference, isOpen, clickedMenuHandler, open, close) => {
  return preference.map((menu) => {
    return (
      <div>
        <Button onClick={() => open()}>{`${menu}`}</Button>
        <Confirm
          open={isOpen}
          onCancel={() => close()}
          onConfirm={() => clickedMenuHandler(menu)}
        />
      </div>
    )
  })
}

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
      targetCalories: null,
      confirmOpen: false,
    };
  }
 
  componentDidMount() {
    this.setState({...this.props.currUser, confirmOpen: false})
  }

  onChangedUserAgeInput = (e) => {
    const thisState = this.state;
    this.setState({ ...thisState, age: e.target.value });
  }

  onChangedUserSexInput = (e) => {
    const thisState = this.state;
    this.setState({ ...thisState, sex: e.target.value });
  }

  onClickedUserSexMaleButton = (e) => {
    const thisState = this.state;
    if (!this.state.sex) {
      this.setState({...thisState, sex: true})
    }
  }

  onClickedUserSexFemaleButton = (e) => {
    const thisState = this.state;
    if (this.state.sex) {
      this.setState({...thisState, sex: false})
    }
  }

  onChangedUserHeightInput = (e) => {
    const thisState = this.state;
    this.setState({ ...thisState, height: e.target.value });
  }

  onChangedUserWeightInput = (e) => {
    const thisState = this.state;
    this.setState({ ...thisState, weight: e.target.value });
  }

  onClickedUserPreferenceDeleteButton = (target) => {
    const thisState = this.state;
    const newPreference = this.state.preference.filter((menu) => {
      return menu !== target;
    });
    this.setState({...thisState, preference: newPreference, confirmOpen: false});
  }

  onConfirmOpen = () => {
    const thisState = this.state;
    this.setState({...thisState, confirmOpen: true});
  }

  onConfirmClose = () => {
    const thisState = this.state;
    this.setState({...thisState, confirmOpen: false});
  }



  onClickedSaveButton = () => {
    if (this.state.age < 5 && this.state.age !== null) {
      alert('The lowest age that can use our service normally is Five')
      return;
    }
    else  {
      this.props.onSaveUserSetting(
        this.state.userID,
        this.state.username,
        this.state.age,
        this.state.sex,
        this.state.height,
        this.state.weight,
        this.state.preference,
        this.state.targetCalories,
      );
    } 
  }

  onClickedDeleteAccountButton = () => {
    const currentUserID = this.props.currUser.userID;
    this.props.onDeleteUserAccount(currentUserID);
  }

  render() {
    /* User setting information from redux from backend */
    let age = this.props.currUser.age ?
      this.props.currUser.age : 'not set';
    let sex;
    let sexEditButton = sexToggleButtons(this.props.currUser.sex, this.onClickedUserSexMaleButton, this.onClickedUserSexFemaleButton)
    let height = this.props.currUser.height ?
      this.props.currUser.height : 'not set';
    let weight = this.props.currUser.weight ?
      this.props.currUser.weight : 'not set';
    let preference = preferenceButtonList(this.props.currUser.preference, this.state.confirmOpen, this.onClickedUserPreferenceDeleteButton, this.onConfirmOpen, this.onConfirmClose)

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
                      <Input id="user-age-input" onChange={(e) => this.onChangedUserAgeInput(e)} placeholder={age} />
                    </Table.Cell>
                  </Table.Row>
                  <Table.Row textAlign='center'>
                    <Table.HeaderCell>Sex</Table.HeaderCell>
                    <Table.Cell>{sex}</Table.Cell>
                    <Table.Cell>
                      {sexEditButton}
                    </Table.Cell>
                  </Table.Row>
                  <Table.Row textAlign='center'>
                    <Table.HeaderCell>height</Table.HeaderCell>
                    <Table.Cell>{height}</Table.Cell>
                    <Table.Cell>
                      <Input id="user-height-input"
                        onChange={(e) => { this.onChangedUserHeightInput(e); }}
                        placeholder={height}
                      />
                    </Table.Cell>
                  </Table.Row>
                  <Table.Row textAlign='center'>
                    <Table.HeaderCell>weight</Table.HeaderCell>
                    <Table.Cell>{weight}</Table.Cell>
                    <Table.Cell>
                      <Input id="user-weight-input"
                        onChange={(e) => { this.onChangedUserWeightInput(e); }}
                        placeholder={weight}
                      />
                    </Table.Cell>
                  </Table.Row>
                  <Table.Row textAlign='center'>
                    <Table.HeaderCell>Foods you don&apos;t eat</Table.HeaderCell>
                    <Table.Cell>
                      {preference}
                    </Table.Cell>
                    <Table.Cell>
                      <Input placeholder="Add.." />
                    </Table.Cell>
                  </Table.Row>
                </Table.Body>

                <Table.Footer>
                  <Table.Row>
                    <Table.HeaderCell colSpan="3">
                      <Button primary floated="right"
                       onClick={() => this.onClickedSaveButton()}>Save
                      </Button>
                    </Table.HeaderCell>
                  </Table.Row>
                </Table.Footer>
              </Table>
            </GridColumn>

            <GridColumn width={2} className="recommended-intake">
              <RecommendedIntake recommendedCalorie={recommendedCalorie} recommendedCarbs={recommendedCarbs} recommendedProtein={recommendedProtein} recommendedFat={recommendedFat} targetCalories={this.state.targetCalories}
              />
            </GridColumn>
          </GridRow>

          <GridRow>
            <div text-align='left' className="resign">
              <br />
              <br />
              <Button id="user-resign-button" floated="right"
              onClick={() => this.onClickedDeleteAccountButton()} >Delete Account</Button>
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
    targetCalories,
  ) => dispatch(actionCreators.saveUserSetting({
    userID, username, age, sex, height, weight, preference, targetCalories
  })),
  onGetUserSetting: (userID) => dispatch(actionCreators.getUserSetting(userID)),
  onDeleteUserAccount: (userID) => dispatch(actionCreators.deleteUserAccount(userID)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Setting);
