import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
  SafeAreaView,
  Text,
  View,
  Button,
} from "react-native";
const axios = require("axios");
import { SPOON_API_KEY } from "../../.keys";
import SingleRecipe from "./SingleRecipe";


const spnAPI = "https://api.spoonacular.com/recipes/";

const Recipe = ({ title, image, onPress }) => (
  <TouchableOpacity onPress={onPress} style={styles.item}>
    <Image style={styles.thumbnail} source={{ uri: image }} />
    <Text style={styles.textSubheader}>{title}</Text>
  </TouchableOpacity>
);

const Recipes = ({ route, navigation }) => {
  const [recipes, setRecipes] = useState([]);
  const [currentRecipe, setCurrentRecipe] = useState(null);
  let ingredient = route.params.name;
  let foodItemId = route.params.foodItemId;
  let userUid = route.params.userUid;

  useEffect(() => {
    const fetchRecipes = async () => {
      const res = await axios.get(
        `${spnAPI}complexSearch?query=${ingredient}&number=4&apiKey=${SPOON_API_KEY}`
      );
      setRecipes(res.data.results);
    };
    fetchRecipes();
  }, []);

  const navigateSingleRecipe = (recipeId, recipeName, image) => {
    navigation.navigate("SingleRecipe", {
      id: recipeId,
      title: recipeName,
      image: image,
    });
  };

  const renderRecipe = ({ item }) => {
    return (
      <Recipe
        title={item.title}
        image={item.image}
        onPress={() => {
          setCurrentRecipe(item.id);
          navigateSingleRecipe(item.id, item.title, item.image);
        }}
      />
    );
  };
  //cannot figure out how to get loading OR the message to show
  return (
    <View style={styles.container}>
      {recipes.length === null ? (
        <View style={styles.list}>
          <Text style={styles.title}>Loading... </Text>
        </View>
      ) : recipes.length > 1 ? (
        <SafeAreaView style={styles.list}>
          <FlatList
            data={recipes}
            renderItem={renderRecipe}
            keyExtractor={(item) => item.id}
            extraData={currentRecipe}
          />
        </SafeAreaView>
      ) : (
        <View style={styles.list}>
          <Text style={styles.title}>
            Hey, we're sorry, it looks like we can't find anything with that
            ingredient name! You'll likely get better results if you shorten the
            name!
          </Text>
          <Text style={styles.title}>
            Here's an example! Changing "Trader Joe's Organic Tahini 10.6 oz" to
            simply "tahini"
          </Text>
          <Button
            style={styles.button}
            title="Go Back to Ingredient and Try Again"
            onPress={() =>
              navigation.navigate("SingleFoodItem", { foodItemId, userUid })
            }
          />
        </View>
      )}
    </View>
  );
};

export default Recipes;

//styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E6EDE9",
    alignItems: "center",
    justifyContent: "center",
  },
  list: {
    flex: 1,
    width: "90%",
    paddingTop: 100,
  },
  item: {
    shadowColor: "rgb(44, 89, 74)",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    backgroundColor: "white",
    padding: 20,
    borderRadius: 30,
    marginVertical: 8,
    marginHorizontal: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  textSubheader: {
    fontSize: 20,
    margin: 10,
    fontWeight: "bold",
    color: "#20097B",
    fontFamily: "Avenir",
    textAlign: 'center',
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
