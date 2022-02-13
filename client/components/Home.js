/* eslint-disable no-unused-vars */
import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, Image, Text, View } from "react-native";
import Logout from "./Logout";

//navigation prop passed down documentation: https://reactnavigation.org/docs/navigation-prop
export default function Home({ navigation }) {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Image
        style={styles.tinyThyme}
        source={{
          uri:
            "https://us.123rf.com/450wm/eridanka/eridanka2103/eridanka210300026/165315737-a-sprig-of-rosemary-hand-drawn-sketch-style-illustration-design-element.jpg?ver=6",
        }}
      />
      <Text>Dummy Navigation Buttons</Text>
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
      {/* // <NavigationBar /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
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
});
