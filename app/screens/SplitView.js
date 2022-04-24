import { StyleSheet, Text, View, TouchableWithoutFeedback } from "react-native";
import React, { useState, useEffect } from "react";
import Screen from "../components/Screen";
import Button from "../components/Button";
import defaultStyles from "../config/styles";
import AppText from "../components/AppText";
import AppTextInput from "../components/AppTextInput";
import { db } from "../../firebase";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { app, auth } from "../../firebase";

export default function SplitView({ route, navigation }) {
  const { eventName, eventCode } = route.params;
  const [friends, setFriends] = useState([]);
  const [user, loading, error] = useAuthState(auth);

  useEffect(() => {
    const queryEventsByInviteCode = query(
      collection(db, "events"),
      where("inviteCode", "==", eventCode)
    );
    onSnapshot(queryEventsByInviteCode, (querySnapshot) => {
      querySnapshot.forEach((doc) => {
        setFriends(doc.data().friends);
      });
    });
  }, []);

  const lenders = [
    {
      name: "ME",
      loan: 20,
    },
    {
      name: "Madison",
      loan: 20,
    },
    {
      name: "Sally",
      loan: 20,
    },
    {
      name: "Meghan",
      loan: 20,
    },
    {
      name: "Domininc",
      loan: 20,
    },
  ];

  return (
    <Screen>
      <View style={[defaultStyles.centerItems, styles.titleContainer]}>
        <AppText style={defaultStyles.title}>{eventName}</AppText>
      </View>
      <View style={styles.lenderContainer}>
        {friends.map((friend) => {
          return (
            <Button
              key={friend.user}
              style={{
                backgroundColor: defaultStyles.colors.light,
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
                  eventName: eventName,
                  displayName: friend.displayName,
                  amountOwed: friend.amount.toString(),
                })
              }
            >
              <AppText style={{ textAlign: "center" }}>
                {friend.displayName}
              </AppText>
              <AppText style={{ textAlign: "center" }}>
                ${friend.amount.toString()}
              </AppText>
            </Button>
          );
        })}
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
  titleContainer: {
    padding: 20,
    borderBottomColor: defaultStyles.colors.light,
    borderBottomWidth: 1,
  },
  lenderContainer: {
    padding: 20,
  },
  name: {
    fontSize: 16,
  },
  loan: {
    fontSize: 16,
  },
});
