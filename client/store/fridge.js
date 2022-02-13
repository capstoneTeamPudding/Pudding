/* eslint-disable no-unused-vars */
import axios from "axios";
export const GET_FRIDGE = "GET_FRIDGE";
export const ADD_TO_FRIDGE = "ADD_TO_FRIDGE";
export const DELETE_FRIDGE = "DELETE_FRIDGE";
export const DELETE_FOODITEM_FROM_FRIDGE = "DELETE_FOODITEM_FROM_FRIDGE";

export const _getFridge = (fridge) => {
  return {
    type: GET_FRIDGE,
    fridge,
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
      );
      dispatch(_getFridge(fridge));
    } catch (error) {
      console.error(error);
    }
  };
};

export const deleteFoodItemFromFridgeThunk = (userId, foodItemId) => {
  return async (dispatch) => {
    try {
      userId = 1;
      await axios.delete(
        `https://the-thymely-cook.herokuapp.com/api/fridge/${userId}`,
        {
          foodItemId,
        }
      );
    } catch (err) {
      console.error(`Failed to delete fridge item`, err);
    }
  };
};

export const addToFridgeThunk = (foodItem_name) => {
  let userId = 1;
  return async (dispatch) => {
    try {
      const { data: foodItem } = await axios.post(
        `https://the-thymely-cook.herokuapp.com/api/fridge/${userId}`,
        {
          foodItem_name,
        }
      );
      dispatch(_addToFridge(foodItem));
    } catch (err) {
      console.log("ADD TO FRIDGE ERROR");
      console.error(err);
    }
  };
};

export const updateFridgeThunk = (foodItem) => {
  return async (dispatch) => {
    try {
      const { data: food } = await axios.put(
        `https://the-thymely-cook.herokuapp.com/api/fridge/${foodItem.userUid}/${foodItem.foodItemId}`,
        foodItem
      );
      dispatch(_updateFridge(food));
    } catch (err) {
      console.log("ADD TO FRIDGE ERROR");
      console.error(err);
    }
  };
};

export const deleteFoodItemFromFridgeThunk = (uid, foodItemId) => {
  return async (dispatch) => {
    try {
      await axios.delete(
        `https://the-thymely-cook.herokuapp.com/api/fridge/${uid}/${foodItemId}`,
        {
          uid,
          foodItemId,
        }
      );
    } catch (err) {
      console.error(`Failed to delete fridge item`, err);
    }
  };
};

export const deleteFridgeThunk = (userUid) => {
  return async (dispatch) => {
    try {
      await axios.delete(
        `https://the-thymely-cook.herokuapp.com//api/fridge/${userUid}`,
        { userUid }
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
    case DELETE_FOODITEM_FROM_FRIDGE:
      return state.filter((foodItem) => foodItem.id !== action.foodItem.id);
    case DELETE_FRIDGE:
      return state.filter((user) => user.id !== action.user.id);
    default:
      return state;
  }
}
