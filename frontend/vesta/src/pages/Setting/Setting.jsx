/* eslint-disable */

import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  Table, Input, Button, Grid, GridRow, Confirm
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
        <Button id='ingredient-button' Mini style={{backgroundColor: '#CCEECC', margin: '2px', height: '26px', padding: '4%', fontSize: '13px'}} onClick={() => open()}>{`${menu} X`}</Button>
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
      userID: null,
      username: null,
      age: '',
      sex: null,
      height: '',
      weight: '',
      preference: [],
      targetCalories: '',
      confirmOpen: false,
    };
  }
 
  componentDidMount() {
    this.props.onGetUserSetting();
    this.setState({...this.props.currUser, confirmOpen: false});
  }

  onChangedUserAgeInput = (e) => {
    const thisState = this.state;
    this.setState({ ...thisState, age: e.target.value });
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

  onChangedUserTargetCalorieInput = (e) => {
    const thisState = this.state;
    this.setState({ ...thisState, targetCalories: e.target.value });
  }

  onClickedAddPreferenceButton = () => {
    let result = prompt('Enter the ingredient to add to the list', '');
    if(result === null) {
      return;
    }
    const thisState = this.state;
    thisState.preference.push(result);
    this.setState({...thisState});
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
    if (!isNumeric(this.state.age)) {
      alert('Age should be a number');
      return;
    } else if (!isNumeric(this.state.height)) {
      alert('Height should be a number');
      return;
    } else if (!isNumeric(this.state.weight)) {
      alert('Weight should be a number');
      return;
    } else if (!isNumeric(this.state.targetCalories)) {
      alert('Target Calorie should be a number');
      return;
    }

    if (parseInt(this.state.age) < 5) {
      alert('The lowest age that can use our service normally is Five')
      return;
    }
    else  {
      this.props.onSaveUserSetting(
        this.state.username,
        parseInt(this.state.age),
        this.state.sex,
        parseInt(this.state.height),
        parseInt(this.state.weight),
        this.state.preference,
        parseInt(this.state.targetCalories),
      );
    } 
  }

  onClickedDeleteAccountButton = () => {
    const currentUserID = this.props.currUser.userID;
    this.props.onDeleteUserAccount(currentUserID);
  }

  render() {
    /* User setting information from redux from backend */
    let age = this.props.currUser.age;
    let sex = this.props.currUser.sex;
    let sexEditButton = sexToggleButtons(this.state.sex, this.onClickedUserSexMaleButton, this.onClickedUserSexFemaleButton)
    let height = this.props.currUser.height;
    let weight = this.props.currUser.weight;
    let targetCalories = this.props.currUser.targetCalories;
    let preference = preferenceButtonList(this.state.preference, this.state.confirmOpen, this.onClickedUserPreferenceDeleteButton, this.onConfirmOpen, this.onConfirmClose)

    const recommendedCalorie = (Math.round(100 * Calculator.recommendedCalorie(age, sex, height, weight))) / 100;
    const recommendedCarbs = (Math.round(100 * Calculator.recommendedCarbs(recommendedCalorie))) / 100;
    const recommendedProtein = (Math.round(100 * Calculator.recommendedProtein(recommendedCalorie))) / 100;
    const recommendedFat = (Math.round(100 * Calculator.recommendedFat(recommendedCalorie))) / 100;

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
                    <Input id="user-age-input" onChange={(e) => this.onChangedUserAgeInput(e)} placeholder={'Edit'} style={{width: '100px'}}/>
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
                    <Input id="user-height-input"
                      onChange={(e) => { this.onChangedUserHeightInput(e); }}
                      placeholder={'Edit'} style={{width: '100px'}}
                    />
                  </Table.Cell>
                </Table.Row>
                <Table.Row textAlign='center'>
                  <Table.HeaderCell>weight</Table.HeaderCell>
                  <Table.Cell>{weight}</Table.Cell>
                  <Table.Cell>
                    <Input id="user-weight-input"
                      onChange={(e) => { this.onChangedUserWeightInput(e); }}
                      placeholder={'Edit'} style={{width: '100px'}}
                    />
                  </Table.Cell>
                </Table.Row>
                <Table.Row textAlign='center'>
                  <Table.HeaderCell>Target Calories</Table.HeaderCell>
                  <Table.Cell>{targetCalories}</Table.Cell>
                  <Table.Cell>
                    <Input id="user-target-calorie-input"
                      onChange={(e) => { this.onChangedUserTargetCalorieInput(e); }}
                      placeholder={'Edit'} style={{width: '100px'}} 
                    />
                  </Table.Cell>
                </Table.Row>
                <Table.Row textAlign='center'>
                  <Table.HeaderCell>Ingredients you don&apos;t eat</Table.HeaderCell>
                  <Table.Cell>
                    {preference}
                  </Table.Cell>
                  <Table.Cell>
                    <Button id='add-preferece-button' onClick={() => this.onClickedAddPreferenceButton()} style={{padding: '4%'}}>
                      Click to Add..
                    </Button>
                  </Table.Cell>
                </Table.Row>
              </Table.Body>

              <Table.Footer>
                <Table.Row>
                  <Table.HeaderCell colSpan="3">
                    <Button id='save-button' primary floated="right"
                     onClick={() => this.onClickedSaveButton()}>Save
                    </Button>
                  </Table.HeaderCell>
                </Table.Row>
              </Table.Footer>
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
