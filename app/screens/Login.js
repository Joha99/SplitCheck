import React, { Component, useEffect, useState, useRef } from 'react';
import { Alert, TextInput, View, StyleSheet, ActivityIndicator, Toast } from 'react-native';
import { Header } from 'react-native/Libraries/NewAppScreen';
import { auth, app } from "../../firebase";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, RecaptchaVerifier, PhoneAuthProvider, sendPasswordResetEmail, signInWithCredential } from 'firebase/auth';
import { FirebaseRecaptchaVerifierModal, FirebaseRecaptchaBanner } from 'expo-firebase-recaptcha';
import { useAuthState } from "react-firebase-hooks/auth";
import Screen from "../components/Screen";
import defaultStyles from "../config/styles";
import AppText from "../components/AppText";
import AppTextInput from "../components/AppTextInput";
import Button from "../components/Button";
import colors from "../config/colors";
// import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input/react-native-input'

export default function Login({ navigation }) {
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  const [user, loading, error] = useAuthState(auth);

  const recaptchaVerifier = React.useRef(null);

  const FIREBASE_CONFIG = app ? app.options : undefined;
  const [phoneNumber, setPhoneNumber] = React.useState('');
  const [verificationId, setVerificationId] = React.useState('');
  const [verifyError, setVerifyError] = React.useState();
  const [verifyInProgress, setVerifyInProgress] = React.useState(false);
  const [verificationCode, setVerificationCode] = React.useState('');
  const [confirmError, setConfirmError] = React.useState();
  const [confirmInProgress, setConfirmInProgress] = React.useState(false);
  const isConfigValid = !!FIREBASE_CONFIG.apiKey;

  useEffect(() => {
    if (loading) {
      // maybe trigger a loading screen
      return;
    }
    if (user) {
      navigation.navigate("Home")
      console.log(user.displayName + " is already logged in!")
      Alert.alert(
        `Welcome back, ${user.displayName}!`,
        "You are already logged in.",
        [{ text: "OK"}]
      );
      console.log(user.phoneNumber)
      console.log(user.email)
      console.log(user.uid)
    };
  }, [user, loading]);
  
  return (
    <Screen>
      <View style={[defaultStyles.centerItems, styles.titleContainer]}>
        <AppText style={defaultStyles.title}>Log In</AppText>
      </View>
      <FirebaseRecaptchaVerifierModal
        ref={recaptchaVerifier}
        firebaseConfig = {FIREBASE_CONFIG}
        attemptInvisibleVerification={true}
      />
      <View style={styles.inputContainer}>
      <View style={styles.input}>
          <AppText>Phone Number</AppText>
          <PhoneInput
          style={
            [{backgroundColor: colors.light,
              borderRadius: 5,
              flexDirection: "row",
              padding: 15,
              marginVertical: 10}]
          }
            defaultCountry='US'
            placeholder="+1 404-123-6789"
            blurOnSubmit = {true} 
            value={phoneNumber}
            // autoFocus={isConfigValid}
            onChange={setPhoneNumber}/>
        </View>
        <Button
          style={[
            { backgroundColor: defaultStyles.colors.secondary },
            styles.input,
          ]}
          disabled={!phoneNumber}
          onPress={async () => {
            const phoneProvider = new PhoneAuthProvider(auth);
            try {
              setVerifyError(undefined);
              setVerifyInProgress(true);
              setVerificationId('');
              const verificationId = await phoneProvider.verifyPhoneNumber(
                phoneNumber,
                // @ts-ignore
                recaptchaVerifier.current
              );
              setVerifyInProgress(false);
              setVerificationId(verificationId);

            } catch (err) {
              setVerifyError(err);
              setVerifyInProgress(false);
            }
          }}
        >
          <AppText>{verificationId ? 'Resend' : 'Send'} Verification Code</AppText>
        </Button>
          {verifyError && <AppText style={styles.error}>{`Error: ${verifyError.message}`}</AppText>}
          {verifyInProgress && <ActivityIndicator style={styles.loader} />}
          {verificationId ? (<AppText style={styles.success}>A verification code has been sent to your phone!</AppText>): ( undefined )}
        <View style={styles.input}>
          <AppText>Enter Verification Code:</AppText>
          <AppTextInput 
                      placeholder="123456" 
                      secureTextEntry={true} 
                      editable={!!verificationId}
                      onChangeText={text => setVerificationCode(text)}
                      blurOnSubmit={true}/>
        </View>
        <Button
            style={[
              { backgroundColor: defaultStyles.colors.secondary },
              styles.input,
            ]}
            disabled={!verificationCode}
            onPress={async () => {
              try {
                setConfirmError(undefined);
                setConfirmInProgress(true);
                const credential = PhoneAuthProvider.credential(
                  verificationId,
                  verificationCode
                );
                const authResult = await signInWithCredential(auth, credential);
                setConfirmInProgress(false);
                setVerificationId('');
                setVerificationCode('');
              } catch (err) {
                setConfirmError(err);
                setConfirmInProgress(false);
              }
            }}
          >
            <AppText>Confirm Verification Code</AppText>
          </Button>
          {confirmError && <AppText style={styles.error}>{`Error: ${confirmError.message}`}</AppText>}
          {confirmInProgress && <ActivityIndicator style={styles.loader} />}
        </View>
        {!isConfigValid && (
          <View style={styles.overlay} pointerEvents="none">
            <AppText style={styles.overlayText}>
              To get started, set a valid FIREBASE_CONFIG in App.tsx.
            </AppText>
          </View>
        )}
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
  error: {
    marginTop: 10,
    fontWeight: 'bold',
    color: colors.danger,
  },
  success: {
    marginBottom: 20,
    fontWeight: 'bold',
    color: colors.secondary,
  },
  loader: {
    marginTop: 10,
  },
});