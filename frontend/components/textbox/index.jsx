import { View, Text, TextInput, StyleSheet } from "react-native";
import React from "react";

export default function TextBox({
  placeholder,
  isAvailable,
  onChangeText,
  value,
  keyboardType,
  secureTextEntry = false,
  style = {},
  readOnly = false,
}) {
  return (
    <View>
      <TextInput
        style={{
          ...style,
          height: 40,
          borderColor: style.borderColor
            ? style.borderColor
            : isAvailable === true
            ? "green"
            : isAvailable === false
            ? "red"
            : "transparent",
          borderWidth: style.borderWidth ? style.borderWidth : 2,
          marginBottom: 10,
          padding: 10,
          borderRadius: 10,
          width: "100%",
          fontSize: style.fontSize ? style.fontSize : 20,
        }}
        placeholder={placeholder}
        onChangeText={onChangeText}
        value={value}
        keyboardType={keyboardType}
        secureTextEntry={secureTextEntry}
        editable={!readOnly}
      />
    </View>
  );
}
