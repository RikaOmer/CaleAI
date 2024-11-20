import { View, Text } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native";

export default function ActivityCard({ activity, onPress }) {
  return (
    <TouchableOpacity
      style={{
        shadowColor: "gray",
        shadowRadius: 10,
        shadowOpacity: 1,
        shadowOffset: { width: 0, height: 10 },
        width: "100%",
      }}
      onPress={onPress}
    >
      <View
        style={{
          alignItems: "center",
          backgroundColor: "white",
          borderWidth: 0,
          borderColor: "gray",
          borderRadius: 10,
          flexDirection: "row",
          height: 100,
        }}
      >
        <Text style={{ marginStart: 5, marginEnd: 5, fontSize: 40 }}>
          {activity.logo}
        </Text>
        <Text
          style={{
            fontSize: 19,
            marginStart: "auto",
            marginEnd: "auto",
            flex: 1,
            flexWrap: "wrap",
            color: "gray",
          }}
        >
          {activity.name}
        </Text>
      </View>
    </TouchableOpacity>
  );
}
