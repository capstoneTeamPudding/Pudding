/* eslint-disable no-unused-vars */
import React from "react";
import {
  Text,
  StyleSheet,
  SafeAreaView,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  Image,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { auth } from "../firebaseAuth/firebase";
import { authenticateSignUp } from "../store";
import { useDispatch } from "react-redux";
import { HideKeyboard } from "./EditFood";

export default function Registration({ navigation }) {
  const dispatch = useDispatch();
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [error, setError] = React.useState("");

  const onFooterLinkPress = () => {
    navigation.navigate("Login");
  };

  React.useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        navigation.navigate("Home");
      }
    });
    return unsubscribe;
  }, []);

  const handleRegistration = async () => {
    try {
      const response = await dispatch(
        authenticateSignUp({ firstName, lastName, email, password })
      );
      if (password !== confirmPassword) {
        Alert.alert("Passwords don't match");
      }
      if (password.length < 6) {
        Alert.alert(
          "the password is too weak. Please use 6 or more characters."
        );
      }
      if (response !== true) setError(response);
      console.log("Registered with: ", email);
    } catch (error) {
      console.log(error);
      Alert.alert("Invalid Input");
    }
  };

  return (
    <HideKeyboard>
      <SafeAreaView style={styles.container}>
        <Image
          style={styles.logo_sm}
          source={require("../../assets/thyme_logo.png")}
        />
        <TextInput
          style={styles.firstnameInput}
          placeholder="Enter your firstname*"
          value={firstName}
          onChangeText={(firstName) => setFirstName(firstName)}
          autoCapitalize="none"
        />
        <TextInput
          style={styles.lastnameInput}
          placeholder="Enter your lastname*"
          value={lastName}
          onChangeText={(lastName) => setLastName(lastName)}
          autoCapitalize="none"
        />
        <TextInput
          style={styles.emailInput}
          placeholder="Enter your email*"
          value={email}
          onChangeText={(email) => setEmail(email)}
          autoCapitalize="none"
        />
        <TextInput
          style={styles.passwordInput}
          placeholder="Enter your password*"
          value={password}
          onChangeText={(password) => setPassword(password)}
          secureTextEntry={true}
        />
        <TextInput
          style={styles.passwordInput}
          placeholder="Confirm Password*"
          value={confirmPassword}
          onChangeText={(password) => setConfirmPassword(password)}
          secureTextEntry={true}
        />
        <TouchableOpacity style={styles.button} onPress={handleRegistration}>
          <Text style={styles.buttonText}>Create Account</Text>
        </TouchableOpacity>
        <View style={styles.footerView}>
          <Text style={styles.footerText}>
            Already have an account?{" "}
            <Text onPress={onFooterLinkPress} style={styles.footerLink}>
              Log In
            </Text>
          </Text>
        </View>
      </SafeAreaView>
    </HideKeyboard>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E6EDE9",
    alignItems: "center",
  },
  text: {
    textAlign: "center",
    fontSize: 18,
    margin: 10,
    fontWeight: "bold",
    color: "#40434E",
  },
  firstnameInput: {
    textAlign: "center",
    justifyContent: "center",
    width: "80%",
    height: 50,
    backgroundColor: "#EFEEEE",
    borderWidth: 2,
    borderRadius: 25,
    borderColor: "#418C73",
    padding: 10,
    margin: 10,
  },
  lastnameInput: {
    textAlign: "center",
    justifyContent: "center",
    width: "80%",
    height: 50,
    backgroundColor: "#EFEEEE",
    borderWidth: 2,
    borderRadius: 25,
    borderColor: "#418C73",
    padding: 10,
    margin: 10,
  },
  emailInput: {
    textAlign: "center",
    justifyContent: "center",
    width: "80%",
    height: 50,
    backgroundColor: "#EFEEEE",
    borderWidth: 2,
    borderRadius: 25,
    borderColor: "#418C73",
    padding: 10,
    margin: 10,
  },
  passwordInput: {
    textAlign: "center",
    justifyContent: "center",
    width: "80%",
    height: 50,
    backgroundColor: "#EFEEEE",
    borderWidth: 2,
    borderRadius: 25,
    borderColor: "#418C73",
    padding: 10,
    margin: 10,
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
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    margin: 20,
  },
  forgotButton: {
    width: 200,
    padding: 6,
    backgroundColor: "#8F540E",
    borderWidth: 2,
    borderColor: "#AD8557",
    borderRadius: 15,
    alignSelf: "center",
    margin: 5,
  },
  scrollView: {
    backgroundColor: "white",
    marginHorizontal: 20,
  },
  logo_sm: {
    width: 200,
    height: 200,
  },
  footerView: {
    flex: 1,
    justifyContent: "flex-end",
    marginBottom: 36,
  },
  footerText: {
    fontSize: 17,
    color: "#2e2e2d",
    fontFamily: "Avenir",
    letterSpacing: 0.2,
  },
  footerLink: {
    color: "#1261B1",
    fontFamily: "Avenir",
    fontSize: 17,
    letterSpacing: 0.2,
  },
});
