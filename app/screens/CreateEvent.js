import { View, StyleSheet, Text, TextInput, Button } from "react-native";
import React, { useState } from "react";
import Screen from "../components/Screen";
import DateTimePicker from "@react-native-community/datetimepicker";
import defaultStyles from "../config/styles";
import AppText from "../components/AppText";
import AppTextInput from "../components/AppTextInput";

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
      <View style={[defaultStyles.centerItems, styles.titleContainer]}>
        <AppText style={defaultStyles.title}>Create Event</AppText>
      </View>
      <View style={styles.inputContainer}>
        <View style={styles.input}>
          <AppText>Event Name</AppText>
          <AppTextInput placeholder="Birthday Dinner" />
        </View>

        <View style={styles.input}>
          <AppText>Total Cost</AppText>
          <AppTextInput placeholder="$200" />
        </View>

        <View>
          <Button onPress={showDatePicker} title="Pick Date" />
          <View style={styles.input}>
            <AppText>{date.toString()}</AppText>
            {showDate && (
              <DateTimePicker
                mode="date"
                value={date}
                onChange={onDateChange}
              />
            )}
          </View>
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {},
  titleContainer: {
    padding: 20,
    borderBottomColor: defaultStyles.colors.light,
    borderBottomWidth: 1,
  },
  inputContainer: {
    padding: 20,
  },
});
