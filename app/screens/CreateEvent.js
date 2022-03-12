import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  Button,
} from "react-native";
import React, { useState } from "react";
import Screen from "../components/Screen";
import DateTimePicker from "@react-native-community/datetimepicker";

export default function CreateEvent({}) {
  const [showDate, setShowDate] = useState(false);
  const [date, setDate] = useState(new Date());

  const onDateChange = (event, selectedDate) => {
    setDate(selectedDate);
  };

  const showDatePicker = () => {
    setShowDate(true);
  };

  return (
    <Screen>
      <Text>CREATEEVENT</Text>
      <View style={styles.inputContainer}>
        <View style={styles.input}>
          <Text>Event Name</Text>
          <TextInput
            style={styles.input}
            onChangeText={() => {}}
            placeholder="Birthday Dinner"
          />
        </View>
        <Button onPress={showDatePicker} title="Pick Date" />
        <View style={styles.input}>
          <Text>Selected Date: {date.toString()}</Text>
          {showDate && (
            <DateTimePicker mode="date" value={date} onChange={onDateChange} />
          )}
        </View>

        <View style={styles.input}>
          <Text>Total Cost</Text>
          <TextInput
            style={styles.input}
            onChangeText={() => {}}
            placeholder="$200"
          />
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {},
});
