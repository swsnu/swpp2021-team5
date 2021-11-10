/* eslint-disable */
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import Nutrient from '../../component/Nutrient/Nutrient';
import * as actionCreators from '../../store/actions/index';
import Background from '../../styles/Nutritional_Info_and_Recipe/Background';
import Recipe from '../../component/Recipe/Recipe';

class NutritionalInfoAndRecipe extends PureComponent {
  componentDidMount() {
    this.props.onUpdateSelectedMenu(parseInt(this.props.match.params.when, 10), parseInt(this.props.match.params.idx, 10));
  }

  render() {
    let menuName = '';
    let calories = 0;
    let carbs = 0;
    let protein = 0;
    let fat = 0;
    let recipe = 'Ways to make good sushi';
    if (this.props.selectedMenu) {
      // eslint-disable-next-line
      console.log('updated');
      menuName = this.props.selectedMenu.name;
      calories = this.props.selectedMenu.calories;
      carbs = this.props.selectedMenu.carbs;
      protein = this.props.selectedMenu.protein;
      fat = this.props.selectedMenu.fat;
      recipe = this.props.selectedMenu.recipe;
    }
    console.log(this.props.selectedMenu);
    return (
      <div className="NutritionalInfoAndRecipe">
        <Background>
          <Nutrient
            menu_name={menuName}
            calories={calories}
            carbs={carbs}
            protein={protein}
            fat={fat}
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
