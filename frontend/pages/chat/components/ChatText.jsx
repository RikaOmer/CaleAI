import React, { useEffect, useRef } from "react";
import { View, Text, StyleSheet, Image, Animated } from "react-native";
import Colors from "../../../assets/Colors";
import robot from "../../../assets/images/robot.png";
export default function ChatText({ text, isRobotSpeak = true }) {
  const fadeAnim = useRef(new Animated.Value(0)).current; // Initial value for opacity: 0

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1500,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);
  return (
    <Animated.View
      style={{
        ...styles.container,
        opacity: fadeAnim,
        alignSelf: isRobotSpeak ? "flex-start" : "flex-end",
      }}
    >
      {isRobotSpeak && (
        <View style={styles.image_container}>
          <Image source={robot} style={styles.image} />
        </View>
      )}
      <View
        style={{
          ...styles.text_container,
          alignSelf: isRobotSpeak ? "flex-start" : "flex-end",
          backgroundColor: isRobotSpeak ? Colors.primary : Colors.fifth,
        }}
      >
        <Text
          style={{ ...styles.text, color: isRobotSpeak ? "white" : "black" }}
        >
          {text}
        </Text>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    // alignItems: "start",
  },
  text_container: {
    flexDirection: "row",
    alignSelf: "flex-start",
    backgroundColor: Colors.primary,
    borderRadius: 20,
    // marginRight: "25%",
    marginBottom: 10,
    padding: 10,
    maxWidth: "70%",
  },
  image_container: {
    marginRight: 0,
  },
  text: {
    color: "#fff",
    fontSize: 18,
  },
  image: {
    marginRight: 10,
    width: 50,
    height: 50,
  },
});
