
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Image,
  FlatList,
  SafeAreaView,
  Text,
  View,
} from "react-native";
const axios = require("axios");
import { SPOON_API_KEY } from "@env";

const spnAPI = "https://api.spoonacular.com/recipes/";

const Recipes = () => {
  //set state (locally). useState returns an array with 2 items: first is the name of the state variable
  //(recipes), second is the function to change/set variable to the state. With the dummy data RESULTS,
  //I am setting the RESULTS object to the recipes variable so i can access the data
  const [recipes, setRecipes] = useState([]);
  //where you preform side effects, including data fetching, manually changing the DOM, using history (also available as a hook). Basically componentDidMount, componentDidUpdate and componentWillUnmount combined.
  useEffect(() => {
    const fetchRecipes = async () => {
      const res = await axios.get(
        `${spnAPI}complexSearch?query=tomatos&number=4&apiKey=${SPOON_API_KEY}`
      );
      setRecipes(res.data.results);
    };
    fetchRecipes();
  }, []);

  const Recipe = ({ title, image }) => (
    <View style={styles.item}>
      <Image style={styles.thumbnail} source={{ uri: image }} />
      <Text style={styles.title}>{title}</Text>
    </View>
  );

  const renderRecipe = ({ item }) => (
    <Recipe title={item.title} image={item.image} />
  );

  return (
    <View style={styles.container}>
      {recipes.length === null ? (
        <View>
          <Text>Loading...</Text>
        </View>
      ) : (
        <SafeAreaView style={styles.list}>
          <FlatList
            data={recipes}
            renderItem={renderRecipe}
            keyExtractor={(item) => item.id}
          />
        </SafeAreaView>
      )}
    </View>
  );
};

export default Recipes;

//styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#eee",
    alignItems: "center",
    justifyContent: "center",
  },
  list: {
    flex: 1,
    width: "90%",
    paddingTop: 100,
  },
  item: {
    backgroundColor: "#dce6df",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 20,
    borderColor: "teal",
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    color: "teal",
    paddingTop: 5,
    fontWeight: "bold",
    fontFamily: "Avenir",
  },
  thumbnail: {
    width: 150,
    height: 150,
    borderRadius: 10,
  },
});
