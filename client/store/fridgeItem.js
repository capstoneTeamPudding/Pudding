import axios from "axios";

export const GET_FRIDGE_ITEM = "GET_FRIDGE_ITEM";
export const UPDATE_FRIDGE = "UPDATE_FRIDGE";
export const DELETE_FOODITEM_FROM_FRIDGE = "DELETE_FOODITEM_FROM_FRIDGE";

export const _getFridgeItem = (foodItem) => {
  return {
    type: GET_FRIDGE_ITEM,
    foodItem,
  };
};

export const _updateFridge = (foodItem) => ({
  type: UPDATE_FRIDGE,
  foodItem,
});

export const _deleteFoodItemFromFridge = (fridge) => {
  return {
    type: DELETE_FOODITEM_FROM_FRIDGE,
    fridge,
  };
};

export const getFridgeItemThunk = (foodItemId, userUid) => {
  return async (dispatch) => {
    try {
      const { data: fridgeItem } = await axios.get(
        `https://the-thymely-cook.herokuapp.com/api/fridge/${userUid}/${foodItemId}`
      );
      dispatch(_getFridgeItem(fridgeItem));
    } catch (error) {
      console.error(error, "get fridge thunk error");
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
      console.log("UPDATE FRIDGE ERROR", err);
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

export default function fridgeItemReducer(state = [], action) {
  switch (action.type) {
    case GET_FRIDGE_ITEM:
      return action.foodItem;
    case UPDATE_FRIDGE:
      return { ...state, quantity: action.foodItem.quantity };
    case DELETE_FOODITEM_FROM_FRIDGE:
      return state.filter((foodItem) => foodItem.id !== action.foodItem.id);
    default:
      return state;
  }
}
