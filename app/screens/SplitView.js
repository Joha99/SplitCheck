import { StyleSheet, Text, View, TouchableWithoutFeedback } from "react-native";
import React from "react";
import Screen from "../components/Screen";
import Button from "../components/Button";
import defaultStyles from "../config/styles";
import AppText from "../components/AppText";
import AppTextInput from "../components/AppTextInput";

export default function SplitView({}) {
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
        <AppText style={defaultStyles.title}>AppleBees Dinner</AppText>
      </View>
      <View style={styles.lenderContainer}>
        {lenders.map((lender) => {
          return (
            <Button
              key={lender.name}
              style={{
                backgroundColor: defaultStyles.colors.light,
                borderColor: defaultStyles.colors.medium,
                borderWidth: 1,
              }}
            >
              <AppText>{lender.name}</AppText>
              <AppText>${lender.loan.toString()}</AppText>
            </Button>
          );
        })}
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
