import { View, Text } from "react-native";
import React from "react";
import { Calendar } from "react-native-calendars";
export default function CalendarPick({ show, currentDate, onDayPress }) {
  if (!show) return <></>;
  return (
    <Calendar
      style={{
        width: "95%",
        height: 310,
      }}
      markedDates={{
        [currentDate]: {
          selected: true,
          selectedColor: "blue",
        },
      }}
      onDayPress={onDayPress}
      onMonthChange={(month) => {
      }}
      firstDay={0}
      onPressArrowLeft={(subtractMonth) => subtractMonth()}
      onPressArrowRight={(addMonth) => addMonth()}
    />
  );
}
