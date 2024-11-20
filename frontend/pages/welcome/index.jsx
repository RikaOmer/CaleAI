import { View, Text, Image } from "react-native";
import React, { useEffect } from "react";
import woman from "../../assets/images/Woman_Think.png";
import Button from "../../components/Button";
import routes from "../../assets/routes";
import User from "../../models/User";
import { CommonActions } from "@react-navigation/native";

export default function Welcome({ navigation }) {
  useEffect(() => {
    async function checkUser() {
      if (await User.is_logged_in()) {
        console.log("User is logged in");
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: routes.calandarView.name }],
          })
        );
      }
    }
    checkUser();
  }, []);
  return (
    <View
      style={{
        marginTop: 50,
        height: "100%",
        width: "90%",
        alignSelf: "center",
        flex: 1,
      }}
    >
      <Image
        source={woman}
        style={{
          width: 300,
          height: 400,
          resizeMode: "stretch",
          marginTop: 50,
          marginRight: "auto",
          marginLeft: "auto",
        }}
      />
      <View style={{ marginTop: "auto", marginBottom: "auto" }}>
        <Text
          style={{
            fontWeight: "bold",
            fontSize: 25,
            textAlign: "center",
            // marginTop: 30,
          }}
        >
          Welcome to CaleAI
        </Text>
        <Text
          style={{
            textAlign: "center",
            marginTop: 10,
            fontSize: 19,
            color: "gray",
            width: 250,
            marginStart: "auto",
            marginEnd: "auto",
          }}
        >
          Get more from your time! manage your task easily and add habits to
          your life
        </Text>
      </View>
      <View style={{ marginBottom: "auto", marginTop: "auto" }}>
        <Button
          text={"Let's Start"}
          onPress={() => navigation.navigate(routes.login.name)}
          style={{ marginTop: 50 }}
        />
      </View>
    </View>
  );
}
