import { View, Text, Alert } from "react-native";
import TextBox from "../../components/textbox";
import { useState } from "react";
import ImageButton from "../../components/image/ImageButton";
import Navigation from "../../components/navigation";
import Button from "../../components/Button";
import routes from "../../assets/routes";
import { resetStackAndGoTo } from "../../models/Stack";
import LoadingModal from "../../components/loadingModal";
import User from "../../models/User";
import Storage from "../../models/storage";
export default function Register({ navigation }) {
  const [info, setInfo] = useState({
    first_name: {
      value: "",
      placeholder: "First Name",
      type: "default",
    },
    last_name: {
      value: "",
      placeholder: "Last Name",
      type: "default",
    },
    email: {
      value: "",
      placeholder: "Email",
      type: "email-address",
    },
    password: {
      value: "",
      placeholder: "Password",
      type: "visible-password",
    },
    confirm_password: {
      value: "",
      placeholder: "Confirm Password",
      type: "visible-password",
    },
  });
  const [loading, setLoading] = useState(false);
  function updateInfo(key, value) {
    setInfo((prev) => {
      return {
        ...prev,
        [key]: {
          ...prev[key],
          value: value,
        },
      };
    });
  }
  async function handleSubmit() {
    for (let key in info) {
      if (info[key].value === "") {
        Alert.alert("Error", "Please fill out all fields!");
        return;
      }
    }
    if (info.password.value !== info.confirm_password.value) {
      Alert.alert("Error", "Passwords do not match!");
      return;
    }

    setLoading(true);
    const u = new User(
      info.first_name.value,
      info.last_name.value,
      info.email.value,
      (password = info.password.value),
      (morning_start_time = new Date().toISOString()),
      (morning_end_time = new Date().toISOString())
    );

    const resp = await u.register();

    setLoading(false);
    if (resp) {
      resetStackAndGoTo(routes.calandarView.name, navigation);
    } else {
      Alert.alert("Error", "Invalid credentials");
    }
  }

  const styles = {
    input: {
      marginTop: 30,
    },
  };
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
      <LoadingModal isLoading={loading} />
      <Navigation text={"Let's Get Started"} navigation={navigation} />
      <View
        style={{
          padding: 10,
          width: "100%",
          alignSelf: "center",
          marginBottom: "auto",
        }}
      >
        {Object.keys(info).map((key, index) => (
          <TextBox
            key={index}
            style={styles.input}
            placeholder={info[key].placeholder}
            value={info[key].value}
            onChangeText={(text) => updateInfo(key, text)}
            keyboardType={info[key].type}
            secureTextEntry={info[key].type === "visible-password"}
          />
        ))}
        {/* <TextBox
          style={styles.input}
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
        />
        <TextBox
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
        <TextBox
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <TextBox
          style={styles.input}
          placeholder="Confirm Password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
        /> */}
      </View>
      {/* <View style={{ marginBottom: "auto" }}>
        <Text
          style={{
            fontSize: 19,
            fontWeight: "bold",
            marginStart: "auto",
            marginEnd: "auto",
            marginTop: 20,
            marginBottom: 20,
          }}
        >
          Sync Your Calendar
        </Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
            padding: 20,
            marginBottom: 20,
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
        </View>
        <View>
          <Text
            style={{
              textAlign: "center",
            }}
          >
            Sync your calendar help us to manage your current activities.
          </Text>
          <Text style={{ textAlign: "center" }}>
            if you dont have calendar it's fine
          </Text>
        </View>
      </View> */}
      <View style={{ marginBottom: "auto", marginTop: "auto" }}>
        <Button text={"Register"} onPress={handleSubmit} />
      </View>
    </View>
  );
}
