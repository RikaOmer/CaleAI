import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import MultiSelect from "react-native-multiple-select";
export default function DaysPicker() {
  const [selectedDays, setSelectedDays] = useState([]);

  const weekdays = [
    { id: "Sunday", name: "Sunday" },
    { id: "Monday", name: "Monday" },
    { id: "Tuesday", name: "Tuesday" },
    { id: "Wednesday", name: "Wednesday" },
    { id: "Thursday", name: "Thursday" },
    { id: "Friday", name: "Friday" },
    { id: "Saturday", name: "Saturday" },
  ];
  return (
    <View style={styles.container}>
      <MultiSelect
        items={weekdays}
        uniqueKey="id"
        onSelectedItemsChange={setSelectedDays}
        selectedItems={selectedDays}
        selectText="Not on days"
        searchInputPlaceholderText="Search Days..."
        tagRemoveIconColor="#CCC"
        tagBorderColor="#CCC"
        tagTextColor="#CCC"
        selectedItemTextColor="#CCC"
        selectedItemIconColor="#CCC"
        itemTextColor="#000"
        displayKey="name"
        searchInputStyle={{ color: "#CCC" }}
        submitButtonColor="#CCC"
        submitButtonText="OK"
        hideSearch
        fixedHeight
        hideSubmitButton
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    // flex: 1,
    justifyContent: "center",
  },
});
