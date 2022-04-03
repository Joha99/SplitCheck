import { View, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import defaultStyles from "../config/styles";

export default function Button({ children, style, onPress, ...rest }) {
  return (
    <TouchableOpacity
      style={[styles.container, style]}
      onPress={onPress}
      {...rest}
    >
      <View>{children}</View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 15,
    marginBottom: 15,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
});
