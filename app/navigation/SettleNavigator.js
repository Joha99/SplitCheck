import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import SettlePayment from "../screens/SettlePayment";
import CodeJoin from "../screens/CodeJoin";
import SplitView from "../screens/SplitView";

const Stack = createStackNavigator();

const SettleNavigator = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="CodeJoin" component={CodeJoin} />
    <Stack.Screen name="SplitView" component={SplitView} />
    <Stack.Screen name="SettlePayment" component={SettlePayment} />
  </Stack.Navigator>
);

export default SettleNavigator;