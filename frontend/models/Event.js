import Manager from "../services/manager";


export default class Event {

  constructor(
    id,
    task,
    from_time,
    to_time,
    is_constant,
    date
  ) {
    this.id = id;
    this.task = task;
    this.from_time = from_time;
    this.to_time = to_time;
    this.is_constant = is_constant;
    this.date = date;
  }

  static async getEvents(date) {
    const url = "event/"
    const headers = {
      "date": date
    }
    console.log("headers", headers)
    return await Manager.get(url, headers)
      .then((resp) => {
        return resp.data.map(event => Event.from_json(event));
      })
      .catch((error) => {
        return [];
      });
  }

  static from_json(event) {
    console.log("event", event.task_id)
    return new Event(
      event.id,
      event.task_id,
      event.from_time,
      event.to_time,
      event.is_constant,
      event.date
    );

  }

  static async delete(id) {
    const url = "event/"
    const body = {
      id: id
    }
    return await Manager.delete(url, body)
      .then((resp) => {
        return resp.status
      })
      .catch((error) => {
        return 400;
      });
  }

  static async updateEvent(event) {
    const url = "event/"
    const headers = {
      "Content-Type": "application/json"
    }
    const body = {
      id: event.id,
      task_id: event.task,
      from_time: event.from_time,
      to_time: event.to_time,
      date: event.date
    }
    console.log("body", body)
    return await Manager.put(url, body)
      .then((resp) => {
        return resp.status;
      })
      .catch((error) => {
        return [];
      });

  }
}

