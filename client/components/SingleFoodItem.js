/* eslint-disable no-unused-vars */
import {
  Text,
  SafeAreaView,
  StyleSheet,
  Button,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useFocusEffect } from "@react-navigation/native";
import React, { useState, useEffect } from "react";
import { getFridgeItemThunk } from "../store/fridgeItem";
const axios = require("axios");

export default function SingleFoodItem({ route, navigation }) {
  const [foodObj, setFoodObj] = useState(null);
  const dispatch = useDispatch();
  const fridgeSelector = useSelector((state) => state.fridgeReducer);
  const foodItemSelector = useSelector((state) => state.foodItemReducer);
  let id = route.params.foodItemId;
  let userUid = route.params.userUid;
  let quantity = route.params.quantity;

  //hook usedispatch function
  const viewFoodItem = (foodItemId, userUid) => {
    dispatch(getFridgeItemThunk(foodItemId, userUid));
  };

  //immediate page render
  useEffect((foodItemId, userUid) => {
    viewFoodItem(route.params.foodItemId, route.params.userUid);
    setFoodObj(
      fridgeSelector.foodItems.find(
        (element) => element.id === route.params.foodItemId
      )
    );
  }, []);

  const onPressRecipe = () =>
    navigation.navigate("Recipes", {
      name: foodObj.foodItem_name,
      foodItemId: foodObj.foodItemId,
      userUid: userUid,
    });
  return (
    <SafeAreaView style={styles.container}>
      {!foodObj ? (
        <Text> Loading... </Text>
      ) : (
          <TouchableOpacity style={styles.item}>
            <Text style={styles.heading}>{foodObj.foodItem_name}</Text>
            <View>
              <Text style={styles.textSubheader}> Quantity: {quantity}</Text>
              <Image
                style={styles.tinyThyme}
                source={require("../../assets/thyme-1.png")}
              />
            </View>
            <Text style={styles.heading}></Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity style={styles.button} onPress={onPressRecipe}>
          <Text style={styles.buttonText}>Recipe Suggestions</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() =>
            navigation.navigate("Edit", {
              userUid,
              id,
              name: foodObj.foodItem_name,
            })
          }
        >
        <Text style={styles.buttonText}>Edit</Text>
      </TouchableOpacity>
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
  item: {
    shadowColor: "#2C594A",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    backgroundColor: "#FFFFFF",
    width: "80%",
    paddingLeft: 20,
    paddingRight: 20,
    borderRadius: 30,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
  },
  heading: {
    fontSize: 32,
    paddingTop: 30,
    color: "#20097B",
    fontWeight: "bold",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "Avenir",
  },
  textSubheader: {
    fontSize: 20,
    margin: 20,
    fontWeight: "bold",
    color: "teal",
    fontFamily: "Avenir",
    textAlign: 'center',
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    justifyContent: "center",
    margin: 16,
    marginLeft: 40,
    marginRight: 40
  },
  button: {
    backgroundColor: "#418C73",
    borderRadius: 30,
    alignSelf: "center",
    shadowColor: "#2C594A",
    shadowOffset: { width: -4, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    marginTop: 20,
  },
  tinyThyme: {
    width: 100,
    height: 100,
    alignSelf: "center"
  },
});
