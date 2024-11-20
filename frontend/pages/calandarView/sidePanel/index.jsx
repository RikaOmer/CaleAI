import {
  View,
  Text,
  Modal,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React from "react";
import { Entypo, AntDesign } from "react-native-vector-icons";
import Colors from "../../../assets/Colors";
import TaskRow from "./components/taskRow";
import AddModal from "../../activities/add/AddModal";
import routes from "../../../assets/routes";

export default function SidePanel({ show, setShow, navigation }) {
  const [showTasks, setShowTasks] = React.useState(true);
  const [showCalendars, setShowCalendars] = React.useState(true);
  if (!show) {
    return <></>;
  }
  return (
    <Modal
      visible={true}
      transparent={true}
      animationType="slide"
      style={styles.modal}
    >
      <View style={styles.sideView}>
        <View style={styles.modalView}>
          <View style={styles.header}>
            <Text style={{ fontSize: 20, fontWeight: "bold" }}>
              Tasks Manager
            </Text>
            <TouchableOpacity onPress={() => setShow(false)}>
              <AntDesign name="close" size={35} color="black" />
            </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={() => setShowTasks((prev) => !prev)}>
            <View style={styles.secondaryHeader}>
              <Text style={{ fontSize: 18, fontWeight: "bold" }}>Tasks</Text>
              <TouchableOpacity
                onPress={() => {
                  setShow(false);
                  navigation.navigate(routes.addActivity.name);
                }}
              >
                <Entypo name="plus" size={35} color="black" />
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
          {showTasks && (
            <ScrollView style={{ height: 300 }}>
              {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
                <TaskRow key={i} i={i} />
              ))}
              <Text style={styles.small}>
                You are doing great! add more tasks to your calendar and get
                more from your time
              </Text>
            </ScrollView>
          )}

          <TouchableOpacity onPress={() => setShowCalendars((prev) => !prev)}>
            <View style={styles.secondaryHeader}>
              <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                Calendars
              </Text>
              <TouchableOpacity onPress={() => {}}>
                <Entypo name="plus" size={35} color="black" />
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
          {showCalendars && (
            // TODO - add calendar view
            <ScrollView style={{ height: 300 }}>
              {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
                <TaskRow key={i} i={i} />
              ))}
            </ScrollView>
          )}
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modal: {
    width: "50%",
    height: "100%",
    backgroundColor: "white",
    padding: 35,
    flex: 1,
  },
  sideView: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    // marginTop: 22,
  },
  modalView: {
    paddingTop: 50,
    borderRadius: 10,
    width: "70%",
    height: "100%",
    paddingVertical: 0,
    backgroundColor: "white",
    // backgroundColor: Colors.fourth,
  },
  header: {
    borderBottomWidth: 1,
    borderColor: "gray",
    paddingHorizontal: 15,
    paddingVertical: 15,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderTopEndRadius: 10,
  },
  secondaryHeader: {
    borderBottomWidth: 1,
    borderColor: "gray",
    paddingVertical: 5,
    paddingHorizontal: 15,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  small: {
    fontSize: 13,
    fontWeight: "bold",
    textAlign: "center",
    paddingVertical: 10,
    paddingHorizontal: 30,
    // padding: 30,
  },
});
