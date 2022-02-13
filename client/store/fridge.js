import axios from "axios";

export const GET_FRIDGE = "GET_FRIDGE";
export const GET_FRIDGE_ITEM = "GET_FRIDGE_ITEM";
export const ADD_TO_FRIDGE = "ADD_TO_FRIDGE";
export const UPDATE_FRIDGE = "UPDATE_FRIDGE";
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
export const _updateFridge = (foodItem) => {
  return {
    type: UPDATE_FRIDGE,
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
export const getFridgeThunk = (userUid) => {
  return async (dispatch) => {
    try {
      const { data: fridge } = await axios.get(
        `https://the-thymely-cook.herokuapp.com/api/fridge/${userUid}`
      );
      dispatch(_getFridge(fridge));
    } catch (error) {
      console.error(error);
    }
  };
};
export const getFridgeItemThunk = (userUid, foodItemId) => {
  return async (dispatch) => {
    try {
      const { data: fridgeItem } = await axios.get(
        `https://the-thymely-cook.herokuapp.com/api/fridge/${userUid}/${foodItemId}`
      );
      console.log(fridgeItem);
      dispatch(_getFridgeItem(fridgeItem));
    } catch (error) {
      console.error(error);
    }
  };
};
export const addToFridgeThunk = (uid, foodItem_name, quantity) => {
  return async (dispatch) => {
    try {
      const { data: foodItem } = await axios.post(
        `https://the-thymely-cook.herokuapp.com/api/fridge/${uid}`,
        {
          uid,
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
export const updateFridgeThunk = (foodItem) => {
  return async (dispatch) => {
    try {
      const { data: food } = await axios.put(
        `https://the-thymely-cook.herokuapp.com/api/fridge/${foodItem.userUid}/${foodItem.foodItemId}`,
        foodItem
      );
      dispatch(_updateFridge(foodItem));
    } catch (err) {
      console.log("ADD TO FRIDGE ERROR");
      console.error(err);
    }
  };
};

export const deleteFoodItemFromFridgeThunk = (userUid, foodItemId) => {
  return async (dispatch) => {
    try {
      const { data: fridge } = await axios.delete(
        `https://the-thymely-cook.herokuapp.com/api/fridge/${userUid}/${foodItemId}`,
        {
          userUid,
          foodItemId,
        }
      );
      dispatch(_deleteFoodItemFromFridge(fridge));
    } catch (err) {
      console.error(`Failed to delete fridge item`, err);
    }
  };
};
export const deleteFridgeThunk = (userUid) => {
  return async (dispatch) => {
    try {
      const {
        data: fridge,
      } = await axios.delete(
        `https://the-thymely-cook.herokuapp.com/api/fridge/${userUid}`
      );
      dispatch(_deleteFridge(fridge));
    } catch (err) {
      console.error(`Failed to delete fridge`, err);
    }
  };
};
let initialState = [];

export default function fridgeReducer(state = [], action) {
  switch (action.type) {
    case GET_FRIDGE:
      return action.fridge;
    case ADD_TO_FRIDGE:
      return [...state, action.foodItem];
    case UPDATE_FRIDGE:
      return state.map((foodItem) =>
        foodItem.foodItemId === action.foodItem.foodItemId
          ? action.foodItem
          : foodItem
      );
    case GET_FRIDGE_ITEM:
      return action.foodItem;
    case DELETE_FOODITEM_FROM_FRIDGE:
      return state.filter((foodItem) => foodItem.id !== action.foodItem.id);
    case DELETE_FRIDGE:
      return state.filter((user) => user.uid !== action.user.uid);
    default:
      return state;
  }
}
