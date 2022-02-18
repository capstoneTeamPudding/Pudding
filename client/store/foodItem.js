import axios from "axios";

//Action Types
export const GET_FOOD_ITEM = "GET_FOOD_ITEM";
export const UPDATE_FOOD_ITEM = "UPDATE_FOOD_ITEM";

//Action Creators
export const _getFoodItem = (foodItem) => {
  return {
    type: GET_FOOD_ITEM,
    foodItem,
  };
};

export const _updateFoodItem = (foodItem) => {
  return {
    type: UPDATE_FOOD_ITEM,
    foodItem,
  };
};

//Thunks
export const getFoodItemThunk = (foodItemId) => {
  return async (dispatch) => {
    try {
      const { data: foodItem } = await axios.get(
        `https://the-thymely-cook.herokuapp.com/api/foodItems/${foodItemId}`
      );
      dispatch(_getFoodItem(foodItem));
    } catch (error) {
      console.error(error);
    }
  };
};

export const updateFoodItemThunk = (foodItem) => {
  return async (dispatch) => {
    try {
      const { data: updated } = await axios.put(
        `https://the-thymely-cook.herokuapp.com/api/foodItems/${foodItem.id}`,
        foodItem
      );
      dispatch(_updateFoodItem(updated));
    } catch (error) {
      console.error(error);
    }
  };
};

let initialState = [];

//Reducer
export default function foodItemReducer(state = initialState, action) {
  switch (action.type) {
    case GET_FOOD_ITEM:
      return action.foodItem;
    case UPDATE_FOOD_ITEM:
      return { ...state, foodItem_name: action.foodItem.foodItem_name };
    default:
      return state;
  }
}
