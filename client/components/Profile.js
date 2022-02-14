import React from 'react';
import { StyleSheet, Text, View } from "react-native";
import Logout from './Logout';

// @Elena grab the route parameter
export default function Profile({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Profile Page!</Text>
      <Logout />
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E6EDE9",
    alignItems: "center",
    justifyContent: "center",
  },
  text:{
    fontSize: 22, 
    fontWeight: 'bold',
    justifyContent: 'center', 
    alignItems: 'center',
    color: 'teal',
    fontFamily: 'Avenir',
    paddingTop: 20,
  },
  tinyThyme: {
    width: 60,
    height: 60,
  },
});