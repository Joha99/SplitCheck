import { StyleSheet, View } from "react-native";
import SplitView from "./app/screens/SplitView";
import CreateEvent from "./app/screens/CreateEvent";

export default function App() {
  return (
    <View style={styles.container}>
      <CreateEvent />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
