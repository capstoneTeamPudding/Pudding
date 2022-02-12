import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
  SafeAreaView,
  Text,
  View,
} from "react-native";
const axios = require("axios");
 import { SPOON_API_KEY } from "../../.keys";
import SingleRecipe from "./SingleRecipe";


const spnAPI = "https://api.spoonacular.com/recipes/";

const Recipe = ({ title, image, onPress }) => (
  <TouchableOpacity onPress={onPress} style={styles.item}>
    <Image style={styles.thumbnail} source={{ uri: image }} />
    <Text style={styles.title}>{title}</Text>
  </TouchableOpacity>
);

const Recipes = ({ route, navigation }) => {
  //set state (locally). useState returns an array with 2 items: first is the name of the state variable
  //(recipes), second is the function to change/set variable to the state. With the dummy data RESULTS,
  //I am setting the RESULTS object to the recipes variable so i can access the data
  const [recipes, setRecipes] = useState([]);
  const [currentRecipe, setCurrentRecipe] = useState(null);
  //console.log(route)
  let ingredient = route.params.name;
  //where you preform side effects, including data fetching, manually changing the DOM, using history (also available as a hook). Basically componentDidMount, componentDidUpdate and componentWillUnmount combined.
  useEffect(() => {
    const fetchRecipes = async () => {
      //console.log(`${spnAPI}complexSearch?query=${ingredient}&number=4&apiKey=${SPOON_API_KEY}`)
      const res = await axios.get(
        `${spnAPI}complexSearch?query=${ingredient}&number=4&apiKey=${SPOON_API_KEY}`
      );
      setRecipes(res.data.results);
      //console.log(res.data.results)
    };
    fetchRecipes();
  }, []);
  
  const navigateSingleRecipe = (recipeId, recipeName, image) => {
    // @Elena make sure you change "SearchSingleRecipe" to the name of your Component
    navigation.navigate("SingleRecipe", { id: recipeId, title: recipeName, image: image });
  };

  const renderRecipe = ({ item }) => {
    return (
      <Recipe
        title={item.title}
        image={item.image}
        onPress={() => {
          setCurrentRecipe(item.id)
          navigateSingleRecipe(item.id, item.title, item.image)
        }}
      />
    );
  };

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
            extraData={currentRecipe}
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
    //backgroundColor: "#dce6df",
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