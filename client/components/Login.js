import React from 'react';
import { Text, StyleSheet, View, TextInput, TouchableOpacity, Alert, Image } from 'react-native';
import { auth } from '../firebaseAuth/firebase'
//import { useDispatch } from 'react-redux';
//Text - A React component for displaying text. Text supports nesting, styling, and touch handling.
//View - The most fundamental component for building a UI, View is a container that supports layout with flexbox, style, some touch handling, and accessibility controls.
//Button - A basic button component that should render nicely on any platform. Supports a minimal level of customization.
//TextInput - The most basic use case is to plop down a TextInput and subscribe to the onChangeText events to read the user input.
//TouchableOpacity - A wrapper for making views respond properly to touches. On press down, the opacity of the wrapped view is decreased, dimming it.

export default function Login({ navigation }) {  
   // dispatch = useDispatch
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");

    const onFooterLinkPress = () => {
      navigation.navigate('Registration')
    }

    React.useEffect(() => {
      const unsubscribe = auth.onAuthStateChanged(user => {
        if (user) {
          navigation.navigate("Home")
        }
      })
    return unsubscribe
    }, [])
  

    const handleLogin = async () => {
      if(!email || !password) Alert.alert("Please fill out the required fields!")
        try {
          const  { user } = await auth.signInWithEmailAndPassword(email, password)
          console.log('Logged in with: ', user.email)
          } catch(error) {
          console.log(error);
          Alert.alert("Incorrect Email or Password")
        }
    }
 
  return (
      <View style={styles.container}>
        <Image 
          style={styles.tinyTomato}
          source={{
            uri:
              "https://upload.wikimedia.org/wikipedia/commons/8/89/Tomato_je.jpg",
          }}
        />
        <Text style={styles.text}>Enter your email and password to sign in:</Text>
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
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.forgotButton} onPress={()=>navigation.navigate('forgotPassword')}>
            <Text style={styles.buttonText}>Forgot password</Text>
          </TouchableOpacity>
          <View style={styles.footerView}>
            <Text style={styles.footerText}>
              Don't have an account? {' '}
               <Text onPress={onFooterLinkPress} style={styles.footerLink}>
                 Sign up
               </Text>
            </Text>
          </View>
      </View> 
  );
};

      const styles = StyleSheet.create({
        container: {
          flex:1,
          padding:"4%",
          backgroundColor: "#CCFFCC",
          alignItems: "center",
          // justifyContent: "center",
          position: 'relative',
          padding: 100
          
        },
        text: {
          textAlign: "center",
          fontSize: 18,
          margin: 10,
          fontWeight: "bold",
          color: "#40434E",
        },
        emailInput: {
          textAlign: "center",
          justifyContent: "center",
          width: 300,
          borderWidth: 3,
          borderColor:"#96C598",
          padding: 10,
          margin: 5,
        },
        passwordInput: {
          textAlign: "center",
          justifyContent: "center",
          width: 300,
          borderWidth: 3,
          borderColor:"#96C598",
          padding: 10,
          margin: 5,
        },
        buttonText: {
          color: "white",
          fontWeight: "bold",
          textAlign: "center",
        },
        button: {
          width: 150,
          padding: 5,
          backgroundColor: "#8F540E",
          borderWidth: 2,
          borderColor: "#AD8557",
          borderRadius: 15,
          alignSelf: "center",
          margin: 8,
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
        tinyTomato: {
          width: 150,
          height: 150,
        },
        footerView: {
          flex: 1,
          alignItems: 'center',
          marginTop: 165,
        },
        footerText: {
          fontSize: 17,
          color: '#2e2e2d',
          fontFamily: 'Lato_400Regular',
          letterSpacing: 0.2,
        },
        footerLink: {
          color: '#1261B1',
          fontFamily: 'Lato_900Black',
          fontSize: 17,
          letterSpacing: 0.2,
        },
      });
