import { View, Text, Modal, Pressable, StyleSheet } from "react-native";
import React, { useState } from "react";
import TextBox from "../../../components/textbox";
import { DatePicker } from "react-native-wheel-pick";
import Button from "../../../components/Button";
import TransparentButton from "../../../components/Button/transparentButton";
import Duration from "./Duration";
import HoursPicker from "./HoursPicker";
import DaysPicker from "./DaysPicker";

export default function AddModal({ show, setShow }) {
  const [isHidden, setisHidden] = useState({
    start: true,
    end: true,
  });
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setMonth((tomorrow.getMonth() + 1) % 12);
  const [startDate, setStartDate] = useState(new Date(Date.now()));
  const [endDate, setEndDate] = useState(tomorrow);
  function formatDate(date) {
    return (
      date.getDate() +
      "/" +
      (parseInt(date.getMonth()) + 1).toString() +
      "/" +
      date.getFullYear()
    );
  }
  return (
    <Modal
      visible={show}
      transparent={true}
      animationType="slide"
      style={{
        width: 400,
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        // paddingBottom: 5,
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
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <TextBox
            placeholder={"Task Title"}
            style={{
              borderWidth: 1,
              borderColor: "gray",
              borderRadius: 10,
              width: 1000,
            }}
          />
          <View style={{ flexDirection: "row" }}>
            <TransparentButton text={"Once a day"} />
            <TransparentButton text={"Once a week"} />
            <TransparentButton text={"Once a month"} />
          </View>
          <View>
            <View style={{ marginTop: 10 }}>
              <Button
                text={
                  "Start date   " + (startDate ? formatDate(startDate) : "")
                }
                onPress={() =>
                  setisHidden({ ...isHidden, start: !isHidden.start })
                }
              />
              <View style={{ display: isHidden.start ? "none" : "flex" }}>
                <DatePicker onDateChange={(e) => setStartDate(e)} />
              </View>
            </View>
            <View style={{ marginTop: 10 }}>
              <Button
                text={"End date   " + (endDate ? formatDate(endDate) : "")}
                onPress={() => setisHidden({ ...isHidden, end: !isHidden.end })}
              />
              <View style={{ display: isHidden.end ? "none" : "flex" }}>
                <DatePicker
                  onDateChange={(e) => {
                    setEndDate(e);
                  }}
                />
              </View>
            </View>
          </View>
          <View style={{ marginTop: 10 }}>
            <Duration />
          </View>
          <View style={{ marginTop: 10, flexDirection: "row" }}>
            {/* <View style={{ marginEnd: 2 }}> */}
            <HoursPicker text={"Not before"} />
            {/* </View> */}
            {/* <View style={{ marginEnd: 2 }}> */}
            <HoursPicker text={"Not after"} />
            {/* </View> */}
          </View>
          <View>
            <DaysPicker />
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              marginTop: 10,
              marginBottom: "0",
            }}
          >
            <View style={{ width: "48%" }}>
              <Button
                text={"Dismiss"}
                style={{ backgroundColor: "red" }}
                onPress={() => setShow(false)}
              />
            </View>
            <View style={{ width: "48%", marginStart: 5 }}>
              <Button text={"Add Task"} style={{ backgroundColor: "green" }} />
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    paddingHorizontal: 35,
    paddingVertical: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});
