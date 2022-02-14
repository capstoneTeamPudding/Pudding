import { createStore, combineReducers, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import recipesReducer from "./recipes";
import recipeReducer from "./singleRecipe";
import foodItemsReducer from "./foodItems";
import foodItemReducer from "./foodItem";
import fridgeReducer from "./fridge";
import fridgeItemReducer from "./fridgeItem";
import favoritesReducer from "./favorites";
import auth from "./auth";
//add reducers here! Don't forget to import!

const reducer = combineReducers({
  auth: auth,
  recipesReducer,
  recipeReducer,
  foodItemsReducer,
  foodItemReducer,
  fridgeReducer,
  favoritesReducer,
  fridgeItemReducer,
});
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
);
const store = createStore(reducer, middleware);

export default store;
export * from "./auth";
