import Manager from "../services/manager";


export default class Chatbot {

  constructor(
    data
  ) {
    this.data = data;
  }

  static async getAnswer(data) {
    console.log("data", data)
    const url = "chatbot/"
    const headers = {
      "data": data
    }
    return await Manager.get(url, headers)
      .then((resp) => {
        return resp.data;
      })
      .catch((error) => {
        console.log("error", error)
        return [];
      });
  }

}

