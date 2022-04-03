import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import CreateEvent from "../screens/CreateEvent";
import PaymentDivideOption from "../screens/PaymentDivideOption";
import EqualPayment from "../screens/EqualPayment";
import Home from "../screens/Home";
import SettlePayment from "../screens/SettlePayment";
import History from "../screens/History";

const Stack = createStackNavigator();

const CreateEventNavigator = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Home" component={Home} />
    <Stack.Screen name="SettleUp" component={SettlePayment} />
    <Stack.Screen name="History" component={History} />
    <Stack.Screen name="CreateEvent" component={CreateEvent} />
    <Stack.Screen name="PaymentDivideOption" component={PaymentDivideOption} />
    <Stack.Screen name="EqualPayment" component={EqualPayment} />
  </Stack.Navigator>
);

export default CreateEventNavigator;
