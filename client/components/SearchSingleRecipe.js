import React, { useEffect, useState } from 'react';
const axios = require("axios");
import { Button, StyleSheet, Image, Text, View } from "react-native";
//import {SPOON_API_KEY} from "../../.keys"

const spnAPI = 'https://api.spoonacular.com/recipes/'

// @Elena grab the route parameter
export default function SearchSingleRecipe({route}) {

  // @Elena take these three functions over
  const [recipe, setRecipe] = useState( null );
  const id = route.params.id
  const name = route.params.title

  // @Elena here is the api route
  useEffect(() => {
    const fetchRecipe = async () => {
      const res = await axios.get(
        `${spnAPI}${id}/information?includeNutrition=false&apiKey=${SPOON_API_KEY}`
      )
      setRecipe(res.data)
    };
    fetchRecipe();
  }, []);

  // @Elena put the parameters you want to use here!
  if (recipe) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>{ name }</Text>
        <Text style={styles.text}>{ recipe.readyInMinutes } Minutes </Text>
        <Text style={styles.text}>Serves { recipe.servings }</Text>
        { recipe.extendedIngredients.map((ingredient) => (<Text style={styles.text2}>{ ingredient.name }</Text>)) }
        <Text style={styles.text2}></Text>
        <Text style={styles.text2}>{ recipe.instructions }</Text>
      </View> 
    )
  } else {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    )
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
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
  text2:{
    fontSize: 16, 
    color: 'green',
    //fontWeight: 'bold',
    justifyContent: 'center', 
    alignItems: 'center',
    fontFamily: 'Avenir',
    padding: 5, 
  },
  tinyThyme: {
    width: 60,
    height: 60,
  },
});







