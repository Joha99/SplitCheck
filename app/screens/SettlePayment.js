import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import Screen from "../components/Screen";
import defaultStyles from "../config/styles";
import AppText from "../components/AppText";
import AppTextInput from "../components/AppTextInput";
import Button from "../components/Button";
import { auth, db } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
  limit,
  updateDoc,
  arrayUnion,
  arrayRemove,
  setDoc,
  Timestamp,
  doc,
  getDoc,
} from "firebase/firestore";

export default function SettlePayment({ route, navigation }) {
  const { eventCode, eventName, friendInfo, creatorID } = route.params;
  const [amount, _setAmount] = useState(friendInfo.amount);
  const [user, loading, error] = useAuthState(auth);
  const [amountInvalid, setAmountInvalid] = useState(null);
  const [venmo, setVenmo] = useState(null)
  const [alreadyPaid, setAlreadyPaid] = useState(friendInfo.paid)

  const setAmount = (input) => {
    _setAmount(input);
    setAmountInvalid(isNaN(input) || input <= 0);
  };

  const updateAmount = async () => {
    if (amount != friendInfo.amount && !amountInvalid) {
      // friendInfo.amount = amount
      let ref = null;
      const queryEventByInviteCode = query(
        collection(db, "events"),
        where("inviteCode", "==", eventCode),
        orderBy("timestamp", "desc")
      );
      const results = await getDocs(queryEventByInviteCode);
      let eventID = results.docs[0].id;
      await setDoc(
        doc(db, "events", eventID, "friends", user.uid),
        {
          amount: amount,
          // timestamp: Timestamp.now(),
        },
        { merge: true }
      );
      setAmount(amount);
    }
    navigation.navigate("SplitView", {
      eventCode: eventCode,
      eventName: eventName,
      creatorID: creatorID
    });
  };

  const markPaid = async () => {
    // friendInfo.amount = amount
    let ref = null;
    const queryEventByInviteCode = query(
      collection(db, "events"),
      where("inviteCode", "==", eventCode),
      orderBy("timestamp", "desc")
    );
    const results = await getDocs(queryEventByInviteCode);
    let eventID = results.docs[0].id;
    await setDoc(
      doc(db, "events", eventID, "friends", user.uid),
      {
        paid: !alreadyPaid,
      },
      { merge: true }
    );
    setAlreadyPaid(!alreadyPaid)
    navigation.navigate("SplitView", {
      eventCode: eventCode,
      eventName: eventName,
    });
  };


  useEffect(async () => {
    const venmoDoc = await getDoc(doc(db, "userinfo", creatorID))
    if (venmoDoc) {
        setVenmo(venmoDoc.data().venmo);
      }
  }, [])

  return (
    <Screen>
      <View style={[defaultStyles.centerItems, styles.titleContainer]}>
        <Text style={[defaultStyles.title]}>{friendInfo.displayName}</Text>
      </View>
      <View style={styles.inputContainer}>
        {/* Name of event */}
        <View style={styles.eventDescription}>
          <AppText style={defaultStyles.header}>For: {eventName}</AppText>
        </View>

        {/* If looking at my own settle amount page */}
        {friendInfo.userID == user.uid && (
          <View style={styles.input}>
            <AppText>If you need to update your amount, enter it here:</AppText>
            <AppTextInput
              placeholder={amount.toString()}
              autoFocus={true}
              value={amount}
              onChangeText={setAmount}
              onSubmitEditing={updateAmount}
              keyboardType="numeric"
            />
            {amountInvalid && (
              <AppText style={styles.error}>{`Please enter a ${
                amount < 0 ? "POSITIVE " : ""
              }number!`}</AppText>
            )}
            <Button
              style={{ backgroundColor: defaultStyles.colors.secondary }}
              onPress={updateAmount}
              disabled={amountInvalid}
            >
              <AppText>Update Amount</AppText>
            </Button>
          </View>
        )}
        
        <View style={styles.eventDescription}>
          <AppText style={defaultStyles.header}>Payment Information</AppText>
          {venmo ? 
            <AppText style={styles.success}>Payer's Venmo handle: @{venmo}</AppText> :

            <AppText style={styles.success}>Please ask the event creator for their information.</AppText>}
            <Button
              style={{ backgroundColor: defaultStyles.colors.secondary }}
              onPress={markPaid}
            >
              <AppText>Mark as {alreadyPaid ? "Unpaid" : "Paid"}</AppText>
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
  inputContainer: {
    padding: 20,
  },
  input: {
    marginBottom: 15,
  },
  eventDescription: {
    marginBottom: 25,
  },
  error: {
    // marginTop: 10,
    marginBottom: 10,
    fontWeight: "bold",
    color: "#ff5252",
  },
  success: {
    marginTop: 10,
    marginBottom: 10,
    fontWeight: "bold",
    color: "#4ecdc4",
  },
});
