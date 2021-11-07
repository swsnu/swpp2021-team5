import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import Nutrient from '../../component/Nutrient/Nutrient';
import * as actionCreators from '../../store/actions/index';
import Background from '../../styles/Nutritional_Info_and_Recipe/Background';

class NutritionalInfoAndRecipe extends Component {
  componentDidMount() {
    this.props.onGetMenu();
  }

  render() {
    let menuName = 'Sushi';
    let calories = 0;
    let carbs = 0;
    let protein = 0;
    let fat = 0;
    if (this.props.selectedMenu) {
      menuName = this.props.selectedMenu.name;
      calories = this.props.selectedMenu.calories;
      carbs = this.props.selectedMenu.carbs;
      protein = this.props.selectedMenu.protein;
      fat = this.props.selectedMenu.fat;
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
          />
        </Background>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  selectedMenu: state.menu.selectedMenu,
});

const mapDispatchToProps = (dispatch) => ({
  onGetMenu: (menuName) => dispatch(actionCreators.getMenu(menuName)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(NutritionalInfoAndRecipe));
