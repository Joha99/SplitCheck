import { addDoc, collection, onSnapshot, query, where } from 'firebase/firestore';
import React, { useRef, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { StyleSheet, View } from "react-native";
import { Checkbox } from 'react-native-paper';
import Pressable from "react-native/Libraries/Components/Pressable/Pressable";
import { auth, db } from "../../firebase";
import AppText from "../components/AppText";
import AppTextInput from "../components/AppTextInput";
import Button from "../components/Button";
import Screen from "../components/Screen";
import colors from "../config/colors";
import defaultStyles from "../config/styles";
import { LogBox } from 'react-native';



export default function CreateEvent({ navigation }) {
  const [eventName, _setEventName] = useState('');
  const [splitAmount, setSplitAmount] = useState(null);
  const [numPeople, _setNumPeople] = useState(0);
  const [isEvenSplit, setEvenSplit] = useState(false);
  
  const costInput = useRef(null);
  const nameInput = useRef(null);
  const numPeopleInput = useRef(null);

  const [nameInvalid, setNameInvalid] = useState(null);
  const [inputInvalid, _setInputInvalid] = useState(null);
  const [numPeopleInvalid, setNumPeopleInvalid] = useState(null);

  const [user, loading, error] = useAuthState(auth);

  const setEventName = (text) => {
    _setEventName(text)
    setNameInvalid(text == '' || text == null)
  }

  
  const setInputInvalid = (splitAmount) => {
    _setInputInvalid(splitAmount == '' || isNaN(splitAmount) || splitAmount <= 0)
  }
  const setNumPeople = (input) => {
    _setNumPeople(input)
    setNumPeopleInvalid(isNaN(input) || input <= 0) 
  }
  
  const focusOn = (target) => {
    target.current.focus()
  }
  
  const handleCreateEvent = async(generatedCode) => {
    LogBox.ignoreLogs(['Setting a timer for a long period of time, i.e.']);
    console.log(generatedCode)
    // console.log(joinCode)
    const docRef = await addDoc(collection(db, "events"), {
      creator: user.uid,
      inviteCode: generatedCode,
      name: eventName,
      amount: splitAmount,
      splitEvenly: isEvenSplit,
      numPeople: numPeople,
      friends: [{
          user: user.uid, 
          amount: splitAmount}]
        });
    console.log(`added ${docRef.id} to Firestore.`)

    // These are some code examples on how to access data from the firestore
    const queryByInviteCode = query(collection(db, "events"), where("inviteCode", "==", generatedCode));
    onSnapshot(queryByInviteCode, (querySnapshot) => {
      const events = [];
      querySnapshot.forEach((doc) => {
          events.push(doc.data());

      });
      console.log(`Code lookup complete: ${generatedCode} `, events);
    });

    const queryByUID = query(collection(db, "events"), where("creator", "==", user.uid));
    onSnapshot(queryByUID, (querySnapshot) => {
      const events = [];
      querySnapshot.forEach((doc) => {
          events.push(doc.data());

      });
      console.log(`User lookup complete: ${user.uid} `, events);
    });

    navigation.navigate("SettleNavigator", {screen: "SplitView"});
  }
  

  return (
    <Screen>
      <View style={[defaultStyles.centerItems, styles.titleContainer]}>
        <AppText style={defaultStyles.title}>Create New Split</AppText>
      </View>

      <View style={styles.inputContainer}>
        <Pressable 
        onPress = {() => focusOn(nameInput)} >
          <View style={styles.input} pointerEvents="none">
            <AppText>Event Name</AppText>
            <AppTextInput placeholder="Birthday Dinner" 
                givenRef={nameInput}
                editable={true}
                autoFocus={true}
                returnKeyType="next"
                onChangeText = {setEventName}
                maxLength={150}
                onSubmitEditing={() => 
                  {
                    setEventName(eventName)
                    focusOn(costInput)
                  }}
                />
          {nameInvalid && <AppText style={styles.error}>{`Please enter an event name!`}</AppText>}
          </View>
        </Pressable>
        
        <Pressable 
        onPress = {() => focusOn(costInput)} >
        <View style={styles.input}>
          <AppText>Total Cost</AppText>
          <AppTextInput 
              givenRef = {costInput}
              placeholder="$$$$" 
              editable={!!eventName}
              maxLength = {30}
              keyboardType = 'numeric'
              blurOnSubmit = {true}
              onChangeText = {(text) => {
                setSplitAmount(text)
                setInputInvalid(text)
              }}
              onSubmitEditing={() => {
                setInputInvalid(splitAmount)
              }}
          />
          {inputInvalid && <AppText style={styles.error}>{`Please enter a ${splitAmount < 0 ? "POSITIVE " : ''}number!`}</AppText>}
        </View>
        </Pressable>
            
        <View style={styles.input}>
          <Checkbox.Item
            label="Split this payment evenly?"
            status={isEvenSplit ? 'checked' : 'unchecked'}
            style= {styles.checkbox}
            onPress={() => {
              setEvenSplit(!isEvenSplit)
              if(!isEvenSplit) {
                setNumPeople(0)
                setNumPeopleInvalid('first')
              } else {
                setNumPeopleInvalid(false)
              }
              
              }}
          />
        </View>

        {isEvenSplit && 
        <Pressable 
        onPress = {() => focusOn(numPeopleInput)} >
          <View style={styles.input}>
            <AppText>How many people are splitting this payment?</AppText>
              <AppTextInput 
                givenRef={numPeopleInput}
                keyboardType = 'numeric'
                placeholder="This includes yourself!"
                autoFocus={true}
                editable={true}
                maxLength = {30}
                blurOnSubmit = {true}
                onChangeText = {(text) => {setNumPeople(text)}}
              >
              </AppTextInput> 
            {numPeopleInvalid && numPeopleInvalid!='first' && <AppText style={styles.error}>{`Please enter a ${numPeople < 0 ? "POSITIVE " : ''}number!`}</AppText>}
            {!numPeopleInvalid && !inputInvalid && !nameInvalid && 
              <AppText style={styles.success}>Each person will pay: {splitAmount/numPeople}</AppText>}
          </View>
        </Pressable>
          }

        <View style={styles.bottomOfPage}>
          <Button
            style={{backgroundColor: (inputInvalid == null || inputInvalid || numPeopleInvalid) ? colors.light : colors.secondary}}
            disabled={inputInvalid || numPeopleInvalid}
            onPress={async() => {
              generatedCode = (Math.random().toString(36).slice(2, 8)).toUpperCase()
              handleCreateEvent(generatedCode)
            }
          }
          >
            <AppText>Invite Friends!</AppText>
          </Button>
        </View>
        
        
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
    justifyContent: "space-around"
  },
  textInput: defaultStyles.text,
  titleContainer: {
    padding: 20,
    borderBottomColor: defaultStyles.colors.light,
  },
  inputContainer: {
    // padding: 20,
    // flex: 1,
    flexDirection: "column",
    justifyContent: 'flex-start',
  },
  input: {
    marginBottom: 10,
    width: "100%"
    // flexGrow:1
  },
  error: {
    // marginTop: 10,
    marginBottom: 10,
    fontWeight: 'bold',
    color: colors.danger,
  },
  success: {
    marginBottom: 10,
    fontWeight: 'bold',
    color: colors.secondary,
  },
  checkbox: {
    backgroundColor: colors.light,
    padding: 20,
    marginBottom: 10,
    fontWeight: 'bold',
  },

  bottomOfPage: {

    justifyContent: 'center',
    
    paddingTop: "20%",
    // width: '100%'
  }
});
