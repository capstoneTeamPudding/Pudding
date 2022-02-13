/* eslint-disable no-unused-vars */
import * as React from "react";
import store from "./client/store";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-redux";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StyleSheet, Text, View } from "react-native";
import Home from "./client/components/Home";
import Fridge from "./client/components/Fridge";
import Scanner from "./client/components/Scanner";
import Recipes from "./client/components/Recipes";
import Login from "./client/components/Login";
import Registration from "./client/components/Registration";
import SingleRecipe from "./client/components/SingleRecipe";
import SingleFoodItem from "./client/components/SingleFoodItem";
import SearchSingleRecipe from "./client/components/SearchSingleRecipe";
import EditFood from "./client/components/EditFood";
import AddFood from "./client/components/AddFood";
import Favorites from "./client/components/Favorites";

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <Provider store={store}>
      <AppSource />
    </Provider>
  );
};

const AppSource = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          component={Login}
          options={{
            title: "Login",
            headerStyle: {
              backgroundColor: "rgb(65, 140, 115)",
            },
            headerTintColor: "white",
            headerTitleStyle: {
              fontWeight: "bold",
            },
            headerLeft: null,
          }}
        />
        {/* <Stack.Screen name="Profile" component={Profile}/> */}
        <Stack.Screen
          name="Registration"
          component={Registration}
          options={{
            title: "Registration",
            headerStyle: {
              backgroundColor: "rgb(65, 140, 115)",
            },
            headerTintColor: "white",
            headerTitleStyle: {
              fontWeight: "bold",
            },
            headerLeft: () => false,
          }}
        />
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            title: "Thymely Cook",
            headerStyle: {
              backgroundColor: "rgb(65, 140, 115)",
            },
            headerTintColor: "white",
            headerTitleStyle: {
              fontWeight: "bold",
            },
            headerLeft: () => false,
          }}
        />
        <Stack.Screen
          name="Fridge"
          component={Fridge}
          options={{
            title: "My Fridge",
            headerStyle: {
              backgroundColor: "rgb(65, 140, 115)",
            },
            headerTintColor: "white",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />
        <Stack.Screen
          name="Scanner"
          component={Scanner}
          options={{
            title: "Add Your Groceries",
            headerStyle: {
              backgroundColor: "rgb(65, 140, 115)",
            },
            headerTintColor: "white",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />
        <Stack.Screen
          name="Recipes"
          component={Recipes}
          options={{
            title: "Suggested Recipes",
            headerStyle: {
              backgroundColor: "rgb(65, 140, 115)",
            },
            headerTintColor: "white",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />
        <Stack.Screen
          name="Favorites"
          component={Favorites}
          options={{
            title: "Favorites",
            headerStyle: {
              backgroundColor: "rgb(65, 140, 115)",
            },
            headerTintColor: "white",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />
        <Stack.Screen
          name="SingleRecipe"
          component={SingleRecipe}
          options={{
            title: "Recipe",
            headerStyle: {
              backgroundColor: "rgb(65, 140, 115)",
            },
            headerTintColor: "white",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />
        <Stack.Screen
          name="SingleFoodItem"
          component={SingleFoodItem}
          options={{
            title: "Food Details",
            headerStyle: {
              backgroundColor: "rgb(65, 140, 115)",
            },
            headerTintColor: "white",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />
        <Stack.Screen
          name="SearchSingleRecipe"
          component={SearchSingleRecipe}
          options={{
            title: "Recipe",
            headerStyle: {
              backgroundColor: "rgb(65, 140, 115)",
            },
            headerTintColor: "white",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />
        <Stack.Screen
          name="Edit"
          component={EditFood}
          options={{
            title: "Edit",
            headerStyle: {
              backgroundColor: "rgb(65, 140, 115)",
            },
            headerTintColor: "white",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />
        <Stack.Screen name="AddFood" component={AddFood} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default App;
