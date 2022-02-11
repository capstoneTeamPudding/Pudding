/* eslint-disable no-unused-vars */
import axios from "axios";
export const GET_FRIDGE = "GET_FRIDGE";
export const GET_FRIDGE_ITEM = "GET_FRIDGE_ITEM";
export const ADD_TO_FRIDGE = "ADD_TO_FRIDGE";
export const DELETE_FOODITEM_FROM_FRIDGE = "DELETE_FOODITEM_FROM_FRIDGE";
export const DELETE_FRIDGE = "DELETE_FRIDGE";

export const _getFridge = (fridge) => {
  return {
    type: GET_FRIDGE,
    fridge,
  };
};

export const _getFridgeItem = (foodItem) => {
  return {
    type: GET_FRIDGE_ITEM,
    foodItem,
  };
};

export const _addToFridge = (foodItem) => {
  return {
    type: ADD_TO_FRIDGE,
    foodItem,
  };
};
export const _deleteFridge = (fridge) => {
  return {
    type: DELETE_FRIDGE,
    fridge,
  };
};
//unsure
export const _deleteFoodItemFromFridge = (fridge) => {
  return {
    type: DELETE_FRIDGE,
    fridge,
  };
};

//thunks
export const getFridgeThunk = (userId) => {
  return async (dispatch) => {
    try {
      const { data: fridge } = await axios.get(
       `https://the-thymely-cook.herokuapp.com/api/fridge/${userId}`
        //`/api/fridge/${userId}`
      );
      dispatch(_getFridge(fridge));
    } catch (error) {
      console.error(error);
    }
  };
};

export const getFridgeItemThunk = (userId, foodItemId) => {
  return async (dispatch) => {
    try {
      const { data: fridgeItem } = await axios.get(
        `https://the-thymely-cook.herokuapp.com/api/fridge/${userId}/${foodItemId}`
      );
      dispatch(_getFridgeItem(fridgeItem));
    } catch (error) {
      console.error(error);
    }
  };
};

export const addToFridgeThunk = (userId, foodItem_name, quantity) => {
  return async (dispatch) => {
    try {
      const { data: foodItem } = await axios.post(
        `https://the-thymely-cook.herokuapp.com/api/fridge/${userId}`,
        {
          userId,
          foodItem_name,
          quantity,
        }
      );
      dispatch(_addToFridge(foodItem));
    } catch (err) {
      console.log("ADD TO FRIDGE ERROR");
      console.error(err);
    }
  };
};

export const deleteFoodItemFromFridgeThunk = (userId, foodItemId) => {
  return async (dispatch) => {
    try {
      userId = 1;
      await axios.delete(
        `https://the-thymely-cook.herokuapp.com/api/fridge/${userId}/${foodItemId}`,
        {
          userId,
          foodItemId,
        }
      );
    } catch (err) {
      console.error(`Failed to delete fridge item`, err);
    }
  };
};

export const deleteFridgeThunk = (userId) => {
  return async (dispatch) => {
    try {
      userId = 1;
      await axios.delete(
        `https://the-thymely-cook.herokuapp.com/api/fridge/${userId}`,
        { userId }
      );
    } catch (err) {
      console.error(`Failed to delete fridge`, err);
    }
  };
};
let initialState = [];

export default function fridgeReducer(state = initialState, action) {
  switch (action.type) {
    case GET_FRIDGE:
      return action.fridge;
    case ADD_TO_FRIDGE:
      return [...state, action.foodItem];
    case GET_FRIDGE_ITEM:
      return action.foodItem;
    case DELETE_FOODITEM_FROM_FRIDGE:
      return state.filter((foodItem) => foodItem.id !== action.foodItem.id);
    case DELETE_FRIDGE:
      return state.filter((user) => user.id !== action.user.id);
    default:
      return state;
  }
}
