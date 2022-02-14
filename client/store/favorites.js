import axios from "axios";
import { SPOON_API_KEY } from "../../.keys";



const spnAPI = "https://api.spoonacular.com/recipes/";

//Action
const GET_FAVORITES = "GET_FAVORITES";

//Action Creators
export const getFavorites = (recipes) => ({
  type: GET_FAVORITES,
  recipes,
});

//Thunks

export const getFavoritesThunk = (userUid) => {
  return async (dispatch) => {
    try {
      const { data: favorites } = await axios.get(
        `https://the-thymely-cook.herokuapp.com/api/recipes/user/${userUid}`
        //`https://fuzzy-cow-61.loca.lt/api/recipes/user/${userUid}`
      );
      dispatch(getFavorites(favorites));
    } catch (error) {
      console.error(error);
    }
  };
};

//reducer
const initialState = [];

export default function favoritesReducer(state = initialState, action) {
  switch (action.type) {
    case GET_FAVORITES:
      return action.recipes;
    default:
      return state;
  }
}
