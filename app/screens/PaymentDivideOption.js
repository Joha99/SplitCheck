import { View, StyleSheet, Text, Pressable } from "react-native";
import React from "react";
import Screen from "../components/Screen";
import Button from "../components/Button";
import AppText from "../components/AppText";
import defaultStyles from "../config/styles";

export default function PaymentDivideOption({ navigation }) {
  return (
    <Screen>
      <View style={styles.inputContainer}>
        <View style={[defaultStyles.centerItems, styles.titleContainer]}>
          <AppText style={[defaultStyles.title]}>Payment Divide Option</AppText>
        </View>

        <View
          style={[defaultStyles.centerItems, defaultStyles.verticalPadding]}
        >
          <AppText>How do you want to split up the event?</AppText>
        </View>

        <Button
          style={{ backgroundColor: defaultStyles.colors.secondary }}
          onPress={() => navigation.navigate("EqualPayment")}
        >
          <AppText>Split Equally</AppText>
        </Button>

        <Button style={{ backgroundColor: defaultStyles.colors.secondary }}>
          <AppText>Specific Amounts</AppText>
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
  container: {
    flex: 1,
    backgroundColor: "#71EC4C",
    alignItems: "center",
    justifyContent: "center",
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
  question: {
    marginBottom: 50,
  },
});
