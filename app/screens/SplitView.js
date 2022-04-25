import { StyleSheet, Text, View, TouchableWithoutFeedback, ScrollView } from "react-native";
import React, { useState, useEffect } from "react";
import Screen from "../components/Screen";
import Button from "../components/Button";
import defaultStyles from "../config/styles";
import AppText from "../components/AppText";
import AppTextInput from "../components/AppTextInput";
import { db } from "../../firebase";
import { collection, onSnapshot, query, where, orderBy, collectionGroup, getDocs, doc } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { app, auth } from "../../firebase";

export default function SplitView({ route, navigation }) {
  const { eventCode, eventName, creatorID } = route.params;
  const [friends, setFriends] = useState([]);
  const [user, loading, error] = useAuthState(auth);

  useEffect(async () => {
    const queryEventByInviteCode = query(
      collection(db, "events"),
      where("inviteCode", "==", eventCode),
      orderBy("timestamp", "desc")
    );
    const eventDocs = await getDocs(queryEventByInviteCode)
    const eventID = eventDocs.docs[0].id
    if (eventDocs.empty) {
      console.log("Empty!")
      setCodeInvalid(true)
    } else {
      const friendsQuery = query(collection(db, "events", eventID, "friends"), orderBy("timestamp", "asc"))
      onSnapshot(friendsQuery, (results) => {
        let update = []
        results.forEach((doc) => {
          update.push(doc.data())
        })
        setFriends(update)
    });
    }

  }, []);
  
  return (
    <Screen>
      <View style={[defaultStyles.centerItems, styles.titleContainer]}>
        <AppText style={defaultStyles.title}>{eventName}</AppText>
        <AppText style={defaultStyles.title}>Join Code: <AppText style={styles.success}>{eventCode}</AppText></AppText>
      </View>
      <View style={styles.lenderContainer}>
        <ScrollView showsVerticalScrollIndicator={false}>
        {friends.map((friend) => {
          return (
            <Button
              key={friend.userID}
              style={{
                backgroundColor: user.uid === friend.userID ? "white" : defaultStyles.colors.light,
                borderColor: defaultStyles.colors.medium,
                borderWidth: 1,
              }}
              viewStyle={{
                flexDirection: "row",
                justifyContent: "space-between",
                flex: 1,
              }}
              onPress={() =>
                navigation.navigate("SettlePayment", {
                  eventCode: eventCode,
                  eventName: eventName,
                  friendInfo: friend,
                  creatorID: creatorID
                })
              }
              disabled={user.uid != friend.userID}
            >
              <AppText style={user.uid == friend.userID ? styles.myAmount : {}}>
                {friend.isCreator ? "👑 " : ""}{friend.displayName}{friend.isCreator ? " 👑 " : ""}
              </AppText>
              <AppText style={{ textAlign: "center" }}>
                ${friend.amount} {friend.paid? "✅": "⌛"}
              </AppText>
            </Button>
          );
        })}
        </ScrollView>
      </View>
      <View>
        <Button
          style={{ backgroundColor: defaultStyles.colors.secondary }}
          onPress={() => navigation.navigate("Home")}
        >
          <AppText>Home</AppText>
        </Button>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  myAmount: {
    fontWeight: "bold",
    color: defaultStyles.colors.secondary
  },
  titleContainer: {
    padding: 20,
    borderBottomColor: defaultStyles.colors.light,
    borderBottomWidth: 1,
  },
  lenderContainer: {
    padding: 20,
    height: '79%'
  },
  name: {
    fontSize: 16,
  },
  loan: {
    fontSize: 16,
  },
  success: {
    fontFamily: Platform.OS === "android" ? "Roboto" : "Avenir",
    color: "#4ecdc4",
    fontSize: 25,
  },
});
