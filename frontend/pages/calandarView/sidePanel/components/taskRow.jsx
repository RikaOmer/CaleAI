import { View, Text, StyleSheet } from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import React from "react";
import Activities from "../../../../assets/Activities";
let categories = [
  "callMom",
  "exercise",
  "read",
  "listenToMusic",
  "Learning",
  "clean",
  "other",
];
const events = Array.from({ length: 10 }, (_, i) => {
  let startTime = new Date();
  let endTime = new Date();
  endTime.setDate(startTime.getDate() + 1);

  return {
    startTime: startTime,
    endTime: endTime,
    name: `${categories[i % categories.length]} Name`,
    description: `This is the summary for event ${i + 1}`,
    category: categories[i % categories.length], // Cycle through categories
  };
});
export default function TaskRow({ i, navigation }) {
  const task = events[i];
  return (
    <View
      style={{
        ...styles.container,
      }}
    >
      <View
        style={{
          ...styles.row,
          backgroundColor: Activities[task.category].color,
        }}
      >
        <BouncyCheckbox
          onPress={(isChecked) => {
            // TODO - handle checkbox click
            // console.log(task);
          }}
          fillColor="black"
          unfillColor="white"
          iconStyle={{ borderColor: "black" }}
          isChecked={true}
        />
        <Text style={{ fontSize: 15, fontWeight: "bold", width: "80%" }}>
          {task.name}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    borderColor: "gray",
    // flex: 1,
    // padding: 10,
  },
  row: {
    // marginBottom: 5,
    padding: 10,
    // borderRadius: 5,
    paddingStart: 15,
    flexDirection: "row",
    height: 50,
    width: "100%",
    alignItems: "center",
  },
  event: {
    marginBottom: 5,
    padding: 10,
    borderRadius: 5,
  },
});
