import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { View, TouchableOpacity, Text, StyleSheet, Alert } from "react-native";
import { logout } from "../store/auth";
import { auth } from "../firebaseAuth/firebase";
import { useNavigation } from "@react-navigation/native";

const Logout = () => {

  const navigation = useNavigation()
  const dispatch = useDispatch();
  const [error, setError] = useState(null);

  const onPressLogout = async () => {
    
    try {
      const response = await dispatch(logout());
      if(response !== true) setError(response)
      navigation.navigate("Login");
      Alert.alert("You have signed out");
      console.log("user signed out!!")
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <View>
      <TouchableOpacity style={styles.button} onPress={onPressLogout}>
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
      {error && <Text>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  buttonText: {
    color: "#FFFFFF",
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
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    margin: 20,
  },
})

export default Logout;