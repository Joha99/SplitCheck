import { StyleSheet, View } from "react-native";
import SplitView from "./app/screens/SplitView";
import Home from "./app/screens/Home";
import Login from "./app/screens/Login";
import CreateEvent from "./app/screens/CreateEvent";
import History from "./app/screens/History";
import PaymentDivideOption from "./app/screens/PaymentDivideOption";
import EqualPayment from "./app/screens/EqualPayment";
import CodeJoin from "./app/screens/CodeJoin";
import SettlePayment from "./app/screens/SettlePayment";

export default function App() {
  return (
    <View style={styles.container}>
      {/* <Home /> */}
      {/* <SplitView /> */}
      {/* <Login /> */}
      {/* <CreateEvent /> */}
      <History />
      {/* <PaymentDivideOption /> */}
      {/* <SettlePayment /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
