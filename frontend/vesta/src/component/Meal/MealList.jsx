/* eslint-disable */
import React, { Component } from 'react';
import {
  Divider, Button, Image,
} from 'semantic-ui-react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import Meal from './Meal';
import {
  RecommendationBody, RecommendationHeader, OtherBreakfastBox, OtherLunchBox, OtherDinnerBox, OtherMealName,
} from '../../styles/Menu_Recommendation/Meals';
import '../../styles/Menu_Recommendation/MealList.css';

class MealList extends Component {
  constructor() {
    super();
    this.state = {
      otherBreakfast: false,
      otherLunch: false,
      otherDinner: false,
    };
  }

  onMealDetail = (when, idx) => {
    this.props.history.push(`/recommendation/${when}/${idx}`);
  }

  onClickedOtherBreakfast = () => {
    if (this.state.otherBreakfast) {
      this.setState({
        otherBreakfast: false,
      });
    } else {
      this.setState({
        otherBreakfast: true,
      });
    }
  };

  onClickedOtherLunch = () => {
    if (this.state.otherLunch) {
      this.setState({
        otherLunch: false,
      });
    } else {
      this.setState({
        otherLunch: true,
      });
    }
  };

  onClickedOtherDinner = () => {
    if (this.state.otherDinner) {
      this.setState({
        otherDinner: false,
      });
    } else {
      this.setState({
        otherDinner: true,
      });
    }
  };

