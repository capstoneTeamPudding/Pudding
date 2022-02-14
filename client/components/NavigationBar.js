import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StyleSheet, Text, View } from "react-native";
import Fridge from "./Fridge";
import Home from "./Home";
import Recipes from "./Recipes";
import { MaterialCommunityIcons } from '@expo/vector-icons'

const Tab = createBottomTabNavigator();

export default function NavigationBar() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'Recipes') {
            iconName = focused ? 'book' : 'book-outline';
          } else if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Fridge') {
            iconName = focused ? 'fridge' : 'fridge-outline';
          }
          // } else if (route.name === 'Profile') {
          //   iconName = focused ? 'account' : 'account-outline';
          // } 

          // You can return any component that you like here!
          return <MaterialCommunityIcons style={styles.icon} name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#418C73',
        tabBarInactiveTintColor: '#B4B4B4',
        
      })}
      >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Recipes" component={Recipes} />
      <Tab.Screen name="Fridge" component={Fridge} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  icon: {
    shadowColor: "rgb(44, 89, 74)",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
});