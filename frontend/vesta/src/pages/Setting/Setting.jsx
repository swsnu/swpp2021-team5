/* eslint-disable */

import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  Table, Button, Grid, GridRow, Confirm
} from 'semantic-ui-react';
import styled from 'styled-components';

import * as actionCreators from '../../store/actions/index';
import * as Calculator from './Calculator';
import RecommendedIntake from '../../component/Setting/RecommendedIntake';

import { isNumeric } from '../Signup/Signup';

const SettingHeader = styled.div`
font-family:'verveine';
font-size:65px;
color:#F28095;
text-align: center;
vertical-align: middle;
line-height: 80px;
`;

const Div = styled.div`
width: 80%;
align-items:center;
vertical-align: middle;
margin: 0 auto;
`;

export const sexToggleButtons = (isMale, clickedMaleHandler, clickedFemaleHandler) => {
  if (isMale) {
    return (
      <Button.Group >
        <Button id='male-button' primary onClick={() => clickedMaleHandler()}>Male</Button>
        <Button id='female-button' onClick={() => clickedFemaleHandler()}>Female</Button>
      </Button.Group>
    )
  }
  else {
    return (
      <Button.Group>
        <Button id='male-button' onClick={() => clickedMaleHandler()}>Male</Button>
        <Button id='female-button' primary onClick={() => clickedFemaleHandler()}>Female</Button>
      </Button.Group>
    )
  }
}

const preferenceButtonList = (preference, isOpen, clickedMenuHandler, open, close) => {
  const list = preference.map((menu) => {
    return (
      <div>
        <Button key={menu} id='ingredient-button' Mini style={{backgroundColor: '#CCEECC', margin: '2px', height: '26px', padding: '4%', fontSize: '13px'}} onClick={() => open()}>{`${menu} X`}</Button>
        <Confirm
          id='confirm-button'
          open={isOpen}
          onCancel={() => close()}
          onConfirm={() => clickedMenuHandler(menu)}
        />
      </div>
    )
  });
  return list;
}

class Setting extends Component {
  constructor(props) {
    super(props);
    this.state = {
      age: '',
      sex: null,
      height: '',
      weight: '',
      preference: [],
      targetCalories: '',
      confirmOpen: false,
      prevId: null,
    };
  }
 
  componentDidMount() {
    this.props.onGetUserSetting();
  }

  onClickedAgeEditButton = () => {
    let result = prompt('Enter the Age You want to set', '');
    if(result === null) {
      return;
    }
    if (!isNumeric(result) || parseInt(result) < 5) {
      alert('Weight should be a number larger than 4');
      return;
    }
    this.props.onSaveUserSetting(
      this.props.currUser.username,
      parseInt(result),
      this.props.currUser.sex,
      this.props.currUser.height,
      this.props.currUser.weight,
      this.props.currUser.preference,
      this.props.currUser.targetCalories,
    )
  }

  onClickedUserSexMaleButton = () => {
    if (!this.props.currUser.sex) {
      this.props.onSaveUserSetting(
        this.props.currUser.username,
        this.props.currUser.age,
        true,
        this.props.currUser.height,
        this.props.currUser.weight,
        this.props.currUser.preference,
        this.props.currUser.targetCalories,
      )
    }
  }

  onClickedUserSexFemaleButton = () => {
    if (this.props.currUser.sex) {
      this.props.onSaveUserSetting(
        this.props.currUser.username,
        this.props.currUser.age,
        false,
        this.props.currUser.height,
        this.props.currUser.weight,
        this.props.currUser.preference,
        this.props.currUser.targetCalories,
      )
    }
  }

  onClickedHeightEditButton = () => {
    let result = prompt('Enter the Heigth You want to set', '');
    if(result === null) {
      return;
    }
    if (!isNumeric(result)) {
      alert('Height should be a number');
      return;
    }
    this.props.onSaveUserSetting(
      this.props.currUser.username,
      this.props.currUser.age,
      this.props.currUser.sex,
      parseFloat(result),
      this.props.currUser.weight,
      this.props.currUser.preference,
      this.props.currUser.targetCalories,
    )
  }
  
