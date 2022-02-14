/* eslint-disable no-unused-vars */
import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Fridge from "./Fridge";
import Scanner from "./Scanner";
import Recipes from "./Recipes";
import SingleRecipe from "./SingleRecipe";
import Favorites from "./Favorites";
import SingleFoodItem from "./SingleFoodItem";
import SearchSingleRecipe  from "./SearchSingleRecipe";
import EditFood from "./EditFood";
import AddFood from "./AddFood";
import Home from "./Home";
import Profile from "./Profile";

const Stack = createNativeStackNavigator();

export function ProfileNav() {
  return (
    <Stack.Navigator 
      initialRouteName="Profile"
      screenOptions={{
        headerStyle: {
          backgroundColor: '#418C73',
        },
        headerTintColor: "#FFFFFF",
        headerShadowVisible: false,
        headerTitleStyle: {
          fontWeight: "bold",
          fontFamily: 'Avenir',
          fontSize: 22,
          color: "#FFFFFF"
        },
        headerBackTitleVisible: false
      }}
      >
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{
          title: "My Profile"
        }}
      />
    </Stack.Navigator>
  )
}

export function HomeNav() {
  return (
    <Stack.Navigator 
      initialRouteName="Home"
      screenOptions={{
        headerStyle: {
          backgroundColor: '#418C73',
        },
        headerTintColor: "#FFFFFF",
        headerShadowVisible: false,
        headerTitleStyle: {
          fontWeight: "bold",
          fontFamily: 'Avenir',
          fontSize: 22,
          color: "#FFFFFF"
        },
        headerBackTitleVisible: false
      }}
      >
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          title: "The Thymely Cook"
        }}
      />
    </Stack.Navigator>
  )
}

export function RecipeNav() {
  return (
    <Stack.Navigator 
      initialRouteName="SingleRecipe"
      screenOptions={{
        headerStyle: {
          backgroundColor: '#418C73',
        },
        headerTintColor: "#FFFFFF",
        headerShadowVisible: false,
        headerTitleStyle: {
          fontWeight: "bold",
          fontFamily: 'Avenir',
          fontSize: 22,
          color: "#FFFFFF"
        },
        headerBackTitleVisible: false
      }}
      >
      <Stack.Screen
        name="Favorites"
        component={Favorites}
        options={{
          title: "My Favorites"
        }}
      />
    </Stack.Navigator>
  )
}

export function FridgeNav() {
  return (
      <Stack.Navigator 
        initialRouteName="Fridge"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#418C73',
          },
          headerTintColor: "#FFFFFF",
          headerShadowVisible: false,
          headerTitleStyle: {
            fontWeight: "bold",
            fontFamily: 'Avenir',
            fontSize: 22,
            color: "#FFFFFF"
          },
          headerBackTitleVisible: false
        }}
        >
        <Stack.Screen
          name="Fridge"
          component={Fridge}
          options={{
            title: "My Fridge"
          }}
        />
        <Stack.Screen
          name="Scanner"
          component={Scanner}
          options={{
            title: "Add Your Groceries"
          }}
        />
        <Stack.Screen
          name="Recipes"
          component={Recipes}
          options={{
            title: "Suggested Recipes"
          }}
        />
        <Stack.Screen
          name="SingleRecipe"
          component={SingleRecipe}
          options={{
            title: "Recipe"
          }}
        />
        <Stack.Screen
          name="SingleFoodItem"
          component={SingleFoodItem}
          options={{
            title: "Food Details"
          }}
        />
        <Stack.Screen
          name="SearchSingleRecipe"
          component={SearchSingleRecipe}
          options={{
            title: "Recipe"
          }}
        />
        <Stack.Screen
          name="Edit"
          component={EditFood}
          options={{
            title: "Edit"
          }}
        />
        <Stack.Screen 
          name="AddFood" 
          component={AddFood}
          options={{
            title: "Add Food"
          }} />
      </Stack.Navigator>
  );
};
