import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { View, TouchableOpacity, Text, StyleSheet, Alert } from "react-native";
import { logout } from "../store/auth";
import { auth } from "../firebaseAuth/firebase";
import { useNavigation } from "@react-navigation/native";

const Logout = () => {

  const navigation = useNavigation()
  const dispatch = useDispatch();
  const [error, setError] = React.useState(null);


  const onPressLogout = async () => {
    
    try {
      await auth.signOut();
      dispatch(logout());
      navigation.navigate("Login");
      Alert.alert("You have signed out");
      console.log("user signed out!!")
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <View>
      <TouchableOpacity style={styles.logout} onPress={onPressLogout}>
        <Text>Logout</Text>
      </TouchableOpacity>
      {error && <Text>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({

logout: {
  shadowColor: "#2C594A",
  shadowOffset: { width: -2, height: 4 },
  shadowOpacity: 0.2,
  shadowRadius: 3,
  backgroundColor: "white",
  padding: 16,
  width: "100%",
  borderRadius: 30,
  flexDirection: "row",
  alignItems: "flex-start",
  justifyContent: "space-between",
  marginBottom: 20,
  }
})

export default Logout;