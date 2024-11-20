import { View, Text, Modal } from "react-native";
import React, { useState } from "react";
import { DatePicker } from "react-native-wheel-pick";
import Button from "../Button";

export default function DatePickerModal({ text, onChange, style }) {
  const [show, setShow] = useState(false);
  return (
    <>
      <Button text={text} onPress={() => setShow(true)} />
      <Modal
        visible={show}
        style={{
          margin: 20,
          backgroundColor: "white",
          borderRadius: 20,
          padding: 35,
          alignItems: "center",
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 4,
          elevation: 5,
        }}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            marginTop: 22,
          }}
        >
          <DatePicker onDateChange={() => {}} />
        </View>
      </Modal>
    </>
  );
}
