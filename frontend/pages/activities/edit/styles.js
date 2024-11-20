import { StyleSheet } from "react-native";
export default styles = StyleSheet.create({
  container: {
    width: "100%",
    padding: 10,
  },
  touchable: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  iconText: {
    color: "gray",
    fontSize: 20,
    marginEnd: 20,
  },
  text: {
    color: "gray",
    textAlign: "center",
    fontSize: 20,
  },
  textBoxText: {
    color: "gray",
    fontSize: 15,
    textAlign: "center",
  },
  borderBottom: {
    borderBottomWidth: 1,
    borderBottomColor: "gray",
  },
  row: {
    padding: 10,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "gray",
  },
  icon: {
    width: 30,
  },
  iconProps: {
    size: 24,
    color: "black",
  },
});
