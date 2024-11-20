import { View } from "react-native";
import React, { useState, useEffect } from "react";
import { Calendar } from "react-native-calendars";
import Task from "../../models/Task";
import DailyCalendarView from "./DailyCalendarView";
import UserPanel from "./UserPanel";
import SidePanel from "./sidePanel";
import AddModal from "../activities/add/AddModal";
import routes from "../../assets/routes";
import User from "../../models/User";
import { CommonActions } from "@react-navigation/native";
import Manager from "../../services/manager";
import Event from "../../models/Event";
export default function CalandarView({ navigation }) {
  
  const today = new Date();
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [selected, setSelected] = useState(new Date());
  const [refreshIndex, setRefreshIndex] = useState(0);

  function refreshEvents() {
    setRefreshIndex((prev) => prev + 1);
  }
  useEffect(() => {
    async function getEvents() {
      setIsLoading(true);
      const resp = await Event.getEvents(selected.toISOString().split("T")[0]);
      setEvents(resp);
      setIsLoading(false);
    }
    if (selected)
    getEvents();
  }, [selected,refreshIndex]);
  // const [showSideBar, setShowSideBar] = useState(false);
  useEffect(() => {
    async function checkUser() {
      if (!(await User.is_logged_in())) {
        console.log("User is logged in");
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: routes.welcome.name }],
          })
        );
      }
    }
    checkUser();
  }, []);
  return (
    <View
      style={{
        width: "100%",
        height: "100%",
        marginTop: 50,
        flex: 1,
      }}
    >
      <UserPanel navigation={navigation} />
      <View
        style={{
          marginStart: "auto",
          marginEnd: "auto",
          width: "95%",
          shadowColor: "gray",
          shadowRadius: 20,
          shadowOffset: { width: 0, height: 10 },
          shadowOpacity: 1,
        }}
      >
        <Calendar
          style={{
            width: "100%",
            height: 310,
            borderRadius: 20,
          }}
          markedDates={{
            [selected.toISOString().split("T")[0]]: {
              selected: true,
              selectedColor: "blue",
            },
          }}
          onDayPress={(date) => setSelected(new Date(date.dateString))}
          onMonthChange={(month) => {
          }}
          firstDay={0}
          onPressArrowLeft={(subtractMonth) => subtractMonth()}
          onPressArrowRight={(addMonth) => addMonth()}
          theme={{
            calendarBackground: "transparent",
          }}
        />
      </View>
      <DailyCalendarView
        events={events}
        selectedDate={selected}
        setSelectedDate={setSelected}
        isLoading={isLoading}
        refreshEvents={refreshEvents}
      />
    </View>
  );
}
let categories = [
  "callMom",
  "exercise",
  "read",
  "listenToMusic",
  "Learning",
  "clean",
  "other",
];
// const events = Array.from({ length: 10 }, (_, i) => {
//   let startTime = new Date();
//   let endTime = new Date();
//   endTime.setDate(startTime.getDate() + 1);

//   return {
//     startTime: startTime,
//     endTime: endTime,
//     name: `${categories[i % categories.length]} Name`,
//     description: `This is the summary for event ${i + 1}`,
//     category: categories[i % categories.length], // Cycle through categories
//   };
// });
