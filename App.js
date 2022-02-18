/* eslint-disable no-unused-vars */
import * as React from "react";
import store from "./client/store";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-redux";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StyleSheet, Text, View, LogBox } from "react-native";
import Login from "./client/components/Login";
import Registration from "./client/components/Registration";
import NavigationBar from "./client/components/NavigationBar";

const Stack = createNativeStackNavigator();

const App = () => {
  LogBox.ignoreAllLogs();
  return (
    <Provider store={store}>
      <AppSource />
    </Provider>
  );
};

const AppSource = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen
          name="Login"
          component={Login}
          options={{
            headerShown: false,
            headerLeft: () => false,
          }}
        />
        {/* <Stack.Screen name="Profile" component={Profile}/> */}
        <Stack.Screen
          name="Registration"
          component={Registration}
          options={{
            headerShown: false,
            headerLeft: () => false,
          }}
        />
        <Stack.Screen
          name="NavigationBar"
          component={NavigationBar}
          options={{
            title: "The Thymely Cook",
            headerLeft: () => false,
          }}
        />
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
