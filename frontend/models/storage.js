import AsyncStorage from "@react-native-async-storage/async-storage";
export default class Storage {
  static async storeData(key, value) {
    try {
      await AsyncStorage.setItem("@MySuperStore:" + key, value);
    } catch (error) {
      console.log(error);
    }
  }
  static async getData(key) {
    try {
      return await AsyncStorage.getItem("@MySuperStore:" + key);
    } catch (error) {
      console.log(error);
      return null;
    }
  }
  static async removeData(key) {
    try {
      return await AsyncStorage.removeItem("@MySuperStore:" + key);
    } catch (error) {
      return null;
    }
  }
}
