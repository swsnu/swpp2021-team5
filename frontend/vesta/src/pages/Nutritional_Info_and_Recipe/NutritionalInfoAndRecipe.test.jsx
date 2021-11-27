import { mount, shallow } from 'enzyme';
import React from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { Switch } from 'react-router';
import { Route } from 'react-router-dom';
import { getMockStore } from '../../test-utils/mock';
import NutritionalInfoAndRecipe from './NutritionalInfoAndRecipe';
import { history } from '../../store/store';
import * as actionCreators from '../../store/actions/Menu/menu';

const userInitialState = {};
const recordInitialState = {};
const stubMenuInitialState = {
  selectedMenu: {
    name: 'Oatmeal',
    calories: 404,
    carbs: 60,
    protein: 22,
    fat: 16,
    recipe: '1. Preheat oven to 375F.\n2. In a large bowl cream together butter brown sugar vanilla and cinnamon until smooth.\n3. Add the two kinds of oats one at a time mixing well after each addition.',
  },
  allMenus: null,
  recommendedMenus: [
    { name: "1927 peanut butter bread", calories: 173.9, carbs: 8.0, protein: 12.0, fat: 8.0, image: "http://localhost:8000/media/1927-peanut-butter-bread-450534.jpg", recipe: "['1. preheat oven to 350 degrees fahrenheit', '2. sift first 4 ingredients together in bowl', '3. add pb , mix well', '4. add milk , beat well', '5. pour batter into a loaf tin', '6. bake 1 hour or until a toothpick comes out clean']", ingredient: "['flour', 'baking powder', 'salt', 'sugar', 'peanut butter', 'skim milk']"}, 
    // {"id": 3658, "name": "margarita dip for fresh or grilled fruit", "calories": 84.3, "carbs": 1.0, "protein": 2.0, "fat": 11.0, "image": "http://localhost:8000/media/margarita-dip-for-fresh-or-grilled-fruit-250883.jpg", "recipe": "['1. beat cream cheese , limeade concentrate and orange juice in medium bowl with electric mixer on medium speed until well blended', '2. gently stir in cool whip topping', '3. cover', '4. refrigerate at least one hour', '5. serve with cut-up fresh fruit', '6. to grill fruit:', '7. peaches , nectarines and plums get a deep caramel-like flavor when cooked on the grill', '8. s how to do it\", ', '9. , \"use fruit that', '10. sprinkle fruit with cinnamon or nutmeg', '11. place fruit on the grill for a minute to sear', '12. check the underside']", "ingredient": "['cream cheese', 'frozen limeade concentrate', 'orange juice', 'cool whip topping']"}, 
    // {"id": 4696, "name": "acorn squash with pineapple", "calories": 60.7, "carbs": 5.0, "protein": 2.0, "fat": 0.0, "image": "http://localhost:8000/media/acorn-squash-with-pineapple-28507.jpg", "recipe": "['1. preheat oven to 350 degrees', '2. cut squash in half and remove seeds', '3. place each half , cut-side down on a nonstick baking sheet', '4. bake for 45 to 60 minutes until soft and tender', '5. meanwhile mix pineapple with spices and set aside', '6. now place squash into a baking dish', '7. divide pineapple mixture in half and place inside squash cavity', '8. return to oven and bake 5 more minutes or until pineapple mixture bubbles', '9. serve hot', '10. you may want to try half the amount of spices first , then add the rest if needed']", "ingredient": "['acorn squash', 'cinnamon', 'nutmeg', 'allspice', 'ginger', 'canned crushed pineapple']"}, 
    // {"id": 4682, "name": "acorn squash and arugula pizza", "calories": 159.1, "carbs": 3.0, "protein": 14.0, "fat": 15.0, "image": "http://localhost:8000/media/acorn-squash-and-arugula-pizza-266994.jpg", "recipe": "['1. cut squash into slices', '2. make acorn mix toss with acorn squash', '3. put flat onto baking sheet cook on 375f for 25 minute', '4. take out cool', '5. take non cooked dough roll out place in oven for 15 minutes', '6. pull out and top with both cheeses and stick back in oven for 10 minutes', '7. take out top with peeled squash and arugula', '8. drizzle oil and finish with dash of cracked pepper', '9. cut into about 8 slices and enjoy']", "ingredient": "['acorn squash', 'red pepper flakes', 'olive oil', 'maple syrup', 'salt and pepper', 'gorgonzola', 'mozzarella cheese', 'arugula', 'oil', 'cracked pepper']"}, 
    // {"id": 3803, "name": "vegan mac un cheese", "calories": 422.7, "carbs": 23.0, "protein": 46.0, "fat": 11.0, "image": "http://localhost:8000/media/vegan-mac-un-cheese-205443.jpg", "recipe": "['1. cook pasta and drain', '2. in a large bowl , combine pasta and all other ingredients', '3. mix thoroughly and enjoy', '4. for variety , mix in one cup of steamed vegetables , such as broccoli or peas', '5. vegan mayo is optional , but recommended for creamier meal']", "ingredient": "['pasta', 'vanilla-flavored soymilk', 'soy margarine', 'vegan mayonnaise', 'nutritional yeast', 'turmeric', 'ground sage', 'salt', 'ground pepper', 'garlic powder']"}, 
    // {"id": 3886, "name": "from stephanie s kitchen", "calories": 97.5, "carbs": 0.0, "protein": 14.0, "fat": 10.0, "image": "http://localhost:8000/media/from-stephanie-s-kitchen-323492.jpg", "recipe": "['1. beat eggs in a medium bowl', '2. add remaining ingredients', '3. grease a mini muffin tin', '4. fill cups with egg mixture until almost to the rim', '5. bake at 375 degrees for 10-15 minutes or until centers are set']", "ingredient": "['eggs', 'milk', 'fresh parsley', 'cheddar cheese', 'parmesan cheese', 'cooked bacon']"}, 
    // {"id": 5015, "name": "alex s salsa", "calories": 228.8, "carbs": 17.0, "protein": 18.0, "fat": 2.0, "image": "http://localhost:8000/media/alex-s-salsa-454285.jpg", "recipe": "['1. combine all ingredients in a food processor and -- uh -- process']", "ingredient": "['red onion', 'garlic cloves', 'habanero pepper', 'bell peppers', 'fresh cilantro', 'fresh ground black pepper', 'coarse sea salt', 'pepper sauce', 'lime juice', 'balsamic vinegar', 'savory', 'tomatoes and green chilies']"}, 
    // {"id": 3586, "name": "make that chicken dance salsa pasta", "calories": 255.2, "carbs": 6.0, "protein": 39.0, "fat": 18.0, "image": "http://localhost:8000/media/make-that-chicken-dance-salsa-pasta-32169.jpg", "recipe": "['1. heat oil in a frying pan and saut the onions and mushrooms until soft , about two minutes', '2. add the water , tomatoes , garlic , oregano , basil , parsley and hot sauce', '3. simmer over low heat for 6-10 minutes or until tomatoes are soft and enough water has evaporated to form a relatively thick sauce', '4. add salsa and chicken', '5. simmer until heated through', '6. cook pasta of your choice until al dente', '7. serve sauce over hot pasta , top with parmesan cheese and freshly ground black pepper']", "ingredient": "['tomatoes', 'garlic', 'onion', 'button mushrooms', 'hot sauce', 'dried oregano', 'dried basil', 'fresh parsley', 'water', 'salsa', 'chicken breasts', 'olive oil', 'fresh ground black pepper', 'parmesan cheese', 'pasta']"}, 
    // {"id": 4834, "name": "african sweet potato pudding", "calories": 291.2, "carbs": 12.0, "protein": 10.0, "fat": 21.0, "image": "http://localhost:8000/media/african-sweet-potato-pudding-457063.jpg", "recipe": "['1. boil the water in a heavy saucepan', '2. drop in the sweet potato cubes and cook , uncovered , until tender - about 25 to 30 minutes', '3. drain the potatoes and return them to the pan', '4. add the milk , cream , sugar , saffron and cardamom', '5. stirring often with a wooden spoon , bring the mixture to a boil over medium heat', '6. reduce the heat to low and simmer , uncovered , for about 1 hour , stirring often', '7. the pudding is done when it is smooth and is thick enough to hold its shape almost solidly in the spoon', '8. with the back of the spoon , rub the pudding through a fine sieve into a serving bowl', '9. refrigerate the pudding until cool', '10. before serving , sprinkle the top with a little additional ground cardamom']", "ingredient": "['water', 'sweet potatoes', 'whole milk', 'heavy cream', 'sugar', 'powdered saffron', 'ground cardamom']"}, 
    // {"id": 4976, "name": "alaskan sourdough cornbread", "calories": 207.7, "carbs": 7.0, "protein": 9.0, "fat": 18.0, "image": "http://localhost:8000/media/alaskan-sourdough-cornbread-97438.jpg", "recipe": "['1. spray a well seasoned , 9 or 10 inch iron skillet with non-stick cooking spray , add a small amount of oil and place in oven while it preheats', '2. preheat oven to 425 degrees', '3. combine the cornmeal , sugar and salt in medium bowl', '4. scald milk and pour over cornmeal mixture', '5. when mixture is room temperature , add remaining ingredients and mix well', '6. pour mixture into prepared pan and bake for 20 to 30 minutes or until golden brown']", "ingredient": "['cornmeal', 'sugar', 'salt', 'milk', 'sourdough starter', 'cream of tartar', 'baking soda', 'eggs', 'butter']"}, 
    // {"id": 3683, "name": "white sangria", "calories": 158.0, "carbs": 1.0, "protein": 0.0, "fat": 0.0, "image": "http://localhost:8000/media/white-sangria-251021.jpg", "recipe": "['1. pour wine , vodka , schnapps and peach coulis in a pitcher with the slices of fruits 12 hours before serving the sangria', '2. keep in the fridge', '3. just before serving , add ice , fruit juices and complete with lemonade']", "ingredient": "['dry white wine', 'lemon-flavored vodka', 'peach schnapps', 'peach puree', 'apple', 'lime', 'lemon', 'peach', 'lemon juice', 'lime juice', 'lemonade']"}, 
    // {"id": 4526, "name": "a1 derful grilled chicken a1", "calories": 241.5, "carbs": 6.0, "protein": 40.0, "fat": 15.0, "image": "http://localhost:8000/media/a1-derful-grilled-chicken-a1-518230.jpg", "recipe": "['1. place a1 , chicken thighs , and pineapple juice in 1 gallon zip lock bag', '2. marinate for at least 3 hours turning bag occasionally', '3. preheat gas grill for medium heat', '4. grill pineapple rings for 2 minutes on each side', '5. set aside', '6. grill chicken until done', '7. about 6 minutes on each side', '8. place about 10 spinach leaves layered on each piece of chicken', '9. place grilled pineapple ring on each piece', '10. place 1 tablespoon of goat cheese in each hole of each pineapple ring', '11. shut lid of grill for 3 minutes', '12. open grill , serve chicken and enjoy', '13. thankyou']", "ingredient": "['a.1. original sauce', 'boneless skinless chicken thighs', 'pineapple rings', 'goat cheese', 'baby spinach leaves', 'salt', 'pepper', 'pineapple juice']"}, 
    // {"id": 4841, "name": "afrikaanse stoofschotel", "calories": 208.4, "carbs": 15.0, "protein": 14.0, "fat": 1.0, "image": "http://localhost:8000/media/afrikaanse-stoofschotel-221763.jpg", "recipe": "['1. cut up potatoes and cabbage', '2. pan-fry onion in hot oil', '3. add curry powder to onion', '4. add potatoes and water', '5. cook for 5 minutes', '6. add cabbage', '7. cook for 10 minutes', '8. cut up and add tomatoes', '9. cook a couple more minutes', '10. season with salt and pepper']", "ingredient": "['white onion', 'curry powder', 'potatoes', 'white cabbage', 'tomatoes', 'water', 'salt', 'pepper']"}, 
    // {"id": 4405, "name": "a la rousse salad romanian", "calories": 214.0, "carbs": 11.0, "protein": 12.0, "fat": 10.0, "image": "http://localhost:8000/media/a-la-rousse-salad-romanian-305227.jpg", "recipe": "['1. wash the potatoes and the carrots well , then boil them unpealed until a fork can easily go in and out', '2. dice the potatoes , carrots , pickles , pickled bell peppers , and sausages', '3. mix with the rest of the ingredients']", "ingredient": "['potatoes', 'carrots', 'peas', 'dill pickles', 'red bell peppers', 'mayonnaise', 'pickle juice', 'mustard', 'salt', 'spices', 'vegetarian sausages']"}, 
    // {"id": 4283, "name": "7 can soup", "calories": 214.1, "carbs": 7.0, "protein": 23.0, "fat": 15.0, "image": "http://localhost:8000/media/7-can-soup-251443.jpg", "recipe": "['1. place all ingredients into a large pot', '2. heat', '3. s it !\", ', '4. , ']", "ingredient": "['ranch style beans', 'whole kernel corn', 'enchilada sauce', 'cream of chicken soup', 'chicken broth', 'rotel tomatoes', 'chicken']"}
  ],
  count: -1,
  countAll: 0,
  isUpdated: true,
};
const recipeInitialState = {};
const mockStore = getMockStore(userInitialState, recordInitialState, stubMenuInitialState, recipeInitialState);

