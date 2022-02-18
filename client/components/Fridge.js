/* eslint-disable no-unused-vars */
import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import {
  Text,
  SafeAreaView,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
  RefreshControl,
  ScrollView,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { getFridgeThunk } from "../store/fridge";
import { auth } from "../firebaseAuth/firebase";

export default function Fridge({ navigation }) {
  const [refreshing, setRefreshing] = useState(false);
  const [DATA, setDATA] = useState("");
  const [fridge, setFridge] = useState([]);
  const dispatch = useDispatch();
  const fridgeSelector = useSelector((state) => state.fridgeReducer);
  const fridge2 = fridgeSelector;

  const viewFridge = async (userUid) => {
    await dispatch(getFridgeThunk(userUid));
  };

  useEffect(() => {
    const uid = auth.currentUser.uid;
    viewFridge(uid);
    setFridge(fridge2);
  }, []);

  const FridgeFlatList = ({ item, onPress, backgroundColor }) => {
    const [DATA, setDATA] = useState("");
    const [text, setText] = useState(
      "Pull to refresh your fridge!"
    );
    return (
      <TouchableOpacity
        onPress={onPress}
        style={[styles.item, backgroundColor]}
      >
        <Text style={styles.title}>
          {item.fridge ? item.foodItem_name : text}
        </Text>
        <Text style={styles.thinText}>
          {" "}
          {item.fridge ? `Amount:  ${item.fridge.quantity}` : DATA}{" "}
        </Text>
      </TouchableOpacity>
    );
  };

  const onRefresh = () => {
    setRefreshing(true);
    setFridge([]);
    const uid = auth.currentUser.uid;
    viewFridge(uid);
    setFridge(fridge2);
    setRefreshing(false);
  };

  const navigationOpacity = (foodItemId, userUid, quantity) => {
    navigation.navigate("SingleFoodItem", { foodItemId, userUid, quantity });
  };

  const renderFridgeFlatList = ({ item }) => {
    return (
      <FridgeFlatList
        item={item}
        onPress={() => {
          navigationOpacity(
            item.id,
            auth.currentUser.uid,
            item.fridge ? item.fridge.quantity : DATA
          );
        }}
      />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {refreshing ? <ActivityIndicator /> : null}
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
      {!fridge2 || fridge2 === null || fridge2.length === null ? (
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          <Text style={styles.title}>
            {" "}
            Sorry your fridge is EMPTY! Try adding something to your fridge{" "}
          </Text>
        </ScrollView>
      ) : (
        <SafeAreaView style={styles.list}>
          <FlatList
            data={fridge2.foodItems}
            renderItem={renderFridgeFlatList}
            keyExtractor={(item) => item.id}
            // extraData={fridge.foodItems}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
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
  },
  containerRow: {
    justifyContent: "center",
    flexDirection: "row",
  },
  list: {
    flex: 1,
    width: "100%",
    paddingTop: 100,
  },
  item: {
    shadowColor: "#2C594A",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderRadius: 30,
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
    marginLeft: "5%",
    marginRight: "5%"
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
  thinText: {
    fontSize: 20,
    color: "teal",
    fontFamily: "Avenir",
  },
  buttonText: {
    color: "#FFFFFF",
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
});
