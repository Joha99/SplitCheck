import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Screen from "../components/Screen";
import defaultStyles from "../config/styles";
import AppText from "../components/AppText";
import AppTextInput from "../components/AppTextInput";

export default function EqualPayment() {
  return (
    <Screen>
      <View style={[defaultStyles.centerItems, styles.titleContainer]}>
        <Text style={[defaultStyles.title]}>Equal Payment</Text>
      </View>
      <View style={styles.inputContainer}>
        {/* Number of people */}
        <View style={styles.input}>
          <AppText>
            Number of people to split bill with (including self)
          </AppText>
          <AppTextInput placeholder="5" />
        </View>

        {/* Payment deadline */}
        <View style={styles.input}>
          <AppText>Payment deadline</AppText>
          <AppTextInput placeholder="02/25/22" />
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
});
