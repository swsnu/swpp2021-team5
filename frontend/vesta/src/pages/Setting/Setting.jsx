import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  Header, Table, Input, Button,
} from 'semantic-ui-react';

import * as actionCreators from '../../store/actions/index';

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
    const age = this.props.currUser.age
      ? this.props.currUser.age : 'not set';
    const sex = this.props.currUser.sex
      ? this.props.currUser.sex : 'not set';
    const height = this.props.currUser.height
      ? this.props.currUser.height : 'not set';
    const weight = this.props.currUser.weight
      ? this.props.currUser.weight : 'not set';
    const { preference } = this.props.currUser;

    return (
      <div className="Setting">

        <div className="header">
          <br />
          <Header as="h1">Setting Page</Header>
          <br />
        </div>

        <div className="current-setting-info">
          <Table setting>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Category</Table.HeaderCell>
                <Table.HeaderCell>Value</Table.HeaderCell>
                <Table.HeaderCell>Edit</Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              <Table.Row>
                <Table.HeaderCell>Age</Table.HeaderCell>
                <Table.Cell>{age}</Table.Cell>
                <Table.Cell>
                  <Input onChange={(e) => this.onChangedUserAgeInput(e)} placeholder={age} />
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.HeaderCell>Sex</Table.HeaderCell>
                <Table.Cell>{sex}</Table.Cell>
                <Table.Cell>
                  <Input onChange={(e) => this.onChangedUserSexInput(e)} placeholder={sex} />
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.HeaderCell>height</Table.HeaderCell>
                <Table.Cell>{height}</Table.Cell>
                <Table.Cell>
                  <Input
                    onChange={(e) => { this.onChangedUserHeightInput(e); }}
                    placeholder={height}
                  />
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.HeaderCell>weight</Table.HeaderCell>
                <Table.Cell>{weight}</Table.Cell>
                <Table.Cell>
                  <Input
                    onChange={(e) => { this.onChangedUserWeightInput(e); }}
                    placeholder={weight}
                  />
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.HeaderCell>Foods you don&apos;t eat</Table.HeaderCell>
                <Table.Cell />
                <Table.Cell>
                  <Input placeholder="Add.." />
                </Table.Cell>
              </Table.Row>
            </Table.Body>

            <Table.Footer>
              <Table.Row>
                <Table.HeaderCell colSpan="3">
                  <Button floated="left">Save</Button>
                </Table.HeaderCell>
              </Table.Row>
            </Table.Footer>

          </Table>
        </div>

        <div className="resign">
          <br />
          <Button onClick={() => this.onClickedDeleteAccountButton()} floated="right">Delete Account</Button>
        </div>

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
