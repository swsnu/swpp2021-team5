import React, { Component, createRef } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import {
  Image, Grid, Segment, Sticky, Menu, Dimmer, Loader
} from 'semantic-ui-react';
import styled from 'styled-components';
import Record from '../Record';
import * as actionCreators from '../../../store/actions/index';

const Div = styled.div`
font-family:'arciform';
font-size:20px;
margin: 15px;
padding: 10px;
`;
class Records extends Component {
  contextRef = createRef();

  constructor(props) {
    super(props);
    this.state = {
      showLiked: false,
      acticeItem: 'All',
    };
  }

  componentDidMount() {
    this.props.onGetRecords(this.props.userID);
  }

  render() {
    if (this.props.storedRecords) {
      let { storedRecords } = this.props;
      if (this.state.showLiked) {
        storedRecords = storedRecords.filter((rec) => rec.liked === true);
      }
      const demoRecords_ = storedRecords.map((rec) => (
        <a href={`/history/${rec.id}`} key={rec.id}>
          <img
            src={rec.image}
            alt="record"
            style={{
              width: '200px',
              height: '200px',
              objectFit: 'cover',
              padding: '10px',
              borderRadius: '20px'
            }}
          />
        </a>
      ));
      const demoRecords = [[], [], []];
      for (let i = 0; i < demoRecords_.length; i += 1) {
        demoRecords[i % 3].push(demoRecords_[i]);
      }
      let notify = null;
      if (demoRecords_.length === 0) {
        notify = (
          <Div>
            Upload your first record,
            and get personalized menu recommendation!
          </Div>
        );
      }
      return (
        <div className="Records" ref={this.contextRef}>
          <Sticky context={this.contextRef}>
            <Menu
              attached="top"
              pointing
              style={{ backgroundColor: '#fff', paddingTop: '1em' }}
            >
              <Menu.Item
                position="right"
                as="a"
                style={{ width: 70 }}
                active={this.state.acticeItem === 'All'}
                name="All"
                onClick={() => this.setState({
                  showLiked: false,
                  acticeItem: 'All'
                })}
              />
              <Menu.Item
                position="left"
                as="a"
                style={{ width: 70 }}
                active={this.state.acticeItem === 'Liked'}
                name="Liked"
                onClick={() => this.setState({
                  showLiked: true,
                  acticeItem: 'Liked'
                })}
              />
            </Menu>
          </Sticky>
          <Segment>
            {notify}
            <Grid centered columns={3} textAlign="center" relaxed="very">
              <Grid.Column width={2}>
                {demoRecords[0]}
              </Grid.Column>
              <Grid.Column width={2}>
                {demoRecords[1]}
              </Grid.Column>
              <Grid.Column width={2}>
                {demoRecords[2]}
              </Grid.Column>
            </Grid>
          </Segment>
        </div>
      );
    }
    return (
      <Segment>
        <Dimmer active inverted>
          <Loader inverted content="Loading" />
        </Dimmer>
        <Image src="https://react.semantic-ui.com/images/wireframe/short-paragraph.png" />
      </Segment>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user.currentUser,
  storedRecords: state.record.userRecords
});

const mapDispatchToProps = (dispatch) => ({
  onGetRecords: (userID) => dispatch(actionCreators.getRecords(userID)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Records));

export { Image, Grid };
