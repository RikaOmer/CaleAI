import { Text, View, TouchableOpacity, Image } from "react-native";
import React, { Component } from "react";

export default function ImageButton({ uri, width = 60, height = 60 }) {
  return (
    <TouchableOpacity
      style={{
        padding: 5,
        paddingHorizontal: 20,
        borderColor: "lightgray",
        borderRadius: 10,
      }}
    >
      <Image
        source={{
          uri: uri,
        }}
        style={{
          width: width,
          height: height,
          // borderWidth: 1,
          // borderRadius: 10,/
          marginLeft: "auto",
          marginEnd: "auto",
          borderColor: "gray",
          // backfaceVisibility: "hidden",
          // backgroundColor: "transparent",
        }}
      />
    </TouchableOpacity>
  );
}
