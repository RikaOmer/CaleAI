import { View, Text, ScrollView, StyleSheet } from "react-native";
import React from "react";
import Button from "../../../components/Button";
import Task from "../../../models/Task";
import CategoryRow from "./CategoryRow";
import { MaterialIcons } from "react-native-vector-icons";
import TimeRow from "./TimeRow";
import NameRow from "./NameRow";
import DescriptionRow from "./DescriptionRow";
import Colors from "../../../assets/Colors";
import Event from "../../../models/Event";

export default function EditTask({ task ,closeModal}) {
  const [openExetntion, setOpenExetntion] = React.useState(false);
  const [taskData, setTaskData] = React.useState(task);
  function updateTask(key, value) {
    setTaskData((prev) => {
      return { ...prev, [key]: value };
    });
  }

  async function saveTask() {
    const resp = await Event.updateEvent(taskData);
    if (resp === 200){
      alert("Event Has Been Updated")
      closeModal()
    }
    else{
      alert("Error Updating Event")
    }
  }

  async function delete_event() {
    const resp  = await Event.delete(taskData.id);
    if (resp === 200){
      alert("Event Has Been Deleted")
      closeModal()
    }
    else{
    
      alert("Error Deleting Event")
    }
  }
  return (
    <View style={styles.container}>
      <Text style={styles.seperator}></Text>
      <ScrollView style={styles.fullWidth}>
        <NameRow task={taskData} updateTask={updateTask} />
        {/* <CategoryRow
          task={taskData}
          openExetntion={openExetntion}
          setOpenExetntion={setOpenExetntion}
          updateTask={updateTask}
        /> */}
        <TimeRow
          isStartTime={true}
          task={taskData}
          openExetntion={openExetntion}
          setOpenExetntion={setOpenExetntion}
          updateTask={updateTask}
        />
        <TimeRow
          isStartTime={false}
          task={taskData}
          openExetntion={openExetntion}
          setOpenExetntion={setOpenExetntion}
          updateTask={updateTask}
        />
        {/* <DescriptionRow
          task={taskData}
          openExetntion={openExetntion}
          setOpenExetntion={setOpenExetntion}
          updateTask={updateTask}
        /> */}
        {/* <Text style={styles.seperator}></Text> */}
      </ScrollView>
      <View style={{ justifyContent: "center", padding: 10 }}>
        {/* <Button text={"Dismiss"} style={{ backgroundColor: "red" }} /> */}
        <Button
          text={"Make Constant Event"}
          style={{ backgroundColor: Colors.tertiary, color: "black" }}
          onPress={saveTask}
        />
        <Button
          text={"Delete"}
          style={{ backgroundColor: "red", color: "white",marginTop:10 }}
          onPress={delete_event}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    height: 400,
    width: "100%",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  row: {
    padding: 10,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  seperator: {
    width: "100%",
    borderWidth: 1,
    height: 1,
    borderColor: "gray",
  },
  fullWidth: {
    width: "100%",
  },
  icon: {
    width: 30,
    marginTop: 10,
  },
  iconProps: {
    size: 24,
    color: "black",
  },
});
