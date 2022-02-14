import axios from "axios";
import { auth } from '../firebaseAuth/firebase'
import firebase from "firebase";


//Action Type
// const SET_USER = "SET_USER";
const LOGIN = 'LOGIN';
const SIGNUP = 'SIGNUP';
const LOGOUT = 'LOGOUT';


//Action Types
//A user signs in (the current user is set)
// const setUser = (user) => ({ type: SET_USER, user });
const _login = (user) => {
  return {
    type: LOGIN,
    user: user,
  };
};

const _signup = (user) => {
  return {
    type: SIGNUP,
    user: user,
  };
};
//A user signs out(the current user becomes null or empty)
export const _logout = (user) => {
  return {
    type: LOGOUT,
    user: user,
  };
};

//Thunks
// export const setUserThunk = () => async (dispatch) => {
//   const idToken = await auth.currentUser.getIdToken(true);
//   if (idToken) {
//     const { data } = await axios.get(`https://the-thymely-cook.herokuapp.com/auth/me`, {
//       headers: {
//         authtoken: idToken,
//       },
//     });
//     return dispatch(setUser(data));
//   }
// };

// export const updateUserThunk =
//   ({ firstName, lastName }) =>
//   async (dispatch) => {
//     try {
//       const idToken = await auth.currentUser.getIdToken(true);
//       if (idToken) {
//         const { data } = await axios.put(`https://the-thymely-cook.herokuapp.com/auth/update`,
//           {
//             firstName,
//             lastName,
//           },
//           {
//             headers: {
//               authtoken: idToken,
//             },
//           }
//         );
//         dispatch(setUser(data));
//         return true;
//       }
//     } catch (err) {
//       console.log("thunk error: ", err);
//     }
//   };

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
// const verify = (data, dispatch) => {
//   if (data.uid) {
//     dispatch(setUserThunk());
//     return true;
//   } else {
//     console.log("failed to authenticate");
//     return false
//   }
// }

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
      dispatch(_signup(data));
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
     dispatch(_login(data))
    } catch (err) {
      console.log(err);
      return err.message;
    }
  };

  export const logout = () => {
    return async (dispatch) => {
      auth.signOut();
      dispatch(_logout)
    };
  };


//Reducer
export default function (state = {}, action) {
  switch (action.type) {
    case LOGIN:
      return action.user
    case SIGNUP:
      return action.user
    case LOGOUT:
      return action.user   
    default:
      return state;
  }
}