import { View, StyleSheet } from "react-native";
import { Picker } from "react-native-wheel-pick";
import React, { useState } from "react";
import Button from "../../../components/Button";
export default function HoursPicker({
  text,
  onChange,
  isButtonHidden,
  currentHour,
  show,
}) {
  const times = Array.from({ length: 24 }, (_, i) => i).flatMap((hour) =>
    [
      "00",
      "05",
      "10",
      "15",
      "20",
      "25",
      "30",
      "35",
      "40",
      "45",
      "50",
      "55",
    ].map((minute) => `${hour.toString().padStart(2, "0")}:${minute}`)
  );
  const [selectedHour, setSelectedHour] = useState(currentHour);
  const [isHidden, setIsHidden] = useState(true);
  if (!show) return <></>;
  return (
    <View style={styles.container}>
      {!isButtonHidden && (
        <Button
          text={text + (selectedHour ? " " + selectedHour : "")}
          onPress={() => setIsHidden((prev) => !prev)}
          style={{
            backgroundColor: "transparent",
            color: "black",
            borderWidth: 1,
            display: isHidden ? "flex" : "none",
            padding: 10,
            borderColor: "gray",
            color: "gray",
          }}
        />
      )}
      <Picker
        style={{
          backgroundColor: "white",
          width: "100%",
          height: 150,
        }}
        selectedValue={currentHour}
        pickerData={times}
        onValueChange={(value) => {
          setSelectedHour(value);
          setIsHidden(true);
          onChange ? onChange(value) : null;
        }}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    width: "100%",
    maxHeight: 150,
    overflow: "hidden",
    marginEnd: 3,
    marginStar: 3,
  },
});
