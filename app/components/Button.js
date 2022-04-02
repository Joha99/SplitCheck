import { View, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import defaultStyles from "../config/styles";

export default function Button({ children, style, ...rest }) {
  return (
    <TouchableOpacity style={[styles.container, style]} {...rest}>
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
    backgroundColor: defaultStyles.colors.secondary,
    alignItems: "center",
    justifyContent: "center",
  },
});
