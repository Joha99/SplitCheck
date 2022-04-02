import { StyleSheet, View } from "react-native";
import SplitView from "./app/screens/SplitView";
import Home from "./app/screens/Home";
import Login from "./app/screens/Login";
import CreateEvent from "./app/screens/CreateEvent";
import EqualPayment from "./app/screens/EqualPayment";
import CodeJoin from "./app/screens/CodeJoin";

export default function App() {
  return (
    <View style={styles.container}>
      <CodeJoin />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
