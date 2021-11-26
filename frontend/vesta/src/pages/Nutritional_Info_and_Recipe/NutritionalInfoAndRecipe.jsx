/* eslint-disable */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import Nutrient from '../../component/Nutrient/Nutrient';
import * as actionCreators from '../../store/actions/index';
import Background from '../../styles/Nutritional_Info_and_Recipe/Background';
import Recipe from '../../component/Recipe/Recipe';

class NutritionalInfoAndRecipe extends Component {

  render() {
    let menuName = '';
    let calories = 0;
    let carbs = 0;
    let protein = 0;
    let fat = 0;
    let recipe = '';
    let image = '';
    console.log(parseInt(this.props.match.params.idx));
    if (this.props.recommendedMenus) {
      console.log(parseInt(this.props.match.params.idx));
      menuName = this.props.recommendedMenus[parseInt(this.props.match.params.idx)].name;
      calories = this.props.recommendedMenus[parseInt(this.props.match.params.idx)].calories;
      carbs = this.props.recommendedMenus[parseInt(this.props.match.params.idx)].carbs;
      protein = this.props.recommendedMenus[parseInt(this.props.match.params.idx)].protein;
      fat = this.props.recommendedMenus[parseInt(this.props.match.params.idx)].fat;
      recipe = this.props.recommendedMenus[parseInt(this.props.match.params.idx)].recipe;
      image = this.props.recommendedMenus[parseInt(this.props.match.params.idx)].image;
    }
    return (
      <div className="NutritionalInfoAndRecipe">
        <Background>
          <Nutrient
            menu_name={menuName}
            calories={calories}
            carbs={carbs}
            protein={protein}
            fat={fat}
            src={image}
          />
          <Recipe
            recipe={recipe}
          />
          <Link to="/recommendation">
            <Button className="menu-recommendation-button">Back</Button>
          </Link>
        </Background>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  recommendedMenus: state.menu.recommendedMenus,
});

const mapDispatchToProps = (dispatch) => ({
  // onUpdateSelectedMenu: (when, idx) => dispatch(actionCreators.updateSelectedMenu_(when, idx)),
  // onGetMenu: (menuName) => dispatch(actionCreators.getMenu(menuName)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(NutritionalInfoAndRecipe));
