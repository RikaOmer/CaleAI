import { View, Text, StyleSheet, ScrollView } from "react-native";
import React from "react";
import Activities from "../../../../assets/Activities";
import Colors from "../../../../assets/Colors";
// import Activities from "../../../assets/Activities";
export default function DayBox({ day, events }) {
  return (
    <View
      style={{
        ...styles.container,
      }}
    >
      <Text style={styles.day_Text}>{day}</Text>
      {/* <ScrollView> */}
      {events.map((e, i) => {
        if (i > 3) return <></>;
        return (
          <View
            key={i}
            style={{
              backgroundColor: Activities[e.category]?.color,
              width: "100%",
              overflow: "hidden",
            }}
          >
            <Text
              style={{ overflow: "hidden", fontWeight: "bold", fontSize: 12 }}
            >
              {e.name.substring(0, 5)}
            </Text>
          </View>
        );
      })}
      {/* </ScrollView> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "13.5%",
    // height: "100%",
    borderWidth: 0.5,
    // margin: 1,
    borderColor: "gray",
    borderRadius: 5,
    // margin: 1,
    alignContent: "center",
    backgroundColor: Colors.black,
  },
  day_Text: {
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 5,
    color: "white",
    opacity: 0.7,
  },
});
