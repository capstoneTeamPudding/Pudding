/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Button, Alert } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { BarCodeScanner } from "expo-barcode-scanner";
import { addFoodItemThunk } from "../store/foodItems";
import { addToFridgeThunk } from "../store/fridge";
import { EDEMAM_KEY, EDEMAM_ID } from "../../.keys";
import axios from "axios";
import { auth } from "../firebaseAuth/firebase";

let EdamamURL = "https://api.edamam.com/api/food-database/v2/parser?";
const EDEMAM_TYPE = "&nutrition-type=logging";

export default function Scanner({ navigation }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [text, setText] = useState("No Barcode Scanned Yet!");

  const dispatch = useDispatch();
  const foodItems = useSelector((state) => state.foodItemsReducer);
  const fridge = useSelector((state) => state.fridgeReducer);

  const addFoodItem = (foodItem) => {
    dispatch(addFoodItemThunk(foodItem));
  };
  const addToFridge = (userUid, foodItem, quantity) => {
    dispatch(addToFridgeThunk(userUid, foodItem, quantity));
  };

  const askForCameraPermission = () => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  };

  const reScan = () => {
    setScanned(false);
    setText(false);
  };

  useEffect(() => {
    askForCameraPermission();
  }, []);

  const addToFridgeAlert = (foodName) =>
    Alert.alert(foodName, `Would you like to add ${foodName} to your fridge?`, [
      {
        text: "No",
        onPress: () => {
          reScan();
        },
        style: "cancel",
      },
      {
        text: "Yes",
        onPress: () => {
          addToFridge("u087CSU21PhXkg73Rd4Uxa2ugtw2" , foodName, 1);
          Alert.alert(`Successfully added ${foodName} to your fridge!`);
        },
      },
    ]);

  const foodName = (foodItemData) => {
    let foodObject = foodItemData.hints[0].food;
    let foodName = foodObject.label;
    addFoodItem(foodName);
    setText(foodName);
    addToFridgeAlert(foodName);
  };

  const fetchFoodItem = async (data) => {
    try {
      const URL = `${EdamamURL}${EDEMAM_ID}&${EDEMAM_KEY}&upc=${data}${EDEMAM_TYPE}`;
      const res = await axios.get(URL);
      const foodItemData = res.data;
      foodName(foodItemData);
    } catch (error) {
      console.error(error);
    }
  };
  const handleBarCodeScanned = ({ data }) => {
    setScanned(true);
    fetchFoodItem(data);
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return (
      <View style={styles.container}>
        <Text style={{ margin: 10 }}>
          Request Denied: How would you like to add food to your Fridge?
        </Text>
        <Button
          title={"Scan Barcode"}
          OnPress={() => askForCameraPermission()}
        />
        <Button
          title={"Add Manually"}
          OnPress={() => navigation.navigate("Add Food")}
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.maintext}>{text}</Text>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={styles.barcode}
      />
      <Button
        title="Go to Fridge"
        onPress={() => navigation.navigate("Fridge")}
      />
      <Button
        title="Add Manually"
        onPress={() => navigation.navigate("AddFood")}
      />

      {scanned && (
        <View>
          <BarCodeScanner style={{ height: 0 }} />
          <Button
            title={"Tap to Scan Again"}
            onPress={() => {
              reScan();
            }}
          />
          <Button
            title="Go to Fridge"
            onPress={() => navigation.navigate("Fridge")}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  barcode: {
    backgroundColor: "tomato",
    alignItems: "center",
    justifyContent: "center",
    height: 300,
    width: 300,
    overflow: "hidden",
    borderRadius: 30,
  },
  maintext: {
    fontSize: 16,
    margin: 20,
  },
});
