import React from 'react';
import { StyleSheet, Text, View, TextInput, SafeAreaView, ImageBackground, ScrollView, Image, TouchableOpacity } from "react-native";
import Logout from './Logout';
import { auth } from "../firebaseAuth/firebase"
import { useDispatch } from 'react-redux';
import { updateUserThunk, updatePassword } from "../store"

// @Elena grab the route parameter
export default function Profile({ navigation }) {

  // const user = useSelector((state) => state.auth.user);
  const [error, setError] = React.useState(null);
  const [isEdit, setIsEdit] = React.useState(false);
  const [isEditPassword, setIsEditPassword] = React.useState(false);
  const [firstName, setFirstName] = React.useState('');
  const [lastName, setLastName] = React.useState('');
  const [password, setPassword] = React.useState("123456");
  const [confirmPassword, setConfirmPassword] = React.useState("123456");

  const handleUpdateUser = async () => {
    try {
      const response = await dispatch(updateUserThunk({ firstName, lastName }));
      response && setIsEdit(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdatePassword = async () => {
    try {
      const response = await updatePassword(password);
      if (response !== true) {
        setError(response);
      } else {
        setIsEditPassword(false);
        setError(null);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const goToFav = () => {
    navigation.navigate("Favorites", { 
    });
  };

  const dispatch = useDispatch();

  return (
    <SafeAreaView style={styles.container}>
      {/* <ImageBackground
        source={require("../../assets/thyme_logo.png")}
        style={styles.logo_sm}
      /> */}
      <ScrollView>
        <View >
          <Text style={styles.heading}>Hi, Cody Fullstack!</Text>
          {/* <Image
            style={styles.logo_sm}
            source={require("../../assets/thyme_logo.png")}
          ></Image> */}
        </View>
        <View>
          <View>
            {isEdit ? (
              <View style={{ margin: 20 }}>
                <TextInput
                  editable={false}
                  style={ styles.emailInput}
                >
                  Email: {auth.currentUser.email}
                </TextInput>
                <TextInput
                  editable={true}
                  placeholder="Enter firstname*"
                  onChangeText={(firstName) => setFirstName(firstName)}
                  value={firstName}
                  style={styles.firstnameInput}>
                </TextInput>
                <TextInput
                  editable={true}
                  placeholder="Enter lastname*"
                  onChangeText={(lastName) => setLastName(lastName)}
                  value={lastName}
                  style={styles.lastnameInput}
                ></TextInput>
                <TouchableOpacity style={styles.button} onPress={handleUpdateUser}>
                  <Text style={styles.button}>Update</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <View style={{ margin: 20 }}>
                <TextInput
                  editable={false}
                  style={styles.emailInput}
                >
                  Email: {auth.currentUser.email}
                </TextInput>
                <TextInput
                  editable={false}
                  style={styles.firstnameInput}
                >
                  First Name: Cody
                </TextInput>
                <TextInput
                  editable={false}
                  style={styles.lastnameInput}
                >
                  Last Name: Fullstack
                </TextInput>
              <TouchableOpacity style={styles.button} onPress={() => setIsEdit(true)}>
                  <Text style={styles.buttonText}>Edit Profile</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={goToFav}>
                  <Text style={styles.buttonText}>View Favorite Recipes</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
          {/* <View>
            {isEditPassword ? (
              <View style={{ margin: 20 }}>
                <TextInput
                  secureTextEntry
                  editable={true}
                  onChangeText={(password) => setPassword(password)}
                  value={password}
                  style={styles.passwordInput}
                ></TextInput>
                <TextInput
                  secureTextEntry
                  editable={true}
                  onChangeText={(confirmPassword) =>
                    setConfirmPassword(confirmPassword)
                  }
                  value={confirmPassword}
                  style={styles.passwordInput}
                ></TextInput>
                {error && (
                  <Text
                    style={{
                      ...styles.fontExtraSmall,
                      color: "red",
                      marginTop: 10,
                    }}
                  >
                    {error}
                  </Text>
                )}
                {password !== confirmPassword ? (
                  <Text
                    style={{...styles.fontExtraSmall, color: "red", marginTop: 10}}
                  >
                    Passwords must match!
                  </Text>
                ) : (
                  <TouchableOpacity
                    onPress={handleUpdatePassword}
                    style={styles.passwordInput}
                  >
                    <Text style={styles.button}>Update Password</Text>
                  </TouchableOpacity>
                )}
              </View>
            ) : (
                <View style={{ margin: 20 }}>
                  <TextInput
                    editable={false}
                    style={styles.passwordInput}
                  >
                    Password
                  </TextInput>
                  <TextInput
                    editable={false}
                    secureTextEntry
                    style={styles.passwordInput}
                  >
                    {password}
                  </TextInput>
                  <TouchableOpacity
                    onPress={() => setIsEditPassword(true)}
                    style={styles.passwordInput}
                  >
                    <Text style={styles.button}>Change Password</Text>
                  </TouchableOpacity>
                </View>
              
            )}
            <Logout />
          </View> */}
          <Logout />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
  
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E6EDE9",
    alignItems: "center",
    justifyContent: "center",
  },
  text:{
    fontSize: 22, 
    fontWeight: 'bold',
    justifyContent: 'center', 
    alignItems: 'center',
    color: 'teal',
    fontFamily: 'Avenir',
    paddingTop: 20,
  },
  tinyThyme: {
    width: 60,
    height: 60,
  },
container: {
  flex: 1,
  backgroundColor: "#E6EDE9",
  alignItems: "center"
},
text: {
  textAlign: "center",
  fontSize: 18,
  margin: 10,
  fontWeight: "bold",
  color: "#40434E"
},
firstnameInput: {
  textAlign: "center",
  justifyContent: "center",
  width: "100%",
  height: 50,
  backgroundColor: "#EFEEEE",
  borderWidth: 2,
  borderRadius: 25,
  borderColor: "#418C73",
  padding: 10,
  margin: 10
},
lastnameInput: {
  textAlign: "center",
  justifyContent: "center",
  width: "100%",
  height: 50,
  backgroundColor: "#EFEEEE",
  borderWidth: 2,
  borderRadius: 25,
  borderColor: "#418C73",
  padding: 10,
  margin: 10
},
emailInput: {
  textAlign: "center",
  justifyContent: "center",
  width: "100%",
  height: 50,
  backgroundColor: "#EFEEEE",
  borderWidth: 2,
  borderRadius: 25,
  borderColor: "#418C73",
  padding: 10,
  margin: 10
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
  margin: 10
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
  shadowOffset: { width: -2, height: 4 },
  shadowOpacity: 0.2,
  shadowRadius: 3,
  margin: 20,
},
forgotButton:{
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
  backgroundColor: 'white',
  marginHorizontal: 20,
},
logo_sm: {
  width: 200,
  height: 200,
},
footerView: {
  flex: 1,
  justifyContent: 'flex-end',
  marginBottom: 36,
},
footerText: {
  fontSize: 17,
  color: '#2e2e2d',
  fontFamily: 'Avenir',
  letterSpacing: 0.2,
},
footerLink: {
  color: '#1261B1',
  fontFamily: 'Avenir',
  fontSize: 17,
  letterSpacing: 0.2,
},
  fontExtraSmall: {
    fontFamily: "Avenir",
    fontSize: 16,
  },
  heading: {
    fontSize: 24,
    color: "#20097B",
    marginTop: 50,
    marginBottom: 30,
    fontWeight: "bold",
    fontFamily: "Avenir",
    textAlign: 'center',
  },
});
