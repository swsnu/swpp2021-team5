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
`;

class Recipe extends Component {
  render() {
    let recipe = '';
    let regex = new RegExp("'(.*?)'", "g");
    let match = regex.exec(this.props.recipe);
    while (match != null) {
      recipe += match[1]+'\n';
      console.log(match[1]);
      match = regex.exec(this.props.recipe);
    }
    console.log(recipe);
    return(
      <Container text className="Recipe">
        <RecipeHeader>Recipe</RecipeHeader>
        <TextArea>{recipe}</TextArea>
      </Container>
    );
  }
}

export default Recipe;
