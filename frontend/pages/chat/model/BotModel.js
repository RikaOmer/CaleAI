import Hello from "./responses/hello";
import { View } from "react-native";
export default class BotModel {
  constructor() {
    this.user_responses = {};
  }
  addResponse(key, value) {
    this.user_responses[key] = value;
  }
  getResponses() {
    return this.user_responses;
  }
}