  render() {
    // const otherBreakfast = (
    //   <OtherBreakfastBox>
    //     <Grid>
    //       <Grid.Row columns={4}>
    //         <Grid.Column>
    //           <a onClick={() => this.onMealDetail(0, 1)}>
    //             <img
    //               id="otherBreakfast"
    //               src="/DummyImages/breakfast2_.jpeg"
    //               alt="meal_one"
    //               height={160}
    //               width={210}
    //             />
    //           </a>
    //           <OtherMealName>Chicken Sandwich</OtherMealName>
    //         </Grid.Column>
    //         <Grid.Column>
    //           <a onClick={() => this.onMealDetail(0, 2)}>
    //             <img
    //               src="/DummyImages/breakfast3_.jpeg"
    //               alt="meal_one"
    //               height={160}
    //               width={210}
    //             />
    //           </a>
    //           <OtherMealName>Salad</OtherMealName>
    //         </Grid.Column>
    //         <Grid.Column>
    //           <a onClick={() => this.onMealDetail(0, 3)}>
    //             <Image
    //               src="/DummyImages/breakfast4_.jpeg"
    //               alt="meal_one"
    //               height={160}
    //               width={210}
    //             />
    //           </a>
    //           <OtherMealName>Baked Salmon</OtherMealName>
    //         </Grid.Column>
    //         <Grid.Column>
    //           <a onClick={() => this.onMealDetail(0, 4)}>
    //             <img
    //               src="/DummyImages/breakfast5_.jpeg"
    //               alt="meal_one"
    //               height={160}
    //               width={210}
    //             />
    //           </a>
    //           <OtherMealName>Tomato Pasta</OtherMealName>
    //         </Grid.Column>
    //       </Grid.Row>
    //     </Grid>
    //   </OtherBreakfastBox>
    // );
    // const otherLunch = (
    //   <OtherLunchBox>
    //     <Grid>
    //       <Grid.Row columns={4}>
    //         <Grid.Column>
    //           <a onClick={() => this.onMealDetail(1, 1)}>
    //             <img
    //               src="/DummyImages/lunch2_.jpeg"
    //               alt="meal_one"
    //               height={160}
    //               width={210}
    //             />
    //           </a>
    //           <OtherMealName>Pasta</OtherMealName>
    //         </Grid.Column>
    //         <Grid.Column>
    //           <a onClick={() => this.onMealDetail(1, 2)}>
    //             <img
    //               src="/DummyImages/lunch3_.jpeg"
    //               alt="meal_one"
    //               height={160}
    //               width={210}
    //             />
    //           </a>
    //           <OtherMealName>Steak</OtherMealName>
    //         </Grid.Column>
    //         <Grid.Column>
    //           <a onClick={() => this.onMealDetail(1, 3)}>
    //             <img
    //               src="/DummyImages/lunch4_.jpeg"
    //               alt="meal_one"
    //               height={160}
    //               width={210}
    //             />
    //           </a>
    //           <OtherMealName>Tomato Spaghetti</OtherMealName>
    //         </Grid.Column>
    //         <Grid.Column>
    //           <a onClick={() => this.onMealDetail(1, 4)}>
    //             <img
    //               src="/DummyImages/lunch5_.jpeg"
    //               alt="meal_one"
    //               height={160}
    //               width={210}
    //             />
    //           </a>
    //           <OtherMealName>Vietnamese Pho</OtherMealName>
    //         </Grid.Column>
    //       </Grid.Row>
    //     </Grid>
    //   </OtherLunchBox>
    // );
    // const otherDinner = (
    //   <OtherDinnerBox>
    //     <Grid>
    //       <Grid.Row columns={4}>
    //         <Grid.Column>
    //           <a onClick={() => this.onMealDetail(2, 1)}>
    //             <img
    //               src="/DummyImages/dinner2_.jpeg"
    //               height={160}
    //               width={210}
    //               alt="meal_one"
    //             />
    //           </a>
    //           <OtherMealName>Chinese Noodle</OtherMealName>
    //         </Grid.Column>
    //         <Grid.Column>
    //           <a onClick={() => this.onMealDetail(2, 2)}>
    //             <img
    //               src="/DummyImages/dinner3_.jpg"
    //               height={160}
    //               width={210}
    //               alt="meal_one"
    //             />
    //           </a>
    //           <OtherMealName>Kimbap</OtherMealName>
    //         </Grid.Column>
    //         <Grid.Column>
    //           <a onClick={() => this.onMealDetail(2, 3)}>
    //             <img
    //               src="/DummyImages/dinner4_.jpeg"
    //               height={160}
    //               width={210}
    //               alt="meal_one"
    //             />
    //           </a>
    //           <OtherMealName>Aglio e Olio</OtherMealName>
    //         </Grid.Column>
    //         <Grid.Column>
    //           <a onClick={() => this.onMealDetail(2, 4)}>
    //             <img
    //               src="/DummyImages/dinner5_.jpeg"
    //               height={160}
    //               width={210}
    //               alt="meal_one"
    //             />
    //           </a>
    //           <OtherMealName>Vegetable Rice</OtherMealName>
    //         </Grid.Column>
    //       </Grid.Row>
    //     </Grid>
    //   </OtherDinnerBox>
    // );
    let recommendationBody = "Here, we recommend you the best meal for today.\n Recommendation may change according to your nutriture data for today. Enjoy!";
    return (
      <div className="MenuRecommendation">
        <RecommendationHeader>{this.props.title}</RecommendationHeader>
        <RecommendationBody>{recommendationBody}</RecommendationBody>
        <div class="container">
          {/* <Grid container spacing={2}> */}
            {/* <Grid.Row columns={3}> */}
              <div class="item">
                <Meal
                  time="breakfast"
                />
                <Button
                  id="other-meal-breakfast-button" size="mini" 
                  onClick={() => this.onClickedOtherBreakfast()}>
                  Other
                </Button>
              </div>
              <div class="item">
                <Meal
                  time="lunch"
                />
                <Button 
                  size="mini" id="other-meal-lunch-button"
                  onClick={() => this.onClickedOtherLunch()}>
                  Other
                </Button>
              </div>
              <div class="item">
                <Meal
                  time="dinner"
                />
                <Button 
                  size="mini" id="other-meal-dinner-button" 
                  onClick={() => this.onClickedOtherDinner()}>
                  Other
                </Button>
              </div>
            {/* </Grid.Row> */}
          {/* </Grid> */}
        </div>
        {this.state.otherBreakfast ? null : null}
        {this.state.otherLunch ? null : null}
        {this.state.otherDinner ? null : null}
        <Button className="main-button" onClick={() => this.props.history.push('/main')}>Back</Button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  recommendedMenus: state.menu.recommendedMenus,
});

export default connect(mapStateToProps, null)(withRouter(MealList));
