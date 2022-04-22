import { View, StyleSheet, Alert } from "react-native";
import React, {useState, useRef, useEffect} from "react";
import Screen from "../components/Screen";
import Button from "../components/Button";
import AppTextInput from "../components/AppTextInput";
import AppText from "../components/AppText";
import defaultStyles from "../config/styles";
import { auth, app, db } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import Pressable from "react-native/Libraries/Components/Pressable/Pressable";
import colors from "../config/colors";
import { reauthenticateWithCredential, updateEmail, updateProfile, PhoneAuthProvider, signOut } from "firebase/auth";
import { setDoc, doc, getDoc, onSnapshot, query, where } from 'firebase/firestore';
import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";
import { LogBox } from 'react-native';
import reactModal from '@prezly/react-promise-modal';
import { Modal, Component } from 'react-bootstrap'; 
import Dialog from "react-native-dialog";
import { render } from "react-dom";

export default function Account({ navigation }) {
  LogBox.ignoreLogs(['Setting a timer for a long period of time, i.e.']);
  const [user, loading, error] = useAuthState(auth);

  const [email, _setEmail] = useState("");
  const [displayName, _setDisplayName] = useState("");
  const [venmo, setVenmo] = useState("");
  const [initVenmo, setInitVenmo] = useState("");

  const nameInput = useRef(null);
  const emailInput = useRef(null);
  const venmoInput = useRef(null);

  const [nameInvalid, setNameInvalid] = useState(null);
  const [emailInvalid, setEmailInvalid] = useState(null);

  const [dialogVisible, setDialogVisible] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const [verificationId, setVerificationId] = useState("");
  
  const [missionSuccess, setMissionSuccess] = useState(true);
  const [didAnything, setDidAnything] = useState(false);

  const FIREBASE_CONFIG = app ? app.options : undefined;

  const recaptchaVerifier = useRef(null);

  const setDisplayName = (text) => {
    _setDisplayName(text)
    setNameInvalid(text == '' || text == null)
  }
  const setEmail = (text) => {
    _setEmail(text)
    if(text == "") {
      setEmailInvalid(false)
    } else if(text.toLowerCase().match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    )) {
      setEmailInvalid(false)
    } else {
      setEmailInvalid(true)
    }
    
  }

  useEffect(async () => {

    if(user) {
      if(user.displayName) {
        console.log(user.displayName)
        setDisplayName(user.displayName)
      }
      if (user.email) {
        console.log(user.email)
        setEmail(user.email)
      }

      const venmoDoc = await getDoc(doc(db, "userinfo", user.uid));
      if (venmoDoc) {
        console.log(venmoDoc.data().venmo)
        setVenmo(venmoDoc.data().venmo)
        setInitVenmo(venmoDoc.data().venmo)
      }
    }
   }, [user]);

  // verify emails too? or nah
  const confirmationAlert = async () => {
    Alert.alert(
      `Success!`,
      "We have updated your profile information.",
      [
        {
          text: "Go back!",
          onPress: () => navigation.navigate("Account"),
          style: "cancel",
        },
        {
          text: "OK",
          onPress: () => navigation.navigate("Home"),
          style: "default",
        },
      ],
      {
        cancelable: true,
        onDismiss: () => navigation.navigate("Home")
      }
    );
  }


  const focusOn = (target) => {
    target.current.focus()
  }

  const logOutUser = async () => {
    signOut(auth)
      .then(() => {
        console.log(user.displayName + " has logged out.\n");
        navigation.navigate("Login");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const updateUserProfile = async () => {
    if(user.displayName !== displayName && displayName != "") {
      setDidAnything(true)

      updateProfile(user, {
        displayName: displayName,
        // photoURL: 'http://www.example.com/12345678/photo.png',
      })
        .then(() => {
          // See the UserRecord reference doc for the contents of userRecord.
          console.log("Successfully updated username ", user.displayName);
        })
        .catch((error) => {
          console.log("Error updating user:", error);
          setMissionSuccess(false)
        });
    } else {
        console.log("skip displayName")
    }
    
    if (venmo !== initVenmo && venmo != "") {
      setDidAnything(true)

      const docRef = await setDoc(doc(db, "userinfo", user.uid), {
        venmo: venmo
      }, { merge: true }).then(() => {
        // See the UserRecord reference doc for the contents of userRecord.
        console.log("Successfully updated user venmo ", venmo);
        setInitVenmo(venmo)
      })
      .catch((error) => {
        console.log("Error updating user:", error);
        setMissionSuccess(false)
      });
    } else {
      console.log("skip venmo")
    }
    
    if (user.email !== email && email != "") {
      setDidAnything(true)

      updateEmail(user, email).then(() => {
        // See the UserRecord reference doc for the contents of userRecord.
        console.log("Successfully updated email", user.email);
        rePromptLogin(false)
      })
      .catch(async (error) => {
        if (error.code === 'auth/requires-recent-login') {
          await rePromptLogin(true)
          // // Now wait for verification code from user
            
        } else {
          console.log("Error updating user:", error);
          rePromptLogin(false)
          setMissionSuccess(false)
        }
      });
    } else {
      console.log("skip email")
    }
  };

  const reAuthenticateUserAndUpdateEmail = async () => {
    const credential = PhoneAuthProvider.credential(
      verificationId,
      verificationCode
    );

    reauthenticateWithCredential(user, credential).then(() => {
        updateEmail(user, email).then(() => {
          // See the UserRecord reference doc for the contents of userRecord.
          console.log("Successfully re-authed and updated email address", user.email);
          setDialogVisible(false);
          setVerificationId("");
          setVerificationCode("");

          console.log("mission success? ", missionSuccess)
          console.log("did anything? ", didAnything)
          if (missionSuccess && didAnything) {
            confirmationAlert()
          } else if (missionSuccess) {
            navigation.navigate("Home")
          }

        })
        .catch((error) => {
          console.log("Error updating email address:", error);
          setMissionSuccess(false)
          return new Promise((resolve, reject) => {reject()})
        })
        
      })
    
  }

  const rePromptLogin = async (doThis) => {
    if (doThis)
    {
      const phoneProvider = new PhoneAuthProvider(auth);
      setVerificationId("");

      const verificationId = await phoneProvider.verifyPhoneNumber(
        user.phoneNumber,
        // @ts-ignore
        recaptchaVerifier.current
      )
      setVerificationId(verificationId);
      setDialogVisible(true);
    } else {
      console.log("mission success? ", missionSuccess)
      console.log("did anything? ", didAnything)
      console.log(user.toJSON())

      if (missionSuccess && didAnything) {
        confirmationAlert()
      } else if (missionSuccess) {
        navigation.navigate("Home")
      }
    }
  }

  const codeInputted = async() => new Promise((resolve) => resolve())
  
  
  return (
    <Screen>
      <View style={[defaultStyles.centerItems, styles.titleContainer]}>
        <AppText style={[defaultStyles.title]}>Profile</AppText>
      </View>

      <View style={[defaultStyles.padding]}>

      <FirebaseRecaptchaVerifierModal
        ref={recaptchaVerifier}
        firebaseConfig={FIREBASE_CONFIG}
        attemptInvisibleVerification={true}
      />
      <Dialog.Container visible={dialogVisible}>
        <Dialog.Title>Account Verification</Dialog.Title>
        <Dialog.Description>
          To complete this action, please enter the code we sent to your phone number.
        </Dialog.Description>
        <Dialog.Input placeholder="12312" onSubmitEditing={(code) => {
            setVerificationCode(code)
          }}>
          
        </Dialog.Input>
        <Dialog.Button label="OK" onPress={reAuthenticateUserAndUpdateEmail} />
      </Dialog.Container>
      

      <Pressable 
        onPress = {() => focusOn(nameInput)} >
          <View style={styles.input} pointerEvents="none">
            <AppText>Name (required)</AppText>
            <AppTextInput placeholder = {"Sarah"} 
                givenRef={nameInput}
                editable={true}
                returnKeyType="next"
                value={displayName.length > 0 ? displayName : ""}
                onChangeText = {setDisplayName}
                maxLength={150}
                onSubmitEditing={() => 
                  {
                    setDisplayName(displayName)
                    focusOn(emailInput)
                  }}
                />
          {nameInvalid && <AppText style={styles.error}>{`Please enter a name!`}</AppText>}
          </View>
        </Pressable>

        <Pressable 
        onPress = {() => focusOn(emailInput)} >
          <View style={styles.input} pointerEvents="none">
            <AppText>Email address (optional)</AppText>
            <AppTextInput placeholder = {"name@email.com"} 
                givenRef={emailInput}
                editable={true}
                returnKeyType="next"
                value={email.length > 0 ? email : ""}
                onChangeText = {setEmail}
                maxLength={250}
                onSubmitEditing={() => 
                  {
                    setEmail(email)
                    focusOn(venmoInput)
                  }}
                />
          {emailInvalid && <AppText style={styles.error}>{`Please enter a valid email address!`}</AppText>}
          </View>
        </Pressable>

        <Pressable 
        onPress = {() => focusOn(venmoInput)} >
          <View style={styles.input} pointerEvents="none">
            <AppText>Venmo Handle (to help others pay you back)</AppText>
            <AppTextInput placeholder = {"smith23"} 
                givenRef={venmoInput}
                editable={true}
                returnKeyType="next"
                value={venmo.length > 0 ? venmo : ""}
                onChangeText = {setVenmo}
                maxLength={250}
                onSubmitEditing={() => 
                  {
                    setVenmo(venmo)
                  }}
                />
          </View>
        </Pressable>

        <View style={styles.input}>
          <Button style={{ backgroundColor: (nameInvalid || emailInvalid) ? colors.light : colors.secondary }}
                  disabled={(nameInvalid || emailInvalid)}
                  onPress={async() => {
                    updateUserProfile()
                    navigation.navigate("Home")
                  }}
            >
            <AppText>Save changes</AppText>
          </Button>
          <Button style={{ backgroundColor: defaultStyles.colors.red }}
                onPress={() => logOutUser()}>
            <AppText>Logout</AppText>
        </Button>
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    padding: 20,
    borderBottomColor: defaultStyles.colors.light,
    borderBottomWidth: 1,
  },
  input: {
    marginBottom: 15,
  },
  error: {
    // marginTop: 10,
    marginBottom: 10,
    fontWeight: 'bold',
    color: colors.danger,
  },
  success: {
    marginBottom: 10,
    fontWeight: 'bold',
    color: colors.secondary,
  },
});
