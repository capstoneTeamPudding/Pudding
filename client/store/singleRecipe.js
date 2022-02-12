import axios from 'axios'

const spnAPI = 'https://api.spoonacular.com/recipes/'

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


//THUNK save to favorites

export const saveRecipeThunk = (recipeObj) => {
  let userId = 1;
  let recipeName = recipeObj.title
  let recipeId = recipeObj.id
  console.log("recipe from thunk", recipeName)
  return async (dispatch) => {
    try {
      const { data: recipe } = await axios.post(
        `https://the-thymely-cook.herokuapp.com/api/recipes/${userId}`,
        {
          recipeName, recipeId
        }
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
    //console.log("I'm recipeReducer, I got ", action.recipe)
  switch (action.type) {
    case SAVE_RECIPE:
      return {...state, savedRecipes: [...state, action.recipe]}     
    default:
      return state;
  }
}