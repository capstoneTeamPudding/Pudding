import React, { useEffect, useState } from 'react';
import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, TouchableOpacity, Image, FlatList, SafeAreaView, Text, View, ScrollView } from 'react-native';
import { saveRecipeThunk } from "../store/singleRecipe";
import { SPOON_API_KEY } from "../../.keys";
const axios = require("axios");
const spnAPI = 'https://api.spoonacular.com/recipes/';
import { useSelector, useDispatch } from "react-redux";

export default function SingleRecipe({route, navigation}) {
  const [recipe, setRecipe] = useState( null );
  const id = route.params.id
  const name = route.params.title
  const image = route.params.image
  const dispatch = useDispatch();

  // const { recipeSteps } = useSelector((state) => {
  //     return {
  //         recipeSteps: state.recipeReducer.recipe.steps,
  //     }
  // });  
  //my old
  
  useEffect(() => {
    console.log("route",route.params)
    const fetchRecipe = async () => {
      const { data: recipe } = await axios.get(`${spnAPI}${id}/information?includeNutrition=false&apiKey=${SPOON_API_KEY}`);
      setRecipe(recipe)
    };
    fetchRecipe(); 
  }, 
  []);
  const saveToFav = () => {
    alert('saved!')
    dispatch(saveRecipeThunk("u087CSU21PhXkg73Rd4Uxa2ugtw2", recipe, image));
  };
  const goToFav = () => {
    navigation.navigate("Favorites", { 
    });
  };
  if (recipe) {
      return (
      <ScrollView>
      <View style={styles.container}>
      
        
        <Text style={styles.text}>{name}</Text> 
        <Image
          style={styles.recipeimg}
          source={{
          uri:image,
          }}
        />
        <Text style={styles.text2}>{ recipe.readyInMinutes } Minutes </Text>
        {
            recipe.extendedIngredients.map((ingredient) => (<Text style={styles.text3}> { ingredient.original }</Text>))
        } 
        <Text style={styles.text2}>Preparation steps: </Text> 
        {
            recipe.analyzedInstructions[0].steps ? (recipe.analyzedInstructions[0].steps.map((item, index) => ( <Text key={index} style={styles.text3}>{item.number}. {item.step}</Text>  ))) : (<Text>Loading...</Text>)
        }
        <TouchableOpacity style={styles.button} >
        <Text style={styles.buttonText} onPress={saveToFav}>Save to favorites</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} >
        <Text style={styles.buttonText} onPress={goToFav}>Favorites</Text>
        </TouchableOpacity>
        <Image
          style={styles.tinyThyme}
          source={{
          uri:
              "https://us.123rf.com/450wm/eridanka/eridanka2103/eridanka210300026/165315737-a-sprig-of-rosemary-hand-drawn-sketch-style-illustration-design-element.jpg?ver=6",
          }}
        />
      </View> 
    </ScrollView>
  ) } else {
      return (
        <View>
          <Text>Loading...</Text>
        </View>
      )
  
}}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "whitesmoke",
    alignItems: "center",
    justifyContent: "center",
    
  },
  
  text:{
    fontSize: 20, 
    fontWeight: 'bold',
    justifyContent: 'center', 
    alignItems: 'center',
    color: 'teal',
    fontFamily: 'Avenir',
    paddingTop: 40,
  },
  text2:{
    fontSize: 16, 
    fontWeight: 'bold',
    justifyContent: 'center', 
    alignItems: 'center',
    color: 'darkblue',
    fontFamily: 'Avenir',
    paddingTop: 20,
  },
  text3:{
    fontSize: 14, 
    color: 'green',
    //fontWeight: 'bold',
    justifyContent: 'center', 
    alignItems: 'center',
    fontFamily: 'Avenir',
    padding: 5, 
  },
  tinyThyme: {
    width: 40,
    height: 40,
  },
  recipeimg: {
    width: 100,
    height: 100,
    borderColor: "lightblue",
    borderRadius: 15,
    borderWidth: 5,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  button: {
    width: 150,
    padding: 5,
    backgroundColor: "lightgrey",
    borderWidth: 2,
    borderColor: "lightblue",
    borderRadius: 15,
    alignSelf: "center",
    margin: 8,
  },
  buttonPressed: {
    width: 150,
    padding: 5,
    backgroundColor: "lightblue",
    borderWidth: 2,
    borderColor: "lightgrey",
    borderRadius: 15,
    alignSelf: "center",
    margin: 8,
  },
});

