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
  componentDidMount() {
    this.props.onUpdateSelectedMenu(parseInt(this.props.match.params.when, 10), parseInt(this.props.match.params.idx, 10));
  }

  render() {
    let menuName = '';
    let calories = 0;
    let carbs = 0;
    let protein = 0;
    let fat = 0;
    let recipe = '/DummyImages/';
    if (this.props.selectedMenu) {
      menuName = this.props.selectedMenu.name;
      calories = this.props.selectedMenu.calories;
      carbs = this.props.selectedMenu.carbs;
      protein = this.props.selectedMenu.protein;
      fat = this.props.selectedMenu.fat;
      recipe = this.props.selectedMenu.recipe;
    }
    // console.log(this.props.selectedMenu);
    let url = '/DummyImages/';
    if (parseInt(this.props.match.params.when, 10)==0){
      url += 'breakfast' + (parseInt(this.props.match.params.idx, 10)+1) + '_.jpeg';
    } else if (parseInt(this.props.match.params.when, 10)==1){
      url += 'lunch' + (parseInt(this.props.match.params.idx, 10)+1) + '_.jpeg';
    } else {
      if (parseInt(this.props.match.params.idx, 10)+1 != 3) url += 'dinner' + (parseInt(this.props.match.params.idx, 10)+1) +'_.jpeg';
      else url += 'dinner'+(parseInt(this.props.match.params.idx, 10)+1) +'_.jpg';
    }
    // console.log(url);
    return (
      <div className="NutritionalInfoAndRecipe">
        <Background>
          <Nutrient
            menu_name={menuName}
            calories={calories}
            carbs={carbs}
            protein={protein}
            fat={fat}
            src={url}
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
  selectedMenu: state.menu.selectedMenu,
});

const mapDispatchToProps = (dispatch) => ({
  onUpdateSelectedMenu: (when, idx) => dispatch(actionCreators.updateSelectedMenu_(when, idx)),
  // onGetMenu: (menuName) => dispatch(actionCreators.getMenu(menuName)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(NutritionalInfoAndRecipe));
