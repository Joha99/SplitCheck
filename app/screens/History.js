import { StyleSheet, Text, View, TouchableWithoutFeedback } from "react-native";
import React from "react";
import Screen from "../components/Screen";
import Button from "../components/Button";
import defaultStyles from "../config/styles";
import AppText from "../components/AppText";
import AppTextInput from "../components/AppTextInput";

export default function History({}) {
  const events = [
    {
      name: "AppleBees Night",
      amount: 100,
    },
    {
      name: "Gas",
      amount: 80,
    },
    {
      name: "Flowers",
      amount: 20,
    },
    {
      name: "Movie Tickets",
      amount: 160,
    },
    {
      name: "Domino's",
      amount: 200,
    },
  ];

  return (
    <Screen>
      <View style={[defaultStyles.centerItems, styles.titleContainer]}>
        <AppText style={defaultStyles.title}>History</AppText>
      </View>
      <View style={styles.eventsContainer}>
        {events.map((event) => {
          return (
            <Button
              key={event.name}
              style={{
                backgroundColor: defaultStyles.colors.light,
                borderColor: defaultStyles.colors.medium,
                borderWidth: 1,
              }}
            >
              <AppText>{event.name}</AppText>
              <AppText>${event.amount.toString()}</AppText>
            </Button>
          );
        })}
      </View>
      <View style={styles.eventsContainer}>
          <Button
            title = "Back">
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
