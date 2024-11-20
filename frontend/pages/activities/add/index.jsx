import { View, Text } from "react-native";
import React from "react";
import Navigation from "../../../components/navigation";
import ActivityCard from "./ActivityCard";
import Button from "../../../components/Button";
import AddModal from "./AddModal";
import routes from "../../../assets/routes";

export default function AddActivity({ navigation }) {
  const [showModal, setShowModal] = React.useState(false);
  const avtivities = [
    { name: "Call mom", logo: "📞" },
    { name: "Exercise", logo: "🏋️‍♂️" },
    { name: "Read a book", logo: "📚" },
    { name: "Listen To Podcast", logo: "🎧" },
    { name: "Learning", logo: "📖" },
    { name: "Clean The House", logo: "🧹" },
    { name: "Other", logo: "🤷‍♂️" },
  ];
  return (
    <View
      style={{
        marginTop: 50,
        marginBottom: 50,
        height: "100%",
        width: "90%",
        alignSelf: "center",
        flex: 1,
      }}
    >
      <AddModal show={showModal} setShow={setShowModal} />
      <Navigation text="Let us know you better" navigation={navigation} />
      <Text
        style={{
          fontSize: 19,
          textAlign: "center",
          marginTop: 30,
          fontWeight: "bold",
        }}
      >
        Choose the activities you want to add to your calendar
      </Text>
      <View
        style={{
          marginTop: 20,
          flex: 1,
          flexDirection: "row",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "space-around",
          width: "100%",
        }}
      >
        {avtivities.map((activity, index) => (
          <View
            style={{
              width: index === avtivities.lenght - 2 ? "100%" : "47%",
              marginBottom: 20,
            }}
            key={index}
          >
            <ActivityCard
              key={index}
              activity={activity}
              onPress={() => setShowModal(true)}
            />
          </View>
        ))}
      </View>
      <Button
        text={"Finish"}
        onPress={() => navigation.navigate(routes.calandarView.name)}
      />
    </View>
  );
}
