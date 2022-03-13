import React, { Component } from 'react';
import app from '../../firebase';
import {
    Text,
    View,
    StyleSheet,
    TextInput,
    Button,
    Alert,
    ActivityIndicator,
    Platform,
  } from 'react-native';
import { FirebaseRecaptchaVerifierModal, FirebaseRecaptchaBanner } from 'expo-firebase-recaptcha';
import { getAuth, PhoneAuthProvider, signInWithCredential } from 'firebase/auth';


const auth = getAuth();
// const recaptchaVerifier = React.useRef(null);
// const [phoneNumber, setPhoneNumber] = React.useState();
// const [verificationId, setVerificationId] = React.useState();
// const [verificationCode, setVerificationCode] = React.useState();
const FIREBASE_CONFIG = app ? app.options : undefined;
// const [message, showMessage] = React.useState();
const attemptInvisibleVerification = false;
if (!app?.options || Platform.OS === 'web') {
    throw new Error('This example only works on Android or iOS, and requires a valid Firebase config.');
}

export default function PhoneAuthScreen() {
    const recaptchaVerifier = React.useRef(null);
    const verificationCodeTextInput = React.useRef(null);
    const useAutoVerification = true;
    const [phoneNumber, setPhoneNumber] = React.useState('');
    const [verificationId, setVerificationId] = React.useState('');
    const [verifyError, setVerifyError] = React.useState();
    const [verifyInProgress, setVerifyInProgress] = React.useState(false);
    const [verificationCode, setVerificationCode] = React.useState('');
    const [confirmError, setConfirmError] = React.useState();
    const [confirmInProgress, setConfirmInProgress] = React.useState(false);
    const isConfigValid = !!FIREBASE_CONFIG.apiKey;
  
    return (
      <View style={styles.container}>
        <View style={styles.content}>
          <FirebaseRecaptchaVerifierModal
            ref={recaptchaVerifier}
            firebaseConfig={FIREBASE_CONFIG}
            attemptInvisibleVerification={useAutoVerification}
          />
          <Text style={styles.title}>SplitCheck!</Text>
          <Text style={styles.subtitle}>Login</Text>
          <Text style={styles.text}>Please enter your phone number:</Text>
          <TextInput
            style={styles.textInput}
            autoFocus={isConfigValid}
            autoCompleteType="tel"
            keyboardType="phone-pad"
            textContentType="telephoneNumber"
            placeholder="+1 999 999 9999"
            editable={!verificationId}
            onChangeText={(phoneNumber: string) => setPhoneNumber(phoneNumber)}
          />
          <Button
            title={`${verificationId ? 'Resend' : 'Send'} Verification Code`}
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
                verificationCodeTextInput.current?.focus();
              } catch (err) {
                setVerifyError(err);
                setVerifyInProgress(false);
              }
            }}
          />
          {verifyError && <Text style={styles.error}>{`Error: ${verifyError.message}`}</Text>}
          {verifyInProgress && <ActivityIndicator style={styles.loader} />}
          {verificationId ? (
            <Text style={styles.success}>A verification code has been sent to your phone</Text>
          ) : (
            undefined
          )}
          <Text style={styles.text}>Enter verification code</Text>
          <TextInput
            ref={verificationCodeTextInput}
            style={styles.textInput}
            editable={!verificationId}
            placeholder="123456"
            onChangeText={(verificationCode: string) => setVerificationCode(verificationCode)}
          />
          <Button
            title="Confirm Verification Code"
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
                verificationCodeTextInput.current?.clear();
                Alert.alert('Phone authentication successful!');
              } catch (err) {
                setConfirmError(err);
                setConfirmInProgress(false);
              }
            }}
          />
          {confirmError && <Text style={styles.error}>{`Error: ${confirmError.message}`}</Text>}
          {confirmInProgress && <ActivityIndicator style={styles.loader} />}
        </View>
        {!isConfigValid && (
          <View style={styles.overlay} pointerEvents="none">
            <Text style={styles.overlayText}>
              To get started, set a valid FIREBASE_CONFIG in App.tsx.
            </Text>
          </View>
        )}
      </View>
    );
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
    },
    content: {
      marginTop: 50,
    },
    title: {
      marginBottom: 2,
      fontSize: 29,
      fontWeight: 'bold',
    },
    subtitle: {
      marginBottom: 10,
      opacity: 0.35,
      fontWeight: 'bold',
    },
    text: {
      marginTop: 30,
      marginBottom: 4,
    },
    textInput: {
      marginBottom: 8,
      fontSize: 17,
      fontWeight: 'bold',
    },
    error: {
      marginTop: 10,
      fontWeight: 'bold',
      color: 'red',
    },
    success: {
      marginTop: 10,
      fontWeight: 'bold',
      color: 'blue',
    },
    loader: {
      marginTop: 10,
    },
    overlay: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: '#FFFFFFC0',
      justifyContent: 'center',
      alignItems: 'center',
    },
    overlayText: {
      fontWeight: 'bold',
    },
  });
  