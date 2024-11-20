import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";

export default function Navigation({ text, to = "", navigation }) {
  return (
    <View style={{ flexDirection: "row", marginTop: 20 }}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <AntDesign
          name="arrowleft"
          size={24}
          color="black"
          style={{ marginEnd: 10 }}
          // onPress={() => navigation.navigate(to)}
        />
      </TouchableOpacity>
      <Text style={{ fontWeight: "bold", fontSize: 19 }}>{text}</Text>
    </View>
  );
}
