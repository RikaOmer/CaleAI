import { CommonActions } from "@react-navigation/native";

export function resetStackAndGoTo(route, navigation) {
  navigation.dispatch(
    CommonActions.reset({
      index: 0,
      routes: [{ name: route }],
    })
  );
}
