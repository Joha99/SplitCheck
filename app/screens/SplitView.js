import { StyleSheet, Text, View, TouchableWithoutFeedback } from "react-native";
import React, { useState, useEffect } from "react";
import Screen from "../components/Screen";
import Button from "../components/Button";
import defaultStyles from "../config/styles";
import AppText from "../components/AppText";
import { db } from "../../firebase";
import { doc, getDoc } from "firebase/firestore";
import {
  addDoc,
  collection,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";

export default function SplitView({ route, navigation }) {
  const { eventName, eventCode } = route.params;
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    const queryEventsByInviteCode = query(
      collection(db, "events"),
      where("inviteCode", "==", eventCode)
    );
    onSnapshot(queryEventsByInviteCode, (querySnapshot) => {
      querySnapshot.forEach((doc) => {
        // console.log(doc.id, " => ", doc.data());
        setFriends(doc.data().friends);
      });
      console.log(friends);
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
        {/* {lenders.map((lender) => {
          return (
            <Button
              key={lender.name}
              style={{
                backgroundColor: defaultStyles.colors.light,
                borderColor: defaultStyles.colors.medium,
                borderWidth: 1,
              }}
              onPress={() => navigation.navigate("SettlePayment")}
            >
              <AppText>{lender.name}</AppText>
              <AppText>${lender.loan.toString()}</AppText>
            </Button>
          );
        })} */}
        {friends.map((friend) => {
          return (
            <Button
              key={friend.user}
              style={{
                backgroundColor: defaultStyles.colors.light,
                borderColor: defaultStyles.colors.medium,
                borderWidth: 1,
              }}
              onPress={() => navigation.navigate("SettlePayment")}
            >
              <AppText>{friend.user}</AppText>
              <AppText>${friend.amount.toString()}</AppText>
            </Button>
          );
        })}
      </View>
      <Button
        style={{ backgroundColor: defaultStyles.colors.secondary }}
        onPress={() => navigation.navigate("Home")}
      >
        <AppText>Home</AppText>
      </Button>
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
