import React from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  Platform,
  StatusBar,
} from "react-native";

function Screen({ children, style }) {
  return (
    <SafeAreaView style={[styles.container, style]}>
      <View style={styles.view}>{children}</View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  view: {
    paddingLeft: 15,
    paddingRight: 15,
  },
});

export default Screen;
