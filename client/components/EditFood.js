//if route.params.userId, then show quantity?
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
import { updateFoodItemThunk } from "../store/foodItem";
import {
  getFridgeItemThunk,
  deleteFoodItemFromFridgeThunk,
  updateFridgeThunk,
} from "../store/fridgeItem";

export default function EditFood({ route, navigation }) {
  let dispatch = useDispatch();
  const [name, setName] = useState("");
  const [title, setTitle] = useState(route.params.name);
  const [amount, setAmount] = useState(null);
  const fridgeSelector = useSelector((state) => state.fridgeReducer);
  let uid = route.params.userUid;
  let id = route.params.id;
  let nameFood = route.params.name;

  const viewFoodItem = (foodItemId, userUid) => {
    dispatch(getFridgeItemThunk(foodItemId, userUid));
  };

  const editFridgeItem = (fooditem) => {
    dispatch(updateFridgeThunk(fooditem));
  };

  const editFoodItem = (fooditem) => {
    dispatch(updateFoodItemThunk(fooditem));
  };

  const handleName = async () => {
    try {
      await editFoodItem({ id: id, foodItem_name: name });
      setTitle(name);
      Alert.alert(`Successfully updated ${name}!`);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = (userUid, foodItemId, quantity) => {
    editFridgeItem({ userUid: uid, foodItemId: id, quantity: amount });
    Alert.alert(`Successfully updated ${name}!`);
  };

  const deleteFromFridge = (foodItemId, userUid) => {
    dispatch(deleteFoodItemFromFridgeThunk(foodItemId, userUid));
  };

  const deleteHandle = async (foodItemId, userUid) => {
    deleteFromFridge(id, uid);
  };

  useEffect(() => {
    viewFoodItem(id, uid);
    setName(nameFood);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {!fridgeSelector ? (
        <Text> Loading... </Text>
      ) : (
        <SafeAreaView style={styles.container}>
          <SafeAreaView style={styles.item}>
            <Text style={styles.heading}>{title}</Text>
            <Text style={styles.itemText2}>Edit Name:</Text>
            <TextInput
              style={styles.input}
              placeholder="Can You Think of A Better Name?"
              value={name}
              onChangeText={(name) => setName(name)}
            />
            <TouchableOpacity style={styles.touchable} onPress={handleName}>
              <Text style={{ color: "rgb(65, 140, 115)" }}>Submit Name</Text>
            </TouchableOpacity>
            <Image
              style={styles.tinyThyme}
              source={{
                uri:
                  "https://us.123rf.com/450wm/eridanka/eridanka2103/eridanka210300026/165315737-a-sprig-of-rosemary-hand-drawn-sketch-style-illustration-design-element.jpg?ver=6",
              }}
            />
            <Text style={styles.itemText2}>Edit Quantity:</Text>
            <TextInput
              style={styles.input}
              placeholder="How Much Do You Have?"
              value={amount}
              onChangeText={(amount) => setAmount(amount)}
            />
            <TouchableOpacity style={styles.touchable} onPress={handleSubmit}>
              <Text style={{ color: "rgb(65, 140, 115)" }}>
                Submit Quantity
              </Text>
            </TouchableOpacity>
          </SafeAreaView>
          <Text>
            {"  "}
            {"  "}
          </Text>
          <TouchableOpacity style={styles.touchable} onPress={deleteHandle}>
            <Text style={{ color: "red" }}>Delete From Fridge</Text>
          </TouchableOpacity>
        </SafeAreaView>
      )}
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
    margin: 40,
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
