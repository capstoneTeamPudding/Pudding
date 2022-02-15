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
        {/* <Text style={styles.heading}>Add Your Food Here</Text> */}
        <Text style={styles.textSubheader}>Food Name:</Text>
        <TextInput
          style={styles.input}
          autoFocus={true}
          placeholder="i.e. Tomato"
          fontSize={22}
          value={name}
          onChangeText={(name) => setName(name)}
        />
        <Text style={styles.textSubheader}>Quantity:</Text>
        <TextInput
          style={styles.input}
          placeholder="How Much?"
          fontSize={22}
          value={quantity}
          onChangeText={(quantity) => setQuantity(quantity)}
        />
        {/* <Image
          style={styles.tinyThyme}
          source={ require("../../assets/thyme-1.png")}
        /> */}
      </SafeAreaView>
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Fridge")}>
        <Text style={styles.buttonText}>Fridge</Text>
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
    width: "90%",
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
    backgroundColor: "#E6EDE9",
    flexDirection: "row",
    padding: 8,
    marginBottom: 30,
    width: "80%",
    fontSize: 20,
    color: "#20097B",
    borderBottomColor: "#418C73",
    borderBottomWidth: 2,
  },
  // input: {
  //   shadowColor: "rgb(44, 89, 74)",
  //   shadowOffset: { width: -2, height: 4 },
  //   shadowOpacity: 0.2,
  //   shadowRadius: 3,
  //   backgroundColor: "white",
  //   padding: 16,
  //   borderRadius: 30,
  //   flexDirection: "row",
  //   margin: 10,
  // },
  tinyThyme: {
    width: 100,
    height: 100,
    shadowColor: "rgb(44, 89, 74)",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  title: {
    fontSize: 16,
    color: "rgb(65, 140, 115)",
    fontWeight: "bold",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "Avenir",
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
    margin: 20,
  },
  textSubheader: {
    fontSize: 20,
    margin: 20,
    fontWeight: "bold",
    color: "teal",
    fontFamily: "Avenir",
    textAlign: 'center',
  },
});
