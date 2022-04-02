import { View, StyleSheet, Text, Button, Pressable } from "react-native";
import React from "react";
import Screen from "../components/Screen";


export default function Home({}) {
  return (
    <Screen>
      <Text>Split Check!</Text>
      <Pressable style={styles.button}>
        <Text style={styles.text}>New Event</Text>
      </Pressable>
      <Pressable style={styles.button}>
        <Text style={styles.text}>Settle Up</Text>
      </Pressable>
      <Pressable style={styles.button}>
        <Text style={styles.text}>History</Text>
      </Pressable>

    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: '#71EC4C',
      alignItems: 'center',
      justifyContent: 'center',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: 'green',
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
});