  onClickedWeightEditButton = () => {
    let result = prompt('Enter the Weigth You want to set', '');
    if(result === null) {
      return;
    }
    if (!isNumeric(result)) {
      alert('Weight should be a number');
      return;
    }
    this.props.onSaveUserSetting(
      this.props.currUser.username,
      this.props.currUser.age,
      this.props.currUser.sex,
      this.props.currUser.height,
      parseFloat(result),  
      this.props.currUser.preference,
      this.props.currUser.targetCalories,
    )
  }

  onClickedCalorieEditButton = () => {
    let result = prompt('Enter the Target Calorie You want to set', '');
    if(result === null) {
      return;
    }
    if (!isNumeric(result)) {
      alert('Target Calorie should be a number');
      return;
    }
    this.props.onSaveUserSetting(
      this.props.currUser.username,
      this.props.currUser.age,
      this.props.currUser.sex,
      this.props.currUser.height,
      this.props.currUser.weight, 
      this.props.currUser.preference,
      parseFloat(result),
    )
  }

  onClickedAddPreferenceButton = () => {
    let result = prompt('Enter the ingredient to add to the list', '');
    if(result === null) {
      return;
    }
    const newPreference = this.props.currUser.preference;
    newPreference.push(result);
    this.props.onSaveUserSetting(
      this.props.currUser.username,
      this.props.currUser.age,
      this.props.currUser.sex,
      this.props.currUser.height,
      this.props.currUser.weight, 
      newPreference,
      this.props.currUser.targetCalories,
    )
  }

  onClickedUserPreferenceDeleteButton = (target) => {
    const newPreference = this.props.currUser.preference.filter((menu) => {
      return menu !== target;
    });
    this.props.onSaveUserSetting(
      this.props.currUser.username,
      this.props.currUser.age,
      this.props.currUser.sex,
      this.props.currUser.height,
      this.props.currUser.weight, 
      newPreference,
      this.props.currUser.targetCalories,
    )
  }

  onConfirmOpen = () => {
    const thisState = this.state;
    this.setState({...thisState, confirmOpen: true});
  }

  onConfirmClose = () => {
    const thisState = this.state;
    this.setState({...thisState, confirmOpen: false});
  }

  onClickedDeleteAccountButton = () => {
    let result = confirm('Are you sure to delete your account?');
    if (result === false) {
      return;
    }
    const currentUserID = this.props.currUser.userID;
    this.props.onDeleteUserAccount(currentUserID);
  }

