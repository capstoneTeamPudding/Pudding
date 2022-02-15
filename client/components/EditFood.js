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

  const deleteHandle = (foodItemId, userUid) => {
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
        <View style={styles.container}>
          <View style={styles.item}>
            <Text style={styles.heading}>{title}</Text>
            <Text style={styles.textSubheader}>Edit Name:</Text>
            <TextInput
              style={styles.input}
              placeholder="Can You Think of A Better Name?"
              value={name}
              onChangeText={(name) => setName(name)}
            />
            <Text style={styles.textSubheader}>Edit Quantity:</Text>
            <TextInput
              style={styles.input}
              placeholder="How Much Do You Have?"
              value={amount}
              onChangeText={(amount) => setAmount(amount)}
            />
            {/* <Image
              style={styles.tinyThyme}
              source={{
                uri:
                  "https://us.123rf.com/450wm/eridanka/eridanka2103/eridanka210300026/165315737-a-sprig-of-rosemary-hand-drawn-sketch-style-illustration-design-element.jpg?ver=6",
              }}
            /> */}
          </View>
          {/* <Text>
            {"  "}
            {"  "}
          </Text> */}
          <View>
            <TouchableOpacity style={styles.button} onPress={handleName}>
              <Text style={styles.buttonText}>Update Item</Text>
            </TouchableOpacity>
            {/* <TouchableOpacity style={styles.button} onPress={handleSubmit}>
              <Text style={styles.buttonText}>Submit Quantity</Text>
            </TouchableOpacity> */}
          </View>
          <View style={styles.footerView}>
            <TouchableOpacity style={styles.button} onPress={deleteHandle}>
              <Text style={styles.buttonText}>Delete From Fridge</Text>
            </TouchableOpacity>
          </View>
        </View>
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
  containerRow: {
    backgroundColor: "#E6EDE9",
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
    marginTop: 30
  },
  input: {
    backgroundColor: "#E6EDE9",
    flexDirection: "row",
    padding: 8,
    marginBottom: 30,
    width: 260,
    fontSize: 20,
    color: "#20097B",
    borderBottomColor: "#418C73",
    borderBottomWidth: 2,
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
  heading: {
    fontSize: 32,
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
  tinyThyme: {
    width: 100,
    height: 100,
  },
  footerView: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 10,
  },
  // title: {
  //   fontSize: 16,
  //   color: "rgb(65, 140, 115)",
  //   fontWeight: "bold",
  //   justifyContent: "center",
  //   alignItems: "center",
  //   fontFamily: "Avenir",
  // },
  // touchable: {
  //   shadowColor: "rgb(44, 89, 74)",
  //   shadowOffset: { width: -2, height: 4 },
  //   shadowOpacity: 0.2,
  //   shadowRadius: 3,
  //   backgroundColor: "white",
  //   padding: 16,
  //   borderRadius: 30,
  //   flexDirection: "row",
  //   margin: 40,
  // },
  // itemText2: {
  //   fontSize: 16,
  //   color: "rgb(65, 140, 115)",
  //   justifyContent: "center",
  //   flexDirection: "row",
  //   alignItems: "center",
  //   fontFamily: "Avenir",
  // },
});
