import { View } from "react-native";
import ChatButton from "../../components/ChatButton";
import ChatText from "../../components/ChatText";
import styles from "../../styles/stl_user_answer";
import AddTask from "./add_task";
export default class hello {
  constructor(bot) {
    this.component = (
      <View key={"hello"}>
        <ChatText text="Hello, I am a chat bot. How can I help you?" />
        <View style={styles.user_answer}>
          <ChatButton
            text="Add Task"
            onPress={() => bot.pushResponse(new AddTask(bot))}
          />
          <ChatButton text="Generate New Calendar" />
        </View>
      </View>
    );
  }
}
