import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import SettlePayment from "../screens/SettlePayment";
import CodeJoin from "../screens/CodeJoin";
import SplitView from "../screens/SplitView";
import Home from "../screens/Home";
import Login from "../screens/Login";
import History from "../screens/History";
import SettleNavigator from "./SettleNavigator";
import CreateEventNavigator from "./CreateEventNavigator";

const Stack = createStackNavigator();

const AppNavigator = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Login" component={Login} />
    <Stack.Screen name="Home" component={Home} />
    <Stack.Screen name="CreateEventNavigator" component={CreateEventNavigator} />
    <Stack.Screen name="SettleNavigator" component={SettleNavigator} />
    <Stack.Screen name="History" component={History} />
  </Stack.Navigator>
);

export default AppNavigator;