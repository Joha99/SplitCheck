import React, { Component, useEffect, useState, useRef } from 'react';
import { Alert, TextInput, View, StyleSheet } from 'react-native';
import { Header } from 'react-native/Libraries/NewAppScreen';
import { auth } from "../../firebase";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, RecaptchaVerifier, sendPasswordResetEmail } from 'firebase/auth';
import { useAuthState } from "react-firebase-hooks/auth";
import Screen from "../components/Screen";
import defaultStyles from "../config/styles";
import AppText from "../components/AppText";
import AppTextInput from "../components/AppTextInput";
import Button from "../components/Button";

export default function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNum, setPhone] = useState("");
  const [user, loading, error] = useAuthState(auth);
  const appVerifier = window.recaptchaVerifier;
  
  // const recaptchaVerifier = new auth.RecaptchaVerifier('recaptcha-container', {}, auth);

  function createUser(email, password) {
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in 
      user = userCredential.user;
      console.log(user.email)
      console.log(user.password)
      navigation.navigate("Home");
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorMessage)
    });                
  }
  function signInUser(email, password) {
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in 
      user = userCredential.user;
      console.log(user.email)
      console.log(user.password)
      navigation.navigate("Home");
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorMessage)
    });                
  }

  function sendPasswordReset(email) {
    sendPasswordResetEmail(auth, email)
    .then((response) => {
      // Signed in 
      console.log(response)
      navigation.navigate("Home");
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorMessage)
    });                
  }
  
  function setUpRecaptcha() {
    
  }

  useEffect(() => {
    if (loading) {
      // maybe trigger a loading screen
      return;
    }
    if (user) {
      navigation.navigate("Home")
      console.log(user.email + " is already logged in!")
      console.log(user.phoneNumber)
    };
  }, [user, loading]);
  
  return (
    <Screen>
      <View style={[defaultStyles.centerItems, styles.titleContainer]}>
        <AppText style={defaultStyles.title}>Log In</AppText>
      </View>
      <View style={styles.inputContainer}>
        <View style={styles.input}>
          <AppText>Email Address</AppText>
          <AppTextInput 
              placeholder="money@bags.com" 
              blurOnSubmit={true} 
              // keyboardType={'phone-pad'}
              onChangeText={text => setEmail(text)}/>
        </View>

        <View style={styles.input}>
          <AppText>Password</AppText>
          <AppTextInput 
                      placeholder="MakeMeSecure9!?" 
                      secureTextEntry={true} 
                      editable={true} 
                      onChangeText={text => setPassword(text)}
                      blurOnSubmit={true}/>
        </View>

<Button
          style={[
            { backgroundColor: defaultStyles.colors.secondary },
            styles.input,
          ]}
          onPress={() => {
            signInUser(email, password)
          }}
        >
          <AppText>Sign In</AppText>
        </Button>

        <Button
          style={[
            { backgroundColor: defaultStyles.colors.secondary },
            styles.input,
          ]}
          onPress={() => {
            createUser(email, password)
          }}
        >
          <AppText>Sign Up</AppText>
        </Button>

        <Button
        style={[
          {backgroundColor: defaultStyles.colors.secondary},
          styles.input,
        ]}
        onPress={() => {
          sendPasswordReset(email)
        }}
        >
          <AppText>Reset Password</AppText>
          </Button>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {},
  titleContainer: {
    padding: 20,
    borderBottomColor: defaultStyles.colors.light,
    borderBottomWidth: 1,
  },
  inputContainer: {
    padding: 20,
  },
  dateContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  input: {
    marginBottom: 15,
  },
});