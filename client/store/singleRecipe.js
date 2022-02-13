import axios from 'axios'

const spnAPI = 'https://api.spoonacular.com/recipes/'
//import {SPOON_API_KEY} from "../.keys.js"
// import {SPOON_API_KEY} from '@env';
// const SPOON_API_KEY = process.env.SPOON_API_KEY

//ACTIONS
const GET_RECIPE = 'GET_RECIPE'
const SAVE_RECIPE = 'SAVE_RECIPE'

//ACTION CREATORS
export const getSingleRecipe = (recipe) => ({
  type: GET_RECIPE,
  recipe,
});
export const saveRecipe = (recipe) => ({
  type: SAVE_RECIPE,
  recipe,
});


//THUNK

export const saveRecipeThunk = (recipe) => {
  let userId = 1;
  return async (dispatch) => {
    try {
      const { data: recipe } = await axios.post(
        `https://the-thymely-cook.herokuapp.com/api/recipe/${userId}`,
        recipe
      );
      dispatch(saveRecipe(recipe));
    } catch (err) {
      console.log("saveRecipe THUNK ERROR");
    }
  };
};

const initialState = {
  recipe: {},
  savedRecipes: [],
};

//REDUCER

export default function recipeReducer(state = initialState, action) {
    console.log("I'm recipeReducer, I got ", action.recipe)
  switch (action.type) {
    case SAVE_RECIPE:
      return {...state, savedRecipes: [... action.recipe]}     
    default:
      return state;
  }
}