import { View, Text, StyleSheet } from "react-native";
import React from "react";
import DayBox from "./components/DayBox";
import UserPanel from "../UserPanel";
import Colors from "../../../assets/Colors";
export default function MonthlyView({ navigation }) {
  const weekDays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return (
    <View style={styles.container}>
      <UserPanel navigation={navigation} />
      <View style={styles.weekDays}>
        {weekDays.map((d, i) => {
          return (
            <Text
              key={i}
              style={{
                width: "13.5%",
                margin: 1,
                marginBottom: 0,
                marginTop: 5,
              }}
            >
              {d.substring(0, 3)}
            </Text>
          );
        })}
      </View>
      <View style={styles.calendar}>
        {[1, 2, 3, 4, 5].map((w, i) => (
          <View key={i} style={styles.week_row}>
            {[1, 2, 3, 4, 5, 6, 7].map((n, i) => {
              return <DayBox key={i} day={n * w} events={events} />;
            })}
          </View>
        ))}
      </View>
      <View style={styles.footer}></View>
      {/* <Text>MonthlyView</Text> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginTop: "10%",
    flexDirection: "column",
    flexWrap: "wrap",
    flex: 1,
    backgroundColor: Colors.black,
  },
  week_row: {
    flexDirection: "row",
    justifyContent: "center",
    flex: 1,
    // height: "18%",
  },
  calendar: {
    width: "100%",
    marginTop: 5,
    // flexDirection: "column",
    flex: 1,
  },
  weekDays: {
    flexDirection: "row",
    marginStart: 7,
    width: "100%",
    // borderWidth: 5,
    // height: 70,
  },
  footer: {
    marginTop: "auto",
    height: 20,
  },
});

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
