/* eslint-disable */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Button, Form, TextArea, Image, Segment, Dimmer, Loader } from 'semantic-ui-react';
import * as actionCreators from '../../../store/actions/index';
import { ReviewBox } from '../../../styles/Review/review';

class Review extends Component {
  constructor() {
    super();
    this.state = {
      review: '',
      editing: false,
    };
  }

  componentDidMount() {
    this.props.onGetRecord(parseInt(this.props.match.params.id, 10));
    this.updateInitial();
  }

  updateInitial = () => {
    if(this.props.record){
      this.setState({review: this.props.record.review});
    }
  }

  componentDidUpdate() {
    this.props.onGetRecord(parseInt(this.props.match.params.id, 10));
  }

  onClickedCreateReview = () => {
    console.log(this.state.review);
    const form = new FormData();
    form.append('review', this.state.review);
    this.props.onCreateReview(parseInt(this.props.match.params.id, 10), form);
  }

  onClickedDeleteReview = () => {
    let bool = window.confirm("Are you sure? The review will be deleted.")
    if (bool) this.props.onDeleteReview(parseInt(this.props.match.params.id, 10));
  }

  onClickedEditReview = () => {
    console.log(this.state.review);
    const form = new FormData();
    form.append('new_review', this.state.review);
    console.log(form.get('new_review'));
    this.props.onEditReview(parseInt(this.props.match.params.id, 10), this.state.review);
    this.setState({ editing: false });
  }

  render() {
    let isNull = true;
    let review = '';

    if (this.props.record) {
      if ((String(this.props.record.review)).length > 0) {
        isNull = false;
        review = this.props.record.review;
      }
      let reviewNotNull = (  // when review is not null
        <div>
          <h3>Your Review</h3>
          <p>{review}</p>
          <Button id="edit-review-button" onClick={() => this.setState({ editing: true })} size='mini'>Edit</Button>
          <Button id="delete-review-button" onClick={() => this.onClickedDeleteReview()} size='mini'>Delete</Button>
        </div>
      );
      let reviewEdit = (
        <div>
          <h3>Edit Review</h3>
          <Form>
            <TextArea
              id="edit-review-text-area"
              value={this.state.review}
              onChange={(event) => this.setState({ review: event.target.value })}/>
          </Form>
          <Button id="confirm-review-button" size='mini' onClick={() => this.onClickedEditReview()}>Confirm</Button>
          <Button id="cancel-review-button" size='mini' onClick={() => this.setState({ editing: false })}>Back</Button>
        </div>
      );
      let reviewIsNull = (  // when review is null
        <div>
          <h3>No Reviews yet</h3>
          <Form>
            <TextArea
              id="create-review-text-area"
              placeholder='Write your review here'
              value={this.state.review}
              onChange={(event) => this.setState({ review: event.target.value })}/>
          </Form>
          <Button id="create-review-button" size='mini' onClick={() => this.onClickedCreateReview()}>Create</Button>
        </div>
      );
      return (
        <ReviewBox className="RecordDetail">
          {isNull ? reviewIsNull : 
                  this.state.editing ? reviewEdit : reviewNotNull}
        </ReviewBox>
      )
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

const mapStateToProps = state => {
  return {
    record: state.record.selectedRecord,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onGetRecord: (recordID) =>
      dispatch(actionCreators.getRecord(recordID)),
    onCreateReview: (recordID, review) =>
      dispatch(actionCreators.createReview(recordID, review)),
    onDeleteReview: (recordID) =>
      dispatch(actionCreators.deleteReview(recordID)),
    onEditReview: (recordID, review) =>
      dispatch(actionCreators.editReview(recordID, review)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Review))