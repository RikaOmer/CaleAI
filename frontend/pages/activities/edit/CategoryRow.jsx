import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import Activities from "../../../assets/Activities";
import { Picker } from "react-native-wheel-pick";
import styles from "./styles";
import { MaterialIcons } from "react-native-vector-icons";

export default function CategoryRow({ task, openExetntion, setOpenExetntion, updateTask }) {
  return (
    <View style={{ width: "100%", ...styles.row }}>
      <MaterialIcons
        name="category"
        size={styles.iconProps.size}
        color={styles.iconProps.color}
        style={styles.icon}
      />
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.touchable}
          onPress={() =>
            setOpenExetntion((prev) =>
              prev === "category" ? null : "category"
            )
          }
        >
          <Text style={styles.iconText}>{Activities[task.task.type_id.name].emoji}</Text>
          <Text style={styles.text}>{Activities[task.task.type_id.name].label}</Text>
        </TouchableOpacity>
        <Picker
          style={{
            backgroundColor: "white",
            width: "100%",
            height: 150,
            display: openExetntion === "category" ? "flex" : "none",
            overflow: "hidden",
          }}
          selectedValue={task.category}
          pickerData={Object.keys(Activities)}
          onValueChange={(value) => {
            const task_db = task.task;
            task_db.type_id.name = value;
            updateTask("task", task_db);
            setOpenExetntion(null);
          }}
        />
      </View>
    </View>
  );
}
