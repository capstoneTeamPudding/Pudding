import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { HomeNav, FridgeNav, RecipeNav, ProfileNav } from "./Navigators";
import { MaterialCommunityIcons } from '@expo/vector-icons'


const Tab = createBottomTabNavigator();

export default function NavigationBar() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'RecipeNav') {
            iconName = 'heart';
          } else if (route.name === 'HomeNav') {
            iconName = 'chef-hat'; 
          } else if (route.name === 'FridgeNav') {
            iconName = 'fridge';
          } else if (route.name === 'ProfileNav') {
            iconName = 'account';
          } 

          // You can return any component that you like here!
          return <MaterialCommunityIcons name={iconName} size={32} color={color} />;
        },
        tabBarShowLabel: false,
        tabBarStyle: { height: 90, backgroundColor: "#D8D8D8"},
        tabBarActiveTintColor: '#418C73',
        tabBarInactiveTintColor: '#919191',
        headerShown: false
      })}
      >
      <Tab.Screen name="HomeNav" component={HomeNav} />
      <Tab.Screen name="FridgeNav" component={FridgeNav} />
      <Tab.Screen name="RecipeNav" component={RecipeNav} />
      <Tab.Screen name="ProfileNav" component={ProfileNav} />
    </Tab.Navigator>
  );
}

// const styles = StyleSheet.create({
//   icon: {
//     shadowColor: "rgb(44, 89, 74)",
//     shadowOffset: { width: -2, height: 4 },
//     shadowOpacity: 0.3,
//     shadowRadius: 3,
//   },
// });