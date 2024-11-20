import { View, Text, Image, ScrollView, Vibration, TextInput } from "react-native";
import React, { useEffect, useRef, useState, } from "react";
import { StyleSheet } from "react-native";
import robot from "../../assets/images/robot.png";
import Colors from "../../assets/Colors";
import BotModel from "./model/BotModel";
import Activities from "../../assets/Activities";
import conf_bot from "./model/configuration/conf_bot";
import ChatText from "./components/ChatText";
import ChatButton from "./components/ChatButton";
import ChatHoursMinutes from "./components/ChatHoursMinutes";
import { Audio } from "expo-av";
import Task from "../../models/Task";
import Chatbot from "../../models/Chatbot";

const counter_tasks = 0

const activities_options = Object.keys(Activities).map((key) => {
  return {
    type: "Button",
    label: Activities[key].label,
    emoji: Activities[key].emoji,
    value: Activities[key].label,
    page: "category",
  };
});
function getDefaultTask() {
  return {
    "category": "",
    "frequency": "",
    "time": "",
    "duration": "",
  }
}
export default function ChatBot({ navigation }) {
  const [responses, setResponses] = useState([conf_bot.greeting]);
  const [responseIndex, setResponseIndex] = useState(0);
  const [botModel, setBotModel] = useState(new BotModel());
  const [chosen_tasks, setChosenTasks] = useState([]);
  const [task, setTask] = useState(getDefaultTask());
  const [text, setText] = useState('');
  const [inputMode, setInputMode] = useState(false);
  const scrollViewRef = useRef();
  useEffect(() => {
    async function playSound() {
      const { sound } = await Audio.Sound.createAsync(
        require("./assets/message.mp3")
      );
      await sound.playAsync();
    }
    Vibration.vibrate(200);
    playSound();
  }, [responseIndex]);

  async function onSubmit() {

    const resp = await Task.createTasks(chosen_tasks)
  }
  async function onButtonPress(option,response){
    {
        if(option.value == "gemini"){
        setInputMode(true);
        return;
      }
      if (option.page) {
        const temp = task
        temp[option.page] = option.value
        setTask(temp)
      }
      if (option.successor) {
        setResponses((prev) => [
          ...prev,
          ...option.successor,
        ]);
      }
      setResponseIndex((prev) => prev + 1);
      botModel.addResponse(response.key, option.label);

      if (option.value == "generate") {
        
        if(task != getDefaultTask()){
          const temp = chosen_tasks
          temp.push(task)
          setChosenTasks(temp)
        }
        onSubmit()
      }
      if (option.value == "more") {
 
        setTask(getDefaultTask())

        setResponses((prev) => [
          ...prev,
          ...[{ "bot_label": "Great! What Category does the task belong to?", "key": "category", "options": activities_options, }, {
            "bot_label": "How Often do you want to do this task?", "key": "frequency", "options": [
              { type: "Button", label: "Daily", value: "daily", page: "frequency" },
              { type: "Button", label: "Weekly", value: "weekly", page: "frequency" },
              { type: "Button", label: "Monthly", value: "monthly", page: "frequency" },
            ]
          },
          {
            bot_label: "what time of the day do you wish to do this task?",
            key: "time",
            options: [
              { type: "Button", label: "Morning", value: "Morning", page: "time" },
              { type: "Button", label: "Noon", value: "Noon", page: "time" },
              { type: "Button", label: "Evening", value: "Evening", page: "time" },
            ],
          },

          { "bot_label": "How long do you want to spend on this task?", "key": "duration", "options": [{ type: "text-hours-minutes", label: "Set Duration", },] }, , {
            "bot_label" : "Task Added! what next?", "key": "more?", "options": [
              { type: "Button", label: "Add another task", value: "more" },
              { type: "Button", label: "Generate New Calendar", value: "generate" },
            ]
          }],
        ]);

      }
    }
  }

  async function handleTextSubmit() {
    
    setResponses((prev) => [
      ...prev, 
      { bot_label: <Text>{text}</Text> }  // Display bot's reply
  ]);
  setResponseIndex((prev) => prev + 1);
    
    try {
      const response = await Chatbot.getAnswer(text);
      console.log(response);
      
      setResponses((prev) => [
          ...prev, 
          { bot_label: <Text>{response}</Text> }  // Display bot's reply
      ]);
      setResponseIndex((prev) => prev + 1);

      setText(''); // Clear input
      // setInputMode(false); // Exit input mode
  } catch (error) {
      console.error("Error getting chatbot response:", error);
  }}
  return (
    <View style={styles.container}>
      <View style={styles.image_conteiner}>
        <Image source={robot} style={styles.image} />
        <Text style={styles.header}>Cale Bot</Text>
      </View>
      <ScrollView
        ref={scrollViewRef}
        contentContainerStyle={styles.chat_container}
        onContentSizeChange={() =>
          scrollViewRef.current.scrollToEnd({ animated: true })
        }
      >
        {responses?.map((response, index) => {

          return index > responseIndex ? (
            <View key={index}></View>
          ) : (
            <View key={index}>
              <ChatText text={response.bot_label} />
              {index === responseIndex ? (
                <View style={styles.user_answer}>
                  {response.options?.map((option, index) => {
                    if (option.type === "Button") {

                      return (
                        <ChatButton
                          key={option.label + String(index)}
                          text={option.label}
                          emoji={option.emoji}
                          onPress={()=>onButtonPress(option,response)}
                        />
                      );
                    }
                    if (option.type === "text-hours-minutes") {
                      return (
                        <ChatHoursMinutes
                          key={option.label + String(index)}
                          text={option.label}
                          onPress={(val) => {
                            const temp = task
                            temp.duration = val
                            setTask(temp)
                            if (option.successor) {
                              setResponses((prev) => [
                                ...prev,
                                ...option.successor,
                              ]);
                            }
                            setResponseIndex((prev) => prev + 1);
                            botModel.addResponse(response.key, val);
                          }}
                        />
                      );
                    }
                  })}
                </View>
              ) : (
                <View>
                  <ChatText
                    text={botModel.getResponses()[response.key]}
                    isRobotSpeak={false}
                  />
                </View>
              )}
            </View>
          );
        })}
      </ScrollView>
    
 
      {inputMode && (
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Type your question..."
            value={text}
            onChangeText={setText}
            onSubmitEditing={handleTextSubmit} // Trigger submission on "Enter"
          />
          <ChatButton text="Submit" onPress={handleTextSubmit} />
        </View>
      )}

      <View style={{ height: "2%", opacity: 0, marginTop: 0 }}></View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  chat_container: {
    marginTop: 20,
    width: "90%",
    alignSelf: "center",
    marginBottom: 200,
    paddingBottom: 50,
  },
  image: {
    width: 200,
    height: 200,
  },
  image_conteiner: {
    // backgroundColor: Colors.fourth,
    backgroundColor: Colors.primary,
    alignItems: "center",
    paddingBottom: 20,
    paddingTop: "10%",
    borderBottomWidth: 1,
  },
  user_answer: {
    marginTop: 10,
    marginBottom: 20,
    flexDirection: "row",
    justifyContent: "space-around",
    flexWrap: "wrap",
  },
  header: {
    fontSize: 30,
    fontWeight: "bold",
    color: "white",
  },
  label: {
    fontSize: 16,
    color: '#333',
    marginBottom: 8,
  },
  input: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 8,
    fontSize: 16,
  },
});
