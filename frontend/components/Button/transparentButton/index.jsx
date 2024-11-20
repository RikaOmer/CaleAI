import { View, Text, TouchableOpacity } from "react-native";
import React from "react";

export default function TransparentButton({ text, onPress, style }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        ...style,
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
        margin: 5,
        borderColor: "gray",
        alignContent: "center",
        alignItems: "center",
        flexWrap: "wrap",
      }}
    >
      <Text style={{ color: "gray" }}>{text}</Text>
    </TouchableOpacity>
  );
}
