import { View, StyleSheet, Text, Pressable, Image } from "react-native";
import React, { useState, useRef } from "react";
import Screen from "../components/Screen";
import Button from "../components/Button";
import AppText from "../components/AppText";
import defaultStyles from "../config/styles";
import Dialog from "react-native-dialog";
import { auth, app, db } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import {
  PhoneAuthProvider,
  getAuth,
  onAuthStateChanged,
  signInWithCredential,
} from "firebase/auth";
import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";

export default function Home({ navigation }) {
  const [dialogVisible, setDialogVisible] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const [verificationId, setVerificationId] = useState("");
  const [verifyError, setVerifyError] = useState();

  const recaptchaVerifier = useRef(null);
  const [user, loading, error] = useAuthState(auth);

  const FIREBASE_CONFIG = app ? app.options : undefined;

  const checkUserAuthenticated = () => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("Still logged in.");
        navigation.navigate("Account");
        // setDialogVisible(true)
        // sendVerificationCode()
      } else {
        console.log("revoked token! Reprompt!");
        setDialogVisible(true);
        sendVerificationCode();
      }
    });
    // auth.verifyIdToken(idToken, checkRevoked)
    // .then((payload) => {
    //   console.log("Still logged in.")
    //   navigation.navigate("Account");
    // })
    // .catch((error) => {
    //   if (error.code == 'auth/id-token-revoked') {
    //     // Token has been revoked. Inform the user to reauthenticate or signOut() the user.
    //     console.log("revoked token!")
    //   } else {
    //     console.log("invalid token!")
    //     // Token is invalid.
    //   }
    // });
  };

  const sendVerificationCode = async () => {
    const phoneProvider = new PhoneAuthProvider(auth);
    try {
      setVerifyError(undefined);
      setVerificationId("");
      const verificationId = await phoneProvider.verifyPhoneNumber(
        user.phoneNumber,
        // @ts-ignore
        recaptchaVerifier.current
      );
      setVerificationId(verificationId);
    } catch (err) {
      setVerifyError(err);
    }
  };

  const verifyCode = async () => {
    try {
      setVerifyError(undefined);
      const credential = PhoneAuthProvider.credential(
        verificationId,
        verificationCode
      );
      const authResult = await signInWithCredential(auth, credential);
      setVerificationId("");
      setVerificationCode("");
      console.log(user.displayName + " has just re-verified.");
      navigation.navigate("Account");
    } catch (err) {
      setVerifyError(err);
    }
  };

  return (
    <Screen>
      <View style={styles.inputContainer}>
        <FirebaseRecaptchaVerifierModal
          ref={recaptchaVerifier}
          firebaseConfig={FIREBASE_CONFIG}
          attemptInvisibleVerification={true}
        />
        <Dialog.Container visible={dialogVisible}>
          <Dialog.Title>Account Verification</Dialog.Title>
          <Dialog.Description>
            To complete this action, please enter the code we sent to your phone
            number.
          </Dialog.Description>
          <Dialog.Input
            placeholder="12312"
            onChangeText={setVerificationCode}
            onSubmitEditing={setVerificationCode}
          ></Dialog.Input>
          <Dialog.Button
            label="Cancel"
            onPress={() => {
              setDialogVisible(false);
              setVerificationCode("");
            }}
          ></Dialog.Button>
          <Dialog.Button label="OK" onPress={verifyCode} />
        </Dialog.Container>
        <View style={{ alignItems: "flex-end" }}>
          <Button
            style={styles.account}
            onPress={() => checkUserAuthenticated()}
          >
            <AppText>Account</AppText>
          </Button>
        </View>

        <View
          style={[
            defaultStyles.centerItems,
            {
              height: "55%",
            },
          ]}
        >
          <Image
            style={{
              resizeMode: "contain",
              height: "80%",
            }}
            source={require("../../assets/splitcheck-logo.png")}
          />
        </View>

        <Button
          style={{ backgroundColor: defaultStyles.colors.secondary }}
          onPress={() => navigation.navigate("CreateEventNavigator")}
        >
          <AppText>New Event</AppText>
        </Button>
        <Button
          style={{ backgroundColor: defaultStyles.colors.secondary }}
          onPress={() => navigation.navigate("SettleNavigator")}
        >
          <AppText>Join Event</AppText>
        </Button>
        <Button
          style={{ backgroundColor: defaultStyles.colors.secondary }}
          onPress={() => navigation.navigate("History")}
        >
          <AppText>History</AppText>
        </Button>
        {verifyError && (
          <AppText
            style={styles.error}
          >{`Error: ${verifyError.message}`}</AppText>
        )}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#71EC4C",
    alignItems: "center",
    justifyContent: "center",
  },
  account: {
    width: "30%",
    height: 50,
    alignSelf: "flex-end",
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "green",
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
  mainTitle: {
    marginTop: 50,
    // marginBottom: 200,
  },
  logo: {
    // width: "30%",
    // height: "30%",
    // resizeMode: "contain",
  },
  error: {
    marginTop: 10,
    fontWeight: "bold",
    color: "#ff5252",
  },
});
