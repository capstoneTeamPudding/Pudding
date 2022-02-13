import axios from "axios";
export const GET_FOOD_ITEMS = "GET_FOOD_ITEMS";
export const ADD_FOOD_ITEM = "ADD_FOOD_ITEM";

export const _getFoodItems = (foodItems) => {
  return {
    type: ADD_FOOD_ITEM,
    foodItems,
  };
};

export const _addFoodItem = (foodItem) => {
  return {
    type: ADD_FOOD_ITEM,
    foodItem,
  };
};

//thunks

export const addFoodItemThunk = (foodItem_name) => {
  return async (dispatch) => {
    try {
      const { data: food } = await axios.post(
        "https://helpless-donkey-8.loca.lt/api/foodItems/",
        {
          foodItem_name,
        }
      );
      dispatch(_addFoodItem(food));
    } catch (err) {
      console.log(err);
    }
  };
};

let initialState = [];

export default function foodItemsReducer(state = initialState, action) {
  switch (action.type) {
    case GET_FOOD_ITEMS:
      return action.foodItems;
    case ADD_FOOD_ITEM:
      return [...state, action.foodItem];
    default:
      return state;
  }
}
