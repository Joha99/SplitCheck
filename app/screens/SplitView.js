import { StyleSheet, Text, View, TouchableWithoutFeedback } from "react-native";
import React from "react";
import Screen from "../components/Screen";

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
      <View style={styles.titleContainer}>
        <Text style={styles.title}>AppleBees Dinner</Text>
      </View>
      <View style={styles.lenderContainer}>
        {lenders.map((lender) => {
          return (
            <TouchableWithoutFeedback onPress={() => {}} key={lender.name}>
              <View style={styles.lender}>
                <Text style={styles.name}>{lender.name}</Text>
                <Text style={styles.loan}>${lender.loan.toString()}</Text>
              </View>
            </TouchableWithoutFeedback>
          );
        })}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    height: "25%",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
  },
  lenderContainer: {},
  lender: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "red",
    padding: 20,
    marginBottom: 15,
  },
  name: {
    fontSize: 16,
  },
  loan: {
    fontSize: 16,
  },
});
