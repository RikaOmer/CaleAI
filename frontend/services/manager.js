// import env from "react-native-dotenv";
// import { API_URL } from "@react-native-dotenv";
import axios from "axios";
import Storage from "../models/storage";
// import { configDotenv } from "dotenv";
// import react-native-doten
// const env = configDotenv();
// import { API_URL } from "react-native-dotenv";
const API_URL = "http://10.100.102.22:8000/";
export default class Manager {
  static async get(model_url, parameters, token = null) {
    const headers = {};
    const token_real = await Storage.getData("token");
    if (token_real) {
      headers["Authorization"] =token_real;
    }
    return axios.get(API_URL + model_url, {
      params: parameters,
      headers: headers,
    });
  }
  static async post(model_url, body) {
    const token = await Storage.getData("token");
    const headers = {};
    if (token) {
      headers["Authorization"] = token;
    }
    return axios.post(API_URL + model_url, body, {
      headers: headers,
    });
  }

  static async put(model_url, body) {
    const token = await Storage.getData("token");
    const headers = {};
    if (token) {
      headers["Authorization"] = token;
    }
    return axios.put(API_URL + model_url, body, {
      headers: headers,
    });
  }

  static async delete(model_url, body) {
    const token = await Storage.getData("token");
    const headers = {};
    if (token) {
      headers["Authorization"] = token;
    }
    return axios.delete(API_URL + model_url, {

      data: body,
      headers: headers,
      
    });
  }
}
