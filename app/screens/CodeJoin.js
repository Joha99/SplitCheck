import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Screen from "../components/Screen";
import defaultStyles from "../config/styles";
import AppText from "../components/AppText";
import AppTextInput from "../components/AppTextInput";
import Button from "../components/Button";

export default function CodeJoin({navigation}) {
  return (
    <Screen>
      <View style={[defaultStyles.centerItems, styles.titleContainer]}>
        <Text style={[defaultStyles.title]}>Join a Session</Text>
      </View>
      <View style={styles.inputContainer}>
        <View style={styles.input}>
          <AppText>Session code</AppText>
          <AppTextInput placeholder="123456" />
        </View>
      </View>
      <Button style={{ backgroundColor: defaultStyles.colors.secondary }}
              onPress={() => navigation.navigate("SplitView")}>
          <AppText>Next</AppText>
      </Button>
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
