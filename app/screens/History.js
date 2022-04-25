import { StyleSheet, Text, View, TouchableWithoutFeedback } from "react-native";
import React, {useEffect, useState} from "react";
import Screen from "../components/Screen";
import Button from "../components/Button";
import defaultStyles from "../config/styles";
import AppText from "../components/AppText";
import AppTextInput from "../components/AppTextInput";
import { useAuthState } from "react-firebase-hooks/auth";
import { collection, onSnapshot, query, where, orderBy, collectionGroup, getDocs, doc, getRef, getParent, path, FieldPath, documentId, getDoc } from "firebase/firestore";
import { app, auth, db } from "../../firebase";
import { LogBox } from "react-native";

export default function History({navigation}) {
  const [user, loading, error] = useAuthState(auth);
  const [events, setEvents] = useState([])

  useEffect(async () => {
    LogBox.ignoreLogs(["Setting a timer for a long period of time, i.e."]);
    const queryEventsByUID = query(collectionGroup(db, "friends"),
      where("userID", "==", user.uid), orderBy("timestamp", "desc")
    );
    const eventDocs = await getDocs(queryEventsByUID)
    if (eventDocs.empty) {
      console.log("Empty!")
    } else {
      let arr = []
      eventDocs.forEach((element) => {
        arr.push(element.ref.parent.parent.id)
      })
      Promise.all(arr.map((parentID) => {
        return getDoc(doc(db, "events", parentID))
      })).then((events)=>{
          events = events.map(i => {
            let element = i.data()
            element.docID = i.id
            return element
          })
          setEvents(events)
          // Now, the events state variable is properly updated.
      })
    }
    
  }, []);

  return (
    <Screen>
      <View style={[defaultStyles.centerItems, styles.titleContainer]}>
        <AppText style={defaultStyles.title}>Split History</AppText>
      </View>
      <View style={styles.eventsContainer}>
        {events.map((event) => {
          return (
            <Button
              key={event.docID}
              style={{
                backgroundColor: defaultStyles.colors.light,
                borderColor: defaultStyles.colors.medium,
                borderWidth: 1,
              }}
              onPress={() => {
                navigation.navigate("SettleNavigator", 
                {
                  screen: "SplitView", 
                  params: {
                    eventCode: event.inviteCode,
                    eventName: event.name,
                    creatorID: event.creator
                }})
              }}
            >
              <AppText>{event.name}</AppText>
              <AppText>${event.amount}</AppText>
            </Button>
          );
        })}
      </View>
      <View style={styles.eventsContainer}>
      <Button style={{ backgroundColor: defaultStyles.colors.secondary }}
                onPress={() => navigation.navigate("Home")}>
          <AppText>Back</AppText>
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
  eventsContainer: {
    padding: 20,
  },
  name: {
    fontSize: 16,
  },
  amount: {
    fontSize: 16,
  },
});
