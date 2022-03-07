import { View, StyleSheet, Text, SafeAreaView } from "react-native";
import React from "react";

export default function SplitView({}) {
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Text>SPLITVIEW!</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {},
});
