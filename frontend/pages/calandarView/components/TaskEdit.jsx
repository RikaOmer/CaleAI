import { View, Text, Modal } from "react-native";
import React from "react";
import Colors from "../../../assets/Colors";
import Button from "../../../components/Button";
import Activities from "../../../assets/Activities";
import EditTask from "../../activities/edit";
export default function TaskEdit({name,emoji,category, task, show, setShow ,refreshEvents}) {
  const [mode, setMode] = React.useState("view");
  if (!show) {
    return <></>;
  }
  function close() {
    setMode("view");
    setShow(false);
    refreshEvents();
  }
  return (
    <Modal
      visible={true}
      transparent={true}
      animationType="slide"
      style={styles.modal}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          {/* <View style={styles.headerView}>
            <Text style={styles.header}>{name}</Text>
          </View> */}
          {/* <View style={styles.secondaryView}>
            <Text style={{ fontSize: 20, marginEnd: 10, textAlign: "center" }}>
              {emoji}
            </Text>
            <Text>{Activities[task.task.type_id.name]?.label}</Text>
          </View> */}
          <View style={styles.headerView}>
            <Text style={{ fontSize: 20, marginEnd: 10, textAlign: "center" }}>
              {emoji}
            </Text>
            <Text>{Activities[task.task.type_id.name]?.label}</Text>
          </View>

          <View
            style={{
              flexDirection: "row",
              width: "100%",
              borderwidth: 1,
              justifyContent: "space-evenly",
              marginTop: 10,
              marginBottom: 10,
            }}
          >
            <View style={{ backgroundColor: "white", width: 100 }}>
              <Button
                text={"Dismiss"}
                style={{ backgroundColor: "red" }}
                onPress={close}
              />
            </View>
            <View style={{ width: 100 }}>
              <Button
                text={"Edit"}
                onPress={() =>
                  setMode((prev) => (prev === "edit" ? "view" : "edit"))
                }
              />
            </View>
          </View>
          {mode === "edit" && <EditTask task={task} emoji={emoji} closeModal = {close} />}
        </View>
      </View>
    </Modal>
  );
}

const styles = {
  modal: {
    // width: 400,
    margin: 20,
    // backgroundColor: "white",
    borderRadius: 20,
    padding: 50,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    // alignItems: "center",
    // height: "100%",
    // width: "100%",
    padding: 30,
  },
  modalView: {
    // width: 500,
    borderwidth: 1,
    borderRadius: 20,
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 5,
    alignItems: "center",
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
  },
  headerView: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.fourth,
    width: "100%",
    borderRadius: 20,
    padding: 10,
    borderBottomStartRadius: 0,
    borderBottomEndRadius: 0,
    borderwidth: 1,
  },
  secondaryView: {
    flexDirection: "row",
    justifyContent: "center",
    width: "100%",
    padding: 10,
    alignItems: "center",
    backgroundColor: Colors.fifth,
  },
};
