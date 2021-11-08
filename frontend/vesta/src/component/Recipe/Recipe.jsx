import React from 'react';
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

const Recipe = (props) => (
  <Container text className="Recipe">
    <RecipeHeader>Recipe</RecipeHeader>
    <TextArea>{props.recipe}</TextArea>
  </Container>
);

export default Recipe;
