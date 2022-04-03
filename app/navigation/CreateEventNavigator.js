import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import CreateEvent from "../screens/CreateEvent";
import PaymentDivideOption from "../screens/PaymentDivideOption";
import EqualPayment from "../screens/EqualPayment";

const Stack = createStackNavigator();

const CreateEventNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen name="CreateEvent" component={CreateEvent} />
    <Stack.Screen name="PaymentDivideOption" component={PaymentDivideOption} />
    <Stack.Screen name="EqualPayment" component={EqualPayment} />
  </Stack.Navigator>
);

export default CreateEventNavigator;
