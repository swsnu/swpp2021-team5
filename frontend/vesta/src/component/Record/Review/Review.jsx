/* eslint-disable */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Button, Form, TextArea } from 'semantic-ui-react';
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

  clickRecordsHandler = () => {
    this.props.history.push('/history/');
  }

  onClickedCreateReview = (review) => {
    this.props.onCreateReview(parseInt(this.props.match.params.id, 10), review);
  }

  onClickedDeleteReview = () => {
    let bool = window.confirm("Are you sure? The review will be deleted.")
    if (bool) this.props.onDeleteReview(parseInt(this.props.match.params.id, 10));
  }

  onClickedEditReview = () => {
    this.props.onEditReview(parseInt(this.props.match.params.id, 10), this.state.review);
  }

  render() {
    let review = '';
    if (this.props.record) {
      review = this.props.record.review;
    }
    let reviewNotNull = (
      <div>
        <h3>Your Review</h3>
        <p>{review}</p>
        <Button onClick={() => this.setState({ editing: true })} size='mini'>Edit</Button>
        <Button onClick={() => this.onClickedDeleteReview()} size='mini'>Delete</Button>
      </div>
    );
    let reviewEdit = (
      <div>
        <h3>Edit Review</h3>
        <Form>
          <TextArea
            value={this.state.review}
            onChange={(event) => this.setState({ review: event.target.value })}/>
        </Form>
        <Button size='mini' onClick={() => this.onClickedEditReview()}>Confirm</Button>
        <Button size='mini' onClick={() => this.setState({ editing: false })}>Back</Button>
      </div>
    );
    let reviewIsNull = (
      <div>
        <h3>No Reviews yet</h3>
        <Form>
          <TextArea
            placeholder='Write your review here'
            value={this.state.review}
            onChange={(event) => this.setState({ review: event.target.value })}/>
        </Form>
        <Button size='mini' onClick={() => this.onClickedCreateReview(this.state.review)}>Create</Button>
      </div>
    );
    return (
      <ReviewBox className="RecordDetail">
        {!this.props.record.review ? reviewIsNull : 
                this.state.editing ? reviewEdit : reviewNotNull}
      </ReviewBox>
    )
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
    onToggleRecord: (recordID) =>
      dispatch(actionCreators.toggleRecord(recordID)),
    onCreateReview: (recordID, review) =>
      dispatch(actionCreators.createReview(recordID, review)),
    onDeleteReview: (recordID) =>
      dispatch(actionCreators.deleteReview(recordID)),
    onEditReview: (recordID, review) =>
      dispatch(actionCreators.editReview(recordID, review)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Review))