import React, { useState, useEffect } from "react";
import {
  Text,
  StyleSheet,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  Alert,
  View,
  Image,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { addFoodItemThunk } from "../store/foodItems";
import { addToFridgeThunk } from "../store/fridge";
import { auth } from "../firebaseAuth/firebase";

export default function AddFood({ navigation }) {
  let dispatch = useDispatch();
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState(1);

  const addFoodItem = (foodItem) => {
    dispatch(addFoodItemThunk(foodItem));
  };
  const addToFridge = (uid, foodItem_name, amount) => {
    let userUid = auth.currentUser.uid;
    dispatch(addToFridgeThunk(userUid, name, quantity));
  };

  const handleSubmit = async () => {
    try {
      await addToFridge(auth.currentUser.uid, name, quantity);
    } catch (error) {
      console.log(error);
    }
    Alert.alert(`Successfully added ${name} to your fridge!`);
  };
  return (
    <SafeAreaView style={styles.container}>
      <SafeAreaView style={styles.item}>
        <Text style={styles.heading}>Add Your Food Here</Text>
        <Text style={styles.itemText2}>Food Name:</Text>
        <TextInput
          style={styles.input}
          placeholder="I.E. Russet Potato"
          value={name}
          onChangeText={(name) => setName(name)}
        />
        <Image
          style={styles.tinyThyme}
          source={{
            uri:
              "https://us.123rf.com/450wm/eridanka/eridanka2103/eridanka210300026/165315737-a-sprig-of-rosemary-hand-drawn-sketch-style-illustration-design-element.jpg?ver=6",
          }}
        />
        <Text style={styles.itemText2}>Quantity:</Text>
        <TextInput
          style={styles.input}
          placeholder="How Much Do You Have?"
          value={quantity}
          onChangeText={(quantity) => setQuantity(quantity)}
        />
      </SafeAreaView>
      <TouchableOpacity style={styles.touchable} onPress={handleSubmit}>
        <Text style={{ color: "rgb(65, 140, 115)" }}>Submit</Text>
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
    flexDirection: "column",
  },
  item: {
    shadowColor: "rgb(44, 89, 74)",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    backgroundColor: "white",
    width: 300,
    height: "60%",
    borderRadius: 30,
    padding: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  touchable: {
    shadowColor: "rgb(44, 89, 74)",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    backgroundColor: "white",
    padding: 16,
    borderRadius: 30,
    flexDirection: "row",
    margin: 20,
  },
  input: {
    shadowColor: "rgb(44, 89, 74)",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    backgroundColor: "white",
    padding: 16,
    borderRadius: 30,
    flexDirection: "row",
    margin: 10,
  },
  tinyThyme: {
    width: 100,
    height: 100,
  },
  title: {
    fontSize: 16,
    color: "rgb(65, 140, 115)",
    fontWeight: "bold",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "Avenir",
  },
  heading: {
    fontSize: 25,
    margin: 15,
    color: "rgb(65, 140, 115)",
    fontWeight: "bold",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "Avenir",
  },
  itemText2: {
    fontSize: 16,
    color: "rgb(65, 140, 115)",
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
    fontFamily: "Avenir",
  },
});
