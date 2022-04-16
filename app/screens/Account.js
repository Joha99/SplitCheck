import { View, StyleSheet } from "react-native";
import React from "react";
import Screen from "../components/Screen";
import Button from "../components/Button";
import AppTextInput from "../components/AppTextInput";
import AppText from "../components/AppText";
import defaultStyles from "../config/styles";

export default function Account({ navigation }) {
  return (
    <Screen>
      <View style={[defaultStyles.centerItems, styles.titleContainer]}>
        <AppText style={[defaultStyles.title]}>Account</AppText>
      </View>
      <View style={[defaultStyles.padding]}>
        <View style={styles.input}>
          <AppText>First name</AppText>
          <AppTextInput placeholder={"Sarah"} />
        </View>

        <View style={styles.input}>
          <AppText>Last name</AppText>
          <AppTextInput placeholder={"Smith"} />
        </View>

        <View style={styles.input}>
          <AppText>Venmo handle</AppText>
          <AppTextInput placeholder={"@sarahh"} />
        </View>

        <View style={styles.input}>
          <Button style={{ backgroundColor: defaultStyles.colors.secondary }}>
            <AppText>Save changes</AppText>
          </Button>
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
  input: {
    marginBottom: 15,
  },
});
