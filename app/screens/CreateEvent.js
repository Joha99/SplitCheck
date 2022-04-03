import { View, StyleSheet, TouchableWithoutFeedback } from "react-native";
import React, { useState } from "react";
import Screen from "../components/Screen";
import DateTimePicker from "@react-native-community/datetimepicker";
import defaultStyles from "../config/styles";
import AppText from "../components/AppText";
import AppTextInput from "../components/AppTextInput";
import Button from "../components/Button";

export default function CreateEvent({ navigation }) {
  const [date, setDate] = useState(new Date());

  const onDateChange = (event, selectedDate) => {
    setDate(selectedDate);
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

        <View style={styles.input}>
          <AppText>Date</AppText>
          <AppTextInput placeholder="02/14/22" />
          {/* <TouchableWithoutFeedback
            style={{
              backgroundColor: defaultStyles.colors.light,
              width: "40%",
            }}
          >
            <View style={styles.dateContainer}>
              <AppText>Pick Date</AppText>
              <View>
                {
                  <DateTimePicker
                    mode="date"
                    value={date}
                    onChange={onDateChange}
                    style={{ width: 100 }}
                  />
                }
              </View>
            </View>
          </TouchableWithoutFeedback> */}
        </View>

        <Button
          style={[
            { backgroundColor: defaultStyles.colors.secondary },
            styles.input,
          ]}
          onPress={() => navigation.navigate("PaymentDivideOption")}
        >
          <AppText>Next</AppText>
        </Button>
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
  dateContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  input: {
    marginBottom: 15,
  },
});
