import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Screen from "../components/Screen";
import defaultStyles from "../config/styles";
import AppText from "../components/AppText";
import AppTextInput from "../components/AppTextInput";
import Button from "../components/Button";

export default function SettlePayment({ navigation }) {
  return (
    <Screen>
      <View style={[defaultStyles.centerItems, styles.titleContainer]}>
        <Text style={[defaultStyles.title]}>Settle Payment</Text>
      </View>
      <View style={styles.inputContainer}>
        {/* Name of event */}
        <View style={styles.eventDescription}>
          <AppText style={defaultStyles.header}>Event</AppText>
          <AppText>Dinner at AppleBee's</AppText>
        </View>

        {/* Amount owed */}
        <View style={styles.input}>
          <AppText>Amount owed</AppText>
          <AppTextInput placeholder="$20.00" />
        </View>

        {/* Submit */}
        <Button style={{ backgroundColor: defaultStyles.colors.secondary }}>
          <AppText>I Paid</AppText>
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
    marginBottom: 15,
  },
  eventDescription: {
    marginBottom: 25,
  },
});
