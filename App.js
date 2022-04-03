import { StyleSheet, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import CreateEventNavigator from "./app/navigation/CreateEventNavigator";

const Stack = createStackNavigator();

export default function App() {
  return (
    // <View style={styles.container}>
    //   <CreateEventNavigator />
    // </View>
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen
          name="CreateScreenNavigator"
          component={CreateEventNavigator}
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
