import { View, StyleSheet, Text, Pressable } from "react-native";
import React from "react";
import Screen from "../components/Screen";
import Button from "../components/Button";
import AppText from "../components/AppText";

export default function PaymentDivideOption({}) {
  return (
    <Screen>
    <View style={styles.inputContainer}>
      <Text>Payment</Text>
      <Text>How do you want to split up the event?</Text>
      <Button>
          <AppText>Split Equally</AppText>
      </Button>
      {/* <Pressable style={styles.button}>
        <Text style={styles.text}>Split Equally</Text>
      </Pressable>
      <Pressable style={styles.button}>
        <Text style={styles.text}>Specific Amounts</Text>
      </Pressable>
      <Pressable style={styles.button}>
        <Text style={styles.text}>Back</Text>
      </Pressable> */}
      </View>
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