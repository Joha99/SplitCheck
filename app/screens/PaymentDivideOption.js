import { View, StyleSheet, Text, Pressable } from "react-native";
import React from "react";
import Screen from "../components/Screen";
import Button from "../components/Button";
import AppText from "../components/AppText";
import defaultStyles from "../config/styles";

export default function PaymentDivideOption({}) {
  return (
    <Screen>
    <View style={styles.inputContainer}>
    <View style={[defaultStyles.centerItems, styles.titleContainer]}>
        <Text style={[defaultStyles.title]}>Settle Payment</Text>
      </View>
      <Text style={styles.question}>How do you want to split up the event?</Text>
      <Button style={{ backgroundColor: defaultStyles.colors.secondary }}>
          <AppText>Split Equally</AppText>
      </Button>

      <Button style={{ backgroundColor: defaultStyles.colors.secondary }}>
          <AppText>Specifics Amounts</AppText>
      </Button>
      <Button style={{ backgroundColor: defaultStyles.colors.secondary }}>
          <AppText>Back</AppText>
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
    question: {
        marginBottom: 50
    },
  });