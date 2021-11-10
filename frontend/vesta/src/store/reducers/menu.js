/* eslint-disable */
import * as actionTypes from '../actions/actionType';

const initialState = {
  selectedMenu: null,
  allMenus: null,
  recommendedMenus: [
    [
      {
        name: 'Tomato Pasta',
        calories: 300,
        carbs: 7,
        protein: 5,
        fat: 30,
        recipe: '1. Bring 4 quarts water to a boil and lightly salt. Prepare spaghetti following package directions.\n2. Remove 1/4 cup of the cooking water and reserve drain pasta.\n3. Meanwhile heat olive oil in large skillet over medium heat.'
      }, {
        name: 'Oatmeal',
        calories: 404,
        carbs: 60,
        protein: 22,
        fat: 16,
        recipe: '1. Preheat oven to 375F.\n2. In a large bowl cream together butter brown sugar vanilla and cinnamon until smooth.\n3. Add the two kinds of oats one at a time mixing well after each addition.',
      }, {
        name: 'Chicken Sandwich',
        calories: 800,
        carbs: 150,
        protein: 30, 
        fat:25,
        recipe:'1. Mix all the ingredients except the chicken and bread together.\n2. Add chicken mix until chicken pieces are coated.\n3. Lightly toast the bread fill and enjoy'
      }, {
        name: 'Salad',
        calories: 380,
        carbs: 97,
        protein: 4,
        fat: 1,
        recipe: '1. Put the diced honeydew melon in a bowl large enough to hold all the fruit.\n2. Sprinkle with salt.',
      }, {
        name: 'Baked Salmon',
        calories: 500,
        carbs: 6,
        protein: 85,
        fat: 16,
        recipe: '1. Put all ingredients except salmon in food processor.\n2. Blend ingredients together until well combined and basil is fine.\n3. Put some of the sauce in bottom of baking dish that has been lightly sprayed with Pam Cooking Spray.\n4. Place salmon in dish and mound rest of sauce over salmon.',
      }
    ], [
      {
        name: 'Vietnamese Pho',
        calories: 400,
        carbs: 20,
        protein: 40,
        fat: 15,
        recipe: '1. Whisk soy sauce garlic Chinese 5spice sugar paprika and chicken bouillon together in a large glass or ceramic bowl. Add pork cubes and toss to evenly coat. Cover the bowl with plastic wrap and marinate in the refrigerator for at least 1 hour.\n2. Remove pork from marinade and shake off excess. Discard remaining marinade.',
      }, {
        name: 'Chicken Teriyaki',
        calories: 300,
        carbs: 50,
        protein: 5,
        fat: 2,
        recipe: '1. Preheat an oven to 350 degrees F 175 degrees C.\n2. Stir the soy sauce sugar 1 teaspoon of black pepper cornstarch and 1/2 cup of the reserved pineapple juice together in a saucepan until the sugar is completely dissolved add the onion garlic and ginger. Bring the mixture to a boil and cook until the sauce thickens about 5 minutes.',
      }, {
        name: 'Pasta',
        calories: 700,
        carbs: 35,
        protein: 100,
        fat: 40, 
        recipe: '1. In a large pot over medium heat cook beef until no longer pink. Drain and set aside\n2. In the same pot heat the olive oil. Cook onion celery garlic and black pepper until vegetables are tender 10 minutes. Stir in beef broth crushed tomatoes and tomato paste. Season with thyme basil oregano and parsley. Cover reduce heat and simmer 1 hour. At this point you may put the pot on a back burner to keep warm and continue with the next steps about 1 hour prior to serving if you wish.'
      }, {
        name: 'Steak',
        calories: 250,
        carbs: 10,
        protein: 11,
        fat: 15,
        recipe: '1. Preheat a cast iron skillet over mediumhigh heat. Add the butter and reduce the heat to medium. Pan fry the steaks 4 to 6 minutes per side or to personal taste. Be careful not to overcook your steaks. Remove steaks to a plate season with salt and pepper and keep them warm.'
      }, {
        name: 'Tomato Spagetti',
        calories: 60,
        carbs: 5,
        protein: 1,
        fat: 8,
        recipe: '1. In a frying pan heat olive oil add onion and the garlic. Saute until brown and remove the garlic.\n2. Put the canned tomatoes and the liquid from the can in a blender and mix gently less than a minute.'
      },
    ], [
      {
        name: 'vegetable rice',
        calories: 650,
        carbs: 120,
        protein: 40,
        fat: 6,
        recipe: '21',
      }, {
        name: 'bibimbap',
        calories: 800,
        carbs: 150,
        protein: 45,
        fat: 15,
        recipe: '20',
      }, {
        name: 'Chinese Noodle',
        calories: 900,
        carbs: 80,
        protein: 60,
        fat: 30,
        recipe: '1. In a large skillet brown chicken in oil stirring constantly until juices run clear.\n2. Add the onion broccoli carrots and peas. Cover skillet and steam for 2 minutes.'
      }, {
        name: 'Kimbab',
        calories: 500,
        carbs: 60,
        protein: 40,
        fat: 20,
        recipe: '1. Peel the carrot and boiled it in the water until halfcooked.\n2. Cut it into four lenghtwise.'
      }, {
        name: 'Aglio e Olio',
        calories: 588,
        carbs: 56,
        protein: 25,
        fat: 31,
        recipe: '1. Bring about 5 quarts of water to a boil with 3 teaspoons salt add in the spaghetti and cook only until firmtender drain but RESERVE 1/2 cup pasta water.\n2. Start this when you are boiling the pasta Heat about 4 tablespoons olive oil over mediumlow heat in a skillet.'
      }
    ],
  ],
};
const menuReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_MENU:
      return { ...state, selectedMenu: action.selectedMenu };
    case actionTypes.GET_RECOMMENDED_MENUS:
      return { ...state, recommendedMenus: action.recommendedMenus };
    case actionTypes.UPDATE_SELECTED_MENU: {
      const selected = state.recommendedMenus[action.when][action.idx];
      // eslint-disable-next-line
      console.log(selected);
      return { ...state, selectedMenu: selected };
    }
    default:
      break;
  }
  return state;
};

export default menuReducer;
