import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";
import Button from "../../../components/Button";

const Duration = () => {
  const [selectedTime, setSelectedTime] = useState("00:00");
  const [isHidden, setIsHidden] = useState(true);
  return (
    <View>
      <Button
        text={"Duration     " + selectedTime}
        onPress={() => setIsHidden((prev) => !prev)}
        style={{
          backgroundColor: "transparent",
          color: "black",
          borderWidth: 1,
          borderColor: "gray",
          color: "gray",
        }}
      />
      <View style={styles.container}>
        <Picker
          selectedValue={selectedTime}
          style={{ ...styles.picker, display: isHidden ? "none" : "flex" }}
          onValueChange={(itemValue) => setSelectedTime(itemValue)}
        >
          {Array.from({ length: 24 }, (_, i) => i).map((_, hour) =>
            Array.from({ length: 12 }, (_, i) => i).map((_, index) => {
              const minute = index * 5;
              return (
                <Picker.Item
                  key={`${hour}:${minute}`}
                  label={`${hour.toString().padStart(2, "0")}:${minute
                    .toString()
                    .padStart(2, "0")}`}
                  value={`${hour.toString().padStart(2, "0")}:${minute
                    .toString()
                    .padStart(2, "0")}`}
                />
              );
            })
          )}
        </Picker>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
  picker: {
    height: 140,
    width: 300,
    overflow: "hidden",
  },
});

export default Duration;
