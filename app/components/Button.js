import { View, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";

export default function Button({ children, style }) {
  return (
    <TouchableOpacity style={[styles.container]}>
      <View style={styles.view}>{children}</View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "#e63946",
    padding: 25,
    marginBottom: 15,
    borderRadius: 5,
  },
  view: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
