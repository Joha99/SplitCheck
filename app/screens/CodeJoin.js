import { StyleSheet, Text, View } from "react-native";
import React, {useState} from "react";
import Screen from "../components/Screen";
import defaultStyles from "../config/styles";
import AppText from "../components/AppText";
import AppTextInput from "../components/AppTextInput";
import Button from "../components/Button";
import { LogBox } from "react-native";
import {
  collection,
  onSnapshot,
  query,
  where,
  orderBy,
  limit,
  updateDoc,
  arrayUnion,
  getDocs,
  setDoc,
  doc,
  getDoc,
  Timestamp
} from "firebase/firestore";
import { auth, db } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";

export default function CodeJoin({navigation}) {
  const [joinCode, setJoinCode] = useState(null);
  const [codeInvalid, setCodeInvalid] = useState(null);
  const [user, loading, error] = useAuthState(auth);
  
  const checkEvent = async () => {
    setCodeInvalid(false)
    LogBox.ignoreLogs(["Setting a timer for a long period of time, i.e."]);
    if (joinCode != undefined) {
      code = joinCode.trim().toUpperCase()
      const queryEventByInviteCode = query(
        collection(db, "events"),
        where("inviteCode", "==", code),
        orderBy("timestamp", "desc")
      );

      const eventDocs = await getDocs(queryEventByInviteCode)
      // onSnapshot(queryEventByInviteCode, (results) => {
        if (eventDocs.empty) {
          console.log("Empty!")
          setCodeInvalid(true)
        } else {
          let eventDoc = eventDocs.docs[0]
          const event = eventDoc.data()
          let amt = 0
          if (event.splitEvenly) {
            amt = event.splitAmount
          }
          
          console.log(eventDoc.id)
          let myEntry = await getDoc(doc(db, "events", eventDoc.id, "friends", user.uid))
          if(!myEntry.exists()) {
            await setDoc(doc(db, "events", eventDoc.id, "friends", user.uid), {
              userID: user.uid,
              displayName: user.displayName,
              amount: amt,
              isCreator: false, 
              paid: false,
              timestamp: Timestamp.now()
            }).catch((error) => console.log(error))
          }
           navigation.navigate("SplitView", {
            eventCode: code,
            eventName: event.name,
            creatorID: event.creator
          })
        }
    } else {
      setCodeInvalid(true)
    }    
  }

  return (
    <Screen>
      <View style={[defaultStyles.centerItems, styles.titleContainer]}>
        <Text style={[defaultStyles.title]}>Join a Session</Text>
      </View>
      <View style={styles.inputContainer}>
        <View style={styles.input}>
          <AppText>Session code</AppText>
          <AppTextInput placeholder="1B3D5F" 
          autoFocus={true}
          value={joinCode}
          onChangeText={setJoinCode}
          onSubmitEditing={checkEvent}/>
        </View>
        
        {codeInvalid && (
              <AppText
                style={styles.error}
              >{`Please check your code and try again.`}</AppText>
        )}
        <Button style={{ backgroundColor: defaultStyles.colors.secondary }}
              onPress={checkEvent}>
          <AppText pText>Next</AppText>
        </Button>
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
  inputContainer: {
    padding: 20,
  },
  input: {
    marginBottom: 10,
  },
  error: {
    marginBottom: 10,
    fontWeight: "bold",
    color: "#ff5252",
  },
});

