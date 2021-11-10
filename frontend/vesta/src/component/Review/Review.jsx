import React from "react";
import { Component } from "react";
import { connect } from "react-redux";
import { Button } from "semantic-ui-react";
import * as actionCreators from '../../store/actions/index';

class Review extends Component {
  componentDidMount() {
    this.props.getReview(parseInt(this.props.match.params.id));
  }

  constructor() {
    super();
    this.state = {
      reviewIsNull: true,
    };
  }

  onSetReviewNotNull() {
    this.setState({ reviewIsNull: false });
  }

  onClickedEditReviewButton() {

  }

  onClickedDeleteReviewButton() {

  }

  onClickedCreateReviewButton() {

  }

  render() {
    if (this.props.selectedReview) {
      this.onSetReviewNotNull();
    }
    return (
      <div className="review">
        <h2>Your Review for your Meal</h2>
        {this.state.reviewIsNull ? <Button>Create</Button> : this.props.selectedReview}
        {this.state.reviewIsNull ? null :
                                  <Button.Group>
                                    <Button>Edit</Button>
                                    <Button>Delete</Button>
                                  </Button.Group>}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  selectedReview: state.record.selectedReview,
});

const mapDispatchToProps = (dispatch) => ({
  getReview: (recordId) => dispatch(actionCreators.getReview(recordId)),
  createReview: (recordId, review) => dispatch(actionCreators.createReview(recordId, review)),
  editReview: (recordId, review) => dispatch(actionCreators.editReview(recordId, review)),
  deleteReview: (recordId) => dispatch(actionCreators.deleteReview(recordId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(connect(Review));