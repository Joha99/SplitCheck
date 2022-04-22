import { View, StyleSheet, Text, Pressable, Image } from "react-native";
import React from "react";
import Screen from "../components/Screen";
import Button from "../components/Button";
import AppText from "../components/AppText";
import defaultStyles from "../config/styles";

export default function Home({navigation}) {
  return (
    <Screen>
      <View style={styles.inputContainer}>
        <View style={{alignItems: 'center'}}>
          <Button style={styles.account}
                  onPress={() => navigation.navigate("Account")}>
              <AppText>Account</AppText>
          </Button>
        </View>

        <View style={[defaultStyles.centerItems, styles.titleContainer]}>
          <Text style={[defaultStyles.title, styles.mainTitle]}>Split Check!</Text>
        </View>
        <View style={defaultStyles.centerItems}>
        <Image
          style={styles.logo}
          source={require('../../assets/splitcheck-logo.png')}/>
        </View>

        <Button style={{ backgroundColor: defaultStyles.colors.secondary }}
                onPress={() => navigation.navigate("CreateEventNavigator")}>
            <AppText>New Event</AppText>
        </Button>
        <Button style={{ backgroundColor: defaultStyles.colors.secondary }}
                onPress={() => navigation.navigate("SettleNavigator")}>
            <AppText>Settle Up</AppText>
        </Button>
        <Button style={{ backgroundColor: defaultStyles.colors.secondary }}
                onPress={() => navigation.navigate("History")}>
            <AppText>History</AppText>
        </Button>
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
  account: {
    width: '30%',
    height: 50,
    alignSelf: 'flex-end'
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
  mainTitle: {
    marginTop: 50,
    marginBottom: 200,
  },
  logo: {
    width: '30%',
    height: '30%',
    resizeMode: 'contain'
  }
});
