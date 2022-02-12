import axios from 'axios'
// import { SPOON_API_KEY } from "../../.keys";

const spnAPI = 'https://api.spoonacular.com/recipes/'

//Action
const GET_RECIPES = 'GET_RECIPES'


//Action Creators
export const getRecipes = (recipes) => ({
  type: GET_RECIPES,
  recipes,
});


//Thunks

//get recipes by what's in the fridge
export const getRecipesByFoodItem = () => {
  return async (dispatch) => {
    try {
      const { data: recipes } = await axios.get(`${spnAPI}complexSearch?query=tomato&number=2&apiKey=${SPOON_API_KEY}`, recipes)
      dispatch(getRecipes(recipes))
    } catch (err) {
      console.log(">>>>>>>GET RECIPES THUNK NOT WORKING!")
      console.log(err)
    }
  }
}


//reducer
const initialState = [];

export default function recipesReducer(state = initialState, action) {
  switch (action.type) {
    case GET_RECIPES:
      return action.recipes;
    default:
      return state;
  }
}