import {
  View,
  Text,
  Image,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Keyboard,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import woman from "../../assets/images/Woman_Think.png";
import Button from "../../components/Button";
import ImageButton from "../../components/image/ImageButton";
import Colors from "../../assets/Colors";
import routes from "../../assets/routes";
import User from "../../models/User";
import { useAuth } from "../../AuthContext";
import { resetStackAndGoTo } from "../../models/Stack";
import LoadingModal from "../../components/loadingModal";
export default function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    Keyboard.dismiss();
  }, []);

  async function onSubmit() {
    Keyboard.dismiss();
    setLoading(true);
    const token = await User.login(email, password);
    setLoading(false);
    if (token) {
      resetStackAndGoTo(routes.calandarView.name, navigation);
    } else {
      alert("Invalid credentials");
    }
  }
  return (
    <View style={styles.container}>
      <LoadingModal isLoading={loading} />
      <Image source={woman} style={styles.image} />
      <Text style={styles.text}>Login</Text>
      <View style={styles.input}>
        <Text style={styles.textIcon}>📧</Text>
        <TextInput
          placeholder="Email ID"
          style={{ ...styles.textInput, width: "90%" }}
          keyboardType="email-address"
          onChangeText={(text) => setEmail(text)}
        />
      </View>
      <View style={styles.input}>
        <Text style={styles.textIcon}>🔒</Text>
        <TextInput
          placeholder="Password"
          style={styles.textInput}
          secureTextEntry={true}
          onChangeText={(text) => setPassword(text)}
        />
        <TouchableOpacity>
          <Text
            style={{
              color: Colors.primary,
              fontSize: 15,
              //   width: 60,
              fontWeight: "bold",
              marginTop: 5,
            }}
          >
            Forgot?
          </Text>
        </TouchableOpacity>
      </View>
      <Button text={"Login"} onPress={onSubmit} disabled={loading} />
      {/* <Text style={styles.small}>Or, login with ...</Text>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          marginBottom: 40,
          alignItems: "center",
        }}
      >
        <ImageButton
          uri={
            "https://www.deliverlogic.com/wp-content/uploads/2021/04/google-logo-png-webinar-optimizing-for-success-google-business-webinar-13.png"
          }
        />

        <ImageButton
          uri={
            "https://1000logos.net/wp-content/uploads/2016/10/Apple-Logo.png"
          }
        />
      </View> */}
      <View style={{ marginStart: "auto", marginEnd: "auto",marginTop:40 }}>
        <Text>Don't have an account? </Text>
        <TouchableOpacity
          style={{ marginStart: "auto", marginEnd: "auto", marginTop: 1 }}
          onPress={() => navigation.navigate(routes.register)}
        >
          <Text
            style={{
              color: Colors.primary,
              fontWeight: "bold",
              marginTop: 5,
            }}
          >
            Register
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    height: "100%",
    width: "90%",
    alignSelf: "center",
    flex: 1,
  },
  image: {
    height: 200,
    aspectRatio: 1,
    resizeMode: "stretch",
    marginTop: 50,
    marginRight: "auto",
    marginLeft: "auto",
    marginBottom: 20,
  },
  text: {
    fontWeight: "bold",
    fontSize: 25,
    textAlign: "left",
    marginBottom: 20,
  },
  input: {
    borderBottomWidth: 1,
    borderColor: "gray",
    flexDirection: "row",
    padding: 10,
    marginBottom: 20,
    width: "100%",
  },
  textInput: {
    color: "gray",
    marginEnd: 10,
    fontSize: 20,
    width: "70%",
  },
  textIcon: {
    width: 20,
    color: "gray",
    marginEnd: 10,
    fontSize: 20,
  },
  button: {
    marginTop: 50,
  },
  small: {
    textAlign: "center",
    marginTop: 40,
    marginBottom: 40,
    fontSize: 15,
    color: "gray",
    width: 250,
    marginStart: "auto",
    marginEnd: "auto",
  },
});
