import axios from "axios";
import { auth } from '../firebaseAuth/firebase'
import firebase from "firebase";


//Action Type
const SET_USER = "SET_USER";

//Action Types
//A user signs in (the current user is set)
const setUser = (user) => ({ type: SET_USER, user });

//A user signs out(the current user becomes null or empty)
export const logout = () => {
  console.log("log out function reached!!!")
  return {
    type: SET_USER,
    user: {},
  };
};

//Thunks
export const setUserThunk = () => async (dispatch) => {
  const idToken = await auth.currentUser.getIdToken(true);
  if (idToken) {
    const { data } = await axios.get(`https://the-thymely-cook.herokuapp.com/auth/me`, {
      headers: {
        authtoken: idToken,
      },
    });
    return dispatch(setUser(data));
  }
};

export const updateUserThunk =
  ({ firstName, lastName }) =>
  async (dispatch) => {
    try {
      const idToken = await auth.currentUser.getIdToken(true);
      if (idToken) {
        const { data } = await axios.put(`https://the-thymely-cook.herokuapp.com/auth/update`,
          {
            firstName,
            lastName,
          },
          {
            headers: {
              authtoken: idToken,
            },
          }
        );
        dispatch(setUser(data));
        return true;
      }
    } catch (err) {
      console.log("thunk error: ", err);
    }
  };

// export const updatePassword = async (password) => {
//   try {
//     const user = await auth.currentUser;
//     await user.updatePassword(password);
//     return true;
//   } catch (err) {
//     console.log("update password thunk error");
//     return err.message;
//   }
// };
const verify = (data, dispatch) => {
  if(data.uid) {
    dispatch(setUserThunk());
    return true;
  } else {
    console.log("failed to authenticate");
    return false
  }
}

export const authenticateSignUp =
  ({ email, firstName, lastName, password, method }) =>
  async (dispatch) => {
    try {
      const { user } = await auth.createUserWithEmailAndPassword(
        email,
        password
      );
      const { data } = await axios.post(`https://the-thymely-cook.herokuapp.com/auth/signup`, {
        uid: user.uid,
        email,
        firstName,
        lastName,
      });
      if (verify(data, dispatch)) return true;
    } catch (err) {
      console.log(err);
      return err.message;
    }
  };

export const authenticateLogin = ({ email, password, method }) =>
  async (dispatch) => {
    try {
      const { user } = await auth.signInWithEmailAndPassword(
        email,
        password
      );
      const { data } = await axios.post(`https://the-thymely-cook.herokuapp.com/auth/login`, {
        uid: user.uid,
      });
      if (verify(data, dispatch)) {
        return true;
      }
    } catch (err) {
      console.log(err);
      return err.message;
    }
  };

const initialState = {
  user: {},
};

//Reducer
export default function (state = initialState, action) {
  switch (action.type) {
    case SET_USER:
      return {...state, user: action.user};
    default:
      return state;
  }
}