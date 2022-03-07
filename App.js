import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import SplitView from "./app/screens/SplitView";

export default function App() {
  return (
    <View style={styles.container}>
      <SplitView />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // backgroundColor: "#fff",
    // alignItems: "center",
    // justifyContent: "center",
  },
});
