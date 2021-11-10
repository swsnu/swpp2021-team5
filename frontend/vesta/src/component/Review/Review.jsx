import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'semantic-ui-react';
import * as actionCreators from '../../store/actions/index';

class Review extends Component {
  constructor() {
    super();
    this.state = {
      reviewIsNull: true,
    };
  }

  componentDidMount() {
    this.props.getReview(parseInt(this.props.match.params.id, 10));
  }

  onSetReviewNotNull() {
    this.setState({ reviewIsNull: false });
  }

  // onClickedEditReviewButton() {

  // }

  // onClickedDeleteReviewButton() {

  // }

  // onClickedCreateReviewButton() {

  // }

  render() {
    if (this.props.selectedReview) {
      this.onSetReviewNotNull();
    }
    const createButton = <Button>Create</Button>;
    const editDeleteButton = (
      <Button.Group>
        <Button>Edit</Button>
        <Button>Delete</Button>
      </Button.Group>
    );
    return (
      <div className="review">
        <h2>Your Review for your Meal</h2>
        {this.state.reviewIsNull ? createButton : this.props.selectedReview}
        {this.state.reviewIsNull ? null : editDeleteButton}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    selectedReview: state.record.selectedReview,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getReview: (recordId) => dispatch(actionCreators.getReview(recordId)),
    createReview: (recordId, review) => dispatch(actionCreators.createReview(recordId, review)),
    editReview: (recordId, review) => dispatch(actionCreators.editReview(recordId, review)),
    deleteReview: (recordId) => dispatch(actionCreators.deleteReview(recordId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(connect(Review));
