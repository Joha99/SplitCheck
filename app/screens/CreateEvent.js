import { View, StyleSheet, TouchableWithoutFeedback, TextInput } from "react-native";
import React, { useState, useRef } from "react";
import Screen from "../components/Screen";
import DateTimePicker from "@react-native-community/datetimepicker";
import defaultStyles from "../config/styles";
import AppText from "../components/AppText";
import AppTextInput from "../components/AppTextInput";
import Button from "../components/Button";
import colors from "../config/colors";


export default function CreateEvent({ navigation }) {
  const [eventName, setEventName] = useState('');
  const [splitAmount, setSplitAmount] = useState(0.0);
  const costInput = useRef(null);

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
          <AppTextInput placeholder="Birthday Dinner" 
                        editable={true}
                        autoFocus={true}
                        returnKeyType="next"
                        onPress={window.focus}
                        onChangeText = {setEventName}
                        maxLength={150}
                        onSubmitEditing={() => 
                          {
                            console.log(eventName)
                            costInput.current.focus()
                          }}
                        />
        </View>
        <View style={styles.input}>
          <AppText>Total Cost</AppText>
          <AppTextInput 
              givenRef = {costInput}
              placeholder="00000" 
              editable={!!eventName}
              onChangeText = {setSplitAmount}
              maxLength = {30}
              blurOnSubmit={true}
              onSubmitEditing={() => 
                {
                  console.log(splitAmount)
                }}
          />
        </View>

        {/* <View style={styles.input}>
          <AppText>Date</AppText>
          <AppTextInput placeholder="02/14/22" />
          <TouchableWithoutFeedback
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
          </TouchableWithoutFeedback>
        </View> */}

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
  container: {
    backgroundColor: colors.light,
    borderRadius: 5,
    flexDirection: "row",
    padding: 15,
    marginVertical: 10,
  },
  textInput: defaultStyles.text,
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
