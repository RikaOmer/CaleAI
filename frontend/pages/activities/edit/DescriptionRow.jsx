import { View, Text, TextInput } from "react-native";
import React from "react";
import styles from "./styles";
import { MaterialIcons } from "react-native-vector-icons";
import TextBox from "../../../components/textbox";
export default function DescriptionRow({ task }) {
  return (
    <View style={styles.row}>
      <MaterialIcons
        name="description"
        size={styles.iconProps.size}
        color={styles.iconProps.color}
        style={styles.icon}
      />

      <View style={styles.container}>
        <TextInput
          value={task.description}
          style={styles.textBoxText}
          //   TODO onChangeText
          onChangeText={(t) => 
          {
            updateTask("description", t);
          }
          }
        />
      </View>
      {/* <Text>DescriptionRow</Text> */}
    </View>
  );
}
