import axios from "axios";
import { auth } from "../firebaseAuth/firebase"

export const GET_FRIDGE = "GET_FRIDGE";
export const ADD_TO_FRIDGE = "ADD_TO_FRIDGE";
export const DELETE_FRIDGE = "DELETE_FRIDGE";

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

//thunks
export const getFridgeThunk = (userUid) => {
  return async (dispatch) => {
    try {
      const user = auth.currentUser.uid
      if (user) {
      const { data: fridge } = await axios.get(
        `https://the-thymely-cook.herokuapp.com/api/fridge/${userUid}`, {
          // headers: { authtoken: idToken }
        }
      );
      dispatch(_getFridge(fridge));
      }
    } catch (error) {
      console.error(error);
    }
  };
};
export const addToFridgeThunk = (uid, foodItem_name, quantity) => {
  return async (dispatch) => {
    try {
      const user = await auth.currentUser.uid
      if(user) {
      const { data: foodItem } = await axios.post(
        `https://the-thymely-cook.herokuapp.com/api/fridge/${uid}`,
        {
          uid,
          foodItem_name,
          quantity,
        },
        // {headers: { authtoken: idToken }}
      );
      dispatch(_addToFridge(foodItem));
      }
    } catch (err) {
      console.log("ADD TO FRIDGE ERROR");
      console.error(err);
    }
  };
};


export const deleteFridgeThunk = (userUid) => {
  return async (dispatch) => {
    try {
      const user = await auth.currentUser.uid
      if(user) {
        const { data: fridge } = await axios.delete(`https://the-thymely-cook.herokuapp.com/api/fridge/${userUid}`, {
           userUid 
          },
          // { headers: { authtoken: idToken }}
        );
          dispatch(_deleteFridge(fridge))
      };
      // const {
      //   data: fridge,
      // } = await axios.delete(
      //   `https://the-thymely-cook.herokuapp.com/api/fridge/${userUid}`,
      //   { userUid }
      // );
      // dispatch(_deleteFridge(fridge));
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
    case DELETE_FRIDGE:
      return state.filter((user) => user.uid !== action.user.uid);
    default:
      return state;
  }
}
