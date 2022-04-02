import { StyleSheet, View } from "react-native";
import SplitView from "./app/screens/SplitView";
import Home from "./app/screens/Home";
import Login from "./app/screens/Login";
import CreateEvent from "./app/screens/CreateEvent";

export default function App() {
  return (
    <View style={styles.container}>
      {/* <Home /> */}
      <SplitView />
      {/* <Login /> */}
      {/* <CreateEvent /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
