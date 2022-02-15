/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Image, Text, SafeAreaView, FlatList, View, TouchableOpacity } from "react-native";
import Logout from "./Logout";
const axios = require("axios");
import { SPOON_API_KEY } from "../../.keys";


const spnAPI = "https://api.spoonacular.com/recipes/";


const Recipe = ({ title, image, onPress }) => (
  <TouchableOpacity onPress={onPress} style={styles.item}>
    <Image style={styles.thumbnail} source={{ uri: image }} />
    <Text style={styles.textSubheader}>{title}</Text>
  </TouchableOpacity>
);

const Home = ({ navigation }) => {
  const [recipes, setRecipes] = useState([]);
  const [currentRecipe, setCurrentRecipe] = useState(null);

  useEffect(() => {
    const fetchRecipes = async () => {
      const res = await axios.get(
        `${spnAPI}random?number=1&tags=vegetarian,dessert&apiKey=${SPOON_API_KEY}`
      );
      setRecipes(res.data.recipes);
      console.log(recipes)
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
    <SafeAreaView style={styles.container}> 
      {recipes.length === null ? (
        <View style={styles.list}>
          <Text style={styles.title}>Loading... </Text>
        </View>
      ) : (
        <SafeAreaView style={styles.list}>
          <Text style={styles.title}>
            Welcome! 
          </Text>
          <FlatList
            data={recipes}
            renderItem={renderRecipe}
            keyExtractor={(item) => item.id}
            extraData={currentRecipe}
          />
          <View style={styles.containerRow}>
            <Image
              style={styles.tinyThyme}
              source={ require("../../assets/thyme-1.png")}
            />
            <Image
              style={styles.tinyThyme}
              source={ require("../../assets/thyme-2.png")}
            />
            <Image
              style={styles.tinyThyme}
              source={ require("../../assets/thyme-1.png")}
            />
          </View>
        </SafeAreaView>
      )}
    </SafeAreaView>
  );
};

export default Home;

//styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E6EDE9",
    alignItems: "center",
    justifyContent: "center",
  },
  containerRow: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    flexDirection: "row",
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
    color: "#20097B",
    marginTop: 50,
    marginBottom: 30,
    fontWeight: "bold",
    fontFamily: "Avenir",
    textAlign: 'center',
  },
  thumbnail: {
    width: 150,
    height: 150,
    borderRadius: 10,
  },
  tinyThyme: {
    width: 120,
    height: 150,
    opacity: .2,
  },
  container: {
    flex: 1,
    backgroundColor: "#E6EDE9",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    margin: 10,
  },
});