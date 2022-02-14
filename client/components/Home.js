/* eslint-disable no-unused-vars */
import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, Image, Text, SafeAreaView, View } from "react-native";
import Logout from "./Logout";

//navigation prop passed down documentation: https://reactnavigation.org/docs/navigation-prop
export default function Home({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <Image
        style={styles.tinyThyme}
        source={ require("../../assets/thyme-1.png")}
      />
      <Text style={styles.heading}>Team Pudding :)</Text>
      <Text style={styles.subHeading}>we're almost there!!!</Text>
      <Button
        style={styles.button}
        title="Go to Fridge"
        onPress={() => navigation.navigate("Fridge")}
      />
      
      {/* <Button
        style={styles.button}
        title="Go to Recipes"
        onPress={() => navigation.navigate("Recipes")}
      /> */}
      <Button
        style={styles.button}
        title="Go to Recipe"
        onPress={() => navigation.navigate("SingleRecipe", { id: 663641, title: "Some Cool Name" })}
      />
      <Button
        style={styles.button}
        title="Go to Favorites"
        onPress={() => navigation.navigate("Favorites",  { uid: "u087CSU21PhXkg73Rd4Uxa2ugtw2"})}
      />
      <Logout />
      <Image
        style={styles.tinyThyme}
        source={ require("../../assets/thyme-2.png")}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E6EDE9",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    margin: 10,
  },
  tinyThyme: {
    width: 150,
    height: 150,
  },
  heading: {
    fontFamily: "Avenir",
    fontSize: 38,
    color: "#20097B"
  },
  subHeading: {
    fontFamily: "Avenir",
    fontSize: 28,
    color: "#20097B"
  }
});
