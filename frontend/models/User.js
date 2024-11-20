import Manager from "../services/manager";
import Storage from "./storage";
export default class User {
  constructor(
    first_name,
    last_name,
    email,
    password = null,
    morning_start_time = null,
    morning_end_time = null,
    id = null
  ) {
    this.first_name = first_name;
    this.last_name = last_name;
    this.email = email;
    this.password = password;
    this.morning_start_time = morning_start_time;
    this.day_end_time = morning_end_time;
    this.id = id;
  }
  static async login(email, password) {
    return Manager.post("users/login/", {
      email: email,
      password: password,
    })
      .then((resp) => {
        const data = resp.data;
        Storage.storeData("token", data.token);
        return data.token;
      })
      .catch((error) => {
        return null;
      });
  }
  async register() {
    return await Manager.post("users/", {
      first_name: this.first_name,
      last_name: this.last_name,
      email: this.email,
      password: this.password,
      morning_start_time: this.morning_start_time,
      day_end_time: this.day_end_time,
    })
      .then((resp) => {
        const data = resp.data;
        Storage.storeData("token", data.token);
        return data.token;
      })
      .catch((error) => {
        return null;
      });
  }
  static async logout() {
    try {
      return await Storage.removeData("token");
    } catch (error) {}
  }
  static async is_logged_in() {
    return await Storage.getData("token");
  }
  static async getUser() {
    const u = await Storage.getData("token");
    if (u) {
      return new User(u.username, u.email, u.image, u.id);
    }
    return null;
  }
}
