/* eslint-disable no-unused-vars */
import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import {
  Text,
  SafeAreaView,
  StyleSheet,
  Button,
  FlatList,
  TouchableOpacity,
  Image,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { getFridgeThunk, deleteFridgeThunk } from "../store/fridge";
import { auth } from "../firebaseAuth/firebase";

export default function Fridge({ navigation }) {
  const [DATA, setDATA] = useState();
  const dispatch = useDispatch();
  const fridgeSelector = useSelector((state) => state.fridgeReducer);

  const viewFridge = (userUid) => {
    dispatch(getFridgeThunk(userUid));
  };

  useEffect((userUid) => {
    const uid = auth.currentUser.uid;
    viewFridge(uid);
    if (fridgeSelector.foodItems === null) {
      setDATA([]);
    } else if (fridgeSelector.foodItems) {
      setDATA(fridgeSelector.foodItems);
    }
  }, []);

  const FridgeFlatList = ({ item, onPress, backgroundColor, textColor }) => (
    <TouchableOpacity onPress={onPress} style={[styles.item, backgroundColor]}>
      {/* <Image
        style={styles.tinyThyme}
        source={{
          uri:
            "https://us.123rf.com/450wm/eridanka/eridanka2103/eridanka210300026/165315737-a-sprig-of-rosemary-hand-drawn-sketch-style-illustration-design-element.jpg?ver=6",
        }}
      /> */}
      <Text style={[styles.title, textColor]}>{item.foodItem_name}</Text>
      <Text style={styles.itemText2}> Amount: 1 </Text>
    </TouchableOpacity>
  );

  const navigationOpacity = (foodItemId, userUid, quantity) => {
    navigation.navigate("SingleFoodItem", { foodItemId, userUid, quantity });
  };

  const renderFridgeFlatList = ({ item }) => {
    return (
      <FridgeFlatList
        item={item}
        onPress={() => {
          navigationOpacity(item.id, auth.currentUser.uid, 1);
        }}
      />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <SafeAreaView style={styles.containerRow}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("AddFood")}
        >
          <Text style={styles.buttonText}>Add Food</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Scanner")}
        >
          <Text style={styles.buttonText}>Scan</Text>
        </TouchableOpacity>
      </SafeAreaView>
      {!DATA ? (
        <Text style={styles.title}>
          {" "}
          Sorry your fridge is EMPTY! Try adding something to your fridge{" "}
        </Text>
      ) : (
        <SafeAreaView style={styles.list}>
          <FlatList
            data={DATA}
            renderItem={renderFridgeFlatList}
            keyExtractor={(item) => item.id}
            extraData={fridgeSelector}
          />
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
    width: "100%",
  },
  containerRow: {
    backgroundColor: "#E6EDE9",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    flexDirection: "row",
  },
  list: {
    flex: 1,
    width: "90%",
    paddingTop: 100,
  },
  item: {
    shadowColor: "rgb(44, 89, 74)",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    backgroundColor: "white",
    padding: 16,
    borderRadius: 30,
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
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
  tinyThyme: {
    width: 40,
    height: 40,
  },
  title: {
    flex: 3,
    fontSize: 20,
    color: "#20097B",
    fontWeight: "bold",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "Avenir",
    flexWrap: "wrap",
    paddingLeft: 20,
    paddingRight: 15,
  },
  itemText2: {
    fontSize: 20,
    color: "teal",
    fontFamily: "Avenir",
  },
  // touchable: {
  //   shadowColor: "rgb(44, 89, 74)",
  //   shadowOffset: { width: -2, height: 4 },
  //   shadowOpacity: 0.2,
  //   shadowRadius: 3,
  //   backgroundColor: "white",
  //   padding: 16,
  //   color: "red",
  //   borderRadius: 30,
  //   flexDirection: "row",
  //   margin: 20,
  // },
});
