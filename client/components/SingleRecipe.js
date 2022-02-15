import React, { useEffect, useState } from 'react';
import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, TouchableOpacity, Image, FlatList, SafeAreaView, Text, View, ScrollView } from 'react-native';
import { saveRecipeThunk } from "../store/singleRecipe";
import { SPOON_API_KEY } from "../../.keys";
import { MaterialCommunityIcons } from '@expo/vector-icons'
const axios = require("axios");
const spnAPI = 'https://api.spoonacular.com/recipes/';
import { useSelector, useDispatch } from "react-redux";
import { auth } from "../firebaseAuth/firebase";

export default function SingleRecipe({route, navigation}) {
  const [recipe, setRecipe] = useState( null );
  const [favorite, setFavorite] = useState( null );
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
    const uid = auth.currentUser.uid;
    console.log(uid)
    alert('saved!')
    setFavorite(recipe)
    dispatch(saveRecipeThunk(uid, recipe, image));
  };
  const goToFav = () => {
    navigation.navigate("Favorites", { 
    });
  };
  if (recipe) {
      return (
      <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scroll}>
        <View style={styles.containerRow}>
          <Image
            style={styles.recipeimg}
            source={{
            uri:image,
            }}
          />
          <TouchableOpacity style={styles.button} onPress={saveToFav} >
            {!favorite ? (<MaterialCommunityIcons style={styles.icon} name={"heart-outline"} size={32} color={"#20097B"} />
            ) : (
              <MaterialCommunityIcons style={styles.icon} name={"heart"} size={32} color={"#20097B"} />
            )

            }
            
          </TouchableOpacity>
        </View>
        <Text style={styles.title}>{name}</Text> 
        <Text style={styles.text2}>Preparation Time: { recipe.readyInMinutes } Minutes </Text>
        <Text style={styles.text}>Ingredients </Text> 
        {
            recipe.extendedIngredients.map((ingredient, index) => (<Text key={index} style={styles.text3}> { ingredient.original }</Text>))
        } 
        <Text style={styles.text}>Preparation steps: </Text> 
        {
            recipe.analyzedInstructions[0].steps ? (recipe.analyzedInstructions[0].steps.map((item, index) => ( <Text key={index} style={styles.text3}>{item.number}. {item.step}</Text>  ))) : (<Text>Loading...</Text>)
        }
        {/* <TouchableOpacity style={styles.button} >
        <Text style={styles.buttonText} onPress={goToFav}>Favorites</Text>
        </TouchableOpacity> */}
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
      </ScrollView> 
    </SafeAreaView>
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
  scroll: {
    flex: 1,
    width: "90%",
  },
  containerRow: {
    justifyContent: "center",
    width: "100%",
    flexDirection: "row",
    marginTop: 20
  },
  title: {
    fontSize: 24,
    color: "#20097B",
    marginTop: 30,
    marginBottom: 5,
    fontWeight: "bold",
    fontFamily: "Avenir",
    textAlign: 'center',
  },
  text:{
    fontSize: 24,
    color: "teal",
    marginTop: 30,
    marginBottom: 10,
    fontWeight: "bold",
    fontFamily: "Avenir",
    textAlign: 'center',

  },
  text2:{
    fontSize: 18,
    color: "#20097B",
    marginBottom: 30,
    fontWeight: "bold",
    fontFamily: "Avenir",
    textAlign: 'center',
  },
  text3:{
    fontSize: 18, 
    color: 'black',
    // fontWeight: 'bold',
    justifyContent: 'center', 
    alignItems: 'center',
    fontFamily: 'Avenir',
    padding: 5, 
  },
  tinyThyme: {
    width: 100,
    height: 100,
  },
  recipeimg: {
    width: 160,
    height: 150,
    borderRadius: 15,
    // borderColor: "lightblue",
    // borderWidth: 2,
  },
  icon: {
    shadowColor: "rgb(44, 89, 74)",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    alignItems: "flex-end",
    paddingLeft: "20%",
    paddingBottom: 10
  },
  // button: {
  //   shadowColor: "rgb(44, 89, 74)",
  //   shadowOffset: { width: -2, height: 4 },
  //   shadowOpacity: 0.3,
  //   shadowRadius: 3,
  //   alignItems: "flex-end",
  //   paddingLeft: "30%",
  //   paddingBottom: 10
  // },
  // buttonText: {
  //   color: "white",
  //   fontWeight: "bold",
  //   textAlign: "center",
  // },
  // buttonPressed: {
  //   width: 150,
  //   padding: 5,
  //   backgroundColor: "lightblue",
  //   borderWidth: 2,
  //   borderColor: "lightgrey",
  //   borderRadius: 15,
  //   alignSelf: "center",
  //   margin: 8,
  // },
});

