import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Keyboard,
  Modal,
  Pressable,
} from "react-native";
import React, { useState } from "react";
import Button from "../../../components/Button";
import { Picker } from "@react-native-picker/picker";
import ChatButton from "./ChatButton";
export default function ChatHoursMinutes({ text, onPress }) {
  const [show, setShow] = useState(false);
  const [selectedTime, setSelectedTime] = useState("00:20");
  return (
    <View>
      <Modal
        transparent={true}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
        visible={show}
        style={styles.modal}
      >
        <View style={styles.container}>
          <Text style={styles.heaeder}>Duration</Text>
          <Text style={styles.small}>HH:MM</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={selectedTime}
              style={{ ...styles.picker }}
              onValueChange={(itemValue) => setSelectedTime(itemValue)}
            >
              {Array.from({ length: 24 }, (_, i) => i).map((_, hour) =>
                Array.from({ length: 12 }, (_, i) => i).map((_, index) => {
                  const minute = index * 5;
                  return (
                    <Picker.Item
                      key={`${hour}:${minute}`}
                      label={`${hour.toString().padStart(2, "0")}:${minute
                        .toString()
                        .padStart(2, "0")}`}
                      value={`${hour.toString().padStart(2, "0")}:${minute
                        .toString()
                        .padStart(2, "0")}`}
                    />
                  );
                })
              )}
            </Picker>
          </View>
          <ChatButton
            text={"Done"}
            onPress={() => {
              setShow(false);
              onPress(selectedTime);
            }}
          />
          {/* </View> */}
        </View>
      </Modal>
      <View style={{}}>
        <Button text={text} onPress={() => setShow(true)} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 5,
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 10,
    justifyContent: "center",
    backgroundColor: "white",
    alignSelf: "center",
    marginTop: "auto",
    marginBottom: "auto",
  },
  button: {
    color: "black",
  },
  textbox: {
    width: 100,
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    color: "black",
    borderRadius: 10,
  },
  modal: {
    // height: "50%",
    // width: "80%",
    // marginHorizontal: "auto",
    // alignContent: "center",
    alignContent: "center",
    justifyContent: "center",

    // backgroundColor: "white",
  },
  pickerContainer: {
    height: 200,
    width: 300,
    overflow: "hidden",
  },
  picker: {
    // height: 140,
    // width: 300,
    // overflow: "hidden",
  },
  heaeder: {
    fontSize: 20,
    fontWeight: "bold",
    color: "black",
    marginBottom: 10,
    marginTop: 10,
    borderBottomWidth: 1,
    // justifyContent: "center",
  },

  small: {
    textAlign: "center",
    marginBottom: 10,
    color: "black",
    fontSize: 15,
  },
});