  render() {
    if (this.props.currUser === null) {
      return (
        <div className="SettingPage">
          Not Logged in
        </div>
      )
    }
    let age = this.props.currUser.age;
    let sex = this.props.currUser.sex;
    let sexEditButton = sexToggleButtons(this.props.currUser.sex, this.onClickedUserSexMaleButton, this.onClickedUserSexFemaleButton);
    let height = this.props.currUser.height;
    let weight = this.props.currUser.weight;
    let targetCalories = this.props.currUser.targetCalories;
    let preference = preferenceButtonList(this.props.currUser.preference, this.state.confirmOpen, this.onClickedUserPreferenceDeleteButton, this.onConfirmOpen, this.onConfirmClose);

    const recommendedCalorie = (Math.round(100 * Calculator.recommendedCalorie(age, sex, height, weight))) / 100;
    const recommendedCarbs = (Math.round(100 * Calculator.recommendedCarbs(recommendedCalorie))) / 100;
    const recommendedProtein = (Math.round(100 * Calculator.recommendedProtein(recommendedCalorie))) / 100;
    const recommendedFat = (Math.round(100 * Calculator.recommendedFat(recommendedCalorie))) / 100;
    // const recommendedIntake = [recommendedCalorie, recommendedCarbs, recommendedProtein, recommendedFat]

    return (
      <div className="Setting">

        <div className="header">
          <br />
          <SettingHeader>Setting Page</SettingHeader>
          <br />
        </div>

        <Div>
          <Grid style={{margin: '0 auto'}} column={16}>
            <Grid.Row>
            <Grid.Column width={10}>
            
            <Table style={{width: '80%', marginLeft: 'auto', marginRight: '0px'}}>
              <Table.Header>
                <Table.Row textAlign='center'>
                  <Table.HeaderCell>Category</Table.HeaderCell>
                  <Table.HeaderCell style={{width: '150px'}}>Value</Table.HeaderCell>
                  <Table.HeaderCell>Edit</Table.HeaderCell>
                </Table.Row>
              </Table.Header>

              <Table.Body>
                <Table.Row textAlign='center'>
                  <Table.HeaderCell>Age</Table.HeaderCell>
                  <Table.Cell>{age}</Table.Cell>
                  <Table.Cell>
                    <Button
                    id='age-edit-button'
                    onClick={() => this.onClickedAgeEditButton()}
                    style={{padding: '4%', width: '70%'}}
                  > Edit
                  </Button>
                  </Table.Cell>
                </Table.Row>
                <Table.Row textAlign='center'>
                  <Table.HeaderCell>Sex</Table.HeaderCell>
                  {/*<--Table.Cell>{sex}</Table.Cell>*/}
                  <Table.Cell colSpan='2'>
                    {sexEditButton}
                  </Table.Cell>
                </Table.Row>
                <Table.Row textAlign='center'>
                  <Table.HeaderCell>height</Table.HeaderCell>
                  <Table.Cell>{height}</Table.Cell>
                  <Table.Cell>
                    <Button
                      id='height-edit-button'
                      onClick={() => this.onClickedHeightEditButton()}
                      style={{padding: '4%', width: '70%'}}
                    > Edit
                    </Button>
                  </Table.Cell>
                </Table.Row>
                <Table.Row textAlign='center'>
                  <Table.HeaderCell>weight</Table.HeaderCell>
                  <Table.Cell>{weight}</Table.Cell>
                  <Table.Cell>
                  <Button
                    id='weight-edit-button'
                    onClick={() => this.onClickedWeightEditButton()}
                    style={{padding: '4%', width: '70%'}}
                  > Edit
                  </Button>
                  </Table.Cell>
                </Table.Row>
                <Table.Row textAlign='center'>
                  <Table.HeaderCell>Target Calories</Table.HeaderCell>
                  <Table.Cell>{targetCalories}</Table.Cell>
                  <Table.Cell>
                      <Button
                        id='target-calorie-edit-button'
                        onClick={() => this.onClickedCalorieEditButton()}
                        style={{padding: '4%', width: '70%'}}
                      > Edit
                      </Button>
                  </Table.Cell>
                </Table.Row>
                <Table.Row textAlign='center'>
                  <Table.HeaderCell>{`Ingredients \n you don't eat`}</Table.HeaderCell>
                  <Table.Cell>
                    {preference}
                  </Table.Cell>
                  <Table.Cell>
                    <Button id='add-preferece-button' onClick={() => this.onClickedAddPreferenceButton()} style={{padding: '4%', width: '70%'}}>
                      Add +
                    </Button>
                  </Table.Cell>
                </Table.Row>
              </Table.Body>

            </Table>
            </Grid.Column>
            <Grid.Column width={6}>
            <RecommendedIntake recommendedCalorie={recommendedCalorie} recommendedCarbs={recommendedCarbs} recommendedProtein={recommendedProtein} recommendedFat={recommendedFat}
            />
            </Grid.Column>
          </Grid.Row>
          
            <GridRow>
              <Grid.Column width={10}>
                <div text-align='left' className="resign">
                  <Button id="user-resign-button" floated="right"
                  onClick={() => this.onClickedDeleteAccountButton()} >Delete Account</Button>
                </div>
              </Grid.Column>
            </GridRow>
          </Grid>
        </Div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currUser: state.user.currentUser,
});

const mapDispatchToProps = (dispatch) => ({
  onSaveUserSetting: (
    username,
    age,
    sex,
    height,
    weight,
    preference,
    targetCalories,
  ) => dispatch(actionCreators.saveUserSetting({
    username, age, sex, height, weight, preference, targetCalories
  })),
  onGetUserSetting: () => dispatch(actionCreators.getUserSetting()),
  onDeleteUserAccount: (userID) => dispatch(actionCreators.deleteUserAccount(userID)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Setting);
