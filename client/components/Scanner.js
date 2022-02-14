/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Button, Alert, TouchableOpacity } from "react-native";
import { Overlay } from "react-native-elements";
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
          addToFridge(auth.currentUser.uid, foodName, 1);
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
    <Overlay>
      <View>
        {/* <Text style={styles.textSmall}>To scan an item, hold the item's barcode infront of the camera until barcode is in focus</Text> */}
        <Text style={styles.textSmall}>{text}</Text>
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={styles.barcode}
        />
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Fridge")}>
          <Text style={styles.buttonText}>Back to Fridge</Text>
        </TouchableOpacity>
        </View>

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
    </Overlay>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E6EDE9",
    alignItems: "center",
    justifyContent: "center",
  },
  barcode: {
    backgroundColor: "tomato",
    alignItems: "center",
    height: 300,
    width: 300,
    overflow: "hidden",
    borderRadius: 30,
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
  textSmall: {
    fontSize: 20,
    margin: 20,
    fontWeight: "bold",
    color: "teal",
    fontFamily: "Avenir",
    textAlign: 'center',
  },
  maintext: {
    fontSize: 16,
    margin: 20,
    fontFamily: "Avenir",
    textAlign: 'center',
  },
});
