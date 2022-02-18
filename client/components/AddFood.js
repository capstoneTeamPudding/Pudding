import React, { useState } from "react";
import {
  Text,
  StyleSheet,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useDispatch } from "react-redux";
import { addFoodItemThunk } from "../store/foodItems";
import { addToFridgeThunk } from "../store/fridge";
import { auth } from "../firebaseAuth/firebase";
import { HideKeyboard } from "./EditFood";

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
    Alert.alert(`Successfully added ${name} to your fridge!`, );
    navigation.navigate("Fridge");
  };
  return (
    <HideKeyboard>
      <SafeAreaView style={styles.container}>
        <SafeAreaView style={styles.item}>
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
        </SafeAreaView>
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </HideKeyboard>
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
    shadowColor: "#2C594A",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    width: "90%",
    backgroundColor: "#FFFFFF",
    borderRadius: 30,
    padding: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  textSubheader: {
    fontSize: 20,
    margin: 20,
    fontWeight: "bold",
    color: "teal",
    fontFamily: "Avenir",
    textAlign: "center",
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
  tinyThyme: {
    width: 100,
    height: 100,
    shadowColor: "rgb(44, 89, 74)",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    justifyContent: "center",
    margin: 16,
    marginLeft: 40,
    marginRight: 40,
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
});
