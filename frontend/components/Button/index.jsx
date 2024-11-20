import { View, Text, TouchableOpacity } from "react-native";
import React from "react";

export default function Button({
  text,
  onPress,
  style,
  disabled = false,
  emoji = null,
}) {
  return (
    <TouchableOpacity
      style={{
        ...style,
        backgroundColor: style?.backgroundColor
          ? style.backgroundColor
          : "#5F33E1",
        borderRadius: 10,
        padding: style?.padding ? style.padding : 15,
        shadowColor: "gray",
        shadowRadius: 10,
        shadowOpacity: 1,
        shadowOffset: { width: 0, height: 10 },
        opacity: disabled ? 0.5 : 1,
        flexDirection: "row",
        alignItems: "center",
      }}
      onPress={onPress}
      disabled={disabled}
    >
      {emoji && (
        <Text style={{ fontSize: 20, margin: 2, marginEnd: 5 }}>{emoji}</Text>
      )}
      <Text
        style={{
          color: style?.color ? style.color : "#E8EAED",
          marginStart: "auto",
          marginEnd: "auto",
          fontSize: 19,
          opacity: disabled ? 0.5 : 1,
        }}
      >
        {text}
      </Text>
    </TouchableOpacity>
  );
}
