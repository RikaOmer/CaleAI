import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import styles from "./styles";
import { AntDesign } from "react-native-vector-icons";
import CalendarPick from "../../../components/calendar/CalendarPick";
import HoursPicker from "../add/HoursPicker";

export default function TimeRow({
  task,
  openExetntion,
  setOpenExetntion,
  isStartTime,
  updateTask,
}) {
  const type = isStartTime ? "from_time" : "to_time";
  return (
    <View style={{ width: "100%", ...styles.row }}>
      <AntDesign
        name="clockcircle"
        size={styles.iconProps.size}
        color={styles.iconProps.color}
        style={styles.icon}
      />
      <View style={{ ...styles.container, padding: 10 }}>
        <View
          style={{
            flexDirection: "row",
            width: "100%",
            justifyContent: "space-around",
          }}
        >
          <TouchableOpacity
            onPress={() =>
              setOpenExetntion((prev) =>
                prev === type + "_date" ? null : type + "_date"
              )
            }
          >
            <Text style={styles.iconText}>
              {task["date"]}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              setOpenExetntion((prev) =>
                prev === type + "_time" ? null : type + "_time"
              )
            }
          >
            <Text style={styles.iconText}>
              {task[type]}
            </Text>
          </TouchableOpacity>
        </View>
        <CalendarPick
          show={openExetntion === type + "_date"}
          currentDate={task["date"]}
          onDayPress={(day) => 
          {
            updateTask("date", day.dateString), setOpenExetntion(null)
          }
          }
        />
        <HoursPicker
          show={openExetntion === type + "_time"}
          currentHour={task[type]}
          isButtonHidden={true}
          onChange={(hour) => {updateTask(type, hour), setOpenExetntion(null)}}
        />
      </View>
    </View>
  );
}
