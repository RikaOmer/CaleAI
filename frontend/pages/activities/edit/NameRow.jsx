import { View, Text, TextInput } from "react-native";
import React from "react";
import styles from "./styles";
import { MaterialIcons } from "react-native-vector-icons";
export default function NameRow({ task, updateTask }) {
  return (
    <View style={{ width: "100%", ...styles.row }}>
      <MaterialIcons
        name="title"
        size={styles.iconProps.size}
        color={styles.iconProps.color}
        style={styles.icon}
      />
      <View style={{ ...styles.container, alignItems: "center" }}>
        <TextInput
          style={styles.iconText}
          onChangeText={(t) => {
            updateTask("name", t);
          }}
          placeholder={task.name ? "" : "Enter task name"} // Show placeholder text when task.name is empty or null
          value={task.name || ""} // Ensure value is an empty string if task.name is undefined
          placeholderTextColor="black"
        />

        {/* {task.name} */}
        {/* </TextInput> */}
      </View>
    </View>
  );
}
