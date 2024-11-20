import { View, Text, StyleSheet } from "react-native";
import React from "react";
import Button from "../../../components/Button";
import Colors from "../../../assets/Colors";

export default function ChatButton({
  text,
  emoji = null,
  color = Colors.fifth,
  onPress,
}) {
  return (
    <View style={{ ...styles.container }}>
      <Button
        emoji={emoji}
        onPress={onPress}
        text={text}
        style={{ ...styles.button, backgroundColor: color }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 5,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 10,
  },
  button: {
    color: "black",
  },
});
