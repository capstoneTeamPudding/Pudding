import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  Text,
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  StatusBar,
  SafeAreaView,
  Image
} from "react-native";
import { HideKeyboard } from "./EditFood";
import { auth } from "../firebaseAuth/firebase";
import { authenticateLogin } from "../store";

export default function Login({ navigation }) {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const onFooterLinkPress = () => {
    navigation.navigate("Registration");
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        navigation.navigate("NavigationBar");
      }
    });
    return unsubscribe;
  }, []);

  const handleLogin = async () => {
    try {
      const response = await dispatch(
        authenticateLogin({ email: email, password: password })
      );
      if (response !== true) {
        setError(response);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <HideKeyboard>
      <SafeAreaView style={styles.container}>
        <StatusBar animated={true} backgroundColor="#61dafb" />
        <Image
          style={styles.logo_lg}
          source={require("../../assets/thyme_logo.png")}
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
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Log In</Text>
        </TouchableOpacity>
        <View style={styles.footerView}>
          <Text style={styles.footerText}>
            Don't have an account?{" "}
            <Text onPress={onFooterLinkPress} style={styles.footerLink}>
              Sign up
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
    justifyContent: "center",
  },
  text: {
    textAlign: "center",
    fontFamily: "Avenir",
    fontSize: 15,
    margin: 10,
    fontWeight: "bold",
    color: "#40434E",
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
    margin: 20,
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
    margin: 5,
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
  logo_lg: {
    marginTop: 50,
    width: 300,
    height: 300,
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