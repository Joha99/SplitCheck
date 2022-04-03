import { StyleSheet, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import CreateEventNavigator from "./app/navigation/CreateEventNavigator";
import navigationTheme from "./app/navigation/navigationTheme";
import SettleNavigator from "./app/navigation/SettleNavigator";
import AppNavigator from "./app/navigation/AppNavigator";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer theme={navigationTheme}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen
          name="AppNavigator"
          component={AppNavigator}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