describe('<NutritionalInfoAndRecipe />', () => {
  let nutritional; 
  let match = {
    params: {
      idx: 0
    }
  }
  let spyUpdateSelectedMenu_;
  beforeEach(() => {
    nutritional = (
      <Provider store={mockStore}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route path="/" exact component={NutritionalInfoAndRecipe} match={{ params: { when: 0, idx: 0 } }} />
          </Switch>
        </ConnectedRouter>
      </Provider>
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  xit('should render without errors', () => {
    const component = mount(nutritional);
    const wrapper = component.find('.NutritionalInfoAndRecipe');
    expect(wrapper.length).toBe(1);
  });
});

const stubMenuInitialState_ = {
  selectedMenu: null,
  allMenus: null,
  recommendedMenus: null,
};

const mockStore_ = getMockStore(userInitialState, recordInitialState, stubMenuInitialState_, recipeInitialState);

describe('<NutritionalInfoAndRecipe />', () => {
  let nutritional;
  let spyUpdateSelectedMenu_;
  beforeEach(() => {
    nutritional = (
      <Provider store={mockStore_}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route path="/" exact component={NutritionalInfoAndRecipe} match={{ params: { when: 0, idx: 0 } }} />
          </Switch>
        </ConnectedRouter>
      </Provider>
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render without errors', () => {
    const component = mount(nutritional);
    const wrapper = component.find('.NutritionalInfoAndRecipe');
    expect(wrapper.length).toBe(1);
  });
});
