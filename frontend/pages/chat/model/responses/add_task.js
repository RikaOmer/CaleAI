import { Text, View } from "react-native";
import ChatText from "../../components/ChatText";
import Activities from "../../../../assets/Activities";
import ChatButton from "../../components/ChatButton";
import stl_user_answer from "../../styles/stl_user_answer";

export default class AddTask {
  constructor(bot) {
    this.bot = bot;
    this.category = null;
    this.frequency = null;
    this.component = this.getCategoryComponent();
  }
  getCategoryComponent() {
    return (
      <View key={"category" + String(this.bot.response_index)}>
        <ChatText text="Great! What category does your task belong to?" />
        <View style={stl_user_answer.user_answer}>
          {Object.keys(Activities).map((activity_key, index) => {
            return (
              <ChatButton
                key={index}
                text={Activities[activity_key].label}
                emoji={Activities[activity_key].emoji}
                onPress={() => {
                  this.category = Activities[activity_key].label;
                  this.bot.pushResponse(this.getFrequencyComponent());
                }}
              />
            );
          })}
        </View>
      </View>
    );
  }
  getFrequencyComponent() {
    return {
      component: (
        <View key={"frequency" + String(this.bot.response_index)}>
          <ChatText
            text={"How often do you want to " + this.category?.toLowerCase()}
          />
          <View style={stl_user_answer.user_answer}>
            <ChatButton
              text="Daily"
              onPress={() => {
                this.frequency = "Daily";
              }}
            />
            <ChatButton
              text="Weekly"
              onPress={() => {
                this.frequency = "Weekly";
              }}
            />
            <ChatButton
              text="Monthly"
              onPress={() => {
                this.frequency = "Monthly";
              }}
            />
          </View>
        </View>
      ),
    };
  }
}
