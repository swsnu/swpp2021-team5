/* eslint-disable */
import { Component } from 'react';
import styled from 'styled-components';
import { Container } from 'semantic-ui-react';

const RecipeHeader = styled.div`
font-size:25px;
font-family:system-ui;
text-align:left;
`;

const TextArea = styled.div`
font-family:system-ui;
font-size:15px;
text-align:left;
white-space: pre-wrap;
`;

class Recipe extends Component {
  render() {
    let recipe = '';
    let ingredient = '';
    let regex = new RegExp("'(.*?)'", "g");
    let matchRecipe = regex.exec(this.props.recipe);
    while (matchRecipe != null) {
      recipe += matchRecipe[1]+'\n';
      matchRecipe = regex.exec(this.props.recipe);
    }
    let matchIng = regex.exec(this.props.ingredient);
    while (matchIng != null) {
      ingredient += matchIng[1]+', ';
      matchIng = regex.exec(this.props.ingredient);
    }
    ingredient = ingredient.slice(0, ingredient.length-2);
    ingredient += '\n';
    console.log(recipe);
    return(
      <Container text className="Recipe">
        <RecipeHeader>Ingredient</RecipeHeader>
        <TextArea>{ingredient}</TextArea>
        <RecipeHeader>Recipe</RecipeHeader>
        <TextArea>{recipe}</TextArea>
      </Container>
    );
  }
}

export default Recipe;
