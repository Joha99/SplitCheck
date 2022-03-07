import { View, StyleSheet, Text } from "react-native";
import React from "react";

export default function Home({}) {
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Text>Home!</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {},
});
