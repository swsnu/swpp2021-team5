/* eslint-disable */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Button, Segment, Dimmer, Loader, Image } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import Nutrient from '../../component/Nutrient/Nutrient';
import * as actionCreators from '../../store/actions/index';
import Background from '../../styles/Nutritional_Info_and_Recipe/Background';
import Recipe from '../../component/Recipe/Recipe';

class NutritionalInfoAndRecipe extends Component {
  componentDidMount() {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();
    this.props.getRecommendedMenus(String(`${year}-${month}-${day}`));
  }

  render() {
    let menuName = '';
    let calories = 0;
    let carbs = 0;
    let protein = 0;
    let fat = 0;
    let recipe = '';
    let image = '';
    let ingredient = '';
    console.log(parseInt(this.props.match.params.idx));
    if (this.props.recommendedMenus) {
      menuName = this.props.recommendedMenus[parseInt(this.props.match.params.idx)].name;
      calories = this.props.recommendedMenus[parseInt(this.props.match.params.idx)].calories;
      carbs = this.props.recommendedMenus[parseInt(this.props.match.params.idx)].carbs;
      protein = this.props.recommendedMenus[parseInt(this.props.match.params.idx)].protein;
      fat = this.props.recommendedMenus[parseInt(this.props.match.params.idx)].fat;
      recipe = this.props.recommendedMenus[parseInt(this.props.match.params.idx)].recipe;
      image = this.props.recommendedMenus[parseInt(this.props.match.params.idx)].image;
      ingredient = this.props.recommendedMenus[parseInt(this.props.match.params.idx)].ingredient;
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
              ingredient={ingredient}
            />
            <Link to="/recommendation">
              <Button className="menu-recommendation-button">Back</Button>
            </Link>
          </Background>
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
  recommendedMenus: state.menu.recommendedMenus,
});

const mapDispatchToProps = (dispatch) => ({
  getRecommendedMenus: (date) => dispatch(actionCreators.getRecommendedMenus(date)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(NutritionalInfoAndRecipe));
