import { View, TextInput, StyleSheet } from "react-native";
import React from "react";
import colors from "../config/colors";
import defaultStyles from "../config/styles";

export default function AppTextInput({ width = "100%", givenRef=null, ...rest }) {
  return (
    <View style={[styles.container, { width: width }]}>
      <TextInput
        ref={givenRef}
        // onPress = {current.focus()}
        placeholderTextColor={defaultStyles.colors.medium}
        style={styles.textInput}
        {...rest}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.light,
    borderRadius: 5,
    flexDirection: "row",
    padding: 15,
    marginVertical: 10,
  },
  textInput: defaultStyles.text,
});
